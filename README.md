# Babbler - API

API for babbler project

## Prerequisites

- Docker and Docker Compose
- Node.js v22+ (for local development only)

## Running with Docker

1. Create .env file

2. Build container

```bash
docker-compose build
```

3. Start the containers

```bash
docker-compose up -d
```

4. The service is now available at http://localhost:3333

## Task Commands Reference

This project uses [Task](https://taskfile.dev/) for managing development workflows. Below are the available commands:

| Command                        | Description                       | Example                                  |
| ------------------------------ | --------------------------------- | ---------------------------------------- |
| `task`                       | Display all available commands    | `task`                                 |
| **Application Commands** |                                   |                                          |
| `task build`                 | Build the application             | `task build`                           |
| `task start`                 | Start all services                | `task start`                           |
| `task stop`                  | Stop all services                 | `task stop`                            |
| `task restart`               | Restart all services              | `task restart`                         |
| `task logs`                  | Show application logs             | `task logs`                            |
| `task shell`                 | Open a shell in the app container | `task shell`                           |
| **Development Commands** |                                   |                                          |
| `task test`                  | Run tests                         | `task test`                            |
| `task lint`                  | Run linting                       | `task lint`                            |
| `task format`                | Format code                       | `task format`                          |
| **Database Commands**    |                                   |                                          |
| `task db:migrate`            | Run database migrations           | `task db:migrate`                      |
| `task db:rollback`           | Rollback the last migration       | `task db:rollback`                     |
| `task db:migration`          | Create a new migration            | `task db:migration create_roles_table` |
| `task db:seed`               | Run database seeders              | `task db:seed`                         |

## Formatting and Linting

Maintain code quality by running:

```bash
# Format code with Prettier
npm run format

# Check formatting without making changes
npm run format:check

# Run ESLint to find code issues
npm run lint

# Run TypeScript type checking
npm run typecheck

# Run all checks at once
npm run check
```
