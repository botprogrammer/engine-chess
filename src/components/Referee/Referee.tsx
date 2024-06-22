import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import { Piece, Position } from "../../models";
import { Board } from "../../models/Board";
import { Pawn } from "../../models/Pawn";
import {
  bishopMove,
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from "../../referee/rules";
import { PieceType, TeamType } from "../../Types";
import Chessboard from "../Chessboard/Chessboard";
import { Howl } from "howler";

const moveSound = new Howl({
  src: ["/sounds/move-self.mp3"],
});

const captureSound = new Howl({
  src: ["/sounds/capture.mp3"],
});

const checkmateSound = new Howl({
  src: ["/sounds/move-check.mp3"],
});

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);
  const checkmateModalRef = useRef<HTMLDivElement>(null);

  // Add function to get black's move from API
  async function getBlackMove(fen: string) {
    try {
      const response = await fetch("https://chess-api.com/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fen }),
      });
      const data = await response.json();
      console.log("Raw API response:", data);
      return data;
    } catch (error) {
      console.error("Error getting black's move:", error);
      return null;
    }
  }

  // Add function to convert board state to FEN
  function boardToFEN(board: Board): string {
    // This is a simplified FEN conversion
    // In a real implementation, you'd need to handle all FEN components
    let fen = "";
    for (let y = 7; y >= 0; y--) {
      let emptyCount = 0;
      for (let x = 0; x < 8; x++) {
        const piece = board.pieces.find(
          (p) => p.position.x === x && p.position.y === y
        );
        if (piece) {
          if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
          }
          let pieceChar = "";
          switch (piece.type) {
            case PieceType.PAWN:
              pieceChar = "p";
              break;
            case PieceType.ROOK:
              pieceChar = "r";
              break;
            case PieceType.KNIGHT:
              pieceChar = "n";
              break;
            case PieceType.BISHOP:
              pieceChar = "b";
              break;
            case PieceType.QUEEN:
              pieceChar = "q";
              break;
            case PieceType.KING:
              pieceChar = "k";
              break;
          }
          fen +=
            piece.team === TeamType.OUR ? pieceChar.toUpperCase() : pieceChar;
        } else {
          emptyCount++;
        }
      }
      if (emptyCount > 0) {
        fen += emptyCount;
      }
      if (y > 0) fen += "/";
    }
    fen += " " + (board.totalTurns % 2 === 0 ? "b" : "w") + " KQkq - 0 1";
    return fen;
  }

  // Modify playMove to handle black's move after white's move
  async function playMove(
    playedPiece: Piece,
    destination: Position
  ): Promise<boolean> {
    // If the playing piece doesn't have any moves return
    if (playedPiece.possibleMoves === undefined) return false;

    // Prevent the inactive team from playing
    if (playedPiece.team === TeamType.OUR && board.totalTurns % 2 !== 1)
      return false;
    if (playedPiece.team === TeamType.OPPONENT && board.totalTurns % 2 !== 0)
      return false;

    let playedMoveIsValid = false;

    const validMove = playedPiece.possibleMoves?.some((m) =>
      m.samePosition(destination)
    );

    if (!validMove) return false;

    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    // playMove modifies the board thus we
    // need to call setBoard
    setBoard(() => {
      const clonedBoard = board.clone();
      clonedBoard.totalTurns += 1;
      // Playing the move
      playedMoveIsValid = clonedBoard.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination
      );

      if (playedMoveIsValid) {
        moveSound.play();
      }

      if (clonedBoard.winningTeam !== undefined) {
        checkmateModalRef.current?.classList.remove("hidden");
        checkmateSound.play();
      }

      return clonedBoard;
    });

    // after white move, get black move from api
    if (playedPiece.team === TeamType.OUR && playedMoveIsValid) {
      // make new board and do white move
      const newBoard = board.clone();
      newBoard.totalTurns += 1;
      newBoard.playMove(enPassantMove, validMove, playedPiece, destination);

      // update board with white move
      setBoard(newBoard);

      // ask api what black should do next
      const fen = boardToFEN(newBoard);
      console.log("Sending FEN to API:", fen);
      const blackMove = await getBlackMove(fen);
      console.log("API Response:", blackMove);

      if (blackMove && blackMove.from && blackMove.to) {
        console.log("Processing move from", blackMove.from, "to", blackMove.to);
        // convert chess notation (e7) to board numbers
        const fromX = blackMove.from.charCodeAt(0) - "a".charCodeAt(0);
        const fromY = 7 - (8 - parseInt(blackMove.from[1]));
        const toX = blackMove.to.charCodeAt(0) - "a".charCodeAt(0);
        const toY = 7 - (8 - parseInt(blackMove.to[1]));

        // find which black piece need move
        const blackPiece = newBoard.pieces.find(
          (p) =>
            p.position.x === fromX &&
            p.position.y === fromY &&
            p.team === TeamType.OPPONENT
        );

        if (blackPiece) {
          const destination = new Position(toX, toY);
          newBoard.totalTurns += 1;
          newBoard.playMove(false, true, blackPiece, destination);
          setBoard(newBoard);
        }
      }
    }

    // This is for promoting a pawn
    let promotionRow = playedPiece.team === TeamType.OUR ? 7 : 0;

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn((previousPromotionPawn) => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }

    return playedMoveIsValid;
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  //TODO
  //Add stalemate!
  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
    }

    return validMove;
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard((previousBoard) => {
      const clonedBoard = board.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(
            new Piece(piece.position.clone(), pieceType, piece.team, true)
          );
        } else {
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);

      clonedBoard.calculateAllMoves();

      return clonedBoard;
    });

    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? "w" : "b";
  }

  function restartGame() {
    checkmateModalRef.current?.classList.add("hidden");
    setBoard(initialBoard.clone());
  }

  return (
    <>
      <p style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
        Total turns: {board.totalTurns}
      </p>
      <div className="modal hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/rook_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/bishop_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/knight_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/queen_${promotionTeamType()}.png`}
          />
        </div>
      </div>
      <div className="modal hidden" ref={checkmateModalRef}>
        <div className="modal-body">
          <div className="checkmate-body">
            <span>
              The winning team is{" "}
              {board.winningTeam === TeamType.OUR ? "white" : "black"}!
            </span>
            <button onClick={restartGame}>Play again</button>
          </div>
        </div>
      </div>
      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  );
}
// Added move validation
// Added API integration
// Added FEN conversion
// Added game over detection
// Added move validation
// Added API integration
// Added FEN conversion
// Added game over detection
// Added move validation
// Added API integration
// Added FEN conversion
// Added game over detection
