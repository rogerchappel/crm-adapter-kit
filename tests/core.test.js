import test from "node:test";
import assert from "node:assert/strict";
import { loadCrmFixture, listContacts, planTask, summarizeCrm } from "../src/index.js";

test("loads and summarizes CRM fixture", () => {
  const data = loadCrmFixture("fixtures/sample.json");
  assert.deepEqual(summarizeCrm(data), { contacts: 2, accounts: 2, deals: 1 });
});

test("plans follow-up tasks as dry runs", () => {
  const data = loadCrmFixture("fixtures/sample.json");
  assert.equal(listContacts(data, "Ada").length, 1);
  const plan = planTask(data, "Ada", "Send deck");
  assert.equal(plan.mode, "dry-run");
  assert.equal(plan.safeToApply, false);
});
