import { VideoUpotus } from "@/components/site/VideoUpotus";
import { TeemaOsio } from "./TeemaOsio";

/* Video klikkauksella: VideoUpotus näyttää kansikuvan ja lataa YouTube-
   iframen vasta kun kävijä painaa play, joten sivu ei hidastu. */
export function TeemaVideo({
  rule,
  title,
  intro,
  videoId,
  videoTitle,
  poster,
}: {
  rule: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  videoId: string;
  videoTitle: string;
  poster?: string;
}) {
  return (
    <TeemaOsio rule={rule} title={title} intro={intro} tumma>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <VideoUpotus videoId={videoId} title={videoTitle} poster={poster} />
      </div>
    </TeemaOsio>
  );
}
