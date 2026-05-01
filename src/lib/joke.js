export async function fetchJoke() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/random_joke"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }

  const data = await response.json();

  return {
    setup: data.setup,
    punchline: data.punchline,
  };
} 