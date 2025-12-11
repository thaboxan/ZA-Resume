"use client";
import { useEffect } from "react";
import { useSetDefaultScale } from "components/Resume/hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document: resumeDocument,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const [instance, update] = usePDF({ document: resumeDocument });

  // Hook to update pdf when document changes
  useEffect(() => {
    update();
  }, [update, resumeDocument]);

  // Enhanced download handler for mobile compatibility
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // For iOS and mobile browsers that don't support download attribute well
    if (instance.url && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      e.preventDefault();
      
      try {
        // Fetch the blob and create a new blob with proper MIME type
        const response = await fetch(instance.url);
        const blob = await response.blob();
        const pdfBlob = new Blob([blob], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        
        // Open in new window for iOS
        const link = globalThis.document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.target = '_blank';
        globalThis.document.body.appendChild(link);
        link.click();
        globalThis.document.body.removeChild(link);
        
        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback: open in new tab
        window.open(instance.url, '_blank');
      }
    }
    // For other browsers, let the default download behavior work
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] flex-col items-center justify-center gap-2 bg-gray-50 px-4 py-2 text-gray-600 sm:flex-row sm:gap-4 sm:px-6 md:px-[var(--resume-padding)] lg:justify-between">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          className="w-24 sm:w-32"
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div className="w-10 text-sm sm:text-base">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 lg:flex">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none text-sm">Autoscale</span>
        </label>
      </div>
      <a
        className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100 active:bg-gray-200 sm:ml-4 sm:px-4 sm:py-1.5 lg:ml-8"
        href={instance.url!}
        download={fileName}
        onClick={handleDownload}
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">Download</span>
        <span className="hidden sm:inline"> Resume</span>
      </a>
    </div>
  );
};

/**
 * Load ResumeControlBar client side since it uses usePDF, which is a web specific API
 */
export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-gray-50" />
);
