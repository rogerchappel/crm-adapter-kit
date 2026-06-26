#!/usr/bin/env node
import { loadCrmFixture, listContacts, planTask, summarizeCrm } from "../src/index.js";
import { requireLocalPath } from "../src/safety.js";

function usage() {
  return "Usage: crm-adapter-kit <summary|list-contacts|plan-task> --adapter fixtures/sample.json [--query name] [--contact name] [--follow-up text]";
}

export function main(args) {
  if (args.includes("--help") || args.length === 0) {
    console.log(usage());
    return;
  }

  const get = (flag, fallback = "") => args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback;
  const cmd = args[0];
  if (!["summary", "list-contacts", "plan-task"].includes(cmd)) throw new Error(`unknown command: ${cmd}`);

  const data = loadCrmFixture(requireLocalPath(get("--adapter", "fixtures/sample.json"), "adapter"));
  if (cmd === "summary") console.log(JSON.stringify(summarizeCrm(data), null, 2));
  if (cmd === "list-contacts") console.log(JSON.stringify(listContacts(data, get("--query")), null, 2));
  if (cmd === "plan-task") console.log(JSON.stringify(planTask(data, get("--contact"), get("--follow-up")), null, 2));
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
