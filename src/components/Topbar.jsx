import React, { useState } from "react";
import {
  Menu,
  Bell,
  RefreshCw,
  Plus,
  UserCircle,
  Settings,
  Ticket,
  X,
} from "lucide-react";

export default function Topbar({
  title,
  subtitle,
  onMenu,
  onRefresh,
  refreshing,
  onNew,
  onNavigate,
  notifications = [],
}) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-button"
          onClick={onMenu}
        >
          <Menu size={22} />
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="topbar-actions">
        {onNew && (
          <button
            className="topbar-add"
            onClick={onNew}
          >
            <Plus size={18} />
            <span>New Ticket</span>
          </button>
        )}

        <button
          className={`icon-button ${
            refreshing ? "rotating" : ""
          }`}
          onClick={onRefresh}
          disabled={refreshing}
          title="Refresh"
        >
          <RefreshCw size={19} />
        </button>

        <div className="topbar-menu-wrap">
          <button
            className="icon-button notification-button"
            onClick={() => {
              setNotificationOpen((value) => !value);
              setProfileOpen(false);
            }}
          >
            <Bell size={19} />

            {notifications.length > 0 && (
              <span className="notification-dot">
                {notifications.length}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="dropdown notification-dropdown">
              <div className="dropdown-header">
                <div>
                  <strong>Notifications</strong>
                  <span>
                    {notifications.length} alerts
                  </span>
                </div>

                <button
                  onClick={() =>
                    setNotificationOpen(false)
                  }
                >
                  <X size={16} />
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="dropdown-empty">
                  No new notifications
                </div>
              ) : (
                notifications.map((item) => (
                  <button
                    className="notification-item"
                    key={item.id}
                    onClick={() => {
                      setNotificationOpen(false);
                      onNavigate({
                        name: "ticket-view",
                        id: item.ticketId,
                      });
                    }}
                  >
                    <div className="notification-icon">
                      <Ticket size={16} />
                    </div>

                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                      <small>{item.time}</small>
                    </div>
                  </button>
                ))
              )}

              <button
                className="dropdown-footer"
                onClick={() => {
                  setNotificationOpen(false);
                  onNavigate({ name: "tickets" });
                }}
              >
                View all tickets
              </button>
            </div>
          )}
        </div>

        <div className="topbar-menu-wrap">
          <button
            className="profile-trigger"
            onClick={() => {
              setProfileOpen((value) => !value);
              setNotificationOpen(false);
            }}
          >
            <div className="avatar">NP</div>

            <div className="profile-short">
              <strong>Novitha</strong>
              <span>Administrator</span>
            </div>
          </button>

          {profileOpen && (
            <div className="dropdown profile-dropdown">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  onNavigate({ name: "profile" });
                }}
              >
                <UserCircle size={17} />
                My Profile
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  onNavigate({ name: "settings" });
                }}
              >
                <Settings size={17} />
                Settings
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  onNavigate({ name: "tickets" });
                }}
              >
                <Ticket size={17} />
                My Tickets
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}