# Contributing to Data Hub API

Thank you for your interest in contributing to Data Hub API! This document provides guidelines and instructions for contributing.

---

## 🤝 How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Create a new issue with the bug template
3. Provide detailed information:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details (OS, Node.js version, etc.)
   - Relevant logs or screenshots

### Suggesting Enhancements

1. Check existing feature requests
2. Create a new issue with the feature request template
3. Describe the enhancement in detail
4. Explain why it would be useful

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes with descriptive messages
5. Push to your fork (`git push origin feature/amazing-feature`)
6. Create a pull request

---

## 📋 Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/data-hub-api.git
   cd data-hub-api
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Set up the database**
   ```bash
   bun run db:push
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

---

## 🎨 Coding Standards

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules (run `bun run lint`)
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused

### TypeScript

- Use strict type checking
- Avoid `any` types when possible
- Define interfaces for complex objects
- Use proper generics

### API Endpoints

- Follow RESTful conventions
- Use consistent response format:
  ```typescript
  {
    success: boolean;
    data?: any;
    message: string;
  }
  ```
- Validate all inputs
- Handle errors gracefully
- Return appropriate HTTP status codes

### Database

- Use Prisma ORM
- Follow naming conventions (camelCase for fields)
- Include indexes for frequently queried fields
- Use transactions for multi-step operations

---

## 🧪 Testing

Before submitting a PR, ensure:

1. Code compiles without errors
2. No ESLint warnings (`bun run lint`)
3. All API endpoints work correctly
4. Database operations complete successfully
5. Authentication flow works as expected

### Manual Testing Checklist

- [ ] Login and logout functionality
- [ ] Create, read, update, delete data entries
- [ ] Filter data by category and type
- [ ] Admin role verification
- [ ] Public read access works
- [ ] Error handling displays correctly

---

## 📝 Commit Messages

Follow conventional commit format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add refresh token support

Implement refresh token endpoint to allow users to obtain new access
tokens without re-authenticating.

Closes #123
```

```
fix(data): resolve category filter bug

Fixed issue where category filter was not being applied correctly
in the GET /data endpoint.
```

---

## 📄 Pull Request Guidelines

### Before Creating a PR

1. Update documentation (README, API.md)
2. Add comments to complex code
3. Ensure code passes linting
4. Test your changes thoroughly

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Changes Made
- List of changes

## Testing
How did you test these changes?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed the code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Added comments for complex code
```

---

## 🎯 Project Structure

Understanding the project structure will help you contribute effectively:

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── data/          # Data CRUD operations
│   │   ├── categories/    # Category management
│   │   ├── types/         # Data type management
│   │   └── admin/         # Admin setup endpoint
│   └── page.tsx           # Documentation landing page
├── components/
│   └── ui/                # shadcn/ui components
└── lib/
    ├── db.ts              # Prisma client
    ├── auth.ts            # JWT utilities
    └── api-auth.ts        # API authentication middleware
```

---

## 🚨 Security Considerations

- Never commit secrets or sensitive data
- Use environment variables for configuration
- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries (Prisma handles this)
- Implement proper error handling (don't leak sensitive info)

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## ❓ Questions?

Feel free to:

1. Open an issue for bugs or feature requests
2. Start a discussion for questions
3. Check existing documentation

---

## 🌟 Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project README

---

**Thank you for contributing! 🎉**
