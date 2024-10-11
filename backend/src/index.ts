import { Hono } from 'hono'
import { cors } from 'hono/cors';

const app = new Hono()

app.use(cors());

app.get('/api/home', (c) => {
  return c.text('Hello Hono!');
})

export default app
