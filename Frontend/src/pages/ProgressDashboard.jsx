import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";
import { useTheme } from "../context/ThemeContext";

const ProgressDashboard = () => {
  const [data, setData] = useState([]);
  const barRef = useRef();
  const tooltipRef = useRef();
  const { colour } = useTheme();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:2424/api/progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data.data || []);
      } catch (err) {
        console.error("Progress fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // 🧠 INSIGHTS (no logic change, derived only)

  const insights = (() => {
    if (!data.length) return null;

    const grouped = d3.rollup(
      data,
      (v) => d3.mean(v, (d) => (d.score / d.totalQuestions) * 100),
      (d) => d.topic
    );

    const arr = Array.from(grouped, ([topic, value]) => ({
      topic,
      value,
    }));

    const best = arr.reduce((a, b) => (a.value > b.value ? a : b));
    const worst = arr.reduce((a, b) => (a.value < b.value ? a : b));

    return { best, worst };
  })();

  // 📊 BAR CHART
  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(barRef.current);
    svg.selectAll("*").remove();

    const width = 700;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };

    const grouped = d3.rollup(
      data,
      (v) => d3.mean(v, (d) => (d.score / d.totalQuestions) * 100),
      (d) => d.topic
    );

    const dataset = Array.from(grouped, ([key, value]) => ({
      topic: key,
      value: value,
    }));

    const x = d3.scaleBand()
      .domain(dataset.map(d => d.topic))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // ✨ Gradient (unchanged)
    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
      .attr("id", "barGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", colour)
      .attr("stop-opacity", 0.9);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#6366f1")
      .attr("stop-opacity", 0.6);

    const tooltip = d3.select(tooltipRef.current);

    // 🔥 BARS WITH ADVANCED ANIMATION
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", d => x(d.topic))
      .attr("width", x.bandwidth())
      .attr("y", height - margin.bottom)
      .attr("height", 0)
      .attr("rx", 8)
      .attr("fill", "url(#barGradient)")
      .style("opacity", 0.8)
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr("transform", "scale(1.03)");

        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.topic}</strong><br/>${d.value.toFixed(1)}%`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 0.8)
          .attr("transform", "scale(1)");

        tooltip.style("opacity", 0);
      })
      .transition()
      .delay((_, i) => i * 120)
      .duration(900)
      .ease(d3.easeBackOut.overshoot(1.2))
      .attr("y", d => y(d.value))
      .attr("height", d => height - margin.bottom - y(d.value));

    // 🧾 VALUE LABELS
    svg.selectAll("text.bar-label")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.topic) + x.bandwidth() / 2)
      .attr("y", height - margin.bottom - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("fill", "#374151")
      .text(d => `${d.value.toFixed(0)}%`)
      .style("opacity", 0)
      .transition()
      .delay((_, i) => i * 120 + 400)
      .style("opacity", 1)
      .attr("y", d => y(d.value) - 5);

    // 🧾 AXES (unchanged)
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "text-xs fill-gray-600")
      .attr("transform", "rotate(-20)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("class", "text-xs fill-gray-600");

  }, [data, colour]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-white to-slate-200">
      
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
       
      </h1>

      {!data.length ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No progress yet. Start playing quizzes 🚀
        </div>
      ) : (
        <div className="relative max-w-4xl mx-auto">
          
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8 transition hover:shadow-3xl">
            
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              Topic Performance Overview
            </h2>

          
            {insights && (
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs text-green-600">Strongest Topic</p>
                  <p className="font-semibold text-green-800">
                    {insights.best.topic} ({insights.best.value.toFixed(1)}%)
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-xs text-red-600">Needs Improvement</p>
                  <p className="font-semibold text-red-800">
                    {insights.worst.topic} ({insights.worst.value.toFixed(1)}%)
                  </p>
                </div>
              </div>
            )}

            <svg
              ref={barRef}
              viewBox="0 0 700 400"
              className="w-full h-auto"
            />
          </div>

          {/* Tooltip */}
          <div
            ref={tooltipRef}
            className="absolute pointer-events-none opacity-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg transition"
          />
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;