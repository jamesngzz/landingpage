import test from "node:test";
import assert from "node:assert/strict";
import { validateSignup } from "../lib/signup-validation.mjs";

const valid = {email: " Test@Example.com ", role: "product", need: "decisions", tools: ["chatgpt", "claude"], language: "en", consent: true, demo: {persona: "engineer", choice: 1, rating: "maybe"}};
test("normalises email, bounds profile and keeps only declared demo signals", () => {
  const result = validateSignup({...valid, tools: ["claude", "claude"], demo: {...valid.demo, secret: "not retained"}});
  assert.equal(result.email, "test@example.com");
  assert.deepEqual(result.tools, ["claude"]);
  assert.equal(result.demo.secret, undefined);
});
test("allows skipping the quick questions", () => assert(validateSignup({...valid, role: "unknown", need: "explore", tools: []})));
for (const bad of [null, [], {...valid, email: "bad"}, {...valid, role: "injected"}, {...valid, need: "unbounded"}, {...valid, tools: ["injected"]}, {...valid, tools: "chatgpt"}, {...valid, consent: false}, {...valid, language: "x"}, {...valid, email: "a".repeat(255)+"@example.com"}]) {
  test("rejects malformed or unconsented input " + JSON.stringify(bad)?.slice(0,70), () => assert.equal(validateSignup(bad), null));
}
