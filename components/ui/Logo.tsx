'use client';

import { useState } from 'react';
import Image from 'next/image';

type LogoVariant = 'black' | 'white';

interface LogoProps {
  variant?: LogoVariant;
  width?: number;
  height?: number;
  /** Use for responsive sizing; overrides fixed width/height when set. e.g. "w-28 sm:w-36 md:w-40 lg:w-44 h-auto" */
  className?: string;
}

const filterStyles: Record<LogoVariant, string> = {
  black: 'brightness-0 saturate-100',
  white: 'brightness-0 invert-1',
};

export default function Logo({
  variant = 'black',
  width = 180,
  height = 60,
  className = '',
}: LogoProps) {
  const [whiteAssetFailed, setWhiteAssetFailed] = useState(false);
  const useWhiteAsset = variant === 'white' && !whiteAssetFailed;
  const src = useWhiteAsset ? '/logo-white.png' : '/logo.png';
  const filterClass = useWhiteAsset ? '' : filterStyles[variant];
  const isResponsive = className.includes('w-') || className.includes('h-');

  return (
    <Image
      src={src}
      alt="Elevate Web & Marketing"
      width={width}
      height={height}
      className={`object-contain object-left max-w-full ${filterClass} ${className}`}
      style={isResponsive ? { height: 'auto' } : undefined}
      priority
      onError={() => {
        if (variant === 'white') setWhiteAssetFailed(true);
      }}
    />
  );
}
