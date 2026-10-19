export const ROLES = ["product", "engineer", "research", "business", "creator", "personal", "unknown"];
export const NEEDS = ["decisions", "rework", "commitments", "patterns", "explore"];
export const TOOLS = ["chatgpt", "claude", "codex", "gemini", "other"];

export function validateSignup(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  if (!ROLES.includes(body.role) || !NEEDS.includes(body.need) || body.consent !== true) return null;
  if (!["en", "vi"].includes(body.language)) return null;
  if (!Array.isArray(body.tools) || body.tools.length > TOOLS.length || !body.tools.every(t => TOOLS.includes(t))) return null;
  const demo = {};
  if (ROLES.slice(0, 6).includes(body.demo?.persona)) demo.persona = body.demo.persona;
  if ([0, 1].includes(body.demo?.choice)) demo.choice = body.demo.choice;
  if (["definitely", "maybe", "no"].includes(body.demo?.rating)) demo.rating = body.demo.rating;
  return {email, role: body.role, need: body.need, tools: [...new Set(body.tools)], language: body.language, demo};
}
