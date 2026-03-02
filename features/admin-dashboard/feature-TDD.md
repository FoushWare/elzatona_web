# TDD: Admin Dashboard

## Architecture

The Admin Dashboard Architecture relies on a central API endpoint and reusable UI components.

- **Data Aggregator**: `GET /api/admin/dashboard-stats` aggregates metadata (counts) from multiple content repositories.
- **Componentized View**: The dashboard UI uses a modular "Card" system to display different metrics independently.

## Data Integration

### Aggregation Logic:

- **Questions**: `QuestionRepository.findAll()` -> Returns `PaginatedResult.meta.total`.
- **Learning Cards**: `LearningCardRepository.findAll()` -> Returns `PaginatedResult.meta.total`.
- **Learning Plans**: `PlanRepository.findAll()` -> Returns `PaginatedResult.meta.total` (using `plan_cards` table).
- **Users**: `UserRepository.findByRole("admin")` -> Returns `PaginatedResult.meta.total` (using `admin_users` table).
- **Categories/Topics**: Respective repository `getAll*` methods.

## Optimization Details

- **Parallel Fetching**: Use `Promise.all` to fetch statistics concurrently and reduce overall API latency.
- **Service Role Bypass**: Statistics fetching should bypass RLS where appropriate to ensure an accurate global count for administrators.

## Error Handling

- **Database Resilience**: If an individual table is missing or renamed, the repository should catch the error and the API should return a "0" or a descriptive error for that specific metric without failing the entire dashboard view.
