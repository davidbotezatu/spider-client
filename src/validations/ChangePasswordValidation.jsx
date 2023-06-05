import * as yup from "yup";

const ChangePasswordValidation = yup.object().shape({
  oldPassword: yup.string().required("Câmp obligatoriu"),
  newPassword: yup
    .string()
    .required("Câmp obligatoriu")
    .min(8, "Parola trebuie să aibă minim 8 caractere.")
    .max(32, "Parola trebuie să aibă maxim 32 caractere.")
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Parola trebuie să aibă minim un număr, o literă mică, o literă mare și un caracter special. "
    ),
  retypePassword: yup
    .string()
    .required("Câmp obligatoriu")
    .oneOf(
      [yup.ref("newPassword")],
      "Parola trebuie să fie identică cu cea de mai sus."
    ),
});

export default ChangePasswordValidation;
