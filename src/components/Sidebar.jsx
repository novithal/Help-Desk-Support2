import React from "react";
import {
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Clock3,
  UserCircle,
  Settings,
  Plus,
  LifeBuoy,
  X,
} from "lucide-react";

const menu = [
  {
    section: "MAIN",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "tickets", label: "Tickets", icon: Ticket },
      { id: "create", label: "Create Ticket", icon: Plus },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      { id: "agents", label: "Agents", icon: Users },
      { id: "sla", label: "SLA Monitor", icon: Clock3 },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    section: "ACCOUNT",
    items: [
      { id: "profile", label: "Profile", icon: UserCircle },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar({
  page,
  onNavigate,
  mobileOpen,
  onClose,
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <LifeBuoy size={22} />
          </div>

          <div>
            <h2>HelpDesk</h2>
            <span>Support Center</span>
          </div>

          <button
            className="mobile-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-scroll">
          {menu.map((group) => (
            <div className="menu-group" key={group.section}>
              <div className="menu-title">
                {group.section}
              </div>

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    className={`sidebar-item ${
                      page === item.id ? "active" : ""
                    }`}
                    onClick={() => {
                      onNavigate({ name: item.id });
                      onClose?.();
                    }}
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">
              <LifeBuoy size={18} />
            </div>

            <div>
              <strong>Need Help?</strong>
              <span>Contact support team</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}