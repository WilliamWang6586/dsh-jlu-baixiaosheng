// dsh-jlu-baixiaosheng — 吉林大学百晓生知识库，作为 runtime skill 注册进 DSH 技能目录。
// 纯数据插件：无网络、无子进程，只把随包的 SKILL.md + references/ 提供给会话。
import { readFileSync, readdirSync } from "node:fs";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const NAME = "jlu-baixiaosheng";

/** 读取随包 SKILL.md，拆出 frontmatter 的 description 与正文。 */
export function loadSkill(dir = DIR) {
  const raw = readFileSync(join(dir, "SKILL.md"), "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error("SKILL.md has no YAML frontmatter");
  const desc = m[1].match(/description: >-\r?\n([\s\S]*?)(?=\n[a-z_]+:|$)/);
  const description = desc
    ? desc[1].split(/\r?\n/).map((l) => l.trim()).filter(Boolean).join(" ")
    : "吉林大学百晓生知识库";
  return { name: NAME, description, body: m[2], dir };
}

export const name = "dsh-jlu-baixiaosheng";
export const inject = ["skills"];

export function apply(ctx) {
  const s = loadSkill();
  ctx.skills.register({
    name: s.name,
    description: s.description,
    content: s.body,
    source: "dsh-jlu-baixiaosheng",
    resourceBase: { kind: "directory", path: join(s.dir, "references") },
    invocation: { modelInvocable: true, userInvocable: true },
  });
}

// 自检：node index.js --selftest
if (process.argv.includes("--selftest")) {
  const s = loadSkill();
  assert.match(s.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(s.description.length > 0 && s.description.length <= 500, "catalog description <=500 chars");
  assert.ok(s.body.includes("references/"));
  const refs = readdirSync(join(DIR, "references"));
  assert.equal(refs.length, 38, "references count");
  const mentioned = [...s.body.matchAll(/`([A-Za-z0-9_-]+\.(?:md|txt))`/g)].map((m) => m[1]);
  const missing = [...new Set(mentioned)].filter((f) => !refs.includes(f));
  assert.deepEqual(missing, [], "missing referenced files: " + missing);
  console.log(`SELFTEST OK: ${refs.length} references, description ${s.description.length} chars, ${new Set(mentioned).size} mentions all resolve`);
}
