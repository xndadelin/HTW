'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  categories: string[];
  link?: string;
  created_at: string;
}

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [flagInput, setFlagInput] = useState('');

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }
    let isMounted = true;
    (async () => {
      const supabase = (await import("@/utils/supabase/client")).default;
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .eq("id", id)
        .single();
      if (isMounted) {
        if (error || !data) {
          setError(true);
        } else {
          setChallenge(data);
        }
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const getDifficultyConfig = (difficulty: string) => {
    const configs = {
      'entry level': { icon: '🟢', color: 'bg-muted text-foreground border-border' },
      'easy': { icon: '🔵', color: 'bg-muted text-foreground border-border' },
      'medium': { icon: '🟡', color: 'bg-muted text-foreground border-border' },
      'hard': { icon: '🟠', color: 'bg-muted text-foreground border-border' },
      'insane': { icon: '🔴', color: 'bg-muted text-foreground border-border' },
      'god': { icon: '🟣', color: 'bg-muted text-foreground border-border' }
    };
    return configs[difficulty as keyof typeof configs] || { icon: '⚪', color: 'bg-muted text-foreground border-border' };
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      web: '🌐', crypto: '🔐', pwn: '⚔️', forensics: '🔍',
      reverse: '🔄', osint: '🕵️', misc: '🎯', stegano: '🖼️',
      mobile: '📱', hardware: '⚙️', networking: '🌐'
    };
    return icons[category as keyof typeof icons] || '📝';
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background w-screen">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
          <p className="text-muted-foreground">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background w-screen">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-4xl">😕</div>
          <h2 className="text-xl font-semibold text-foreground">Challenge not found</h2>
          <p className="text-muted-foreground">The challenge you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const difficultyConfig = getDifficultyConfig(challenge.difficulty);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <button 
            onClick={() => window.location.href = '/challenges'}
            className="hover:text-foreground transition-colors"
          >
            Challenges
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">{challenge.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-screen">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg shadow-sm border border-border p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${difficultyConfig.color}`}>
                  {difficultyConfig.icon} {' '}
                  {challenge.difficulty}
                </span>
                {challenge.categories?.map((category: string) => (
                  <span 
                    key={category} 
                    className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium"
                  >
                    {getCategoryIcon(category)} {' '}
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {challenge.name}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                  </svg>
                  Created {new Date(challenge.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Active</span>
                </div>
              </div>

              <p className="text-muted-foreground mt-4">
                {challenge.description}
              </p>

              <p className="text-muted-foreground mt-4">
                <strong>Link:</strong> {' '}
                {challenge.link ? (
                  <a 
                    href={challenge.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    {challenge.link}
                  </a>
                ) : (
                  <span className="text-muted-foreground">No link provided</span>
                )}
              </p>
              <div className="flex w-full max-w-screen items-center mt-12">
                <Input type='text' placeholder="Enter your flag here..." className="w-full" />
                <Button type='submit' variant='outline' className="ml-2">
                  Submit flag
                </Button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
}