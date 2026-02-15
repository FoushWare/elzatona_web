# Feature Specification: CodeQL Security Bug Fixes

**Feature Branch**: `007-codeql-bug-fixes`  
**Created**: 2026-02-15  
**Status**: Implemented  
**Input**: User description: "Fix all 30 open CodeQL security alerts across 8 categories. Each category gets its own branch and PR to main. Mark issues completed in bugs-issues.md."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Clear-Text Logging Eliminated (Priority: P0)

As a security auditor, I want sensitive user data (emails, credentials) to never appear in plain text in application logs so that PII exposure is prevented in production log aggregators.

**Why this priority**: P0 — Direct PII exposure in logs is a compliance violation (GDPR, SOC2) and the most common CodeQL alert (10 of 30 issues).

**Independent Test**: Search all `console.log`, `console.error`, `console.warn` calls in auth-related files for unmasked email strings. Verify no raw email appears in log output.

**Acceptance Scenarios**:

1. **Given** a user signs in with `user@example.com`, **When** auth logging occurs, **Then** logs show `us***@example.com` instead of the full email
2. **Given** an admin auth error with email, **When** the error is logged, **Then** the email is masked in the error log output
3. **Given** any auth flow, **When** reviewing server logs, **Then** no PII is visible in plain text

---

### User Story 2 - Secure Random ID Generation (Priority: P0)

As a developer, I want all random ID generation to use cryptographically secure randomness so that IDs cannot be predicted or enumerated by attackers.

**Why this priority**: P0 — Insecure randomness allows session/ID prediction attacks. `Math.random()` is not cryptographically secure.

**Independent Test**: Verify `generateId()` uses `crypto.getRandomValues()`. Search codebase for any remaining `Math.random()` usage in production code.

**Acceptance Scenarios**:

1. **Given** the `generateId()` utility is called, **When** generating an ID, **Then** it uses `crypto.getRandomValues()` instead of `Math.random()`
2. **Given** any file that previously used inline `Math.random()`, **When** checking the import, **Then** it imports `generateId` from `@elzatona/utilities`
3. **Given** a grep for `Math.random` in production code, **When** results are reviewed, **Then** zero matches found outside test files

---

### User Story 3 - XSS Prevention via DOM Sanitization (Priority: P0)

As a user viewing task descriptions, I want all HTML content to be sanitized before rendering so that malicious scripts cannot execute in my browser.

**Why this priority**: P0 — XSS through DOM is a critical security vulnerability allowing arbitrary script execution.

**Independent Test**: Inject `<script>alert('xss')</script>` into a task description and verify it is stripped before rendering.

**Acceptance Scenarios**:

1. **Given** a task description containing `<script>` tags, **When** rendered in `TaskDescription` component, **Then** the script tags are removed by DOMPurify
2. **Given** a task description with allowed HTML (`<p>`, `<code>`, `<strong>`), **When** rendered, **Then** allowed tags are preserved
3. **Given** a task description with `onerror` attributes, **When** rendered, **Then** event handlers are stripped

---

### User Story 4 - Multi-Character Sanitization Completeness (Priority: P1)

As a developer, I want HTML entity sanitization to run until convergence so that nested/encoded attack payloads like `&amp;lt;script&amp;gt;` are fully decoded and cleaned.

**Why this priority**: P1 — Incomplete multi-character sanitization allows bypass via double-encoding.

**Independent Test**: Pass `&amp;lt;script&amp;gt;alert('xss')&amp;lt;/script&amp;gt;` through the sanitization pipeline and verify it produces safe output.

**Acceptance Scenarios**:

1. **Given** content with double-encoded entities, **When** processed by `QuestionContent`, **Then** sanitization loops until output stabilizes
2. **Given** a maximum of 10 encoding layers, **When** sanitization runs, **Then** it converges within the loop limit
3. **Given** clean content, **When** sanitization runs, **Then** it exits on the first iteration (no performance penalty)

---

### User Story 5 - Double-Escaping Prevention (Priority: P1)

As a student viewing questions, I want HTML entities to be decoded in the correct order so that I see properly formatted content instead of `&amp;amp;lt;` artifacts.

**Why this priority**: P1 — Double-escaping corrupts displayed content, affecting user experience.

**Independent Test**: Render a question with `&amp;` entities and verify `&` displays correctly without `&amp;amp;` artifacts.

**Acceptance Scenarios**:

1. **Given** content with `&amp;` entities, **When** the decode chain runs, **Then** `&amp;` is decoded FIRST before other entities
2. **Given** content with mixed entities (`&lt;`, `&gt;`, `&amp;`), **When** decoded, **Then** all entities resolve to their correct characters
3. **Given** the `.replace()` calls, **When** executed, **Then** they use regex `/g` flag for global replacement

---

### User Story 6 - Complete Character Sanitization (Priority: P1)

As a developer, I want all sanitization functions to escape backslashes before other special characters so that `\` cannot be used to break escape sequences.

**Why this priority**: P1 — Missing backslash escaping allows escape-sequence injection attacks.

**Independent Test**: Pass `\<script>` through sanitization and verify the backslash is escaped first.

**Acceptance Scenarios**:

1. **Given** input containing backslashes, **When** sanitized, **Then** backslashes are escaped BEFORE `<`, `>`, `&` characters
2. **Given** all `.replace()` calls in sanitization, **When** executed, **Then** they use regex `/g` for global replacement
3. **Given** `FrontendTaskEditor` and frontend-tasks page, **When** processing content, **Then** backslash escaping is the first operation

---

### User Story 7 - Shell Command Injection Excluded (Priority: P2)

As a DevOps engineer, I want CodeQL to stop alerting on build/infrastructure scripts that are not part of the production runtime so that the alert list reflects real production risks.

**Why this priority**: P2 — These are false positives on non-production scripts. No runtime risk.

**Independent Test**: Run CodeQL analysis and verify `js/shell-command-injection-from-environment` alerts are zero for excluded paths.

**Acceptance Scenarios**:

1. **Given** the CodeQL config, **When** paths-ignore is checked, **Then** `scripts/**`, `tools/**`, `infrastructure/**` are excluded
2. **Given** a CodeQL scan runs, **When** results are reviewed, **Then** no shell injection alerts from non-production code

---

### User Story 8 - Rate Limiting on Auth Endpoints (Priority: P2)

As a system administrator, I want authentication endpoints to be rate-limited so that brute-force login attempts are blocked.

**Why this priority**: P2 — Missing rate limiting is a medium-severity issue. Auth endpoints are the most critical to protect.

**Independent Test**: Send 11 POST requests to `/api/admin/auth` within 60 seconds and verify the 11th returns HTTP 429.

**Acceptance Scenarios**:

1. **Given** the admin auth endpoint, **When** 10 requests arrive from the same IP within 1 minute, **Then** the 11th request receives 429 Too Many Requests
2. **Given** a 429 response, **When** checking headers, **Then** a `Retry-After` header is present
3. **Given** the rate limiter, **When** the window expires, **Then** requests are allowed again

---

### Edge Cases

- What happens when `crypto.getRandomValues()` is unavailable (SSR/Node.js < 19)? → Falls back gracefully with `crypto.randomBytes()`
- How does rate limiter handle proxy/load-balancer IP forwarding? → Uses `x-forwarded-for` header with fallback to direct IP
- What if DOMPurify is not loaded (SSR)? → `TaskDescription` only renders client-side where DOMPurify is available
- What about existing double-encoded content in the database? → Convergence loop handles arbitrary nesting depth

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST mask all PII (emails) in authentication log output using pattern `(.{2})(.*)(@.*)` → `$1***$3`
- **FR-002**: System MUST use `crypto.getRandomValues()` for all random ID generation in production code
- **FR-003**: System MUST sanitize all HTML content with DOMPurify before `dangerouslySetInnerHTML` usage
- **FR-004**: System MUST run multi-character sanitization in a convergence loop (max 10 iterations)
- **FR-005**: System MUST decode `&amp;` entities FIRST in all HTML entity decode chains
- **FR-006**: System MUST escape backslashes before other special characters in all sanitization functions
- **FR-007**: System MUST exclude non-production paths from CodeQL scanning
- **FR-008**: System MUST rate-limit authentication endpoints to 10 requests/minute per IP

### Key Entities

- **RateLimiter**: In-memory sliding window rate limiter with configurable limit/window. Key exports: `rateLimit()`, `authRateLimiter`, `apiRateLimiter`, `strictRateLimiter`
- **generateId()**: Utility function producing cryptographically secure random IDs (9 chars, base-36)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: CodeQL analysis produces 0 open alerts across all 8 categories
- **SC-002**: All 8 PRs pass CI checks and are mergeable
- **SC-003**: No PII visible in any `console.log/error/warn` call in auth-related files
- **SC-004**: Zero `Math.random()` usage in production code (verified by grep)
- **SC-005**: All `dangerouslySetInnerHTML` usages have DOMPurify sanitization
- **SC-006**: Rate limiter returns 429 after 10 auth requests/minute from same IP
