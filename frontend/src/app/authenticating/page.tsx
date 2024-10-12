"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Cookies from "js-cookie";

function AuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        const auth = async () => {
            if (code) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/callback`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    }
                );

                const data = await response.json();
                const accessToken = data.accessToken;

                Cookies.set("token", accessToken);
                router.push("/dashboard");
            }
        };
        auth();
    }, [code, router]);

    return <div className="fillPage">Authenticating...</div>;
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthContent />
        </Suspense>
    );
}
