import { generateImage } from "@/utils/leap";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const prompt = searchParams.get("prompt");
    if (!prompt) {
        return Response.json(
            { error: 'Bad Request' },
            { status: 400 },
        );
    }

    console.log({ prompt });
    const json = await generateImage({ prompt });
    console.log({ json });

    return Response.json(json);
}