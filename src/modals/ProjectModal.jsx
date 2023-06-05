import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";
import { ProjectValidation } from "../validations";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

Modal.setAppElement("#root");

const ProjectModal = ({ isOpen, closeModal, onSubmit, editProject }) => {
  const avatarPath = "/src/assets/proj_icon.png";
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState(avatarPath);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProjectValidation),
  });

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const usersData = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();

    if (editProject) {
      reset({
        nume: editProject.nume,
        descriere: editProject.descriere,
        responsabil: editProject.responsabil,
      });
      setAvatar(editProject.avatar);
    } else {
      setAvatar(avatarPath);
      reset({ avatar: avatar, nume: "", descriere: "", responsabil: 1 });
    }
  }, [editProject, reset]);

  const submitForm = async (data) => {
    try {
      const formData = {
        avatar: avatar,
        nume: data.nume,
        prenume: data.prenume,
        descriere: data.descriere,
        responsabil: parseInt(data.responsabil),
      };

      if (editProject) {
        const res = await axios.put(
          `${API_BASE_URL}/api/projects/${editProject.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } else {
        // Send the POST request to create a new project
        const res = await axios.post(`${API_BASE_URL}/api/projects`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      }
      closeModal();
      onSubmit(formData);
    } catch (error) {
      console.error("Eroare creare proiect nou: ", error);
      setErrorMessage("Numele este utilizat");
    }
  };

  const renderUserList = () => {
    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {`${user.nume} ${user.prenume}`}
      </option>
    ));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel={editProject ? "Editare proiect" : "Adăugare proiect nou"}
      className="modal fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="modal-content z-50 rounded-lg bg-white p-4">
        <div className="mb-4 flex justify-between">
          <h1 className="mr-4 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            {editProject ? "Editare proiect" : "Adăugare proiect nou"}
          </h1>
          <button className="text-gray-500" onClick={closeModal}>
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              {/* Avatar field */}
              <div>
                <label
                  htmlFor="avatar"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adaugă un avatar
                </label>
                <div className="flex items-center">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="mr-4 h-16 w-16 rounded-full"
                  />
                  <div>
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      onChange={handleAvatarChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/** Nume + validari */}
              <div>
                <label
                  htmlFor="nume"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu numele proiectului sau aplicației
                </label>
                <input
                  type="text"
                  name="nume"
                  id="nume"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Spider"
                  {...register("nume")}
                />
                {errors.nume && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.nume.message}
                  </p>
                )}
                {errorMessage && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/** Descriere + validari */}
              <div>
                <label
                  htmlFor="descriere"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu descrierea proiectului
                </label>
                <input
                  type="text"
                  name="descriere"
                  id="descriere"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Proiect de marketing"
                  {...register("descriere")}
                />
                {errors.descriere && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.descriere.message}
                  </p>
                )}
              </div>

              {/** Selectare project lead */}
              <div>
                <label
                  htmlFor="responsabil"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Selecteaza persoana responsabilă de proiect
                </label>
                <select
                  name="responsabil"
                  id="responsabil"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register("responsabil")}
                >
                  {renderUserList()}
                </select>
                {errors.responsabil && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.responsabil.message}
                  </p>
                )}
              </div>

              {/** Buton submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Continuă
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProjectModal;
