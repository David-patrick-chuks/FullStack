import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/preloader/Loader";

export function Signup() {
  const Navigate = useNavigate();
  const [serverResponse, setServerResponse] = useState(null);
  const [loading, setloading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "password should be more than 5 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setloading(true);
      const response = await fetch("http://localhost:7000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      setServerResponse(result);
      if (response.ok) {
        localStorage.setItem("userCredentials", JSON.stringify(values));
        setTimeout(() => {
          Navigate("/profile");
        }, 2000);
      } else {
        setTimeout(() => {
          setloading(false);
          console.log(result.message);
        }, 2000);
      }
      // resetForm();
    } catch (error) {
      setloading(false);
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      // setloading(false);
    }
  };
  //   if (loading) {
  //   return <Spinner />
  // }
  const handleSigninPage = () => {
    setloading(true);
    setTimeout(() => {
      Navigate("login");
    }, 2000);
  };
  return (
    <>
      {loading && (
        <div className="absolute top-0 w-screen h-[100dvh] z-50">
          <Spinner />
        </div>
      )}
      <Card
        className={`p-4 bg-blue-50 ${loading && "opacity-15"}`}
        shadow={true}
      >
        <Typography
          className="font-semibold pop"
          variant="h4"
          color="blue-gray"
        >
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 pop font-normal">
          Welcome to FoodConnect{" "}
        </Typography>

        {serverResponse && (
          <div className="mb-4 p-2 bg-red-100 border border-green-200 rounded">
            <Typography className="pop text-center font-normal">
              {serverResponse.message}
            </Typography>
            {/* <Typography color="green">
              Data: {JSON.stringify(serverResponse.data)}
            </Typography> */}
          </div>
        )}

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-5">
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className=" mb-2 pop"
                  >
                    Your Name
                  </Typography>
                  <Input
                    autoComplete="off"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="lg"
                    placeholder="Your Name"
                    className="  !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {errors.name && touched.name && (
                    <div className=" text-xs text-red-400">{errors.name}</div>
                  )}
                </div>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 pop"
                  >
                    Your Email
                  </Typography>
                  <Input
                    autoComplete="off"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="lg"
                    placeholder="Your Email"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-400 text-xs">{errors.email}</div>
                  )}
                </div>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="pop mb-2"
                  >
                    Password
                  </Typography>
                  <Input
                    name="password"
                    type="password"
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="lg"
                    placeholder="Password"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {errors.password && touched.password && (
                    <div className="text-xs text-red-400">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="mt-6"
                color="blue"
                fullWidth
                disabled={isSubmitting}
              >
                Sign up
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={handleSigninPage}
                  className="font-medium text-gray-900"
                >
                  Sign In
                </a>
              </Typography>
            </form>
          )}
        </Formik>
      </Card>
    </>
  );
}
