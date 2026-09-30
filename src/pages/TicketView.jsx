import React, { useState } from "react";
import {
  ArrowLeft,
  Pencil,
  UserPlus,
  Send,
  Paperclip,
  Clock3,
  User,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

export default function TicketView({
  ticket,
  onBack,
  onEdit,
  onAssign,
  onStatusChange,
  onComment,
}) {
  const [comment, setComment] = useState("");

  if (!ticket) {
    return (
      <div className="page-content">
        <div className="panel table-empty">
          <h3>Ticket not found</h3>
        </div>
      </div>
    );
  }

  const submitComment = () => {
    if (!comment.trim()) return;

    onComment(ticket.id, comment.trim());
    setComment("");
  };

  return (
    <div className="page-content">
      <button
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        Back to Tickets
      </button>

      <div className="ticket-detail-grid">
        <main>
          <section className="panel ticket-detail-main">
            <div className="ticket-detail-header">
              <div>
                <span className="ticket-id">
                  {ticket.id}
                </span>

                <h2>{ticket.title}</h2>

                <div className="detail-badges">
                  <StatusBadge
                    status={ticket.status}
                  />
                  <PriorityBadge
                    priority={ticket.priority}
                  />
                  <span className="category-badge">
                    {ticket.category}
                  </span>
                </div>
              </div>

              <div className="detail-actions">
                <button
                  className="secondary-button"
                  onClick={() => onAssign(ticket.id)}
                >
                  <UserPlus size={16} />
                  Assign
                </button>

                <button
                  className="primary-button"
                  onClick={() => onEdit(ticket.id)}
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            </div>

            <div className="description-box">
              <h3>Description</h3>
              <p>{ticket.description}</p>
            </div>

            <div className="status-update">
              <label>Update Status</label>

              <select
                value={ticket.status}
                onChange={(e) =>
                  onStatusChange(
                    ticket.id,
                    e.target.value
                  )
                }
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Pending</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Comments</h2>
                <p>
                  Customer and agent conversation
                </p>
              </div>
            </div>

            <div className="comments-list">
              {ticket.comments?.length ? (
                ticket.comments.map((item) => (
                  <div
                    className="comment"
                    key={item.id}
                  >
                    <div className="comment-avatar">
                      {item.user
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>

                    <div className="comment-content">
                      <div className="comment-meta">
                        <strong>{item.user}</strong>
                        <span>{item.time}</span>
                      </div>

                      <p>{item.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="comment-empty">
                  No comments yet.
                </div>
              )}
            </div>

            <div className="comment-box">
              <textarea
                rows="4"
                placeholder="Write a reply..."
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
              />

              <div className="comment-actions">
                <button className="attachment-small">
                  <Paperclip size={16} />
                  Attach
                </button>

                <button
                  className="primary-button"
                  onClick={submitComment}
                >
                  <Send size={16} />
                  Send Reply
                </button>
              </div>
            </div>
          </section>
        </main>

        <aside className="ticket-detail-side">
          <section className="panel">
            <h3>Ticket Information</h3>

            <div className="info-list">
              <div>
                <span>Customer</span>
                <strong>{ticket.customer}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{ticket.email}</strong>
              </div>

              <div>
                <span>Assigned Agent</span>
                <strong>
                  <User size={15} />
                  {ticket.agent}
                </strong>
              </div>

              <div>
                <span>Created</span>
                <strong>{ticket.created}</strong>
              </div>

              <div>
                <span>Last Updated</span>
                <strong>{ticket.updated}</strong>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="sla-detail">
              <div className="sla-detail-icon">
                <Clock3 size={20} />
              </div>

              <div>
                <span>SLA Usage</span>
                <strong>{ticket.sla}%</strong>
              </div>
            </div>

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

            <small className="sla-note">
              {ticket.sla >= 85
                ? "SLA is at critical risk."
                : ticket.sla >= 65
                ? "Monitor response deadline."
                : "Ticket is within SLA target."}
            </small>
          </section>

          <section className="panel">
            <h3>Activity Timeline</h3>

            <div className="timeline">
              {ticket.activity?.map(
                (item, index) => (
                  <div
                    className="timeline-item"
                    key={index}
                  >
                    <div className="timeline-dot" />

                    <div>
                      <strong>{item.text}</strong>
                      <span>{item.time}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}