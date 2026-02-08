# Path-Based Routing Local CSS Issue

## Issue

When using Next.js rewrites to proxy `/admin` routes from the website app (port 3000) to the admin app (port 3001) in local development, CSS and JS assets for the admin app do not load correctly at `http://localhost:3000/admin/*`. This results in broken UI and console errors about missing or wrong MIME type for static files.

## Cause

Next.js rewrites in local development do not proxy static assets (e.g., `/admin/_next/static/*`) to the admin app. Only HTML requests are proxied, not static files.

## Solution

- **For local development:**
  - Access the admin app directly at `http://localhost:3001/admin`.
  - Access the website at `http://localhost:3000`.
  - Only use path-based routing (`/admin`) in production (e.g., Vercel), where rewrites handle static assets correctly.
- **For production:**
  - Vercel rewrites will correctly proxy both HTML and static assets, so path-based routing will work as expected.
- **Advanced (optional):**
  - Use a local reverse proxy (Nginx, Caddy, or Express) to forward both `/admin` and `/_next/static` requests to the admin app for full local simulation.

## References

- [Next.js docs: Rewrites](https://nextjs.org/docs/app/building-your-application/routing/rewrites)
- [Vercel rewrites and static assets](https://vercel.com/docs/projects/project-configuration#project-configuration/rewrites)
