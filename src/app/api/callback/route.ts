import { redis } from "@/utils/redis";

export async function POST(req: Request) {
    const body = await req.text();
    console.log({ body });
    const decoded = atob(body);

    const { sourceMessageId } = JSON.parse(body);
    await redis.set(sourceMessageId, decoded);

    return Response.json({ success: true });
}
