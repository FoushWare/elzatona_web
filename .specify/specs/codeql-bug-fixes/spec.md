# Feature Specification: CodeQL Security Bug Fixes

**Feature Branch**: `fix/codeql-*` (8 branches, one per category)
**Created**: 2026-02-15
**Status**: In Progress
**Input**: 30 open CodeQL issues labeled "bugs" (#7480–#7509)

## Overview

Fix all 30 open CodeQL security and quality alerts across 8 categories. Each category gets its own branch from `main` and a separate PR back to `main`.

## User Scenarios & Testing

### User Story 1 - Eliminate Clear-Text Logging (Priority: P0)

Passwords and emails are logged in plaintext in auth flows, risking credential exposure in log aggregators.

**Acceptance Scenarios**:

1. **Given** a user signs in, **When** auth runs, **Then** no password/email appears in console output
2. **Given** admin auth fails, **When** error is logged, **Then** email is masked (e.g., `a***@example.com`)

**Issues**: #7500–#7509

---

### User Story 2 - Replace Insecure Randomness (Priority: P0)

`Math.random()` is used for ID generation (users, questions, audit logs, sessions), making IDs predictable.

**Acceptance Scenarios**:

1. **Given** `generateId()` is called, **When** it runs, **Then** it uses `crypto.getRandomValues()` or `crypto.randomUUID()`
2. **Given** any security-context ID generation, **When** checked, **Then** no `Math.random()` is used

**Issues**: #7497–#7498

---

### User Story 3 - Fix XSS Through DOM (Priority: P1)

Components use `dangerouslySetInnerHTML` — CodeQL flags the sink even though DOMPurify is applied upstream.

**Acceptance Scenarios**:

1. **Given** HTML content is rendered, **When** `dangerouslySetInnerHTML` is used, **Then** content passes through DOMPurify first
2. **Given** the sanitization path, **When** CodeQL scans, **Then** no XSS-through-DOM alerts fire

**Issues**: #7492–#7494

---

### User Story 4 - Fix Incomplete Multi-Character Sanitization (Priority: P1)

Single-pass `<script>` tag removal can be bypassed with nested tags like `<scr<script>ipt>`.

**Acceptance Scenarios**:

1. **Given** user input with nested `<script>` tags, **When** sanitized, **Then** all script tags are removed
2. **Given** sanitization runs, **When** input is `<scr<script>ipt>`, **Then** output contains no `<script>` tag

**Issues**: #7480–#7483

---

### User Story 5 - Fix Double-Escaping (Priority: P2)

HTML entity decoding chain decodes `&amp;` last, causing double-unescaping of previously decoded entities.

**Acceptance Scenarios**:

1. **Given** content with `&amp;lt;`, **When** decoded, **Then** result is `&lt;` (not `<`)
2. **Given** decode chain runs, **When** `&amp;` is decoded, **Then** it happens before `&lt;`/`&gt;`

**Issues**: #7488–#7491

---

### User Story 6 - Fix Incomplete Sanitization (Priority: P2)

`.replace()` calls without `/g` flag only replace the first occurrence; backslash escaping is missing.

**Acceptance Scenarios**:

1. **Given** content with multiple special chars, **When** sanitized, **Then** ALL occurrences are replaced
2. **Given** input with backslashes, **When** escaped, **Then** backslashes are also escaped

**Issues**: #7484–#7487

---

### User Story 7 - Fix Shell Command Injection (Priority: P2)

Environment variables used in shell commands without validation. **Note**: No production code affected — only build scripts.

**Issues**: #7495–#7496

---

### User Story 8 - Add Rate Limiting (Priority: P3)

API route handlers lack rate limiting, exposing them to DoS attacks.

**Acceptance Scenarios**:

1. **Given** an API endpoint, **When** >100 requests/min from same IP, **Then** returns 429 Too Many Requests
2. **Given** rate limiter middleware, **When** applied to auth routes, **Then** brute force is prevented

**Issues**: #7499

## Requirements

### Functional Requirements

- **FR-001**: System MUST NOT log passwords, tokens, or full emails in plaintext
- **FR-002**: System MUST use cryptographic randomness for all ID generation
- **FR-003**: System MUST sanitize all HTML before rendering with `dangerouslySetInnerHTML`
- **FR-004**: System MUST use iterative/loop-based tag stripping (not single-pass regex)
- **FR-005**: System MUST decode `&amp;` before other HTML entities
- **FR-006**: System MUST use global flag (`/g`) on all sanitization replacements
- **FR-007**: System MUST validate environment variables before shell command use
- **FR-008**: System MUST rate-limit all public API endpoints

## Success Criteria

- **SC-001**: All 30 CodeQL alerts resolve after fixes are merged
- **SC-002**: No new CodeQL alerts introduced
- **SC-003**: All existing tests pass after each fix
- **SC-004**: SonarQube quality gate: PASS
