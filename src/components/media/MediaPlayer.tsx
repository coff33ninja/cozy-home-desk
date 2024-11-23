interface MediaPlayerProps {
  currentMedia: string | null;
}

export const MediaPlayer = ({ currentMedia }: MediaPlayerProps) => {
  if (!currentMedia) return null;

  const sanitizedUrl = DOMPurify.sanitize(currentMedia);

  return (
    <div className="w-full bg-background">
      {currentMedia.includes('youtube.com') ? (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={sanitizedUrl}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      ) : currentMedia.includes('http') && !currentMedia.includes('.m3u8') ? (
        <audio
          src={sanitizedUrl}
          controls
          autoPlay
          className="w-full"
        />
      ) : (
        <AspectRatio ratio={16 / 9}>
          <video
            src={sanitizedUrl}
            controls
            autoPlay
            className="w-full h-full rounded-lg"
          />
        </AspectRatio>
      )}
    </div>
  );
};