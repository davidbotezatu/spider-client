import React from "react";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";
import { useEffect, useState } from "react";
import { Pagination } from "../components";
import { TaskModal } from "../modals";
import { useStateContext } from "../contexts/ContextProvider";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubmitted, setisModalSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { currentPage, setTotalPages } = useStateContext();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks`, {
        params: {
          page: currentPage,
          limit: 9,
          sortBy: "asc",
          pid: localStorage.getItem("project_id"),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Eroare fetchTasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isModalSubmitted, currentPage, isDeleted]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalSubmit = () => {
    setisModalSubmitted(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    toggleModal();
  };

  const handleAddTask = () => {
    setEditTask(null);
    toggleModal();
  };

  const handleDeleteTask = async (task) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setIsDeleted(!isDeleted);
    } catch (error) {
      console.error("Tasks - handleDeleteTask error:", error);
    }
  };

  const renderTaskRow = () => {
    return tasks.map((task) => {
      return (
        <tr
          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
          key={task.id}
        >
          <td className="whitespace-nowrap px-6 py-4">{task.titlu}</td>
          <td className="whitespace-nowrap px-6 py-4">
            <div className="flex items-center">
              <img
                src={task.reporterName.avatar}
                alt="Avatar"
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-3">{`${task.reporterName.nume} ${task.reporterName.prenume}`}</span>
            </div>
          </td>
          <td className="whitespace-nowrap px-6 py-4">
            <button
              className="mr-5 w-28 rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-700"
              onClick={() => handleEditTask(task)}
            >
              Modifică
            </button>
            <button
              className={`w-28 rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-700`}
              onClick={() => handleDeleteTask(task)}
            >
              Șterge
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center text-xl font-semibold">Backlog</h1>
        <button
          className="rounded-md bg-blue-500 px-3 py-1 text-white"
          onClick={() => handleAddTask()}
        >
          Adăugare
        </button>
      </div>

      {tasks.length > 0 ? (
        <div className="flex flex-col">
          <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className=" overflow-hidden">
                <table className=" min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Titlu
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Reporter
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>{renderTaskRow()}</tbody>
                </table>
              </div>
            </div>
          </div>

          {/** Paginare */}
          <Pagination />
        </div>
      ) : (
        <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
          Nu există task-uri.
        </p>
      )}

      <TaskModal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        onSubmit={handleModalSubmit}
        editTask={editTask}
      />
    </div>
  );
};

export default Tasks;
