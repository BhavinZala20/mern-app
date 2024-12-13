import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../Styles/styles";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(`${server}/auth/forgot-password`, {
        email,
        password,
      });

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
              />
            </div>
            <div>
              <TextField
                type={visible ? "text" : "password"}
                label="New Password"
                variant="outlined"
                size="small"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your new password"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setVisible(!visible)}>
                      {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </IconButton>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                type={visible ? "text" : "password"}
                label="Confirm Password"
                variant="outlined"
                size="small"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your confirm password"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setVisible(!visible)}>
                      {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
