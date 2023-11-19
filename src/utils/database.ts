import { type UserModel, userModelConverter } from "@/types/user_model";
import { Unsubscribe } from "firebase/auth";
import { collection, getDoc, doc, onSnapshot, increment, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const usersRef = collection(db, "users").withConverter(userModelConverter);
const creditsRef = collection(db, "credits");

export async function getUser(userId: string): Promise<UserModel | null> {
    const docRef = doc(usersRef, userId);

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() ?? null;

    return docData;
}

export async function decrementUserCredits(userId: string): Promise<void> {
    const docRef = doc(creditsRef, userId);

    await updateDoc(docRef, {
        coverArtCredits: increment(-1),
    });
}

export function userCreditsListener(
    userId: string,
    callback: (credits: number) => void,
): Unsubscribe {
    const docRef = doc(creditsRef, userId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        const docData = docSnap.data() ?? null;
        const creditCount = docData?.coverArtCredits ?? 0;
        callback(creditCount);
    });

    return unsubscribe;
}