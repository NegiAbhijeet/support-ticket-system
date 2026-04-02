"use client";
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  tags: string[];
  createdAt: string;
}

const TicketPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/tickets");
      setTickets(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const data = await apiFetch("/tickets", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ title: "", description: "" });
      setTickets([data, ...tickets]);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Raise a Ticket</h2>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Ticket"}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>

      <h2 className="text-lg font-semibold mb-4">All Tickets</h2>
      {loading ? (
        <div>Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <div>No tickets found.</div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-1">
                <div className="font-bold text-blue-700">{ticket.title}</div>
                <span className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</span>
              </div>
              <div className="mb-1 text-gray-800">{ticket.description}</div>
              <div className="mb-1 text-gray-600 italic">Summary: {ticket.summary}</div>
              <div className="mb-1">
                <span className="inline-block bg-gray-200 text-xs px-2 py-1 rounded mr-2">Category: {ticket.category}</span>
                {ticket.tags.map((tag) => (
                  <span key={tag} className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketPage;
