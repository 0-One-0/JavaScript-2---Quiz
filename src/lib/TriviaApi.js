export async function fetchQuizQuestions(
  amount,
  category,
  difficulty = "medium",
  type = "multiple",
) {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await response.json();

  const decodedResults = data.results.map((q) => ({
    ...q,
    category: decodeURIComponent(q.category),
    question: decodeURIComponent(q.question),
    correct_answer: decodeURIComponent(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((a) => decodeURIComponent(a)),
  }));

  return decodedResults;
}
