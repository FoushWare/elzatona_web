

UPDATE questions 
SET options = '[{"id":"o1","text":"Proactive monitoring aims to detect issues before users are impacted","isCorrect":true,"explanation":""},{"id":"o2","text":"Reactive monitoring only responds after an issue is reported","isCorrect":true,"explanation":""},{"id":"o3","text":"Proactive monitoring is not possible for frontend apps","isCorrect":false,"explanation":""},{"id":"o4","text":"Reactive monitoring uses tools like alerts and dashboards","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q140';



UPDATE questions 
SET options = '[{"id":"o1","text":"Unit tests: small, fast, isolated","isCorrect":true,"explanation":""},{"id":"o2","text":"Integration tests: verify modules working together","isCorrect":true,"explanation":""},{"id":"o3","text":"E2E tests: full system flows in browser","isCorrect":true,"explanation":""},{"id":"o4","text":"E2E tests should replace unit tests","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q151';



UPDATE questions 
SET options = '[{"id":"o1","text":"Cypress: developer-friendly, great debugging UX","isCorrect":true,"explanation":""},{"id":"o2","text":"Playwright: cross-browser automation and parallelism","isCorrect":true,"explanation":""},{"id":"o3","text":"Selenium: mature but heavier and more complex to manage","isCorrect":true,"explanation":""},{"id":"o4","text":"None of the above are used for E2E","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q154';



UPDATE questions 
SET options = '[{"id":"o1","text":"Run lint and unit tests locally before PR","isCorrect":true,"explanation":""},{"id":"o2","text":"Run full E2E suite in CI (not required for every local dev run)","isCorrect":true,"explanation":""},{"id":"o3","text":"Skip build step in CI","isCorrect":false,"explanation":""},{"id":"o4","text":"Run heavy integration tests only in CI pipelines","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q156';



UPDATE questions 
SET options = '[{"id":"o1","text":"Fail CI build on critical lint or test failures","isCorrect":true,"explanation":""},{"id":"o2","text":"Block merge unless coverage meets threshold (e.g., >80%)","isCorrect":true,"explanation":""},{"id":"o3","text":"Ignore E2E failures permanently","isCorrect":false,"explanation":""},{"id":"o4","text":"Publish test reports and comments on PR for visibility","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q160';