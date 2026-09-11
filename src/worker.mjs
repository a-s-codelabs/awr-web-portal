const BACKEND_ORIGIN = 'https://asuniquegroup.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      const target = new URL(url.pathname + url.search, BACKEND_ORIGIN);
      return fetch(new Request(target.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};
