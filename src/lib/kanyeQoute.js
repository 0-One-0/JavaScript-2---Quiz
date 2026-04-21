export async function fetchKanyeQuote() {
  const response = await fetch("https://api.kanye.rest/");

  if (!response.ok) {
    throw new Error("Failed to fetch Kanye quote");
  }

  const data = await response.json();

  return data.quote;
}