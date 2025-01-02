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

export async function POST(req) {
  try {
    const body = await req.json(); // Daten aus der Anfrage abrufen
    const { content } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content darf nicht leer sein" }),
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO comments (content)
      VALUES (${content})
      RETURNING *;
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fehler beim Hinzufügen des Kommentars" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "ID ist erforderlich" }), {
        status: 400,
      });
    }

    const result = await sql`
      DELETE FROM comments
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: "Kommentar nicht gefunden" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fehler beim Löschen des Kommentars" }),
      { status: 500 }
    );
  }
}
