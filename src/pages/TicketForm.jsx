import React, { useState } from "react";
import {
  Paperclip,
  ArrowLeft,
} from "lucide-react";
import { agents, categories } from "../data";

export default function TicketForm({
  ticket,
  onSave,
  onCancel,
}) {
  const editing = Boolean(ticket);

  const [form, setForm] = useState(
    ticket || {
      title: "",
      customer: "",
      email: "",
      category: "Technical",
      priority: "Medium",
      status: "Open",
      agent: agents[0].name,
      description: "",
      attachments: [],
    }
  );

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Ticket title is required.");
      return;
    }

    if (!form.customer.trim()) {
      setError("Customer name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Customer email is required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    setError("");

    onSave({
      ...form,
      title: form.title.trim(),
      customer: form.customer.trim(),
      email: form.email.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <div className="page-content">
      <div className="form-page">
        <button
          className="back-button"
          onClick={onCancel}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <form
          className="panel form-panel"
          onSubmit={submit}
        >
          <div className="form-heading">
            <div>
              <h2>
                {editing
                  ? "Edit Ticket"
                  : "Create New Ticket"}
              </h2>

              <p>
                {editing
                  ? "Update ticket information and assignment."
                  : "Create a new support request."}
              </p>
            </div>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group full">
              <label>Ticket Title *</label>
              <input
                value={form.title}
                onChange={(e) =>
                  update("title", e.target.value)
                }
                placeholder="Enter ticket title"
              />
            </div>

            <div className="form-group">
              <label>Customer Name *</label>
              <input
                value={form.customer}
                onChange={(e) =>
                  update("customer", e.target.value)
                }
                placeholder="Customer name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                value={form.email}
                onChange={(e) =>
                  update("email", e.target.value)
                }
                placeholder="customer@email.com"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) =>
                  update("category", e.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  update("priority", e.target.value)
                }
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value)
                }
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Pending</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assign Agent</label>
              <select
                value={form.agent}
                onChange={(e) =>
                  update("agent", e.target.value)
                }
              >
                {agents.map((agent) => (
                  <option
                    key={agent.id}
                    value={agent.name}
                  >
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full">
              <label>Description *</label>
              <textarea
                rows="7"
                value={form.description}
                onChange={(e) =>
                  update(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe the issue..."
              />
            </div>

            <div className="form-group full">
              <label>Attachments</label>

              <label className="attachment-box">
                <Paperclip size={19} />
                <span>
                  Click to attach files
                </span>

                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const names = Array.from(
                      e.target.files
                    ).map((file) => file.name);

                    update("attachments", names);
                  }}
                />
              </label>

              {form.attachments?.length > 0 && (
                <div className="attachment-preview">
                  {form.attachments.map((file) => (
                    <span key={file}>{file}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {editing
                ? "Update Ticket"
                : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}