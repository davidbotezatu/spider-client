import * as yup from "yup";

const ProjectValidation = yup.object().shape({
  nume: yup.string().required("Câmp obligatoriu"),
  descriere: yup.string().nullable().notRequired(),
  responsabil: yup.string().required("Câmp obligatoriu"),
});

export default ProjectValidation;
