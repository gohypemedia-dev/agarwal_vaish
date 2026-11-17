import { NextResponse } from "next/server";
import { galleryData } from "@/data/gallery";

export const dynamic = "force-dynamic";

const CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
};

export async function GET() {
  return NextResponse.json(galleryData, {
    status: 200,
    headers: CACHE_HEADERS,
  });
}
