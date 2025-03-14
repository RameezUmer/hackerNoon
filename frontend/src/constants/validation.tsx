import * as Yup from "yup";
export const validationSchemaSignUp = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Enter a Valid Email"),
  password: Yup.string().required("Password is required")
  .min(6,"Password Must be 6 character long")
  .max(15,"Password Must be less than 15 characters")

})
