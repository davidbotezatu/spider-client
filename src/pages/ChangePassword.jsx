import logo from "../assets/spider.svg";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";
import { passwordValidation } from "../validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const ChangePassword = () => {
  const { logout } = useStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordValidation),
  });

  const submitForm = async (data) => {
    console.log(data);
    try {
      const formData = {
        email: localStorage.getItem("user_email"),
        parolaVeche: data.oldPassword,
        parolaNoua: data.newPassword,
      };

      const res = await axios.put(
        `${API_BASE_URL}/api/change-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("Password updated");
        logout();
      }
    } catch (error) {
      console.error("Eroare schimbare: ", error);
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <Link
          to="/"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mr-2 h-8 w-8" src={logo} alt="logo" />
          Spider
        </Link>
        <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Schimbare parolă
          </h2>

          {/** Formular schimbare parola */}
          <form
            className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
            onSubmit={handleSubmit(submitForm)}
          >
            {/** Div parola veche + validare si afisare erori */}
            <div>
              <label
                htmlFor="oldPassword"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Introdu parola veche
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                {...register("oldPassword")}
              />
              {errors.oldPassword && (
                <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            {/** Div parola noua + validare si afisare erori */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Introdu parola nouă
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/** Div confirmare parola noua + validare si afisare erori */}
            <div>
              <label
                htmlFor="retypePassword"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirmă parola
              </label>
              <input
                type="password"
                name="retypePassword"
                id="retypePassword"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                {...register("retypePassword")}
              />
              {errors.retypePassword && (
                <p className="mb-2 block text-sm font-medium text-red-600 dark:text-red-600">
                  {errors.retypePassword.message}
                </p>
              )}
            </div>

            {/** Buton de submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Schimbă parola
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
