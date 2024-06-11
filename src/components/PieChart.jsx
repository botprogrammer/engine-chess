import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function PieChart({ data }) {
  const chRef = useRef()

  useEffect(() => {
    const drawChart = () => {
      const svgContainer = chRef.current
      const width = svgContainer.getBoundingClientRect().width
      const radius = 200

      const legendPosition = d3
        .arc()
        .innerRadius(radius / 1.75)
        .outerRadius(radius)

      d3.select(svgContainer).selectAll('svg').remove()

      const svg = d3
        .select(svgContainer)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '500px')
        .attr('viewBox', '0 0 ' + width + ' ' + width)
        .append('g')
        .attr(
          'transform',
          'translate(' + width / 2 + ',' + width / 2 + ') scale(1.5)'
        )

      const pie = d3.pie().value((d) => d.value)
      const data_ready = pie(data)

      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
        .attr('fill', (d) => d.data.color)
        .style('opacity', '0.8')

      svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('g')
        .attr('transform', (d) => `translate(${legendPosition.centroid(d)})`)
        .attr('class', 'legend-g')
        .style('user-select', 'none')
        .append('text')
        .text((d) => d.data.name)
        .style('text-anchor', 'middle')
        .style('font-weight', 700)
        .style('fill', '#222')
        .style('font-size', 14)

      svg
        .selectAll('.legend-g')
        .append('text')
        .text((d) => {
          return `${d.data.value} (${(
            (d.data.value / d3.sum(data, (d) => d.value)) *
            100
          ).toFixed(1)}%)`
        })
        .style('fill', '#444')
        .style('font-size', 12)
        .style('text-anchor', 'middle')
        .attr('y', 16)
    }

    drawChart()
  }, [data])

  return <div id='pie-chart' ref={chRef}></div>
}
