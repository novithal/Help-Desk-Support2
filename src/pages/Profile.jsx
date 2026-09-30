import React from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Save,
} from "lucide-react";

export default function Profile({
  showToast,
}) {
  const saveProfile = (e) => {
    e.preventDefault();

    showToast({
      type: "success",
      title: "Profile Updated",
      message: "Your profile has been updated.",
    });
  };

  return (
    <div className="page-content">
      <div className="profile-layout">
        <section className="panel profile-card">
          <div className="profile-cover" />

          <div className="profile-main">
            <div className="profile-large-avatar">
              NP
            </div>

            <h2>Novitha Loganathan</h2>
            <p>Administrator</p>

            <div className="profile-tags">
              <span>
                <ShieldCheck size={15} />
                Admin
              </span>

              <span>Active</span>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Profile Information</h2>
              <p>
                Manage your administrator details
              </p>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={saveProfile}
          >
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon">
                <User size={17} />
                <input defaultValue="Novitha Loganathan" />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-icon">
                <Mail size={17} />
                <input
                  defaultValue="admin@helpdesk.com"
                  type="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                defaultValue="Administrator"
                disabled
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input defaultValue="Customer Support" />
            </div>

            <div className="form-group full">
              <label>Bio</label>
              <textarea
                rows="5"
                defaultValue="Helpdesk administrator responsible for managing support operations."
              />
            </div>

            <div className="form-actions full">
              <button
                className="primary-button"
                type="submit"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}