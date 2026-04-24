export async function fetchCat() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");

  if (!response.ok) {
    throw new Error("Failed to fetch cat");
  }

  const data = await response.json();

  return {
    image: data[0].url,
  };
}