import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Env = {
  Bindings: {
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    FRONTEND_URL: string;
  }
}

const app = new Hono<Env>();

app.use(cors());

app.post('/auth/callback', async (c) => {
    const body = await c.req.json();
    const code = body['code'];

    try {

        const queryString = new URLSearchParams({
            client_id: c.env.GITHUB_CLIENT_ID!,
            client_secret: c.env.GITHUB_CLIENT_SECRET!,
            code,
        }).toString();

        const response = await fetch(`https://github.com/login/oauth/access_token?${queryString}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
        });

        const data: { access_token?: string, error?: string } = await response.json();
        const accessToken = data.access_token;
        console.log(data);

      if (data.error) {
        return c.text('Failed to obtain access token', 500);
      }

      return c.json({ accessToken });
    } catch (error) {
      console.error('Error exchanging code for access token:', error);
      return c.text('Authentication failed', 500);
    }
  });

app.get('/api/user/repos', async (c) => {
    const body = await c.req.json();
    const accessToken = body.accessToken;

    if (!accessToken) {
        return c.text('Unauthorized', 401);
    }

    try {
        const response = await fetch('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();

        return c.json({ data });
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return c.text('Failed to fetch repositories', 500);
    }
});

// Example endpoint for testing
app.get('/api/home', (c) => {
  return c.text('Backend Running');
});

// Get environment variable
app.get('/test/api/getenv', (c) => {
  const clientId = c.env.GITHUB_CLIENT_ID;
  return c.text(`${clientId}`);
});

export default app;
