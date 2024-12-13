import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
