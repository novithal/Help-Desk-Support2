import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

export default function TicketTable({
  tickets,
  onView,
  onEdit,
  onDelete,
  onAssign,
}) {
  if (!tickets.length) {
    return (
      <div className="table-empty">
        <div className="empty-icon">🎫</div>
        <h3>No tickets found</h3>
        <p>
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Customer</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Agent</th>
            <th>SLA</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>
                <div className="ticket-cell">
                  <strong>{ticket.id}</strong>
                  <span>{ticket.title}</span>
                </div>
              </td>

              <td>
                <div className="customer-cell">
                  <strong>{ticket.customer}</strong>
                  <span>{ticket.email}</span>
                </div>
              </td>

              <td>{ticket.category}</td>

              <td>
                <PriorityBadge
                  priority={ticket.priority}
                />
              </td>

              <td>
                <StatusBadge status={ticket.status} />
              </td>

              <td>
                <div className="agent-cell">
                  <div className="mini-avatar">
                    {ticket.agent
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </div>
                  {ticket.agent}
                </div>
              </td>

              <td>
                <div className="sla-cell">
                  <div className="sla-track">
                    <span
                      style={{
                        width: `${ticket.sla}%`,
                      }}
                      className={
                        ticket.sla >= 85
                          ? "danger"
                          : ticket.sla >= 65
                          ? "warning"
                          : ""
                      }
                    />
                  </div>
                  <small>{ticket.sla}%</small>
                </div>
              </td>

              <td>
                <div className="table-actions">
                  <button
                    title="View"
                    onClick={() =>
                      onView(ticket.id)
                    }
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    title="Edit"
                    onClick={() =>
                      onEdit(ticket.id)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    title="Assign"
                    onClick={() =>
                      onAssign(ticket.id)
                    }
                  >
                    <UserPlus size={16} />
                  </button>

                  <button
                    className="danger-action"
                    title="Delete"
                    onClick={() =>
                      onDelete(ticket.id)
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}