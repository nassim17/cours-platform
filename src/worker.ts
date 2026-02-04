interface Env {
  ASSETS?: any;
}

function req(url: URL, path: string, original: Request) {
  return new Request(new URL(path, url.origin), original);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (!env.ASSETS) {
      return new Response(
        "Preview mode: ASSETS binding is not available here. Use 'Visit' to test.",
        { status: 200 },
      );
    }

    const url = new URL(request.url);

    // Serve direct asset
    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404) return direct;

    // SPA fallback (EN)
    if (url.pathname === "/en" || url.pathname.startsWith("/en/")) {
      return env.ASSETS.fetch(req(url, "/en/index.html", request));
    }

    // SPA fallback (FR root)
    return env.ASSETS.fetch(req(url, "/index.html", request));
  },
};
