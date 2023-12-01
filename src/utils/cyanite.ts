

export async function uploadTrack() {
    return;
}

export async function createLibraryTrack() {
    return;
}

export async function enqueueLibraryTrack(libraryTrackId: string) {
    console.log({ libraryTrackId });
    return;
}

export async function enqueueYoutubeTrack(videoUrl: string) {
    console.log({ videoUrl });
    return;
}

export async function enqueueSpotifyTrack(spotifyTrackId: string) {
    const res = await fetch(`/api/enqueue_spotify?spotifyTrackId=${spotifyTrackId}`);

    if (res.status !== 200) {
        console.log({ status: res.status, message: res.statusText });
        return;
    }

    const json = await res.json();
    return json;
}
