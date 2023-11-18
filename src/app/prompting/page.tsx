'use client';

import { sleep } from "@/utils/sleep";
import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const MAX_REPLIES = 100;
const POLL_INVERVAL = 2 * 1000; // 2 seconds

export default function Prompting() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [leapImageUris, setLeapImageUris] = useState<string[]>([]);
  const [canShowImage, setCanShowImage] = useState(false);

  const fetchMessageId = async (messageId: string) => {
    const res = await fetch(`/api/poll_redis?id=${messageId}`);
    if (res.status === 500) {
      toast.error("Something went wrong, please try again");
      console.log({ text: await res.text() });
      return true;
    }

    if (res.status !== 200) {
      console.log({ status: res.status })
      return false;
    }

    const json = await res.json();
    if (json.status === "pending") {
      return false;
    }

    console.log({ dalleJson: json });
    const { payload } = json as {
      payload: {
        data: { b64_json: string }[]
      }
    };
    console.log({ itemsCount: payload.data.length });

    setImage(payload.data[0].b64_json);
    setCanShowImage(true);
    return true;
  }

  const pollMessageId = async (messageId: string) => {
    for (let i = 0; i < MAX_REPLIES; i++) {
      const success = await fetchMessageId(messageId);
      if (success) {
        break;
      }
      console.log(`pending - ${i}`);
      await sleep(POLL_INVERVAL);
    }
  };

  const pollInference = async ({ inferenceId, modelId }: {
    inferenceId: string;
    modelId: string;
  }) => {
    for (let i = 0; i < MAX_REPLIES; i++) {

      const res = await fetch(`/api/poll_inference?inferenceId=${inferenceId}&modelId=${modelId}`)
      if (res.status === 500) {
        toast.error("Something went wrong, please try again");
        console.log({ text: await res.text() });
        return true;
      }

      const json = await res.json();
      const status = json.status;
      console.log({ status, retry: i });

      if (json.status === "finished") {
        const { images } = json;
        const imageUris = images.map((image: any) => image.uri);
        setLeapImageUris(imageUris);
        router.push(
          `/selection?prompt=${prompt}&imageUris=${imageUris.join(",")}`
        );
        return;
      }
      await sleep(POLL_INVERVAL);
    }
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      toast("Generating your image...", { position: "top-center" });
      // const response = await fetch(`/api/enqueue_dalle?prompt=${prompt}`);
      // console.log({ status: response.status });
      // const json = await response.json();
      // console.log({ json });
      // const { id } = json;

      const res = await fetch(`/api/generate_image?prompt=${prompt}`);
      const json2 = await res.json();
      const { id, modelId } = json2;

      // await pollMessageId(id);
      await pollInference({
        inferenceId: id,
        modelId,
      })
    } catch (e: any) {
      console.log(e);
      toast.error("Something went wrong, please try again");
    }
    setLoading(false);
  }

  const showLoadingState = loading || (image && !canShowImage);

  return (
    <>
      <div className="min-h-screen px-4">
        <Toaster />
        <div className="min-h-screen flex flex-col items-center justify-end md:justify-center">
          <div className="md:hidden">
            <Image
              src="/images/molecule.png"
              alt="molecule cover art"
              width={400}
              height={400}
              className="rounded-xl shadow-md h-full object-cover"
            />
          </div>
          <div className="md:block h-6" />
          <h1 className="text-5xl tracking-tighter pb-10 font-bold text-center">
            tapped cover art creator
          </h1>
          <div className="md:block h-6" />

          <form
            className="flex w-full sm:w-auto flex-col sm:flex-row mb-10"
            onSubmit={submitForm}
          >
            <input
              className="shadow-sm text-gray-700 rounded-sm px-3 py-2 mb-4 sm:mb-0 sm:min-w-[600px]"
              type="text"
              placeholder="type here..."
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="min-h-[40px] shadow-sm sm:w-[100px] py-2 inline-flex justify-center font-medium items-center px-4 bg-green-600 text-gray-100 sm:ml-2 rounded-md hover:bg-green-700"
              type="submit"
            >
              {showLoadingState && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {!showLoadingState ? "Generate" : ""}
            </button>
          </form>
        </div>
      </div >
    </>
  );
}