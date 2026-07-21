# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Follow the setup guide in SETUP.md

## Development Workflow

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and reusable
- Add comments for complex logic

## File Structure

```
src/
├── components/      # Reusable UI components
├── config/         # Configuration files
├── context/        # React contexts
├── pages/          # Page components
├── types/          # TypeScript types
├── App.tsx         # Main app
└── main.tsx        # Entry point
```

## Git Commit Messages

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (no logic change)
- `refactor:` Code refactoring
- `test:` Add/update tests
- `chore:` Build, deps, etc.

Example:
```bash
git commit -m "feat: add payment history modal"
```

## Pull Request Process

1. Update CHANGELOG.md
2. Ensure all tests pass
3. Create clear PR description
4. Link related issues
5. Request review
6. Address feedback
7. Merge when approved

## Reporting Issues

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment (OS, browser, Node version)

## Feature Requests

Describe:
- Problem you're solving
- Proposed solution
- Alternative approaches
- Benefits

## Questions?

Open a discussion or issue with tag `question`

Thanks for contributing! 🙏
