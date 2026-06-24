const INVALID_REVIEW_PATHS = new Set(['/interview/review', '/interview/review/']);

export function isValidJobId(jobId?: string | null): jobId is string {
  return Boolean(jobId?.trim());
}

export function getInterviewReviewPath(jobId?: string | null): string | null {
  if (!isValidJobId(jobId)) return null;
  return `/interview/review/${jobId}`;
}

export function getValidReturnTo(returnTo?: string | null): string | null {
  if (!returnTo?.trim()) return null;

  const normalized = returnTo.trim();

  if (INVALID_REVIEW_PATHS.has(normalized)) return null;

  const reviewMatch = normalized.match(/^\/interview\/review\/([^/]*)$/);
  if (reviewMatch && !reviewMatch[1]?.trim()) return null;

  return normalized;
}

export function buildAuthHref(
  basePath: '/login' | '/signup',
  options?: { jobId?: string | null; returnTo?: string | null },
): string {
  const validReturnTo =
    getValidReturnTo(options?.returnTo) ?? getInterviewReviewPath(options?.jobId);

  if (!validReturnTo) return basePath;

  return `${basePath}?returnTo=${encodeURIComponent(validReturnTo)}`;
}
