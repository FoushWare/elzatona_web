# Vercel Monorepo Deployment Guide

This document explains the architecture, issues, and solutions for deploying the Nx Monorepo (`website` and `admin`) to Vercel, specifically focusing on the Multi-Zonal setup.

## The Problem: The Missing Admin Project and the "UI Lock"

When attempting to deploy an Nx Monorepo to Vercel, the most common mistake is assuming that connecting the repository once will automatically detect and deploy all applications within it.

**Mistake:** The repository was connected to Vercel, which automatically configured and built `apps/website`. However, **we forgot to create a second, separate Vercel project for the `admin` application.**

Because the `admin` app was never actually deployed, the `website`'s proxy middleware (`elzatona-web.com/admin`) was trying to route traffic to a non-existent deployment, resulting in the following sequence of errors:

1. **The `DEPLOYMENT_NOT_FOUND` Error:**
   When the proxy rewrite attempts to route traffic to the Admin project, Vercel throws a `404 DEPLOYMENT_NOT_FOUND` because the target Vercel project was never created.

2. **Infinite Loops (`ERR_TOO_MANY_REDIRECTS`):**
   If the `ADMIN_URL` environment variable is mistakenly set to the same domain as the website (e.g., `https://elzatona-web.com`) in an attempt to fix the 404, the proxy routes the request back to the website, causing an infinite loop.

3. **The Dashboard UI Lock Issue (The Blocker):**
   To fix this, we needed to create a second Vercel project and change its **Build Command** to `npx nx build admin`. However, **the Vercel Dashboard UI for the Build Command was completely locked and disabled.**
   - _Why?_ There was a `vercel.json` file in the **root** of the repository that hardcoded `"buildCommand": "npx nx build website"`.
   - _Impact:_ Vercel disables the Dashboard UI when code-level configuration overrides are present. This meant _any_ new project created from this repository was forcefully locked into building the website, preventing us from deploying the admin app.

---

## The Solution: Two-Project Architecture and CLI Fixes

To resolve this, we must deploy the apps as **two separate Vercel projects**. Because of the UI lock, we had to fix the configuration using the Vercel CLI and REST API.

### Step 1: Install and Authenticate with Vercel CLI

Since the UI was locked, we needed to use the CLI to bypass the dashboard.

```bash
# Install the Vercel CLI globally
npm i -g vercel

# Authenticate with your Vercel account
npx vercel login
```

### Step 2: Removing the Root Lock

We removed the hardcoded `buildCommand` and `outputDirectory` from the root `vercel.json`.

- **This instantly unlocks the Vercel Dashboard UI** for all projects, allowing Vercel to respect project-specific settings configurable in the browser.
  _(Note: If you need project-specific configs in the future, place `vercel.json` inside `apps/website/` or `apps/admin/` instead of the repo root)._

### Step 3: Creating and Configuring the Admin Project via CLI/API

With the UI unlocked in the code, we used the CLI and API to manually create and configure the `elzatona-admin` project.

**Commands executed to bypass the lock and configure the project:**

```bash
# 1. Add the new project to Vercel
npx vercel project add elzatona-admin

# 2. Extract your authorization token from the CLI
cat ~/.vercel/auth.json

# 3. Use the Vercel REST API to explicitly set the build command for this specific project
# Note: Replace <Vercel_Token> and <Project_ID> with your actual values
curl -s -X PATCH -H "Authorization: Bearer <Vercel_Token>" \
  -H "Content-Type: application/json" \
  -d '{"buildCommand": "npx nx build admin", "outputDirectory": "apps/admin/.next"}' \
  https://api.vercel.com/v9/projects/<Project_ID>
```

### Step 4: Dynamic Proxy Middleware

The `apps/website/middleware.ts` handles the `/admin` proxy routing. It dynamically infers local development targets (`localhost:3001`), but in production, it strictly depends on the `ADMIN_URL` environment variable.

- **CRITICAL:** Ensure `ADMIN_URL` in the **website** Vercel project exists and points to the newly created separate Admin project (e.g., `https://elzatona-admin-foushwares-projects.vercel.app`).

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
