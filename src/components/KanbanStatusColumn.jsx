import TaskCard from "./KanbanTaskCard";
import { Droppable } from "react-beautiful-dnd";
import { useStateContext } from "../contexts/ContextProvider";

const StatusColumn = ({ status, tasks }) => {
  const { statusColors } = useStateContext();

  return (
    <Droppable key={status.id} droppableId={`${status.id}`}>
      {(provided) => (
        <div
          className="m-2 flex w-60 flex-col overflow-hidden rounded bg-gray-200"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2
            className={`sticky top-0 z-10 bg-gray-300 p-2 ${
              statusColors[status.id]
            } border-l-4`}
          >
            {status.status}
          </h2>
          <div className="flex-grow overflow-y-auto">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default StatusColumn;
