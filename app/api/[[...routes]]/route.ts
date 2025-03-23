import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app)
export const POST = handle(app)

// app.on(["GET"], "/api/auth-providers", (c) => {
// 	return c.json(Object.keys(configuredProviders));
// });

// app.on(["POST", "GET"], "/api/auth/**", (c) => {
// 	return auth.handler(c.req.raw);
// });