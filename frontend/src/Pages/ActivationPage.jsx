import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white"); // default background color

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          const res = await axios.post(`${server}/auth/activation`, {
            activation_token,
          });
          console.log(res);
          setBackgroundColor("lightgreen"); // set background to green on success
        } catch (err) {
          setError(true);
          setBackgroundColor("lightcoral"); // set background to red on error
        }
      };
      sendRequest();
    }
  }, [activation_token]); // Add activation_token to the dependency array

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor, // apply background color
      }}
    >
      {error ? (
        <p>
          <b>Your token is expired</b>
        </p>
      ) : (
        <p>
          <b>Your account has been created successfully</b>
        </p>
      )}
    </div>
  );
};

export default ActivationPage;
