export * from "./content";

// Format ISO datetime string to Philippine Time (UTC+8)
export const formatBlogDate = (isoString: string) => {
  const d = new Date(isoString);

  const date = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);

  const time = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);

  return { date, time };
};
