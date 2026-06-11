import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = new URL("..", import.meta.url).pathname;
const tmp = mkdtempSync(join(tmpdir(), "crm-adapter-kit-pack-"));

execFileSync("npm", ["pack", "--pack-destination", tmp], { cwd: root, stdio: "inherit" });
const app = join(tmp, "app");
const tarball = readdirSync(tmp).find((name) => /^crm-adapter-kit-.*\.tgz$/.test(name));
if (!tarball) throw new Error("npm pack did not create a crm-adapter-kit tarball");
mkdirSync(app);
execFileSync("npm", ["init", "-y"], { cwd: app, stdio: "ignore" });
execFileSync("npm", ["install", join(tmp, tarball)], { cwd: app, stdio: "inherit" });

const fixture = join(app, "crm.json");
writeFileSync(fixture, JSON.stringify({
  contacts: [{ id: "c_1", name: "Ada Lovelace", email: "ada@example.com" }],
  accounts: [],
  deals: []
}));

const help = execFileSync("npx", ["crm-adapter-kit", "--help"], { cwd: app, encoding: "utf8" });
if (!help.includes("crm-adapter-kit <summary|list-contacts|plan-task>")) {
  throw new Error("installed CLI help did not match expected usage");
}

const out = execFileSync("npx", ["crm-adapter-kit", "summary", "--adapter", fixture], { cwd: app, encoding: "utf8" });
if (!out.includes('"contacts": 1')) {
  throw new Error("installed CLI summary smoke failed");
}

const api = execFileSync("node", ["--input-type=module", "-e", "import { summarizeCrm } from 'crm-adapter-kit'; console.log(JSON.stringify(summarizeCrm({contacts:[{}],accounts:[],deals:[]})))"], { cwd: app, encoding: "utf8" });
if (!api.includes('"contacts":1')) {
  throw new Error("installed package export smoke failed");
}

console.log("package smoke ok");
