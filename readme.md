Todo App sederhana (CRUD) dengan Frontend + Backend + Database.

## Tech Stack
- FE: Vite + React (served by Nginx)
- BE: NestJS
- DB: PostgreSQL 15
- Infra: Docker & Docker Compose

## Cara Menjalankan
### Requirement
- Docker Desktop
- Node.js v18+ (jika tanpa Docker)

### Run
```bash
docker-compose up --build
```

### Akses
- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api/todos

## Environment (Docker)
```env
DB_HOST=db
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=todos_db
```

Backend menolak request tanpa header:
```http
x-user-id: sandi-test
```
