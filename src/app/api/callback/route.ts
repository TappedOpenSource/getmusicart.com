import { redis } from "@/utils/redis";

export async function POST(req: Request) {
    const body = await req.json();
    const { sourceMessageId } = body;

    const decoded = atob(body);
    await redis.set(sourceMessageId, decoded);

    return Response.json({ success: true });
}
