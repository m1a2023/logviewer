import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as d3 from "d3";

function transformChainsToTasks(chains) {
  return chains
    .filter(chain => Array.isArray(chain.Logs) && chain.Logs.length > 0)
    .map((chain, index) => {
      const logs = chain.Logs.filter(log => log && log.timestamp);
      if (logs.length === 0) return null;

      const sortedLogs = logs.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      const startTime = new Date(sortedLogs[0].timestamp).getTime();
      const endTime = new Date(sortedLogs[sortedLogs.length - 1].timestamp).getTime();

      return {
        id: String(index + 1),
        name: chain.tf_req_id || `task-${index + 1}`,
        start: startTime,
        end: endTime,
        color: index % 2 === 0 ? "#198754" : "#0d6efd"
      };
    })
    .filter(Boolean);
}

export default function GanttChart({
                                     margin = { top: 20, right: 20, bottom: 30, left: 160 },
                                     rowPadding = 8,
                                     tickFormat = d3.timeFormat("%H:%M:%S.%L"),
                                     containerClassName = "w-100 h-100",
                                   }) {
  const { filename } = useParams();
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 1600 });
  const [tasks, setTasks] = useState([]);

  // Загружаем данные
  useEffect(() => {
    if (!filename) return;

    async function fetchChains() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/jsonfiles/${filename}/chains`);
        if (!res.ok) throw new Error("Ошибка при загрузке chains");
        const chainsData = await res.json();

        const chains = chainsData.chains.chains.map(chainItem => ({
          tf_req_id: chainItem.tf_req_id,
          Logs: chainItem.Logs.map(logEntry => ({
            ...logEntry.line,
            Id: logEntry.Id,
            message: logEntry.line.message,
            level: logEntry.line.level,
            timestamp: logEntry.line.timestamp,
          })),
        }));

        const tasks = transformChainsToTasks(chains);
        setTasks(tasks);
      } catch (err) {
        console.error(err);
      }
    }

    fetchChains();
  }, [filename]);

  useEffect(() => {
    if (tasks.length === 0) return;

    const rowHeight = 50; // высота каждой задачи
    const innerHeight = tasks.length * rowHeight;
    const totalHeight = innerHeight + margin.top + margin.bottom;

    setSize(prev => ({ ...prev, height: totalHeight }));
  }, [tasks, margin.top, margin.bottom]);

  const normTasks = tasks.map(t => ({
    ...t,
    start: new Date(t.start),
    end: new Date(t.end),
  }));

  // Resize observer
  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setSize({
            width: Math.max(300, Math.floor(entry.contentRect.width)),
            height: Math.max(300, Math.floor(entry.contentRect.height)),
          });
        }
      }
    });
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  // D3 рендер с Zoom
  useEffect(() => {
    if (!svgRef.current) return;
    const { width, height } = size;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (normTasks.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#6c757d")
        .text("No tasks to display");
      return;
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const minStart = d3.min(normTasks, d => d.start);
    const maxEnd = d3.max(normTasks, d => d.end);

    const x = d3.scaleTime().domain([minStart, maxEnd]).range([0, innerWidth]).nice();
    const y = d3.scaleBand()
      .domain(normTasks.map(d => d.id))
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Группы для осей и баров
    const xAxisG = g.append("g").attr("transform", `translate(0,${innerHeight})`);
    const yAxisG = g.append("g");
    yAxisG.call(d3.axisLeft(y).tickFormat(id => {
      const found = normTasks.find(t => t.id === id);
      return found ? found.name : id;
    }).tickSize(0));
    const barsG = g.append("g");

    // начальные оси
    xAxisG.call(d3.axisBottom(x).tickFormat(tickFormat));
    yAxisG.call(d3.axisLeft(y).tickFormat(id => {
      const found = normTasks.find(t => t.id === id);
      return found ? found.name : id;
    }).tickSize(0));

    yAxisG.selectAll("text")
      .style("cursor", "pointer") // курсор “рука”
      .on("click", (event, id) => {
        const found = normTasks.find(t => t.id === id);
        if (found) {
          const value = found.name;
          const url = `${window.location.origin}/chain/${filename}/${value}`;
          window.open(url, "_blank"); // открывает ссылку в новой вкладке
        }
      });

    // бары
    barsG.selectAll(".task-bar")
      .data(normTasks)
      .enter()
      .append("rect")
      .attr("class", "task-bar")
      .attr("x", d => x(d.start))
      .attr("y", d => y(d.id))
      .attr("width", d => Math.max(1, x(d.end) - x(d.start)))
      .attr("height", y.bandwidth())
      .attr("fill", d => d.color || "#0d6efd")
      .attr("rx", 3)
      .attr("ry", 3);

    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([1, 50]) // масштабирование от 1x до 50x
      .translateExtent([[0, 0], [innerWidth, innerHeight]])
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on("zoom", (event) => {
        const newX = event.transform.rescaleX(x);
        xAxisG.call(d3.axisBottom(newX).tickFormat(tickFormat));
        barsG.selectAll(".task-bar")
          .attr("x", d => newX(d.start))
          .attr("width", d => Math.max(1, newX(d.end) - newX(d.start)));
      });

    svg.call(zoom);

  }, [normTasks, size]);

  return (
    <div ref={wrapperRef} className={`${containerClassName} position-relative w-100 h-100`} style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <svg ref={svgRef} className="w-100 h-100 bg-white border"></svg>
    </div>
  );
}
