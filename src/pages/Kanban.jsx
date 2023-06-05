import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../assets/ApiConfig";
import { DragDropContext } from "react-beautiful-dnd";
import { StatusColumn } from "../components";

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const fetchStatuses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/task-status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStatuses(res.data);
    } catch (error) {
      console.error("Error Kanban - fetchStatuses:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks`, {
        params: {
          pid: localStorage.getItem("project_id"),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error Kanban - fetchTasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStatuses();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      // moved to a different status, you'll need to update the task's status in your state
      const updatedTasks = tasks.map((task) =>
        task.id === parseInt(draggableId)
          ? { ...task, status: parseInt(destination.droppableId) }
          : task
      );
      setTasks(updatedTasks);

      // Update the task's status in the database
      const taskToUpdate = tasks.find(
        (task) => task.id === parseInt(draggableId)
      );
      const updatedTask = {
        ...taskToUpdate,
        status: parseInt(destination.droppableId),
      };

      try {
        await axios.put(
          `${API_BASE_URL}/api/tasks/${updatedTask.id}`,
          updatedTask,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  return (
    <div className="flex h-full flex-grow flex-col overflow-hidden pb-5">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Kanban</h1>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-grow overflow-x-auto">
          {statuses.map((status) => (
            <StatusColumn
              key={status.id}
              status={status}
              tasks={tasks.filter((task) => task.status === status.id)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
