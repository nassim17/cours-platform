export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // 1) tente de servir le fichier statique demandé
    const assetResp: Response = await env.ASSETS.fetch(request);

    // 2) si trouvé -> ok
    if (assetResp.status !== 404) return assetResp;

    // 3) fallback SPA : si /en/... -> renvoie /en/index.html
    const url = new URL(request.url);
    const isEn = url.pathname.startsWith("/en/");
    const fallbackPath = isEn ? "/en/index.html" : "/index.html";

    return env.ASSETS.fetch(
      new Request(new URL(fallbackPath, url.origin), request),
    );
  },
};
