export async function fetchQuizQuestions(amount, category, difficulty) {
  
  //We use string fortmatting to make sure we can change the urls perams when needed.
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`;

  const response = await fetch(url);

  if (!response.ok) {
    //Return error if we get e problem from the api.
    throw new Error("Failed to fetch questions");
  }

  const data = await response.json();

  //We needed to do a decoding of the strings that came in for it to be valid strings and readable by humans.
  const decodedResults = data.results.map((q) => ({
    //map lets us do it to all the object in the array, so we can target all of them.
    ...q,
    category: decodeURIComponent(q.category),
    question: decodeURIComponent(q.question),
    correct_answer: decodeURIComponent(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((a) => decodeURIComponent(a)),
  }));

  return decodedResults; //we return correctly formatted array.
}
