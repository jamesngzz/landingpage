// Server-only HTTPS RPC: no database password or service key reaches the browser.
export async function saveSupabaseSignup(input, config, requestFetch = fetch) {
  if (!config.url || !config.key) throw new Error("supabase_not_configured");
  const origin = new URL(config.url);
  if (origin.protocol !== "https:" || origin.username || origin.password || origin.pathname !== "/") throw new Error("invalid_supabase_url");
  const headers = {"Content-Type":"application/json", apikey:config.key};
  // Legacy service_role keys are JWTs; modern secret API keys use apikey only.
  if (config.key.startsWith("eyJ")) headers.Authorization = `Bearer ${config.key}`;
  const response = await requestFetch(new URL("/rest/v1/rpc/wizzdom_capture_beta", origin), {
    method:"POST", headers, body:JSON.stringify({payload:input}), signal:AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`supabase_write_${response.status}`);
  const result = await response.json();
  if (result?.ok !== true) throw new Error("supabase_write_unconfirmed");
}
