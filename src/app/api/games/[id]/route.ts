import { NextRequest, NextResponse } from "next/server";
import { getGame } from "@/lib/games/actions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const gameId = params.id;

    // Note: You may need to get the orgId from the authenticated user
    // This is a placeholder - adjust based on your auth implementation
    const orgId = ""; // TODO: Get from user session

    const game = await getGame(gameId, orgId);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("Failed to fetch game:", error);
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 },
    );
  }
}
