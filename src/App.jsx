import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketForm from "./pages/TicketForm";
import TicketView from "./pages/TicketView";
import Agents from "./pages/Agents";
import Analytics from "./pages/Analytics";
import SLAMonitor from "./pages/SLAMonitor";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { initialTickets, agents } from "./data";

import {
  AlertTriangle,
  UserPlus,
} from "lucide-react";

const STORAGE_KEY = "helpdesk-tickets-v2";

export default function App() {
  const [page, setPage] = useState({
    name: "dashboard",
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      return saved
        ? JSON.parse(saved)
        : initialTickets;
    } catch {
      return initialTickets;
    }
  });

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const [deleteId, setDeleteId] =
    useState(null);

  const [assignId, setAssignId] =
    useState(null);

  const [selectedAgent, setSelectedAgent] =
    useState(agents[0].name);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tickets)
    );
  }, [tickets]);

  const showToast = (data) => {
    setToast({
      type: data.type || "success",
      title: data.title || "Success",
      message: data.message || "",
    });
  };

  const navigate = (next) => {
    setLoading(true);
    setMobileOpen(false);

    setTimeout(() => {
      setPage(next);
      setLoading(false);
    }, 300);
  };

  const currentTicket =
    page.id
      ? tickets.find(
          (ticket) => ticket.id === page.id
        )
      : null;

  const updateTicket = (id, updates) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...updates,
              updated:
                new Date()
                  .toISOString()
                  .split("T")[0],
            }
          : ticket
      )
    );
  };

  const createTicket = (form) => {
    const newTicket = {
      ...form,
      id: `HD-${1000 + tickets.length + 1}`,
      created: new Date()
        .toISOString()
        .split("T")[0],
      updated: new Date()
        .toISOString()
        .split("T")[0],
      sla: 10,
      comments: [],
      activity: [
        {
          text: "Ticket created",
          time: new Date().toLocaleString(),
        },
      ],
    };

    setTickets((prev) => [
      newTicket,
      ...prev,
    ]);

    showToast({
      type: "success",
      title: "Ticket Created",
      message: `${newTicket.id} has been created successfully.`,
    });

    navigate({
      name: "ticket-view",
      id: newTicket.id,
    });
  };

  const saveEditedTicket = (form) => {
    updateTicket(form.id, form);

    showToast({
      type: "success",
      title: "Ticket Updated",
      message: `${form.id} has been updated.`,
    });

    navigate({
      name: "ticket-view",
      id: form.id,
    });
  };

  const confirmDelete = () => {
    if (!deleteId) return;

    const deleted = tickets.find(
      (ticket) => ticket.id === deleteId
    );

    setTickets((prev) =>
      prev.filter(
        (ticket) => ticket.id !== deleteId
      )
    );

    setDeleteId(null);

    showToast({
      type: "success",
      title: "Ticket Deleted",
      message: `${deleted?.id || "Ticket"} was deleted.`,
    });

    navigate({ name: "tickets" });
  };

  const assignTicket = () => {
    if (!assignId) return;

    updateTicket(assignId, {
      agent: selectedAgent,
    });

    setAssignId(null);

    showToast({
      type: "success",
      title: "Ticket Assigned",
      message: `Ticket assigned to ${selectedAgent}.`,
    });
  };

  const updateStatus = (id, status) => {
    updateTicket(id, {
      status,
      activity: [
        ...(tickets.find(
          (ticket) => ticket.id === id
        )?.activity || []),
        {
          text: `Status changed to ${status}`,
          time: new Date().toLocaleString(),
        },
      ],
    });

    showToast({
      type: "success",
      title: "Status Updated",
      message: `Ticket status changed to ${status}.`,
    });
  };

  const addComment = (id, text) => {
    const ticket = tickets.find(
      (item) => item.id === id
    );

    if (!ticket) return;

    updateTicket(id, {
      comments: [
        ...(ticket.comments || []),
        {
          id: Date.now(),
          user: "Novitha Loganathan",
          text,
          time: "Just now",
        },
      ],
      activity: [
        ...(ticket.activity || []),
        {
          text: "New comment added",
          time: new Date().toLocaleString(),
        },
      ],
    });

    showToast({
      type: "success",
      title: "Reply Sent",
      message: "Your reply was added.",
    });
  };

  const handleRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      showToast({
        type: "success",
        title: "Refreshed",
        message: "Dashboard data is up to date.",
      });
    }, 700);
  };

  const notifications = tickets
    .filter(
      (ticket) =>
        ticket.sla >= 85 ||
        ticket.status === "Open"
    )
    .slice(0, 5)
    .map((ticket, index) => ({
      id: index + 1,
      ticketId: ticket.id,
      title: ticket.id,
      text:
        ticket.sla >= 85
          ? "SLA is approaching its limit"
          : "Ticket requires attention",
      time: "Recently",
    }));

  const pageMeta = {
    dashboard: [
      "Support Dashboard",
      "Overview of your support operations",
    ],
    tickets: [
      "Tickets",
      "Manage and track all support requests",
    ],
    create: [
      "Create Ticket",
      "Create a new customer support request",
    ],
    "ticket-view": [
      "Ticket Details",
      currentTicket?.title ||
        "View support ticket details",
    ],
    "ticket-edit": [
      "Edit Ticket",
      "Update ticket information",
    ],
    agents: [
      "Support Agents",
      "Manage your support team",
    ],
    analytics: [
      "Analytics",
      "Support performance insights",
    ],
    sla: [
      "SLA Monitor",
      "Monitor response time and SLA health",
    ],
    profile: [
      "My Profile",
      "Manage your administrator profile",
    ],
    settings: [
      "Settings",
      "Manage application preferences",
    ],
  };

  const meta =
    pageMeta[page.name] ||
    pageMeta.dashboard;

  const renderPage = () => {
    switch (page.name) {
      case "tickets":
        return (
          <Tickets
            tickets={tickets}
            onNavigate={navigate}
            onDelete={setDeleteId}
            onAssign={setAssignId}
          />
        );

      case "create":
        return (
          <TicketForm
            onSave={createTicket}
            onCancel={() =>
              navigate({ name: "tickets" })
            }
          />
        );

      case "ticket-view":
        return (
          <TicketView
            ticket={currentTicket}
            onBack={() =>
              navigate({ name: "tickets" })
            }
            onEdit={(id) =>
              navigate({
                name: "ticket-edit",
                id,
              })
            }
            onAssign={setAssignId}
            onStatusChange={updateStatus}
            onComment={addComment}
          />
        );

      case "ticket-edit":
        return (
          <TicketForm
            ticket={currentTicket}
            onSave={saveEditedTicket}
            onCancel={() =>
              navigate({
                name: "ticket-view",
                id: currentTicket?.id,
              })
            }
          />
        );

      case "agents":
        return <Agents />;

      case "analytics":
        return <Analytics tickets={tickets} />;

      case "sla":
        return <SLAMonitor tickets={tickets} />;

      case "profile":
        return (
          <Profile
            showToast={showToast}
          />
        );

      case "settings":
        return (
          <Settings
            showToast={showToast}
          />
        );

      case "dashboard":
      default:
        return (
          <Dashboard
            tickets={tickets}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        page={page.name}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="main-area">
        <Topbar
          title={meta[0]}
          subtitle={meta[1]}
          onMenu={() => setMobileOpen(true)}
          onRefresh={handleRefresh}
          refreshing={loading}
          onNew={() =>
            navigate({ name: "create" })
          }
          onNavigate={navigate}
          notifications={notifications}
        />

        <main className="content-area">
          {renderPage()}
        </main>
      </div>

      {loading && (
        <div className="page-loading">
          <div className="loading-card">
            <div className="loading-spinner" />
            <strong>Loading...</strong>
            <span>Please wait</span>
          </div>
        </div>
      )}

     {toast?.message && (
  <Toast
    message={toast.message}
    type={toast.type || "success"}
    onClose={() => setToast(null)}
  />
)}

      <Modal
        open={Boolean(deleteId)}
        title="Delete Ticket"
        onClose={() => setDeleteId(null)}
        width="460px"
      >
        <div className="confirm-content">
          <div className="confirm-icon danger">
            <AlertTriangle size={25} />
          </div>

          <h3>Delete this ticket?</h3>

          <p>
            This action cannot be undone. The
            selected ticket will be permanently
            removed.
          </p>

          <div className="confirm-actions">
            <button
              className="secondary-button"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </button>

            <button
              className="danger-button"
              onClick={confirmDelete}
            >
              Delete Ticket
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={Boolean(assignId)}
        title="Assign Ticket"
        onClose={() => setAssignId(null)}
        width="460px"
      >
        <div className="assign-content">
          <div className="assign-icon">
            <UserPlus size={23} />
          </div>

          <h3>Select Support Agent</h3>

          <p>
            Choose an agent to handle this ticket.
          </p>

          <select
            value={selectedAgent}
            onChange={(e) =>
              setSelectedAgent(e.target.value)
            }
          >
            {agents.map((agent) => (
              <option
                value={agent.name}
                key={agent.id}
              >
                {agent.name}
              </option>
            ))}
          </select>

          <div className="confirm-actions">
            <button
              className="secondary-button"
              onClick={() => setAssignId(null)}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              onClick={assignTicket}
            >
              Assign Ticket
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}