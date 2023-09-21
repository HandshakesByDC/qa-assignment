export function extractNumberFromString(word: string): any {
  return word.replace(/[^0-9]/g, "");
}

export function extractUUIDFromUrl(url: string): string {
  const uuidPattern =
    /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;
  return url.match(uuidPattern)![0];
}
