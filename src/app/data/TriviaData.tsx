export const getQuestions = async () => {
  const response = await fetch("https://the-trivia-api.com/v2/questions/", {
    next: { tags: ["questions"] },
  });

  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const data = response.json();
  return data;
};
