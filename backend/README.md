# KKU IT Support API

NestJS REST API for the KKU IT Support single-page application.

## Run locally

```bash
cd backend
npm install
npm run start:dev
```

The API listens on `http://localhost:3000`; Swagger documentation is available at `http://localhost:3000/docs`.
Set `PORT` to change the port. `CORS_ORIGIN` may be a comma-separated origin allowlist; it defaults to reflecting the browser origin (no cookies/credentials are enabled).

## Endpoints

- `GET /tickets` — list sample and created tickets.
- `POST /tickets` — create a repair ticket (validated request body).
- `PATCH /tickets/:id/status` — set `status` (`Pending`, `In Progress`, or `Completed`) and optionally `technicianNotes`.
- `DELETE /tickets/:id` — delete a ticket.

Status updates and deletion require an authenticated request with `request.user.role === 'ADMIN'`. `RolesGuard` intentionally trusts only the `request.user` identity populated by a real authentication layer. This starter does not include credentials, JWT verification, or a login endpoint; do not treat the frontend demo role selector or an arbitrary client header as authentication. Integrate and validate your chosen identity provider/JWT strategy before exposing admin APIs beyond local development.

Tickets are currently kept in service memory and reset when the API process restarts. Add a database and repository layer for durable shared production data. The static GitHub Pages app calls the local API when available and stores its fallback dataset per browser using `localStorage`.
