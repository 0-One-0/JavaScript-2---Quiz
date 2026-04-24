export async function fetchHpSpell() {
  const response = await fetch("https://hp-api.onrender.com/api/spells");

  if (!response.ok) {
    throw new Error("Failed to fetch Harry Potter spell");
  }

  const data = await response.json();

  const randomSpell = data[Math.floor(Math.random() * data.length)];

  return {
    title: randomSpell.name,
    text: randomSpell.description,
  };
}