import DismissibleAnnouncement from "./DismissibleAnnouncement";

async function getAnnouncement() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/global?populate[announcement][populate]=*";
  const url = new URL(path, baseUrl);

  const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error("Failed to fetch announcement");
  }

  const data = await res.json();

  return data?.data?.announcement;
}

export default async function Announcement() {
  const announcement = await getAnnouncement();

  // Render nothing if no content
  if (!announcement?.content) {
    return null;
  }

  return (
    <DismissibleAnnouncement content={announcement.content} />
  );
}
