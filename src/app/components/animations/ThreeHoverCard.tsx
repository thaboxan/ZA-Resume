"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  height?: number;
};

// Lightweight placeholder: preserves the same API shape while avoiding heavy three.js runtime.
// If you later want 3D tilt, consider a CSS or pointer-based tilt using the existing useTilt hook.
export function ThreeHoverCard({ children, className = "relative", height = 520 }: Props) {
  return (
    <div className={className} style={{ height }}>
      {children}
    </div>
  );
}
