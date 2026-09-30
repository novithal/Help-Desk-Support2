import React from "react";
import { Mail, UserCheck } from "lucide-react";
import { agents } from "../data";

export default function Agents() {
  return (
    <div className="page-content">
      <div className="agent-grid">
        {agents.map((agent) => (
          <div className="agent-card" key={agent.id}>
            <div className="agent-card-top">
              <div className="large-avatar">
                {agent.avatar}
              </div>

              <span
                className={`online-status ${agent.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {agent.status}
              </span>
            </div>

            <h3>{agent.name}</h3>

            <p>{agent.role}</p>

            <div className="agent-info">
              <span>
                <Mail size={15} />
                {agent.email}
              </span>

              <span>
                <UserCheck size={15} />
                Support Agent
              </span>
            </div>

            <button className="agent-button">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}