import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ForceGraph({ data = [] }) {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Create or update the simulation
    if (!simulationRef.current) {
      simulationRef.current = d3
        .forceSimulation()
        .force(
          "link",
          d3
            .forceLink()
            .id((d) => d.id)
            .distance(150)
        )
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(60));
    }

    const simulation = simulationRef.current;

    // Stop the simulation before updating data
    simulation.stop();

    // Update simulation data
    // D3 expects links to reference node objects, not just IDs.
    // We need to ensure the nodes array is set before the links are resolved.
    simulation.nodes(data);

    // Map link source/target IDs to node objects after setting simulation.nodes()
    const linksData = data
      .flatMap((d) => d.connections || [])
      .map((link) => ({
        source: data.find((node) => node.id === link.source) || link.source, // Find the node object, fallback to ID if not found (shouldn't happen with correct data)
        target: data.find((node) => node.id === link.target) || link.target,
      }));

    simulation.force("link").links(linksData);

    // Bind data to SVG elements
    const svg = d3.select(svgRef.current);

    // Clear previous elements
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Create the links
    const links = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(linksData)
      .enter()
      .append("line")
      .attr("stroke", "#4a5568")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Create the nodes
    const nodes = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles to nodes
    nodes
      .append("circle")
      .attr("r", 25)
      .attr("fill", (d) =>
        d.type === "Movie"
          ? "#4299e1"
          : d.type === "Book"
          ? "#48bb78"
          : "#ed8936"
      )
      .attr("stroke", "#2d3748")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.8)
      .attr("filter", "drop-shadow(0 0 8px rgba(66, 153, 225, 0.3))");

    // Add text labels to nodes
    nodes
      .append("text")
      .text((d) => d.title)
      .attr("text-anchor", "middle")
      .attr("dy", 35)
      .attr("fill", "#e2e8f0")
      .style("font-size", "14px")
      .style("pointer-events", "none")
      .style("font-weight", "500");

    // Add hover effects
    nodes
      .on("mouseover", function (_, d) {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", 30)
          .attr("stroke-width", 3)
          .attr("stroke", "#4299e1");

        // Highlight connected links
        links
          .transition()
          .duration(200)
          .attr("stroke", (l) =>
            l.source.id === d.id || l.target.id === d.id ? "#4299e1" : "#4a5568"
          )
          .attr("stroke-width", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 3 : 2
          );

        // Highlight connected nodes
        nodes
          .select("circle")
          .transition()
          .duration(200)
          .attr("opacity", (n) =>
            n.id === d.id ||
            linksData.some(
              (l) =>
                (l.source.id === d.id && l.target.id === n.id) ||
                (l.target.id === d.id && l.source.id === n.id)
            )
              ? 1
              : 0.3
          );
      })
      .on("mouseout", function () {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", 25)
          .attr("stroke-width", 2)
          .attr("stroke", "#2d3748");

        // Reset links
        links
          .transition()
          .duration(200)
          .attr("stroke", "#4a5568")
          .attr("stroke-width", 2);

        // Reset nodes
        nodes.select("circle").transition().duration(200).attr("opacity", 1);
      });

    // Update positions on each tick
    simulation.on("tick", () => {
      links
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      nodes.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Restart the simulation with the new data
    simulation.alphaTarget(0.3).restart();

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [data]); // Add data to the dependency array

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
