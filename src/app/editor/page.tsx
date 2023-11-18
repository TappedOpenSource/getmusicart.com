'use client';

import { toBase64 } from "@/utils/base64";
import { shimmer } from "@/utils/shimmer";
import Image from "next/image";
import { useState } from "react";


export default function Editor({ searchParams }: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const imageUri = searchParams?.imageUri;

    const [explicitContent, setExplicitContent] = useState(true);

    if (imageUri === undefined || imageUri === null) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1
                    className="text-center text-5xl tracking-tighter font-extrabold gray-800"
                >
                    no image url provided
                </h1>
            </div>
        );
    }

    const editorUri = `/api/og?image_uri=${
        encodeURIComponent(imageUri)
    }&explicit_content=${explicitContent}`;

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center">
                <div className="px-4 rounded-md shadow-md flex flex-col justify-center items-center rounded-xl">
                    <Image
                        src={editorUri}
                        alt="generated image"
                        width={512}
                        height={512}
                        className="rounded-md shadow-md object-cover"
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(512, 512))}`}
                    />
                </div>
                <form>
                    <div
                        className="flex items-center justify-center" 
                    >
                        <input
                            type="checkbox"
                            checked={explicitContent}
                            onChange={(e) => setExplicitContent(e.target.checked)}
                        />
                        <label>explicit content warning</label>
                    </div>
                </form>
            </div >
        </>
    );
}
