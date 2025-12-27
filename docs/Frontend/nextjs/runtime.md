# Edge Runtime vs Node.js Runtime (Next.js)

## Overview

Next.js supports two server runtimes. They serve different purposes and have different capabilities.

---

## Node.js Runtime

**Best for full backend logic**

**Runs:** Server / Serverless (Node)  
**APIs:** Full Node.js APIs

**Can use**

- `fs`, `path`, `crypto` (Node)
- Database drivers (Postgres, MongoDB, CouchDB, etc.)
- Long-running or complex logic

**Typical use cases**

- API routes (`route.ts`)
- Database reads/writes
- ID generation for persistence
- Business logic

```ts
// route.ts
import { randomUUID } from 'crypto';
```

## Edge Runtime

**Best for low-latency, lightweight logic**

**Runs:** Edge locations (CDN)  
**APIs:** Web APIs only

### Can use

- Fetch API
- Headers, Request, Response
- Web Crypto (`crypto.randomUUID()` – limited)

### Cannot use

- Node modules (`fs`, Node `crypto`)
- Most database drivers
- TCP sockets

### Typical use cases

- Middleware
- Authentication checks
- Redirects
- Simple read-only logic

```ts
export const runtime = 'edge';
```
