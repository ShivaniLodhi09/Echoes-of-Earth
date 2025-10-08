import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  const [embedUrl, setEmbedUrl] = useState("");
  const [isLocalVideo, setIsLocalVideo] = useState(false);

  useEffect(() => {
    // Check if it's a local video file
    if (videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.ogg'))) {
      setIsLocalVideo(true);
      setEmbedUrl(videoUrl);
      return;
    }
    
    setIsLocalVideo(false);
    
    // Convert YouTube URL to embed URL
    if (videoUrl) {
      try {
        // If the URL is already an embed URL, preserve its params and ensure required ones are present
        if (videoUrl.includes("youtube.com/embed")) {
          const url = new URL(videoUrl);
          // Only set autoplay if not already specified
          if (!url.searchParams.has("autoplay")) {
            url.searchParams.set("autoplay", "1");
          }
          url.searchParams.set("enablejsapi", "1");
          url.searchParams.set("origin", window.location.origin);
          url.searchParams.set("widgetid", "1");
          setEmbedUrl(url.toString());
        }
        // Handle youtu.be format
        else if (videoUrl.includes("youtu.be")) {
          const idPart = videoUrl.split("/").pop() ?? "";
          const [videoId, query] = idPart.split("?");
          const base = new URL(`https://www.youtube.com/embed/${videoId}`);
          // Preserve any existing params like start
          if (query) new URLSearchParams(query).forEach((v, k) => base.searchParams.set(k, v));
          base.searchParams.set("autoplay", "1");
          base.searchParams.set("enablejsapi", "1");
          base.searchParams.set("origin", window.location.origin);
          base.searchParams.set("widgetid", "1");
          setEmbedUrl(base.toString());
        }
        // Handle youtube.com/watch format
        else if (videoUrl.includes("youtube.com/watch")) {
          const watchUrl = new URL(videoUrl);
          const videoId = watchUrl.searchParams.get("v") ?? "";
          const base = new URL(`https://www.youtube.com/embed/${videoId}`);
          // Preserve common params like start, t, si
          ["start", "t", "si"].forEach((k) => {
            const val = watchUrl.searchParams.get(k);
            if (val) base.searchParams.set(k, val);
          });
          base.searchParams.set("autoplay", "1");
          base.searchParams.set("enablejsapi", "1");
          base.searchParams.set("origin", window.location.origin);
          base.searchParams.set("widgetid", "1");
          setEmbedUrl(base.toString());
        }
        // Fallback: just use the provided URL
        else {
          setEmbedUrl(videoUrl);
        }
      } catch (e) {
        setEmbedUrl(videoUrl);
      }
    }
  }, [videoUrl]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-background p-4 shadow-lg">
          <div className="relative w-full aspect-video">
            {embedUrl && !isLocalVideo && (
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
            {embedUrl && isLocalVideo && (
              <video
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                controls
                autoPlay
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full p-1 bg-background/80 hover:bg-accent text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};