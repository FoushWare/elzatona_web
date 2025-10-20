# TanStack Query Implementation Guide

This guide explains how to use TanStack Query (React Query) with custom hooks in your Elzatona-web project.

## 🚀 What is TanStack Query?

TanStack Query is a powerful data synchronization library for React that provides:

- **Automatic caching** - Data is cached and shared across components
- **Background updates** - Data stays fresh automatically
- **Optimistic updates** - UI updates immediately, rolls back on error
- **Error handling** - Built-in retry logic and error states
- **Loading states** - Easy loading and error state management
- **DevTools** - Excellent debugging experience

## 📁 Project Structure

```
src/
├── providers/
│   └── QueryProvider.tsx          # TanStack Query provider setup
├── hooks/
│   └── useTanStackQuery.ts        # Custom hooks for all API endpoints
└── components/
    ├── TanStackDashboard.tsx      # Dashboard using TanStack Query
    ├── TanStackContentManagement.tsx # Content management with TanStack Query
    └── TanStackOptimisticExample.tsx # Optimistic updates example
```

## 🔧 Setup

### 1. Provider Setup

The `QueryProvider` is already configured in your `src/app/layout.tsx`:

```tsx
import { QueryProvider } from '@/providers/QueryProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>{/* Your app components */}</QueryProvider>
      </body>
    </html>
  );
}
```

### 2. Custom Hooks

All API endpoints have corresponding custom hooks in `src/hooks/useTanStackQuery.ts`:

```tsx
// Query hooks (for fetching data)
const { data, isLoading, error } = useCards();
const { data, isLoading, error } = usePlans();
const { data, isLoading, error } = useCategories();
const { data, isLoading, error } = useTopics();
const { data, isLoading, error } = useQuestions();

// Mutation hooks (for creating/updating/deleting)
const createCardMutation = useCreateCard();
const updateCardMutation = useUpdateCard();
const deleteCardMutation = useDeleteCard();
```

## 📖 Usage Examples

### Basic Data Fetching

```tsx
import { useCards, usePlans } from '@/hooks/useTanStackQuery';

function MyComponent() {
  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCards();
  const { data: plansData, isLoading: plansLoading } = usePlans();

  if (cardsLoading) return <div>Loading cards...</div>;
  if (cardsError) return <div>Error: {cardsError.message}</div>;

  return (
    <div>
      <h2>Cards ({cardsData?.count})</h2>
      {cardsData?.data?.map(card => (
        <div key={card.id}>{card.name}</div>
      ))}
    </div>
  );
}
```

### Creating Data with Mutations

```tsx
import { useCreateCard } from '@/hooks/useTanStackQuery';

function CreateCardForm() {
  const createCardMutation = useCreateCard();

  const handleSubmit = async formData => {
    try {
      await createCardMutation.mutateAsync(formData);
      // Success! Data is automatically refetched
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type='submit' disabled={createCardMutation.isPending}>
        {createCardMutation.isPending ? 'Creating...' : 'Create Card'}
      </button>
    </form>
  );
}
```

### Optimistic Updates

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/useTanStackQuery';

function OptimisticCardUpdate() {
  const queryClient = useQueryClient();

  const updateCardMutation = useMutation({
    mutationFn: ({ id, data }) => updateCard(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.cards });

      // Snapshot previous value
      const previousCards = queryClient.getQueryData(queryKeys.cards);

      // Optimistically update
      queryClient.setQueryData(queryKeys.cards, old => ({
        ...old,
        data: old.data.map(card =>
          card.id === id ? { ...card, ...data, isOptimistic: true } : card
        ),
      }));

      return { previousCards };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousCards) {
        queryClient.setQueryData(queryKeys.cards, context.previousCards);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.cards });
    },
  });

  return (
    <button
      onClick={() =>
        updateCardMutation.mutate({ id: '123', data: { name: 'New Name' } })
      }
      disabled={updateCardMutation.isPending}
    >
      {updateCardMutation.isPending ? 'Updating...' : 'Update Card'}
    </button>
  );
}
```

### Prefetching Data

```tsx
import { usePrefetchRelatedData } from '@/hooks/useTanStackQuery';

function CardList() {
  const { prefetchCardData } = usePrefetchRelatedData();

  return (
    <div>
      {cards.map(card => (
        <div key={card.id} onMouseEnter={() => prefetchCardData(card.name)}>
          {card.name}
        </div>
      ))}
    </div>
  );
}
```

## 🎯 Available Hooks

### Query Hooks (Data Fetching)

| Hook                           | Description                  | Returns                      |
| ------------------------------ | ---------------------------- | ---------------------------- |
| `useCards()`                   | Fetch all learning cards     | `{ data, isLoading, error }` |
| `useCard(id)`                  | Fetch single card by ID      | `{ data, isLoading, error }` |
| `usePlans()`                   | Fetch all learning plans     | `{ data, isLoading, error }` |
| `usePlan(id)`                  | Fetch single plan by ID      | `{ data, isLoading, error }` |
| `useCategories()`              | Fetch all categories         | `{ data, isLoading, error }` |
| `useCategory(id)`              | Fetch single category by ID  | `{ data, isLoading, error }` |
| `useTopics()`                  | Fetch all topics             | `{ data, isLoading, error }` |
| `useTopic(id)`                 | Fetch single topic by ID     | `{ data, isLoading, error }` |
| `useQuestions(params?)`        | Fetch questions with filters | `{ data, isLoading, error }` |
| `useQuestion(id)`              | Fetch single question by ID  | `{ data, isLoading, error }` |
| `useQuestionsByTopic(topicId)` | Fetch questions for a topic  | `{ data, isLoading, error }` |
| `useQuestionsUnified(params?)` | Fetch unified questions      | `{ data, isLoading, error }` |
| `useFrontendTasks()`           | Fetch frontend tasks         | `{ data, isLoading, error }` |
| `useProblemSolvingTasks()`     | Fetch problem solving tasks  | `{ data, isLoading, error }` |
| `useAdminStats()`              | Fetch admin dashboard stats  | `{ data, isLoading, error }` |

### Mutation Hooks (Data Modification)

| Hook                  | Description              | Returns                                     |
| --------------------- | ------------------------ | ------------------------------------------- |
| `useCreateCard()`     | Create new learning card | `{ mutate, mutateAsync, isPending, error }` |
| `useUpdateCard()`     | Update existing card     | `{ mutate, mutateAsync, isPending, error }` |
| `useDeleteCard()`     | Delete learning card     | `{ mutate, mutateAsync, isPending, error }` |
| `useCreatePlan()`     | Create new learning plan | `{ mutate, mutateAsync, isPending, error }` |
| `useUpdatePlan()`     | Update existing plan     | `{ mutate, mutateAsync, isPending, error }` |
| `useDeletePlan()`     | Delete learning plan     | `{ mutate, mutateAsync, isPending, error }` |
| `useCreateCategory()` | Create new category      | `{ mutate, mutateAsync, isPending, error }` |
| `useUpdateCategory()` | Update existing category | `{ mutate, mutateAsync, isPending, error }` |
| `useDeleteCategory()` | Delete category          | `{ mutate, mutateAsync, isPending, error }` |
| `useCreateTopic()`    | Create new topic         | `{ mutate, mutateAsync, isPending, error }` |
| `useUpdateTopic()`    | Update existing topic    | `{ mutate, mutateAsync, isPending, error }` |
| `useDeleteTopic()`    | Delete topic             | `{ mutate, mutateAsync, isPending, error }` |
| `useCreateQuestion()` | Create new question      | `{ mutate, mutateAsync, isPending, error }` |
| `useUpdateQuestion()` | Update existing question | `{ mutate, mutateAsync, isPending, error }` |
| `useDeleteQuestion()` | Delete question          | `{ mutate, mutateAsync, isPending, error }` |

### Utility Hooks

| Hook                                      | Description                       | Returns                                      |
| ----------------------------------------- | --------------------------------- | -------------------------------------------- |
| `usePrefetchRelatedData()`                | Prefetch related data             | `{ prefetchCardData, prefetchCategoryData }` |
| `useOptimisticUpdate(queryKey, updateFn)` | Create optimistic update function | `optimisticUpdate`                           |

## 🔍 Query Keys

All query keys are centralized in the `queryKeys` object:

```tsx
import { queryKeys } from '@/hooks/useTanStackQuery';

// Examples
queryKeys.cards; // ['cards']
queryKeys.card('123'); // ['cards', '123']
queryKeys.categoriesByCard('js'); // ['categories', 'by-card', 'js']
queryKeys.questionsByTopic('456'); // ['questions', 'by-topic', '456']
```

## ⚡ Performance Features

### 1. Automatic Caching

- Data is cached automatically
- Shared across all components
- Configurable stale time and cache time

### 2. Background Refetching

- Data stays fresh automatically
- Refetches on window focus
- Refetches on network reconnection

### 3. Optimistic Updates

- UI updates immediately
- Rolls back on error
- Provides great UX

### 4. Prefetching

- Prefetch data on hover/focus
- Improves perceived performance
- Reduces loading states

## 🛠️ Configuration

The QueryClient is configured with sensible defaults:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

## 🐛 DevTools

TanStack Query DevTools are automatically enabled in development:

- **Query Explorer** - View all queries and their states
- **Mutation Explorer** - View all mutations and their states
- **Cache Inspector** - Inspect cached data
- **Timeline** - See query/mutation timeline

## 📝 Best Practices

### 1. Use Custom Hooks

Always use the provided custom hooks instead of raw `useQuery`:

```tsx
// ✅ Good
const { data, isLoading } = useCards();

// ❌ Avoid
const { data, isLoading } = useQuery({
  queryKey: ['cards'],
  queryFn: fetchCards,
});
```

### 2. Handle Loading States

Always handle loading and error states:

```tsx
function MyComponent() {
  const { data, isLoading, error } = useCards();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{/* Your content */}</div>;
}
```

### 3. Use Optimistic Updates

For better UX, use optimistic updates for mutations:

```tsx
const updateMutation = useMutation({
  mutationFn: updateData,
  onMutate: async newData => {
    // Optimistically update UI
    queryClient.setQueryData(queryKey, oldData =>
      updateOptimistically(oldData, newData)
    );
  },
  onError: (error, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(queryKey, context.previousData);
  },
});
```

### 4. Prefetch Related Data

Prefetch data that users are likely to need:

```tsx
function CardItem({ card }) {
  const { prefetchCardData } = usePrefetchRelatedData();

  return (
    <div onMouseEnter={() => prefetchCardData(card.name)}>{card.name}</div>
  );
}
```

## 🚀 Migration from Existing Code

### Before (Manual State Management)

```tsx
function OldComponent() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCards()
      .then(setCards)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleCreateCard = async data => {
    try {
      const newCard = await createCard(data);
      setCards(prev => [...prev, newCard]);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {cards.map(card => (
        <div key={card.id}>{card.name}</div>
      ))}
    </div>
  );
}
```

### After (TanStack Query)

```tsx
function NewComponent() {
  const { data: cardsData, isLoading, error } = useCards();
  const createCardMutation = useCreateCard();

  const handleCreateCard = data => {
    createCardMutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {cardsData?.data?.map(card => (
        <div key={card.id}>{card.name}</div>
      ))}
    </div>
  );
}
```

## 🎉 Benefits

1. **Less Boilerplate** - No manual state management for async data
2. **Better Performance** - Automatic caching and background updates
3. **Better UX** - Optimistic updates and loading states
4. **Error Handling** - Built-in retry logic and error boundaries
5. **DevTools** - Excellent debugging experience
6. **Type Safety** - Full TypeScript support
7. **Consistency** - Standardized data fetching patterns

## 📚 Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TanStack Query Examples](https://tanstack.com/query/latest/docs/react/examples/react/basic)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

---

**Happy coding with TanStack Query! 🚀**
