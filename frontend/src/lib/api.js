// All requests go to /api/* which Vite proxies to the Express backend on port 3001

export const apiFetch = {
  get: (path) =>
    fetch(path, { credentials: 'include' }).then((r) => {
      if (!r.ok) throw new Error(`GET ${path} failed: ${r.status}`);
      return r.json();
    }),

  post: (path, body) =>
    fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then((r) => {
      if (!r.ok) return r.json().then((d) => Promise.reject(d));
      return r.json();
    }),

  patch: (path, body) =>
    fetch(path, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then((r) => {
      if (!r.ok) return r.json().then((d) => Promise.reject(d));
      return r.json();
    }),

  delete: (path) =>
    fetch(path, { method: 'DELETE', credentials: 'include' }).then((r) => {
      if (!r.ok) throw new Error(`DELETE ${path} failed: ${r.status}`);
      return r.json();
    }),

  upload: (file) => {
    const form = new FormData();
    form.append('file', file);
    return fetch('/api/upload', { method: 'POST', credentials: 'include', body: form }).then((r) => {
      if (!r.ok) throw new Error('Upload failed');
      return r.json(); // returns { url }
    });
  },
};
