import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styles from '../styles/OrdersChart.module.css'

export default function Chart({ data }) {
  const svgRef = useRef()

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const container = svg.node().parentNode
    const margin = { top: 20, right: 40, bottom: 70, left: 70 } // Increased bottom margin for the legend
    const width = container.clientWidth - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    svg.selectAll('*').remove()

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.1)

    const y0 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.orders)])
      .range([height, 0])

    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.revenue)])
      .range([height, 0])

    const xAxis = d3.axisBottom(x)
    const yAxisLeft = d3.axisLeft(y0)
    const yAxisRight = d3.axisRight(y1)

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '-0.15em')
      .attr('transform', 'rotate(-65)')

    g.append('g').call(yAxisLeft)

    g.append('g').attr('transform', `translate(${width},0)`).call(yAxisRight)

    // Adding left y-axis label (Orders)
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .attr('text-anchor', 'middle')
      .text('Orders')

    // Adding right y-axis label (Revenue)
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', width + 20)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .attr('text-anchor', 'middle')
      .text('Revenue')

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', styles.bar)
      .attr('x', (d) => x(d.date))
      .attr('y', (d) => y0(d.orders))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y0(d.orders))

    const line = d3
      .line()
      .x((d) => x(d.date) + x.bandwidth() / 2)
      .y((d) => y1(d.revenue))

    g.append('path').datum(data).attr('class', styles.line).attr('d', line)

    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', styles.dot)
      .attr('cx', (d) => x(d.date) + x.bandwidth() / 2)
      .attr('cy', (d) => y1(d.revenue))
      .attr('r', 5)

    const legend = svg
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left},${height + margin.top + 20})`
      )

    legend
      .append('rect')
      .attr('x', width / 2 - 100)
      .attr('y', 50)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'steelblue')

    legend
      .append('text')
      .attr('y', 65)
      .attr('x', width / 2 - 70)
      .text('Orders')

    legend
      .append('circle')
      .attr('cx', width / 2 + 10)
      .attr('cy', 60)
      .attr('r', 7)
      .attr('class', styles.dot)

    legend
      .append('text')
      .attr('x', width / 2 + 30)
      .attr('y', 65)
      .text('Revenue')
  }, [data])

  return (
    <div className={styles.svgContainer}>
      <svg ref={svgRef} width='100%' height='100%'></svg>
    </div>
  )
}
