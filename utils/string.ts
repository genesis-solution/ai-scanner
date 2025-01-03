function isBlankOrNull(s: string | null | undefined): boolean {
  return s === null || s === undefined || s.trim() === "";
}

export { isBlankOrNull };
