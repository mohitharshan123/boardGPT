import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { BASE_URL } from "@/apis/constants";
import { PromptProps } from ".";

const useGPTResponse = (prompt: PromptProps) => {
  const [chatGPTResponse, setChatGPTResponse] = useState("");

  useEffect(() => {
    if (!prompt.taskId || !prompt.cardId) return;
    const fetchData = async () =>
      await fetchEventSource(
        `${BASE_URL}/cards/stream/?task_id=${prompt.taskId}&card_id=${prompt.cardId}`,
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("accessToken"),
          },
          onmessage({ data }) {
            setChatGPTResponse((response) => response + data);
          },
          onclose() {
            console.log("Connection closed by the server");
          },
          onerror(err) {
            console.log("There was an error from server", err);
          },
        }
      );
    fetchData();
  }, [prompt]);

  return { chatGPTResponse, setChatGPTResponse };
};

export default useGPTResponse;
