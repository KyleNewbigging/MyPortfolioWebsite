# Portfolio Website Agent Guide

This repo is Kyle Newbigging's portfolio website and the main lightweight test project for Northstar / universe-server agent workflows.

## Project Shape

- Next.js app router lives under `app/`.
- Reusable UI/runtime components live under `components/`.
- Global styling lives in `styles/globals.css`.
- The site is deployed as a static export for GitHub Pages at `/MyPortfolioWebsite`.

## Local Workflow

- Use `npm run dev` for localhost work.
- Use `npm run build` before committing app changes.
- Use `npm run build:pages` before changing deployment or asset paths.
- Keep generated folders out of git: `.next/`, `out/`, `node_modules/`, and npm caches/logs.

## Design Direction

- Preserve the deep-space portfolio theme with the animated canvas starfield.
- Keep the page fast, static-export friendly, and mostly single-page.
- Avoid adding server-only features, API routes, databases, payments, or cloud assumptions.
- Make content edits directly in `app/page.tsx` unless the section grows enough to justify extraction.

## Deployment

- `main` is the source branch.
- `gh-pages` is the branch-backed GitHub Pages output.
- The GitHub Actions workflow can publish the static export once Pages is configured for Actions.
