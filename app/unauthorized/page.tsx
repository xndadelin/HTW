import Link from "next/link";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <Lock className="w-20 h-20 mb-8 text-[#EF4444]" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
          You need to be logged in
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground mb-8 text-center">
          You must be logged in to see this page.
        </p>
        <Link href="/auth/login">
          <button className="px-10 py-4 bg-[#EF4444] hover:bg-red-600 text-white font-bold rounded-xl shadow-lg text-xl transition-colors duration-200">
            Go to login
          </button>
        </Link>
      </div>
    </div>
  );
}
