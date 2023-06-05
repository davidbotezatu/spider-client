import { Draggable } from "react-beautiful-dnd";
import { useStateContext } from "../contexts/ContextProvider";

const TaskCard = ({ task, index }) => {
  const { statusColors } = useStateContext();
  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div
          className={`m-2 rounded bg-white p-2 shadow-sm ${
            statusColors[task.status]
          } border-l-4`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center">
            <img
              src={task.assigneeName.avatar}
              className="h-10 w-10 rounded-full"
              alt="Assignee Avatar"
            />
            <div className="ml-2">
              <p className="font-medium">"{task.titlu}"</p>
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                {task.assigneeName.nume}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
