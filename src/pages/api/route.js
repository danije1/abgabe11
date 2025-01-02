// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { sql } from "@vercel/postgres";

export async function GET(req) {
  // Versuche, die Tabelle zu erstellen, falls sie noch nicht existiert
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255) NOT NULL
      );
    `;
  } catch (error) {
    console.error("Fehler beim Erstellen der Tabelle:", error);
  }

  // Hole Daten aus der Tabelle
  try {
    const result = await sql`SELECT * FROM comments;`;

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fehler beim Abrufen der Daten" }),
      {
        status: 500,
      }
    );
  }
}

/*export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}*/
