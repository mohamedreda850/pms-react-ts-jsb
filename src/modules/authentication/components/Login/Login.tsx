import styles from "./Login.module.css";
import imgLogo from "./../../../../assets/images/PMSLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AUTH_URL, axiosInstance, axiosInstanceUrl } from "../../../../services/EndPoints";
import { useState } from "react";
import { EMAIL_VALIDATION, PASWORD_VALIDATION } from '../../../../services/Validation/Validation';


interface loginForm {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginForm>();

  const onSubmit = async (data: loginForm) => {
    try {
      const response = await axiosInstanceUrl.post(AUTH_URL.LOGIN, data);
      localStorage.setItem("tokenums", response.data.token);
      console.log(response);
      navigate("/dashboard")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles["containerImg"]}`}>
      <div>
        <img src={imgLogo} alt="" />
      </div>
      <div className={`${styles["fromContainer"]} col-lg-6 col-md-8 mt-3`}>
        <p className="">welcome to PMS</p>
        <h1>
          {" "}
          <u>L</u>ogin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles["input-group"]} mt-5 mb-3`}>
            <input
              type="text"
              className={`${styles["inbut"]} form-control`}
              placeholder="Email"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register("email", EMAIL_VALIDATION)}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className={`${styles["input-group"]} mb-3`}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className={`${styles["inbut"]} form-control`}
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", PASWORD_VALIDATION)}
            />
            <button
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              
              className={`${styles["visbiltyIcon"]} `}
              
            >
              {isPasswordVisible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
            {errors.password && (
              <span className="text-danger ">{errors.password.message}</span>
            )}
          </div>
          <div className="links d-flex justify-content-between">
            <Link to="/register" className="text-decoration-none text-white">
              Register Now ?
            </Link>
            <Link
              to="/forget-password"
              className="text-decoration-none text-white"
            >
              Forget Password ?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles["login-btn"]} btn  btn-lg`}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
