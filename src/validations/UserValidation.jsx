import * as yup from "yup";

const UserValidation = yup.object().shape({
  email: yup
    .string()
    .required("Câmp obligatoriu")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Adresa de email este invalidă"
    ),
  parola: yup
    .string()
    .nullable()
    .notRequired()
    .min(8, "Parola trebuie să aibă minim 8 caractere.")
    .max(32, "Parola trebuie să aibă maxim 32 caractere.")
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Parola trebuie să aibă minim un număr, o literă mică, o literă mare și un caracter special. "
    ),
  nume: yup.string().required("Câmp obligatoriu"),
  prenume: yup.string().required("Câmp obligatoriu"),
  rol: yup.string().required("Câmp obligatoriu"),
});

export default UserValidation;
