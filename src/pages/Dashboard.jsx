import React from "react";
import {
  Ticket,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import { chartData } from "../data";

export default function Dashboard({
  tickets,
  onNavigate,
}) {
  const total = tickets.length;
  const open = tickets.filter(
    (x) => x.status === "Open"
  ).length;

  const progress = tickets.filter(
    (x) => x.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (x) =>
      x.status === "Resolved" ||
      x.status === "Closed"
  ).length;

  const critical = tickets.filter(
    (x) =>
      x.priority === "Critical" ||
      x.sla >= 85
  ).length;

  const max = Math.max(
    ...chartData.map((item) => item.value)
  );

  return (
    <div className="page-content">
      <div className="stats-grid">
        <StatCard
          title="Total Tickets"
          value={total}
          icon={Ticket}
          trend="+12.5%"
          description="Compared with last week"
        />

        <StatCard
          title="Open Tickets"
          value={open}
          icon={Clock3}
          trend="+4.2%"
          description="Needs attention"
        />

        <StatCard
          title="Resolved"
          value={resolved}
          icon={CheckCircle2}
          trend="+18.7%"
          description="Successfully resolved"
        />

        <StatCard
          title="SLA At Risk"
          value={critical}
          icon={AlertTriangle}
          trend="Monitor"
          description="Requires immediate action"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <h2>Ticket Volume</h2>
              <p>Tickets created this week</p>
            </div>

            <select className="select-small">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="bar-chart">
            {chartData.map((item) => (
              <div
                className="bar-column"
                key={item.label}
              >
                <span>{item.value}</span>

                <div className="bar-background">
                  <div
                    className="bar"
                    style={{
                      height: `${
                        (item.value / max) * 100
                      }%`,
                    }}
                  />
                </div>

                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Tickets</h2>
              <p>Latest support requests</p>
            </div>

            <button
              className="text-button"
              onClick={() =>
                onNavigate({ name: "tickets" })
              }
            >
              View All
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="recent-list">
            {tickets.slice(0, 5).map((ticket) => (
              <button
                className="recent-ticket"
                key={ticket.id}
                onClick={() =>
                  onNavigate({
                    name: "ticket-view",
                    id: ticket.id,
                  })
                }
              >
                <div className="recent-main">
                  <strong>{ticket.id}</strong>
                  <span>{ticket.title}</span>
                </div>

                <div className="recent-right">
                  <PriorityBadge
                    priority={ticket.priority}
                  />
                  <StatusBadge
                    status={ticket.status}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>SLA Overview</h2>
            <p>Current ticket response health</p>
          </div>
        </div>

        <div className="sla-overview">
          <div>
            <span className="sla-number green">
              {tickets.filter((x) => x.sla < 65).length}
            </span>
            <strong>Healthy</strong>
            <small>Below 65%</small>
          </div>

          <div>
            <span className="sla-number orange">
              {
                tickets.filter(
                  (x) => x.sla >= 65 && x.sla < 85
                ).length
              }
            </span>
            <strong>Warning</strong>
            <small>65% - 84%</small>
          </div>

          <div>
            <span className="sla-number red">
              {tickets.filter((x) => x.sla >= 85).length}
            </span>
            <strong>Critical</strong>
            <small>85% and above</small>
          </div>
        </div>
      </section>
    </div>
  );
}