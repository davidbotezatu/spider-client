import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStateContext } from "../contexts/ContextProvider";

import axios from "axios";
import logo from "../assets/spider.svg";
import validation from "../validations/LoginValidation";
import API_BASE_URL from "../assets/ApiConfig";

const Login = () => {
  const { login } = useStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

  const submitForm = async (data) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth`, data);
      if (res.status === 200) {
        const { id, accessToken, avatar, email, nume, prenume, rol } = res.data;
        localStorage.setItem("user_id", id);
        localStorage.setItem("user_avatar", avatar);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_nume", nume);
        localStorage.setItem("user_prenume", prenume);
        localStorage.setItem("user_rol", rol);
        login(accessToken);
      } else {
        console.error("Login esuat");
      }
    } catch (error) {
      console.error("Eroare login:", error);
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <span className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="mr-2 h-8 w-8" src={logo} alt="logo" />
          Spider
        </span>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Intră în cont
            </h1>

            {/** Formular login */}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(submitForm)}
            >
              {/** Adresa de email + validari */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Introdu adresa ta de email
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
              </div>

              {/** Parola + validari */}
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

              {/** RemeberMe + Forgot Password */}
              <div className="flex items-center justify-between">
                {/** Link resetare parola */}
                <Link
                  to="/resetpass"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Ai uitat parola?
                </Link>
              </div>

              {/** Buton submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Continuă
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
