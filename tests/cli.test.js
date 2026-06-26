import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const cli = fileURLToPath(new URL("../bin/cli.js", import.meta.url));
const fixture = fileURLToPath(new URL("../fixtures/sample.json", import.meta.url));

async function runCli(args) {
  try {
    const result = await execFileAsync(process.execPath, [cli, ...args]);
    return { code: 0, ...result };
  } catch (error) {
    return {
      code: error.code,
      stdout: error.stdout,
      stderr: error.stderr
    };
  }
}

test("prints help for the published CLI", async () => {
  const result = await runCli(["--help"]);

  assert.equal(result.code, 0);
  assert.match(result.stdout, /crm-adapter-kit <summary\|list-contacts\|plan-task>/);
  assert.equal(result.stderr, "");
});

test("summarizes the sample CRM fixture through the CLI", async () => {
  const result = await runCli(["summary", "--adapter", fixture]);

  assert.equal(result.code, 0);
  assert.deepEqual(JSON.parse(result.stdout), { contacts: 2, accounts: 2, deals: 1 });
});

test("plans dry-run tasks through the CLI", async () => {
  const result = await runCli(["plan-task", "--adapter", fixture, "--contact", "Ada", "--follow-up", "Send deck"]);

  assert.equal(result.code, 0);
  const plan = JSON.parse(result.stdout);
  assert.equal(plan.type, "task.create");
  assert.equal(plan.mode, "dry-run");
  assert.equal(plan.safeToApply, false);
});

test("rejects network adapter paths without a stack trace", async () => {
  const result = await runCli(["summary", "--adapter", "https://example.invalid/data.json"]);

  assert.equal(result.code, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /adapter must be local/);
  assert.doesNotMatch(result.stderr, /at .*bin\/cli\.js/);
});
