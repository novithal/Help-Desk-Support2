import React, { useState } from "react";
import { Save, Bell, Mail, Shield } from "lucide-react";

export default function Settings({
  showToast,
}) {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    slaAlerts: true,
    autoAssign: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const save = () => {
    showToast({
      type: "success",
      title: "Settings Saved",
      message:
        "Your helpdesk settings have been saved.",
    });
  };

  return (
    <div className="page-content">
      <div className="settings-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Notification Settings</h2>
              <p>
                Configure your support notifications
              </p>
            </div>
          </div>

          <div className="setting-list">
            <div className="setting-item">
              <div className="setting-icon">
                <Bell size={19} />
              </div>

              <div>
                <strong>Push Notifications</strong>
                <span>
                  Receive notifications for new tickets
                </span>
              </div>

              <button
                className={`toggle ${
                  settings.notifications
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggle("notifications")
                }
              >
                <span />
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Mail size={19} />
              </div>

              <div>
                <strong>Email Alerts</strong>
                <span>
                  Receive ticket updates by email
                </span>
              </div>

              <button
                className={`toggle ${
                  settings.emailAlerts
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggle("emailAlerts")
                }
              >
                <span />
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Shield size={19} />
              </div>

              <div>
                <strong>SLA Alerts</strong>
                <span>
                  Alert when tickets approach SLA
                  limits
                </span>
              </div>

              <button
                className={`toggle ${
                  settings.slaAlerts
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggle("slaAlerts")
                }
              >
                <span />
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Bell size={19} />
              </div>

              <div>
                <strong>Auto Assignment</strong>
                <span>
                  Automatically assign new tickets
                </span>
              </div>

              <button
                className={`toggle ${
                  settings.autoAssign
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggle("autoAssign")
                }
              >
                <span />
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button
              className="primary-button"
              onClick={save}
            >
              <Save size={16} />
              Save Settings
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}