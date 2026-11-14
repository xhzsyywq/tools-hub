export default async function handler(req, res) {
  const url = process.env.TURSO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;
  if (!url || !token) return res.status(200).json([]);
  const { createClient } = await import('@libsql/client');
  const db = createClient({ url, authToken: token });
  const r = await db.execute(
    'SELECT id, title, category, type, file_url, tags, size_kb, created_at FROM materials ORDER BY created_at DESC LIMIT 100'
  );
  res.status(200).json(r.rows);
}
