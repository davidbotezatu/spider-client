import logo from "../assets/spider.svg";
import { userValidation } from "../validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  {
    /** Use form + yup resolvers */
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userValidation) });

  const submitForm = (data) => {
    console.log(data);
  };

  {
    /** Page */
  }
  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Link
          to="/"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mr-2 h-8 w-8" src={logo} alt="logo" />
          Spider
        </Link>
        <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Ai uitat parola?
          </h2>

          {/** Formular resetare parola */}
          <form
            className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
            action="#"
            onSubmit={handleSubmit(submitForm)}
          >
            {/** Adresa de email + validari */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Introdu adresa ta de email. Vei primi un link pentru resetarea
                parolei.
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

            {/** Buton submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Resetează parola
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
