import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'
import { auth } from '@/lib/auth'
export const runtime = 'edge'

const app = new Hono().basePath('/api')
app.use("/api/*", cors());
app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app)
export const POST = handle(app)


//handlers for better-auth
app.on(["POST", "GET"], "/api/auth/**", (c) => {
	return auth.handler(c.req.raw);
});