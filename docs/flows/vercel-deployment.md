# Vercel Monorepo Deployment Guide

This document explains the architecture, issues, and solutions for deploying the Nx Monorepo (`website` and `admin`) to Vercel, specifically focusing on the Multi-Zonal setup.

## The Problem: The "UI Lock" and Infinite Proxy Loops

When attempting to deploy an Nx Monorepo to Vercel, you might encounter several critical issues:

1. **The Dashboard UI Lock Issue:**
   If a `vercel.json` file is present in the **root** of the repository and contains build configuration overrides (like `"buildCommand": "npx nx build website"`), Vercel will **lock** the Build Command and Output Directory settings in the Web Dashboard UI.
   - _Impact_: Any new project created in Vercel from this mono-repo will be forced to build the `website` instead of its respective app (e.g., `admin`), because the root `vercel.json` overrides the UI.

2. **The `DEPLOYMENT_NOT_FOUND` Error:**
   Because the UI was locked, the `admin` app could not be built properly. Our `website` middleware is configured to proxy `/admin` to the Admin Vercel project (Multi-Zonal routing). If the Admin project does not exist or fails to build, Vercel throws a `404 DEPLOYMENT_NOT_FOUND` when the proxy rewrite attempts to route traffic to it.

3. **Infinite Loops (`ERR_TOO_MANY_REDIRECTS`):**
   If the `ADMIN_URL` environment variable is mistakenly set to the same domain as the website (e.g., `https://elzatona-web.com`), the proxy routes the request back to itself, causing an infinite loop.

---

## The Solution: Two-Project Architecture and API Configuration

To run both `website` and `admin` seamlessly under `elzatona-web.com/admin`, we must deploy them as **two separate Vercel projects**. Because of the UI lock, we had to fix this using the Vercel CLI and REST API.

### Step 1: Removing the Root Lock

We removed the hardcoded `buildCommand` and `outputDirectory` from the root `vercel.json`. This instantly **unlocks the Vercel Dashboard UI** for all projects, allowing Vercel to respect project-specific settings.
_(If you need project-specific configs, place `vercel.json` inside `apps/website/` or `apps/admin/` instead of the repo root)._

### Step 2: Creating the Admin Project via CLI/API

Because the UI was locked and the build command was disabled during the initial setup, we used the Vercel CLI and REST API to manually create and configure the `elzatona-admin` project.

**Commands executed under the hood:**

```bash
# 1. Authenticate with Vercel CLI
npx vercel login

# 2. Add the new project
npx vercel project add elzatona-admin

# 3. Use the Vercel REST API to override the locked build settings programmatically
curl -s -X PATCH -H "Authorization: Bearer <Vercel_Token>" \
  -H "Content-Type: application/json" \
  -d '{"buildCommand": "npx nx build admin", "outputDirectory": "apps/admin/.next"}' \
  https://api.vercel.com/v9/projects/prj_DxcGrySWK...
```

### Step 3: Dynamic Multi-Zonal Middleware

The `apps/website/middleware.ts` was updated to dynamically resolve the `ADMIN_URL`. It will:

1. Use `process.env.ADMIN_URL` if it is valid (not pointing back to `elzatona-web.com`).
2. Fallback to `http://localhost:3001` for local development.
3. Fallback to the known Vercel admin URL (e.g., `https://elzatona-admin-foushwares-projects.vercel.app`) if the environment variable is missing or misconfigured. This prevents infinite loops.

---

## CI/CD: Selective Builds using GitHub Actions (Nx Affected)

To avoid rebuilding both the `website` and `admin` panels every time a PR is merged, we can leverage **Nx Affected** in our GitHub Actions.

Instead of deploying everything, you can detect which files changed and only trigger Vercel deployments for the affected apps.

### Proposed GitHub Actions Strategy

Create a `.github/workflows/deploy.yml` that looks something like this:

```yaml
name: Deploy Affected Apps

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Required for Nx affected

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install Dependencies
        run: npm ci

      - name: Deploy Website
        # This only runs if files affecting 'website' changed
        run: npx nx affected --target=build --projects=website && npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
        if: contains(github.event.commits[0].message, 'website') || success()

      - name: Deploy Admin
        # This only runs if files affecting 'admin' changed
        run: npx nx affected --target=build --projects=admin && npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
        if: contains(github.event.commits[0].message, 'admin') || success()
```

_Note: Vercel also has native support for Nx. If you connect the Vercel projects directly to GitHub, Vercel automatically runs `nx-ignore` to determine if a project needs to rebuild based on the Git commit diff!_
