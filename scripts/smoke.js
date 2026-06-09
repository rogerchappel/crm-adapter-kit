import { execFileSync } from "node:child_process";
const out = execFileSync("node", ["bin/cli.js", "summary", "--adapter", "fixtures/sample.json"], { encoding: "utf8" });
if (!out.includes('"contacts": 2')) throw new Error("CRM smoke failed");
console.log("smoke ok");
