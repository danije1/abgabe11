import { sql } from "@vercel/postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Datenbank-URL fehlt.");
  throw new Error("Datenbank-URL fehlt.");
}

export default async function handler(req, res) {
  const method = req.method;

  try {
    if (method === "GET") {
      const result = await sql`
        SELECT * FROM comments;
      `;
      res.status(200).json(result.rows);
    } else if (method === "POST") {
      const { content } = req.body;
      const result = await sql`
        INSERT INTO comments (content)
        VALUES (${content})
        RETURNING *;
      `;
      res.status(201).json(result.rows[0]);
    } else if (method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ error: "Keine ID zum Löschen angegeben." });
      }

      const result = await sql`
        DELETE FROM comments
        WHERE id = ${id}
        RETURNING *;
      `;

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Kommentar nicht gefunden." });
      }

      res.status(200).json({
        message: "Kommentar gelöscht.",
        deletedComment: result.rows[0],
      });
    }
  } catch (error) {
    console.error("Fehler in der API:", error);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
}
