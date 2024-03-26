export function searchStrings(query: string, data: string[]): string[] {
  return data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );
}

//create an array of array one for each letter in the alphabet of data.
//each array will contain the movies that start with that letter.
//update the search string method to take the necessary array and return the movies that contain with the query.
