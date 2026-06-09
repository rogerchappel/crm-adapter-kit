import { readFileSync } from "node:fs";
import { markDryRun } from "./safety.js";

export function loadCrmFixture(path) {
  const data = JSON.parse(readFileSync(path, "utf8"));
  return { contacts: data.contacts || [], accounts: data.accounts || [], deals: data.deals || [] };
}

export function listContacts(data, query = "") {
  const q = query.toLowerCase();
  return data.contacts.filter((c) => !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
}

export function findAccount(data, name) {
  return data.accounts.find((a) => a.name.toLowerCase() === String(name).toLowerCase()) || null;
}

export function planTask(data, contactName, followUp) {
  const contact = listContacts(data, contactName)[0];
  if (!contact) throw new Error(`contact not found: ${contactName}`);
  return markDryRun({ type: "task.create", contactId: contact.id, title: followUp, rationale: "Prepared from local fixture only" });
}

export function summarizeCrm(data) {
  return { contacts: data.contacts.length, accounts: data.accounts.length, deals: data.deals.length };
}
