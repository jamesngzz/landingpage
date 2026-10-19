import landing from "../index.html?raw";

export function GET() {
  return new Response(landing, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
