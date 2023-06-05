import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskValidation } from "../validations";

Modal.setAppElement("#root");

const TaskModal = ({ isOpen, closeModal, onSubmit, editTask }) => {
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TaskValidation) });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error TaskModal - fetchUsers:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/task-status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setStatuses(res.data);
    } catch (error) {
      console.error("Error TaskModal - fetchStatuses:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStatuses();

    if (editTask) {
      reset({
        titlu: editTask.titlu,
        descriere: editTask.descriere,
        status: editTask.status,
        assignee: editTask.assignee,
      });
    } else {
      reset({
        titlu: "",
        descriere: "",
        status: 1,
        assignee: 1,
      });
    }
  }, [editTask, reset]);

  const submitForm = async (data) => {
    try {
      const formData = {
        titlu: data.titlu,
        descriere: data.descriere,
        status: data.status,
        assignee: data.assignee,
        reporter: localStorage.getItem("user_id"),
        idProiect: localStorage.getItem("project_id"),
      };

      if (editTask) {
        const res = await axios.put(
          `${API_BASE_URL}/api/tasks/${editTask.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/tasks`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      }
      closeModal();
      onSubmit(formData);
    } catch (error) {
      console.error("Eroare TaskModel - submitForm():", error);
    }
  };

  const getAssigneeList = () => {
    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {`${user.nume} ${user.prenume}`}
      </option>
    ));
  };

  const getReporter = () => {
    const usrId = localStorage.getItem("user_id");
    const us = users.find((user) => user.id == usrId);
    return us ? `${us.nume} ${us.prenume}` : "";
  };

  const getTaskStatusList = () => {
    return statuses.map((s) => (
      <option key={s.id} value={s.id}>
        {s.status}
      </option>
    ));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel={editTask ? "Editare task" : "Adăugare task nou"}
      className="absolute left-0 top-0 z-50 box-border grid h-full w-full place-items-center overflow-y-auto bg-opacity-50 px-[40px] py-[40px] duration-300"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="relative z-50 w-4/5 max-w-[1000px] rounded-md bg-white px-8 py-6 shadow-lg duration-300">
        <div className="flex">
          <span className=" flex flex-grow items-center">
            <h1 className=" ml-1">
              {editTask ? "Editare task" : "Adăugare task nou"}
            </h1>
          </span>
          <button
            className="ml-3 flex cursor-pointer rounded border-none p-1 text-gray-500 hover:bg-gray-700"
            onClick={closeModal}
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-5 gap-16">
            <section className=" col-span-3">
              <div className="relative">
                <textarea
                  name="titlu"
                  className="hover:bg-grey-300 box-border w-full resize-none overflow-y-hidden rounded-md border p-3 text-2xl outline-2 focus-visible:bg-white"
                  cols="30"
                  rows="1"
                  placeholder="Adaugă titlul task-ului"
                  {...register("titlu")}
                ></textarea>
              </div>
              <div className="">
                <div className="relative">
                  <textarea
                    name="descriere"
                    className="hover:bg-grey-300 box-border w-full resize-none overflow-y-hidden rounded-md border p-3 outline-2 focus-visible:bg-white"
                    cols="30"
                    rows="10"
                    placeholder="Adaugă o descriere"
                    {...register("descriere")}
                  ></textarea>
                </div>
              </div>
            </section>
            <section className="col-span-2 space-y-10">
              {/** Status + validari */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register("status")}
                >
                  {getTaskStatusList()}
                </select>
                {errors.status && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/** Assignee + validari */}
              <div>
                <label
                  htmlFor="assignee"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Assignee
                </label>
                <select
                  name="assignee"
                  id="assignee"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register("assignee")}
                >
                  {getAssigneeList()}
                </select>
                {errors.assignee && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.assignee.message}
                  </p>
                )}
              </div>

              {/** Reporter + validari */}
              <div>
                <label
                  htmlFor="reporter"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reporter
                </label>
                <input
                  type="text"
                  name="reporter"
                  id="reporter"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  disabled
                  value={getReporter()}
                  {...register("reporter")}
                />
              </div>
            </section>
          </div>
          <div className="mt-6 grid grid-cols-3 items-end">
            <span></span>
            <button
              type="submit"
              className="w-full items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Continuă
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;
