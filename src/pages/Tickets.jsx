import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
} from "lucide-react";
import TicketTable from "../components/TicketTable";
import Pagination from "../components/Pagination";

export default function Tickets({
  tickets,
  onNavigate,
  onDelete,
  onAssign,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const perPage = 5;

  const filtered = useMemo(() => {
    let result = [...tickets];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (ticket) =>
          ticket.id.toLowerCase().includes(value) ||
          ticket.title.toLowerCase().includes(value) ||
          ticket.customer.toLowerCase().includes(value) ||
          ticket.agent.toLowerCase().includes(value)
      );
    }

    if (status !== "All") {
      result = result.filter(
        (ticket) => ticket.status === status
      );
    }

    if (priority !== "All") {
      result = result.filter(
        (ticket) => ticket.priority === priority
      );
    }

    if (category !== "All") {
      result = result.filter(
        (ticket) => ticket.category === category
      );
    }

    if (sort === "priority") {
      const order = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4,
      };

      result.sort(
        (a, b) =>
          order[a.priority] - order[b.priority]
      );
    }

    if (sort === "sla") {
      result.sort((a, b) => b.sla - a.sla);
    }

    if (sort === "oldest") {
      result.reverse();
    }

    return result;
  }, [
    tickets,
    search,
    status,
    priority,
    category,
    sort,
  ]);

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const visibleTickets = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setCategory("All");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="page-content">
      <section className="panel">
        <div className="filters-top">
          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search ticket, customer or agent..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            {search && (
              <button
                onClick={() => setSearch("")}
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button className="filter-label">
            <Filter size={17} />
            Filters
          </button>
        </div>

        <div className="filters-row">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Pending</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Priority</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Categories</option>
            <option>Technical</option>
            <option>Billing</option>
            <option>Account</option>
            <option>Product</option>
            <option>General</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="newest">
              Newest First
            </option>
            <option value="oldest">
              Oldest First
            </option>
            <option value="priority">
              Priority
            </option>
            <option value="sla">SLA Risk</option>
          </select>

          <button
            className="clear-filter"
            onClick={clearFilters}
          >
            <ArrowUpDown size={15} />
            Reset
          </button>
        </div>

        <div className="result-info">
          Showing{" "}
          <strong>{visibleTickets.length}</strong>{" "}
          of <strong>{filtered.length}</strong> tickets
        </div>

        <TicketTable
          tickets={visibleTickets}
          onView={(id) =>
            onNavigate({
              name: "ticket-view",
              id,
            })
          }
          onEdit={(id) =>
            onNavigate({
              name: "ticket-edit",
              id,
            })
          }
          onDelete={onDelete}
          onAssign={onAssign}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </section>
    </div>
  );
}