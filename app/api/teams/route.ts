import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Team from "../../../models/team";

export async function GET(req: NextRequest) {
  await connectDB();
  const groupId = req.nextUrl.searchParams.get("group_id");

  const query = groupId ? { group_id: groupId } : {};
  const teams = await Team.find(query).lean();

  return NextResponse.json(teams);
}
