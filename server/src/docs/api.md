# SkillSwap REST API

Base URL: `/api`

## Authentication

All protected routes require header:

```
Authorization: Bearer <jwt>
```

## Endpoints

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Register |
| POST | `/auth/login` | No | Login |
| GET | `/auth/me` | Yes | Current user |

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users/:id` | No | Public profile + skills |
| PUT | `/users/profile` | Yes | Update own profile |

### Skills

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/skills` | No | List/filter/paginate |
| GET | `/skills/:id` | No | Detail |
| POST | `/skills` | Yes | Create |
| PUT | `/skills/:id` | Yes | Update own |
| DELETE | `/skills/:id` | Yes | Delete own |

### Matches

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/matches` | Yes | Suggested users |

### Swaps

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/swaps` | Yes | Create request |
| GET | `/swaps` | Yes | List (query `role`: incoming \| outgoing) |
| GET | `/swaps/:id` | Yes | Detail (participant) |
| PATCH | `/swaps/:id/accept` | Yes | Receiver accepts |
| PATCH | `/swaps/:id/reject` | Yes | Receiver rejects |
| PATCH | `/swaps/:id/cancel` | Yes | Sender cancels pending |
| PATCH | `/swaps/:id/complete` | Yes | Complete accepted swap |

### Messages

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/messages` | Yes | Send (participants) |
| GET | `/messages/:swapId` | Yes | Conversation |

### Reviews

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/reviews` | Yes | Create (after completed swap) |
| GET | `/reviews/user/:id` | No | Reviews for user |

### Progress

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/progress` | Yes | Add update |
| GET | `/progress/:swapId` | Yes | Timeline |

## Response shape

Success:

```json
{ "success": true, "message": "...", "data": {} }
```

Validation error (422):

```json
{ "success": false, "message": "Validation failed", "errors": [...] }
```
