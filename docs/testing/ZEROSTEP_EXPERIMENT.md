# ZeroStep Evaluation For Admin Playwright

ZeroStep can be tried here, but it should stay isolated from the core admin E2E suite.

Why keep it isolated:

- The current admin tests need deterministic selectors for CI stability.
- ZeroStep adds an AI dependency and external model behavior on top of Playwright.
- It is better suited for exploratory flows and authoring assistance than for required PR checks.

Recommended rollout:

- Keep the main suite on explicit selectors and `data-testid` hooks.
- Add ZeroStep in a separate experimental spec file or local-only script.
- Use it first for non-blocking smoke coverage and authoring prototypes.

Suggested experiment path:

- Install the package only after confirming the exact package name/version to use in this repo.
- Gate experimental specs behind an opt-in env var such as `ENABLE_ZEROSTEP=true`.
- Do not add ZeroStep-backed specs to required CI checks until they prove stable over multiple runs.

Candidate use cases in this repo:

- Exploratory admin flows where selectors are still evolving.
- Rapid test drafting before converting stable steps to standard Playwright locators.
- Local debugging of complex modal or editor interactions.
