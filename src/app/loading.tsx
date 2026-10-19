import { LoaderVisual } from "@/components/PageLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09090b]">
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />
      <LoaderVisual progress={85} isNavigation={true} />
    </div>
  );
}
