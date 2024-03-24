export function searchStrings(query: string, data: string[]): string[] {
  return data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );
}
