import SelectableImage from "@/components/SelectableImage";
import { useAuth } from "@/context/AuthProvider";

export default function Selection({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    const { user } = useAuth();
    const imageUris = searchParams?.image_uris;

    console.debug({ imageUris });

    if (user === null) {
        return (
            <>
                <div className='min-h-screen flex justify-center items-center'>
                    <p>fetching user...</p>
                </div>
            </>
        );
    }

    if (imageUris === undefined || imageUris === null) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1
                    className="text-center text-5xl tracking-tighter font-extrabold gray-800"
                >
                    no image urls provided
                </h1>
            </div>
        );
    }

    const selectionImageUris = imageUris.split(",");

    return (
        <>
            <div className="min-h-screen p-4 md:p-12 flex flex-col items-center">
                <h1 className="text-5xl tracking-tighter pb-10 font-bold">
                    pick your favorite
                </h1>
                <div className="grid md:grid-cols-2 gap-4">
                    {
                        selectionImageUris.map((imageUri, index) => (
                            <SelectableImage 
                            key={index} 
                            imageUri={imageUri} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}