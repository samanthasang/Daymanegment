"use client";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function useMediaQueryValues() {
  const isXLMin = useMediaQuery("(min-width: 1280px)");
  const isLGMax = useMediaQuery("(max-width: 1279px)");
  const isLGMin = useMediaQuery("(min-width: 1024px)");
  const isMDMax = useMediaQuery("(max-width: 1023px)");
  const isMDMin = useMediaQuery("(min-width: 768px)");
  const isSMMax = useMediaQuery("(max-width: 767px)");
  const isSMMin = useMediaQuery("(min-width: 640px)");
  const isSX = useMediaQuery("(max-width: 639px)");

  return {
    isXLMin,
    isLGMin,
    isLGMax,
    isMDMin,
    isMDMax,
    isSMMin,
    isSMMax,
    isSX,
  };
}
