import AnnouncementContent from "./AnnouncementContent";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { fetchAnnouncement } from "@/lib/api";

export default async function Announcement() {
  let data;

  try {
    data = await fetchAnnouncement();
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <AnnouncementContent>
        <div className="text-center max-w-none prose prose-sm prose-invert prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2">
          Unable to load data for the Announcement component
        </div>
      </AnnouncementContent>
    )
  }

  // Destructure the necessary properties
  const { content } = data;

  // Render nothing if no content
  if (!content) {
    return null;
  }

  return (
    <AnnouncementContent>
      <div
        className="text-center max-w-none prose prose-sm prose-invert prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
      />
    </AnnouncementContent>
  );
}
