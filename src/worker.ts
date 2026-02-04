interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // 1) tenter de servir l’asset tel quel
      const res = await env.ASSETS.fetch(request);
      if (res.status !== 404) return res;

      // 2) fallback SPA :
      const url = new URL(request.url);
      const fallback = url.pathname.startsWith("/en/")
        ? "/en/index.html"
        : "/index.html";
      return env.ASSETS.fetch(
        new Request(new URL(fallback, url.origin), request),
      );
    } catch (e: any) {
      // évite l’erreur 1101, et te donne un message utile
      return new Response(`Worker error:\n${e?.stack || e}`, { status: 500 });
    }
  },
};
