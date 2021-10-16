import React, { useEffect, useRef } from 'react';
type VideoPreviewProps = {
  poster: string,
  src: string,
  isPlaying: boolean,
}

function VideoPreview(props: VideoPreviewProps): JSX.Element {
  const { src, isPlaying, poster } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (videoRef.current && isPlaying) {
      timeoutId = setTimeout(() => {
        videoRef.current?.play();
      }, 1000);
    }

    if (videoRef.current && !isPlaying && videoRef.current?.currentTime) {
      videoRef.current?.load();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, videoRef]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width="280"
      height="175"
      muted
    />
  );
}

export default VideoPreview;
