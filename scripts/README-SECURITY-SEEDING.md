# Security Questions Seeding Documentation

## Overview

This document provides comprehensive instructions for seeding Security questions from JSON files into Firebase Firestore. The Security questions are organized into 11 files covering various security topics.

## Files Structure

```
data/json/security/
├── sec-01.json (XSS - Cross-Site Scripting)
├── sec-02.json (CSRF - Cross-Site Request Forgery)
├── sec-03.json (SQL Injection)
├── sec-04.json (Authentication & Authorization)
├── sec-05.json (HTTPS & SSL/TLS)
├── sec-06.json (Input Validation & Sanitization)
├── sec-07.json (Session Management)
├── sec-08.json (File Upload Security)
├── sec-09.json (API Security)
├── sec-10.json (Security Headers)
└── sec-11.json (General Security Best Practices)
```

## Question Statistics

- **Total Files**: 11
- **Total Questions**: 1,100 (100 questions per file)
- **Category**: Security
- **Learning Card**: system-design
- **Topics Covered**: XSS, CSRF, SQL Injection, Authentication, HTTPS, Input Validation, Session Management, File Upload, API Security, Security Headers, General Security

## Prerequisites

1. Node.js and npm installed
2. Firebase project configured
3. `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable set
4. `ts-node` installed globally: `npm install -g ts-node`
5. `dotenv` package installed: `npm install dotenv`

## Available Scripts

### Shell Script Runner

The easiest way to run the seeding process:

```bash
# Clear all questions
./scripts/seed-security-questions.sh clear

# Seed all Security questions
./scripts/seed-security-questions.sh seed-all

# Seed individual files
./scripts/seed-security-questions.sh seed-sec-01
./scripts/seed-security-questions.sh seed-sec-02
# ... etc for each file
```

### Individual TypeScript Scripts

You can also run individual scripts directly:

```bash
# Clear questions
npx ts-node scripts/clear-questions.ts

# Seed all Security questions
npx ts-node scripts/seed-all-security-questions.ts

# Seed individual files
npx ts-node scripts/seed-security-sec-01.ts
npx ts-node scripts/seed-security-sec-02.ts
# ... etc
```

## Usage Examples

### Complete Security Questions Seeding Process

```bash
# 1. Clear existing questions
./scripts/seed-security-questions.sh clear

# 2. Seed all Security questions
./scripts/seed-security-questions.sh seed-all
```

### Seeding Individual Security Topics

```bash
# Seed XSS questions only
./scripts/seed-security-questions.sh seed-sec-01

# Seed CSRF questions only
./scripts/seed-security-questions.sh seed-sec-02

# Seed SQL Injection questions only
./scripts/seed-security-questions.sh seed-sec-03
```

## Question Schema

All Security questions follow the `UnifiedQuestion` schema:

```typescript
interface UnifiedQuestion {
  id: string; // Format: sec-XX-{originalId}
  title: string; // Question title
  content: string; // Question content
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category: 'Security'; // Always "Security"
  topic: string; // Security topic (XSS, CSRF, etc.)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningCardId: 'system-design'; // Assigned to system-design card
  isActive: boolean; // Always true
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  createdBy: string; // "admin"
  updatedBy: string; // "admin"
  tags: string[]; // Security-related tags
  explanation?: string; // Answer explanation
  points: number; // Default: 10
  options?: {
    // For multiple-choice questions
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  sampleAnswers?: string[]; // For open-ended questions
  hints?: string[]; // Security-specific hints
  metadata?: object; // Additional metadata
}
```

## Topic Mapping

Each Security file maps to specific topics:

| File        | Topic                             |
| ----------- | --------------------------------- |
| sec-01.json | Cross-Site Scripting (XSS)        |
| sec-02.json | Cross-Site Request Forgery (CSRF) |
| sec-03.json | SQL Injection                     |
| sec-04.json | Authentication & Authorization    |
| sec-05.json | HTTPS & SSL/TLS                   |
| sec-06.json | Input Validation & Sanitization   |
| sec-07.json | Session Management                |
| sec-08.json | File Upload Security              |
| sec-09.json | API Security                      |
| sec-10.json | Security Headers                  |
| sec-11.json | General Security Best Practices   |

## Error Handling

The scripts include comprehensive error handling:

- **Firebase Connection**: Validates Firebase credentials
- **JSON Parsing**: Validates JSON file structure
- **Batch Operations**: Uses Firebase batch writes for efficiency
- **Error Logging**: Detailed error messages with context
- **Exit Codes**: Proper exit codes for success/failure

## Troubleshooting

### Common Issues

1. **Firebase Authentication Error**

   ```
   Error: Firebase credential not found
   ```

   **Solution**: Ensure `FIREBASE_SERVICE_ACCOUNT_KEY` is set in `.env` file

2. **JSON Import Error**

   ```
   TypeError: Module needs an import attribute of "type: json"
   ```

   **Solution**: The scripts use `with { type: 'json' }` import syntax

3. **Permission Denied**

   ```
   Permission denied: ./scripts/seed-security-questions.sh
   ```

   **Solution**: Make script executable: `chmod +x scripts/seed-security-questions.sh`

4. **ts-node Not Found**
   ```
   ts-node could not be found
   ```
   **Solution**: Install globally: `npm install -g ts-node`

### Verification Steps

1. **Check Firebase Console**: Verify questions appear in the 'questions' collection
2. **Test API Endpoint**: Call `/api/questions/unified` to verify data structure
3. **Admin Interface**: Check `/admin/content/questions` for proper display
4. **Search Functionality**: Test filtering by category "Security"

## Performance Considerations

- **Batch Size**: Questions are written in batches for efficiency
- **Memory Usage**: Each file is processed individually to manage memory
- **Network**: Firebase batch operations minimize network calls
- **Error Recovery**: Individual file failures don't stop the entire process

## Security Questions Content

The Security questions cover essential web security topics:

### Cross-Site Scripting (XSS)

- Reflected XSS attacks
- Stored XSS vulnerabilities
- DOM-based XSS
- XSS prevention techniques
- Content Security Policy (CSP)

### Cross-Site Request Forgery (CSRF)

- CSRF attack vectors
- Token-based protection
- SameSite cookie attributes
- CSRF prevention strategies

### SQL Injection

- Union-based attacks
- Blind SQL injection
- Time-based attacks
- Parameterized queries
- Input sanitization

### Authentication & Authorization

- Password security
- Multi-factor authentication
- OAuth flows
- JWT tokens
- Session management

### HTTPS & SSL/TLS

- Certificate validation
- TLS versions
- Perfect Forward Secrecy
- HSTS headers
- Mixed content issues

### Input Validation & Sanitization

- Client-side validation
- Server-side validation
- Data sanitization
- File upload validation
- Input length limits

### Session Management

- Session hijacking
- Session fixation
- Secure session storage
- Session timeout
- Session regeneration

### File Upload Security

- File type validation
- File size limits
- Malware scanning
- Secure file storage
- Path traversal prevention

### API Security

- API authentication
- Rate limiting
- Input validation
- Error handling
- API versioning

### Security Headers

- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Referrer-Policy

### General Security Best Practices

- Security by design
- Threat modeling
- Security testing
- Incident response
- Security awareness

## Next Steps

After seeding Security questions:

1. **Test the Questions**: Verify all questions display correctly
2. **Check Filtering**: Test category and topic filtering
3. **Validate Search**: Ensure search functionality works
4. **Review Content**: Check question quality and accuracy
5. **Update Documentation**: Document any schema changes

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Check Firebase console for data
4. Review error logs for specific issues
5. Test individual scripts before running batch operations
