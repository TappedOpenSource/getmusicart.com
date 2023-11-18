
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
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
        }}>
            <img 
                src={imageUri}
                alt="generated image"
            />
            <img 
                src="https://getmusicart.com/images/explicit_content_warning.png"
                alt="explicit content warning"
                width={50}
                height={50}
            />
            <p>{explicitContent}</p>
        </div>,
        {
            width: 512,
            height: 512,
        }
    );
}