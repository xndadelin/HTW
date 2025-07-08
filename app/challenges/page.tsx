'use client'

import WaveLoading from "@/components/auth/Loading";
import useGetUser from "@/lib/useGetUser";
import { useEffect, useState } from "react";

export default function Challenges() {
    const NewChallengeDialog = require("@/components/challenges/NewChallengeDialog").default;
    const { user, loading } = useGetUser();
    const isAdmin = user?.profile?.role === 'admin';
    const [challenges, setChallenges] = useState<any[]>([]);
    const [loadingChallenges, setLoadingChallenges] = useState(true);

    useEffect(() => {
        async function fetchChallenges() {
            setLoadingChallenges(true);
            const supabase = (await import("@/utils/supabase/client")).default;
            const { data, error } = await supabase.from('challenges').select('*').order('created_at', { ascending: false });
            if (!error) setChallenges(data || []);
            setLoadingChallenges(false);
        }
        fetchChallenges();
    }, []);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'entry level':
                return 'bg-green-500/20 border-green-500/30';
            case 'easy':
                return 'bg-blue-500/20 border-blue-500/30';
            case 'medium':
                return 'bg-yellow-500/20 border-yellow-500/30';
            case 'hard':
                return 'bg-orange-500/20 border-orange-500/30';
            case 'insane':
                return 'bg-red-500/20 border-red-500/30';
            case 'god':
                return 'bg-purple-500/20 border-purple-500/30';
            default:
                return 'bg-muted border-border';
        }
    };

    const getCategoryColor = (category: string) => {
        const colors = {
            web: 'bg-emerald-500/20',
            crypto: 'bg-violet-500/20',
            pwn: 'bg-red-500/20',
            forensics: 'bg-indigo-500/20',
            reverse: 'bg-pink-500/20',
            osint: 'bg-cyan-500/20',
            misc: 'bg-muted',
            stegano: 'bg-teal-500/20',
            mobile: 'bg-orange-500/20',
            hardware: 'bg-amber-500/20',
            networking: 'bg-blue-500/20',
        };
        return colors[category as keyof typeof colors] || 'bg-muted';
    };

    if (loading) return <WaveLoading />;

    if (!user) {
        if (typeof window !== "undefined") window.location.href = "/auth/login";
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8 mt-16">
                <div>
                    <h1 className="text-5xl font-bold mb-2">Challenges</h1>
                    <p className="text-lg text-muted-foreground">
                        Explore our challenges and test your skills across various categories
                    </p>
                </div>
                {isAdmin && (
                    <NewChallengeDialog>
                        <button className="px-6 py-3 bg-[#EF4444] hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            New Challenge
                        </button>
                    </NewChallengeDialog>
                )}
            </div>


            {loadingChallenges ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-background rounded-xl shadow-sm border border-border p-6 animate-pulse">
                            <div className="flex gap-2 mb-4">
                                <div className="h-6 bg-muted rounded-full w-20"></div>
                                <div className="h-6 bg-muted rounded-full w-16"></div>
                            </div>
                            <div className="h-6 bg-muted rounded mb-3 w-3/4"></div>
                            <div className="h-4 bg-muted rounded mb-2 w-full"></div>
                            <div className="h-4 bg-muted rounded mb-4 w-5/6"></div>
                            <div className="h-4 bg-muted rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            ) : challenges.length === 0 ? (

                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">No challenges yet</h3>
                        <p className="text-muted-foreground">Be the first to create a challenge for the community!</p>
                    </div>
                </div>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <div
                            key={challenge.id}
                            role="link"
                            tabIndex={0}
                            className="cursor-pointer block bg-background rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow duration-200 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
                            onClick={() => window.location.href = `/challenge/${challenge.id}`}
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = `/challenge/${challenge.id}`; } }}
                        >
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
                                        {challenge.difficulty}
                                    </span>
                                    {challenge.categories?.map((category: string) => (
                                        <span key={category} className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                                            {category}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-semibold group-hover:text-[#EF4444] transition-colors duration-200 line-clamp-2">
                                        {challenge.name}
                                    </h3>
                                    {challenge.link && (
                                        <a
                                            href={challenge.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-3 p-2 text-muted-foreground hover:text-[#EF4444] transition-colors duration-200 flex-shrink-0"
                                            title="External Resource"
                                            onClick={e => e.stopPropagation()}
                                            tabIndex={-1}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                                    {challenge.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Created {new Date(challenge.created_at).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span>Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}