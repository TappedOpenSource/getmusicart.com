'use client';

import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { auth } from '@/utils/firebase';
import { type UserModel } from '@/types/user_model';
import { getUser, userCreditsListener } from '@/utils/database';
import { getCustomClaims } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useAuth } from './AuthProvider';

export const CreditsContext = createContext<{
    credits: number;
}>({ credits: 0 });

export const useCredits = () => useContext(CreditsContext);

interface CreditsContextProviderProps {
    children: ReactNode;
}

export function CreditsContextProvider({
    children,
}: CreditsContextProviderProps): JSX.Element {
    const { user } = useAuth();
    const router = useRouter();
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        if (user === null) {
            return;
        }

        const unsubscribe = userCreditsListener(user.id, async (credits) => {
            setCredits(credits);
        });

        return () => unsubscribe();
    }, [router, user]);

    return (
        <>
            <CreditsContext.Provider value={{ credits }}>
                {children}
            </CreditsContext.Provider>
        </>
    );
}