import * as yup from "yup";

const TaskValidation = yup.object().shape({
  titlu: yup.string().required("Câmp obligatoriu"),
  status: yup.string().required("Câmp obligatoriu"),
  assignee: yup.string().required("Câmp obligatoriu"),
});

export default TaskValidation;
