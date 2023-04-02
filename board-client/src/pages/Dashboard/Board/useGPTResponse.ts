import { useEffect, useState, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { BASE_URL } from "@/apis/constants";
import { useUpdateCard, useShowCard } from "hooks/requests/useBoardApi";
import { PromptProps } from ".";

const useGPTResponse = (prompt: PromptProps) => {
  const { data: card } = useShowCard(prompt.cardId);
  const [chatGPTResponse, setChatGPTResponse] = useState("");
  const { mutate: updateCard } = useUpdateCard();

  const chatGPTResponseRef = useRef(chatGPTResponse);

  useEffect(
    () => setChatGPTResponse(card?.completion ?? ""),
    [prompt.taskId, card]
  );

  useEffect(() => {
    if (!prompt.taskId || !prompt.cardId || !card) return;

    const fetchData = async () =>
      await fetchEventSource(
        `${BASE_URL}/cards/stream/?task_id=${prompt.taskId}&card_id=${prompt.cardId}`,
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("accessToken"),
          },
          onmessage({ data }) {
            setChatGPTResponse((response) => response + data);
            chatGPTResponseRef.current += data;
          },
          onclose() {
            if (chatGPTResponse.current?.includes("Internal server error"))
              return;
            updateCard({
              id: prompt.cardId,
              payload: { completion: chatGPTResponseRef.current },
            });
          },
          onerror(err) {
            console.log("There was an error from server", err);
          },
        }
      );
    !card.completion && fetchData();
  }, [prompt, card]);

  return { chatGPTResponse, setChatGPTResponse };
};

export default useGPTResponse;
