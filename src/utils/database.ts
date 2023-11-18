import { UserModel, userModelConverter } from "@/types/user_model";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUser(userId: string): Promise<UserModel | null> {
    const collectionRef = collection(db, "users")
        .withConverter(userModelConverter);
    const docRef = doc(collectionRef, userId);

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() ?? null;

    return docData;
}