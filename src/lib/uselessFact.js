export async function fetchUselessFact() {
  const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today");

  if (!response.ok) {
    throw new Error("Failed to fetch Useless Fact");
  }

  const data = await response.json();

  return data.text;
}