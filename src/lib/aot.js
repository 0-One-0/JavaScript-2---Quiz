export async function fetchTitan() {
  const response = await fetch("https://api.attackontitanapi.com/titans");

  if (!response.ok) {
    throw new Error("Failed to fetch titan");
  }

  const data = await response.json();

  const titans = data.results;
  const randomTitan = titans[Math.floor(Math.random() * titans.length)];

  return {
    title: randomTitan.name,
    text: `Height: ${randomTitan.height} • Allegiance: ${randomTitan.allegiance}`,
    image: randomTitan.img,
  };
}