'use client'

import WaveLoading from "@/components/auth/Loading";
import useGetUser from "@/lib/useGetUser";

export default function Challenges() {
    const { user, loading } = useGetUser();

    if (loading) return <WaveLoading />;
    if (!user) {
        if (typeof window !== "undefined") window.location.href = "/auth/login";
        return null;
    }

    const isAdmin = user?.profile?.role === 'admin';
    const NewChallengeDialog = require("@/components/challenges/NewChallengeDialog").default;
    return (
        <div className="container mx-auto flex flex-col my-10">
            <div className="flex items-center mt-24 mb-2">
                <h1 className="text-5xl font-bold text-left flex-1">Challenges</h1>
                {isAdmin && (
                    <NewChallengeDialog>
                        <button
                            className="ml-4 px-5 py-2 rounded bg-[#EF4444] shadow hover:bg-red-600 transition-colors"
                        >
                            New challenge
                        </button>
                    </NewChallengeDialog>
                )}
            </div>
            <p className="text-lg text-muted-foreground mt-4 text-left">
                Explore our challenges and test your skills.
            </p>
            <div className="mt-10">
                <p className="text-lg text-left">Coming soon...</p>
            </div>
        </div>
    );
}