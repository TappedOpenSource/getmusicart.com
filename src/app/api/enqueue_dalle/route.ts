const QSTASH = `https://qstash.upstash.io/v2/publish/`;
const DALL_E = "https://api.openai.com/v1/images/generations";
const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL;
const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const prompt = searchParams.get('prompt');

    const response = await fetch(`${QSTASH + DALL_E}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${QSTASH_TOKEN}`,
            "Upstash-Forward-Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
            "Upstash-Callback": `${CALLBACK_URL}/api/dalle_callback`,
        },
        body: JSON.stringify({
            prompt,
            n: 1,
            size: "256x256",
            response_format: "b64_json",
        }),
    });

    if (response.status === 401) {
        throw new Error('authentication error');
    }

    const json = await response.json();
    return Response.json({ id: json.messageId });
}
