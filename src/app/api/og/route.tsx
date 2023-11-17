
import { ImageResponse } from "next/og";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const imageUri = url.searchParams.get("image_uri");
    const explicitContent = url.searchParams.get("explicit_content") ?? true;

    console.log({ imageUri, explicitContent });

    if (imageUri === undefined || imageUri === null) {
        return Response.json(
            { error: "no image uri provided" },
            { status: 400 }
        );
    }

    return new ImageResponse(
        <>
            <img 
                src={imageUri}
                alt="generated image"
            />
            <p>{explicitContent}</p>
        </>,
        {
            width: 512,
            height: 512,
        }
    );
}