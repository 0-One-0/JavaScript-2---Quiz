export async function fetchKanyeQuote() { // Fetches a random Kanye West quote from the API
  const response = await fetch("https://api.kanye.rest/"); // Calls the API endpoint to get a random Kanye quote

  if (!response.ok) { // Checks if the response is not successful
    throw new Error("Failed to fetch Kanye quote");
  }

  const data = await response.json(); // Parses the response as JSON

  return data.quote; // Returns the quote from the API response
}