import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 2,
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        NOW() AS server_time,
        current_database() AS database,
        version() AS version
    `);

    return Response.json({
      success: true,
      message: "PostgreSQL connection OK",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("PostgreSQL connection error:", error);

    return Response.json(
      {
        success: false,
        message: "PostgreSQL connection failed",
      },
      { status: 500 }
    );
  }
}
