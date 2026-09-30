import React from "react";
import { AlertTriangle, Clock3 } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

export default function SLAMonitor({ tickets }) {
  const critical = tickets.filter(
    (x) => x.sla >= 85
  );

  const warning = tickets.filter(
    (x) => x.sla >= 65 && x.sla < 85
  );

  const healthy = tickets.filter(
    (x) => x.sla < 65
  );

  return (
    <div className="page-content">
      <div className="sla-cards">
        <div className="sla-card green-card">
          <div>
            <span>Healthy</span>
            <strong>{healthy.length}</strong>
          </div>
          <Clock3 size={30} />
        </div>

        <div className="sla-card orange-card">
          <div>
            <span>Warning</span>
            <strong>{warning.length}</strong>
          </div>
          <Clock3 size={30} />
        </div>

        <div className="sla-card red-card">
          <div>
            <span>Critical</span>
            <strong>{critical.length}</strong>
          </div>
          <AlertTriangle size={30} />
        </div>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>SLA Monitor</h2>
            <p>
              Tickets approaching their response
              deadline
            </p>
          </div>
        </div>

        <div className="sla-table">
          {tickets
            .sort((a, b) => b.sla - a.sla)
            .map((ticket) => (
              <div
                className="sla-row"
                key={ticket.id}
              >
                <div className="sla-ticket-info">
                  <strong>{ticket.id}</strong>
                  <span>{ticket.title}</span>
                </div>

                <PriorityBadge
                  priority={ticket.priority}
                />

                <StatusBadge
                  status={ticket.status}
                />

                <div className="sla-progress-wrapper">
                  <div className="large-sla-track">
                    <span
                      className={
                        ticket.sla >= 85
                          ? "danger"
                          : ticket.sla >= 65
                          ? "warning"
                          : ""
                      }
                      style={{
                        width: `${ticket.sla}%`,
                      }}
                    />
                  </div>

                  <strong>{ticket.sla}%</strong>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}