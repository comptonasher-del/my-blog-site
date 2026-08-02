export function getReadingTime(body = "") {
  const plainText = body
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText
    ? plainText.split(" ").length
    : 0;

  return Math.max(1, Math.ceil(wordCount / 225));
}