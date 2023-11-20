'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { loginWithCredentials } from '@/utils/auth';
import ContinueWithGoogleButton from '@/components/ContinueWithGoogleButton';

export default function Login() {
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('return_url') || '/';
    console.log({ returnUrl });

    // const { user } = useAuth();
    // if (user) {
    //     router.push(returnUrl);
    //     return;
    // }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await loginWithCredentials({
                email: data.email,
                password: data.password,
            });
            router.push(returnUrl);
        } catch (err) {
            console.error(err);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            router.push(returnUrl);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen rounded-lg p-16">
            <div className="flex items-center justify-center pb-5">
                <Image
                    src="/images/icon_1024.png"
                    alt="Tapped_Logo"
                    width={124}
                    height={124}
                />
            </div>

            <ContinueWithGoogleButton onClick={handleGoogleLogin} />
        </div>
    );
};
