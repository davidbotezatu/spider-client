import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";
import { userValidation } from "../validations";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

Modal.setAppElement("#root");

const UserModal = ({ isOpen, closeModal, onSubmit, editUser }) => {
  const avatarPath = "/src/assets/avatar.png";
  const [roles, setRoles] = useState([]);
  const [avatar, setAvatar] = useState(avatarPath);
  const [mustResetPassword, setMustResetPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidation),
    defaultValues: {
      parola: null,
    },
  });

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/userroles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const rolesData = response.data;
      setRoles(rolesData);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();

    if (editUser) {
      reset({
        nume: editUser.nume,
        prenume: editUser.prenume,
        email: editUser.email,
        rol: editUser.rol,
        parola: null,
      });
      setAvatar(editUser.avatar);
    } else {
      setAvatar(avatarPath);
      reset({
        avatar: avatar,
        nume: "",
        prenume: "",
        email: "",
        rol: 1,
        parola: null,
      });
    }
  }, [editUser, reset]);

  const submitForm = async (data) => {
    try {
      const formData = {
        nume: data.nume,
        prenume: data.prenume,
        email: data.email,
        avatar: avatar,
        parola: data.parola === "" ? null : data.parola,
        rol: parseInt(data.rol),
        schimbaParola: mustResetPassword,
      };

      if (editUser) {
        const response = await axios.put(
          `${API_BASE_URL}/api/users/${editUser.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } else {
        // Send the POST request to create a new user
        const response = await axios.post(
          `${API_BASE_URL}/api/users`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      }
      closeModal();
      onSubmit(formData);
    } catch (error) {
      console.error("Eroare creare utilizator nou: ", error);
      setErrorMessage("Adresa de email este utilizată");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel={editUser ? "Editare utilizator" : "Adăugare utilizator nou"}
      className="modal fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="modal-content z-50 rounded-lg bg-white p-4">
        <div className="mb-4 flex justify-between">
          <h1 className="mr-4 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            {editUser ? "Editare utilizator" : "Adăugare utilizator nou"}
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
                  Introdu numele utilizatorului
                </label>
                <input
                  type="text"
                  name="nume"
                  id="nume"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Popescu"
                  {...register("nume")}
                />
                {errors.nume && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.nume.message}
                  </p>
                )}
              </div>

              {/** Prenume + validari */}
              <div>
                <label
                  htmlFor="prenume"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu prenumele utilizatorului
                </label>
                <input
                  type="text"
                  name="prenume"
                  id="prenume"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Ion"
                  {...register("prenume")}
                />
                {errors.prenume && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.prenume.message}
                  </p>
                )}
              </div>

              {/** Adresa de email + validari */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu adresa de email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="nume.prenume@companie.ro"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.email.message}
                  </p>
                )}
                {errorMessage && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/** Parola + validari */}
              {editUser && (
                <div>
                  <label
                    htmlFor="parola"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Introdu parola contului
                  </label>
                  <input
                    type="password"
                    name="parola"
                    id="parola"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    {...register("parola")}
                  />
                  {errors.parola && (
                    <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                      {errors.parola.message}
                    </p>
                  )}
                </div>
              )}

              {/** Rol utilizator */}
              <div>
                <label
                  htmlFor="rol"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Selecteaza rolul utilizatorului
                </label>
                <select
                  name="rol"
                  id="rol"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register("rol")}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.nume}
                    </option>
                  ))}
                </select>
                {errors.rol && (
                  <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                    {errors.rol.message}
                  </p>
                )}
              </div>

              {/** Reseteaza parola la login */}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="changePass"
                    aria-describedby="changePass"
                    type="checkbox"
                    checked={mustResetPassword}
                    onChange={() => setMustResetPassword(!mustResetPassword)}
                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="changePass"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Schimbă parola la login
                  </label>
                </div>
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

export default UserModal;
