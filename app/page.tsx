'use client'

import Link from "next/link";
import { Clock, FileText, Trophy, BookOpen } from "lucide-react";
import useGetUser from "@/lib/useGetUser";

export default function Home() {
  const { user } = useGetUser();
  if (user) return null;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <section className="w-full max-w-3xl text-center mt-24 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#EF4444]">Hack The Way</h1>
        <p className="text-lg md:text-2xl text-muted-foreground mb-8">
          Cybersecurity training through CTF challenges, contests, and hands-on lessons. Level up your skills in a practical environment.<br />
          <span className="block mt-2 text-base text-muted-foreground">This platform is made for the Centre of Excellence in Cybersecurity, Suceava, Romania.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/challenges">
            <button className="px-8 py-3 bg-[#EF4444] hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 text-lg">View challenges</button>
          </Link>
          <Link href="/writeups">
            <button className="px-8 py-3 bg-secondary text-foreground font-semibold rounded-lg shadow-md border border-border transition-colors duration-200 text-lg">Writeups</button>
          </Link>
        </div>
      </section>
      <section className="w-full flex justify-center mb-24">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-muted rounded-xl p-6 flex flex-col items-center shadow-sm text-center">
            <Clock className="w-10 h-10 mb-3 text-[#EF4444]" />
            <h3 className="font-bold text-lg mb-1">Live CTF challenges</h3>
            <p className="text-sm text-muted-foreground">Solve real-world tasks in web, crypto, pwn, forensics, and more.</p>
          </div>
          <div className="bg-muted rounded-xl p-6 flex flex-col items-center shadow-sm text-center">
            <FileText className="w-10 h-10 mb-3 text-[#EF4444]" />
            <h3 className="font-bold text-lg mb-1">Writeups & solutions</h3>
            <p className="text-sm text-muted-foreground">Learn from others and share your own solutions to challenges.</p>
          </div>
          <div className="bg-muted rounded-xl p-6 flex flex-col items-center shadow-sm text-center">
            <Trophy className="w-10 h-10 mb-3 text-[#EF4444]" />
            <h3 className="font-bold text-lg mb-1">Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Climb the ranks and see how you compare to other hackers.</p>
          </div>
          <div className="bg-muted rounded-xl p-6 flex flex-col items-center shadow-sm text-center">
            <BookOpen className="w-10 h-10 mb-3 text-[#EF4444]" />
            <h3 className="font-bold text-lg mb-1">Learn & practice</h3>
            <p className="text-sm text-muted-foreground">Interactive tutorials and labs for all skill levels.</p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-4xl mb-24">
        <h2 className="text-2xl font-bold mb-4 text-center">How it works</h2>
        <ol className="flex flex-col md:flex-row gap-6 justify-center items-stretch text-center">
          <li className="flex-1 bg-muted rounded-lg p-6 shadow-sm min-h-[140px] flex flex-col justify-center">
            <span className="block text-3xl mb-2">1</span>
            <span className="font-semibold">Register or log in</span>
          </li>
          <li className="flex-1 bg-muted rounded-lg p-6 shadow-sm min-h-[140px] flex flex-col justify-center">
            <span className="block text-3xl mb-2">2</span>
            <span className="font-semibold">Pick a challenge</span>
          </li>
          <li className="flex-1 bg-muted rounded-lg p-6 shadow-sm min-h-[140px] flex flex-col justify-center">
            <span className="block text-3xl mb-2">3</span>
            <span className="font-semibold">Submit your flag</span>
          </li>
          <li className="flex-1 bg-muted rounded-lg p-6 shadow-sm min-h-[140px] flex flex-col justify-center">
            <span className="block text-3xl mb-2">4</span>
            <span className="font-semibold">Climb the leaderboard</span>
          </li>
        </ol>
      </section>
      <footer className="w-full max-w-4xl mx-auto text-center text-muted-foreground py-8 border-t border-border">
        <div className="mb-2">&copy; {new Date().getFullYear()} Hack The Way. All rights reserved.</div>
        <div className="flex justify-center gap-4 text-xs">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <a href="https://github.com/xndadelin/HTW" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
