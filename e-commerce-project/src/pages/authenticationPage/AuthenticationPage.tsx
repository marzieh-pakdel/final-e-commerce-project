import AuthenticationCard from "../../components/generalComponents/authenticationComponents/Authentication";
import RegisterForm from "../../components/generalComponents/authenticationComponents/registerForm/RegisterForm";
import LoginForm from "../../components/generalComponents/authenticationComponents/loginForm/LoginForm";
import auth_login_pic from "../../assets/images/auth-light-mode.jpg";
import { useLocation } from "react-router-dom";

const AuthenticationPage = () => {
  const location = useLocation();

  return (
    <div className="flex">
      <AuthenticationCard>
        {location.pathname === "/login" ? (
          <LoginForm />
        ) : location.pathname === "/register" ? (
          <RegisterForm />
        ) : (
          <h1>not found</h1>
        )}
        <div className="w-[80%]">
          <img
            className="w-full h-full rounded-2xl"
            src={auth_login_pic}
            alt=""
          />
        </div>
      </AuthenticationCard>
    </div>
  );
};

export default AuthenticationPage;
