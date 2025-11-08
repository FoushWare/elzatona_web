# Database Configuration Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

### Database Provider Selection

```bash
# Set to 'true' to use Firebase, 'false' or omit to use Supabase
NEXT_PUBLIC_USE_FIREBASE=false
```

### Firebase Configuration (only needed if NEXT_PUBLIC_USE_FIREBASE=true)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Supabase Configuration (only needed if NEXT_PUBLIC_USE_FIREBASE=false)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your_project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Usage Examples

### Switching Between Databases

1. **To use Supabase (default):**

   ```bash
   NEXT_PUBLIC_USE_FIREBASE=false
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **To use Firebase:**
   ```bash
   NEXT_PUBLIC_USE_FIREBASE=true
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config
   ```

### Environment-Specific Configurations

**Development:**

```bash
NEXT_PUBLIC_USE_FIREBASE=false
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev_anon_key
```

**Production:**

```bash
NEXT_PUBLIC_USE_FIREBASE=false
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_anon_key
```

## Database Service Usage

### In React Components

```typescript
import { useDatabase } from 'database';

function MyComponent() {
  const db = useDatabase();

  const handleSave = async () => {
    const result = await db.add('users', {
      name: 'John',
      email: 'john@example.com',
    });
    if (result.error) {
      console.error('Error:', result.error);
    } else {
      console.log('User created:', result.data);
    }
  };
}
```

### In Services

```typescript
import { DatabaseServiceFactory } from 'database';

class UserService {
  private db = DatabaseServiceFactory.create();

  async createUser(userData: any) {
    return await this.db.add('users', userData);
  }
}
```

## Migration Guide

### From Direct Firebase Usage

```typescript
// Before (Firebase)
import { doc, setDoc } from 'firebase/firestore';
await setDoc(doc(db, 'users', userId), userData);

// After (Database Abstraction)
import { useDatabase } from 'database';
const db = useDatabase();
await db.add('users', userData);
```

### From Direct Supabase Usage

```typescript
// Before (Supabase)
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, key);
await supabase.from('users').insert(userData);

// After (Database Abstraction)
import { useDatabase } from 'database';
const db = useDatabase();
await db.add('users', userData);
```

## Testing

### Unit Tests

```typescript
import { DatabaseServiceFactory } from 'database';

// Mock the database service for testing
jest.mock('database', () => ({
  DatabaseServiceFactory: {
    create: () => mockDatabaseService,
  },
}));
```

### Integration Tests

```typescript
// Test with different database providers
process.env.NEXT_PUBLIC_USE_FIREBASE = 'true';
const firebaseService = DatabaseServiceFactory.create();

process.env.NEXT_PUBLIC_USE_FIREBASE = 'false';
const supabaseService = DatabaseServiceFactory.create();
```

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Ensure all required variables are set in `.env.local`
   - Check that variable names match exactly

2. **Database Connection Errors**
   - Verify API keys are correct
   - Check network connectivity
   - Ensure database permissions are properly configured

3. **Type Errors**
   - Make sure to use the `DatabaseResult<T>` type for return values
   - Check that your data types match the expected schema

### Debug Mode

```typescript
// Enable debug logging
process.env.NODE_ENV = 'development';
// The database service will log which provider is being used
```
