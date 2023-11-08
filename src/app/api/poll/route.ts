import { redis } from "@/utils/redis";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }

    const data = await redis.get(id);
    if (!data) {
        return Response.json({ 
            status: 'pending',
        });
    }

    return Response.json({
        status: 'complete',
        data,
    });
}
