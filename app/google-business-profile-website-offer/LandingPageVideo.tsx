'use client';

import { useRef, useState } from 'react';
import { PlayCircle } from 'lucide-react';

type LandingPageVideoProps = {
  src: string;
};

export default function LandingPageVideo({ src }: LandingPageVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = async () => {
    if (!videoRef.current) return;

    setHasStarted(true);
    try {
      await videoRef.current.play();
    } catch {
      setHasStarted(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-primary p-2 shadow-2xl shadow-primary/10">
      <video
        ref={videoRef}
        controls
        preload="metadata"
        onPlay={() => setHasStarted(true)}
        className="aspect-video w-full rounded-[22px] bg-black object-contain"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!hasStarted ? (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/28 transition-colors hover:bg-slate-950/36"
          aria-label="Play this video"
        >
          <span className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 font-heading text-sm font-semibold text-primary shadow-xl sm:text-base">
            <PlayCircle className="h-6 w-6 text-accent" />
            Play This Video
          </span>
        </button>
      ) : null}
    </div>
  );
}
