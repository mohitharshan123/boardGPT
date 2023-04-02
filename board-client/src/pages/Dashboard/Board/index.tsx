import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Button } from "antd";

import { useGetBoard, useCreateCard } from "hooks/requests/useBoardApi";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextArea from "@/components/TextArea";

type DragEndProps = {
  destination: any;
  source: any;
  tasks: Array<any>;
  setTasks: React.Dispatch<React.SetStateAction<Array<any>>>;
};

const Board = () => {
  const [isAddCardInputOpen, setIsAddCardInputOpen] = useState<any>({});

  const { data: { tasks } = {}, isLoading, setTasks } = useGetBoard();
  const { mutate: createTask, isLoading: isCreatingTask } = useCreateCard();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const handleCreateCard = (taskId: string, values: FieldValues) => {
    createTask(
      {
        task: taskId,
        text: values?.prompt,
        order: tasks.find(({ id }) => id === taskId).cards.length,
      },
      {
        onSuccess: () => {
          setIsAddCardInputOpen({ [taskId]: false });
          reset({ prompt: "" });
        },
      }
    );
  };

  const handleDragEnd = ({
    destination,
    source,
    tasks,
    setTasks,
  }: DragEndProps) => {
    if (!tasks.length) return;
    let tasksClone = tasks;
    if (
      !destination ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    )
      return;
    const itemMoved = {
      ...tasks[Number(source.droppableId) - 1].cards[source.index],
    };

    tasksClone[Number(source.droppableId) - 1].cards.splice(source.index, 1);
    tasksClone[Number(destination.droppableId) - 1].cards.splice(
      destination.index,
      0,
      itemMoved
    );
    setTasks(tasksClone);
  };

  return (
    <div className="container flex flex-row bg-white p-2 shadow-md overflow-x-auto">
      <DragDropContext
        onDragEnd={({ destination, source }: any) =>
          handleDragEnd({ destination, source, tasks, setTasks })
        }
      >
        {tasks?.map((task: any) => (
          <div
            className="flex flex-row shadow-md rounded-lg w-full p-4 m-2 bg-gray-200 h-screen"
            key={task.id}
          >
            <div className="flex flex-col w-80">
              <div className="flex flex-row justify-between">
                <span className="font-bold text-lg">{task.prompt}</span>
                {!!isAddCardInputOpen[task.id] ? (
                  <AiOutlineMinusCircle
                    className="cursor-pointer"
                    size={30}
                    onClick={() => {
                      setIsAddCardInputOpen({ [task.id]: false });
                      reset({ prompt: "" });
                    }}
                  />
                ) : (
                  <BiMessageSquareAdd
                    className="cursor-pointer"
                    size={30}
                    onClick={() => setIsAddCardInputOpen({ [task.id]: true })}
                  />
                )}
              </div>
              {isAddCardInputOpen[task.id] && (
                <div className="flex flex-col space-y-2">
                  <form
                    onSubmit={handleSubmit((data) =>
                      handleCreateCard(task.id, data)
                    )}
                  >
                    <TextArea
                      name="prompt"
                      rows={4}
                      placeholder="Enter prompt"
                      rules={{ required: "Prompt is required" }}
                      control={control}
                      errors={errors}
                    />
                    <div className="flex flex-row space-x-2 mt-4">
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAddCardInputOpen({ [task.id]: false });
                          reset({ prompt: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              <Droppable droppableId={task?.id?.toString()}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="h-screen overflow-y-scroll no-scrollbar pb-10"
                  >
                    {task.cards?.map((card: any, index: number) => (
                      <Draggable
                        key={card.id}
                        draggableId={card?.id?.toString()}
                        index={index}
                        className="flex flex-col w-full"
                      >
                        {(provided: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex rounded-xl shadow-lg p-4 h-40 w-full bg-white mt-4"
                          >
                            <p>{card.text}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Board;
