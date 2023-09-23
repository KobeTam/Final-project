import { API_URL } from "@env";

export async function chatGptApi(userId: number | null, question: string) {
  console.log("message: questions: ", { userId: userId, content: question });
  const url = API_URL + "/chat";
  const input = { userId: userId, content: question };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  console.log(">>> response");
  const data = await response.json();
  console.log(data);
  return data;
}
