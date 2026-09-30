import React from "react";
import {
  TrendingUp,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { chartData } from "../data";

export default function Analytics({
  tickets,
}) {
  const resolved = tickets.filter(
    (x) =>
      x.status === "Resolved" ||
      x.status === "Closed"
  ).length;

  const critical = tickets.filter(
    (x) => x.priority === "Critical"
  ).length;

  const avgSla =
    tickets.length > 0
      ? Math.round(
          tickets.reduce(
            (sum, ticket) => sum + ticket.sla,
            0
          ) / tickets.length
        )
      : 0;

  return (
    <div className="page-content">
      <div className="stats-grid">
        <StatCard
          title="Resolution Rate"
          value={`${Math.round(
            (resolved / tickets.length) * 100
          )}%`}
          icon={TrendingUp}
          trend="+6.4%"
        />

        <StatCard
          title="Avg. SLA Usage"
          value={`${avgSla}%`}
          icon={Clock3}
          trend="-3.1%"
        />

        <StatCard
          title="Critical Tickets"
          value={critical}
          icon={CheckCircle2}
        />

        <StatCard
          title="Active Agents"
          value="4"
          icon={Users}
        />
      </div>

      <div className="analytics-grid">
        <section className="panel chart-panel large">
          <div className="panel-header">
            <div>
              <h2>Tickets Created</h2>
              <p>Weekly ticket volume</p>
            </div>
          </div>

          <div className="analytics-bars">
            {chartData.map((item) => (
              <div
                className="analytics-bar-column"
                key={item.label}
              >
                <div className="analytics-value">
                  {item.value}
                </div>

                <div className="analytics-bar-bg">
                  <div
                    className="analytics-bar"
                    style={{
                      height: `${
                        (item.value / 60) * 100
                      }%`,
                    }}
                  />
                </div>

                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>By Priority</h2>
              <p>Ticket distribution</p>
            </div>
          </div>

          <div className="priority-stats">
            {[
              "Critical",
              "High",
              "Medium",
              "Low",
            ].map((priority) => {
              const count = tickets.filter(
                (x) => x.priority === priority
              ).length;

              const percentage = Math.round(
                (count / tickets.length) * 100
              );

              return (
                <div
                  className="priority-stat"
                  key={priority}
                >
                  <div>
                    <strong>{priority}</strong>
                    <span>
                      {count} tickets
                    </span>
                  </div>

                  <div className="priority-progress">
                    <span
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <b>{percentage}%</b>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}