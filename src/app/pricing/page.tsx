'use client';

import { logout } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const onLogout = async () => {
        await logout();
        router.push("/login");
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <p className="text-center">
                    get more credits. 
                </p> 
                <p>
                    you can either buy more credits or wait for the next month.
                </p>
                <div className="h-4" />
                <button
                    onClick={onLogout}
                    className='text-gray-500 px-4 py-2'
                >
                    logout
                </button>
            </div>
        </>
    );
}