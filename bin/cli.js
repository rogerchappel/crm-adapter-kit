#!/usr/bin/env node
import { loadCrmFixture, listContacts, planTask, summarizeCrm } from "../src/index.js";
import { requireLocalPath } from "../src/safety.js";
const args = process.argv.slice(2);
if (args.includes("--help") || args.length === 0) {
  console.log("Usage: crm-adapter-kit <summary|list-contacts|plan-task> --adapter fixtures/sample.json [--query name] [--contact name] [--follow-up text]");
  process.exit(0);
}
const get = (flag, fallback = "") => args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback;
const cmd = args[0];
const data = loadCrmFixture(requireLocalPath(get("--adapter", "fixtures/sample.json"), "adapter"));
if (cmd === "summary") console.log(JSON.stringify(summarizeCrm(data), null, 2));
else if (cmd === "list-contacts") console.log(JSON.stringify(listContacts(data, get("--query")), null, 2));
else if (cmd === "plan-task") console.log(JSON.stringify(planTask(data, get("--contact"), get("--follow-up")), null, 2));
else throw new Error(`unknown command: ${cmd}`);
