import { supabase } from "../lib/supabase";

const VISITOR_ID_KEY = "fotn_visitor_id";

function isValidUuid(value = "") {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export function getVisitorId() {
  const savedVisitorId =
    window.localStorage.getItem(VISITOR_ID_KEY);

  if (isValidUuid(savedVisitorId)) {
    return savedVisitorId;
  }

  const newVisitorId = crypto.randomUUID();

  window.localStorage.setItem(
    VISITOR_ID_KEY,
    newVisitorId
  );

  return newVisitorId;
}

export function createArticleSessionId() {
  return crypto.randomUUID();
}

export function storeArticleSessionId(
  postId,
  sessionId
) {
  window.sessionStorage.setItem(
    `fotn_article_session_${postId}`,
    sessionId
  );
}

export function consumeArticleSessionId(postId) {
  const key = `fotn_article_session_${postId}`;

  const storedSessionId =
    window.sessionStorage.getItem(key);

  window.sessionStorage.removeItem(key);

  return isValidUuid(storedSessionId)
    ? storedSessionId
    : null;
}

export async function trackArticleEvent({
  postId,
  sessionId,
  eventType,
}) {
  if (!postId || !sessionId || !eventType) return;

  const { error } = await supabase.rpc(
    "track_article_event",
    {
      post_id_input: postId,
      visitor_id_input: getVisitorId(),
      session_id_input: sessionId,
      event_type_input: eventType,
      referrer_input: document.referrer || null,
    }
  );

  if (error) {
    console.error(
      "Error tracking article event:",
      error
    );
  }
}