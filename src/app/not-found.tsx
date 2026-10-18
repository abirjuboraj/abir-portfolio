import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md mx-auto p-8 rounded-2xl bg-raised border border-line shadow-2xl">
        <span className="font-sora text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-soft-blue to-blue bg-clip-text text-transparent block mb-4">
          404
        </span>
        <h1 className="font-sora text-2xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">
          The page or project you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-blue hover:bg-blue/90 border border-blue/70 transition-all duration-200 shadow-lg shadow-blue/25 hover:shadow-blue/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
        >
          <HiOutlineHome className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
