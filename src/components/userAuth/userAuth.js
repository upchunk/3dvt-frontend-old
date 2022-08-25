import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toHeaderCase } from "js-convert-case";
import "./userAuth.css";
import * as api from "../../utils/api";
import { setJwtToken } from "../../redux/userConfig";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import Card from "../common/card/card";

export default function LoginAndRegister({ page }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [requestBody, setRequestBody] = useState({});

  sessionStorage.clear();

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === "Enter") {
      if (page === "login" && requestBody) {
        handleLogin();
      } else if (requestBody) handleRegister();
    }
  };

  async function handleLogin() {
    api.jwtauthenticate(requestBody).then((res) => {
      if (res.data.access) {
        dispatch(setJwtToken(res.data));
        navigate("../");
      }
    });
  }

  async function handleRegister() {
    api.deleteAuthHeader();
    api.Register(requestBody).then((response) => {
      if (response) {
        dispatch(setErrSeverity("success"));
        dispatch(setErrMessage(response.statusText));
        dispatch(setErrCatch(true));
        navigate("../login");
      }
    });
  }

  const Login = (
    <>
      <FormControl sx={{ marginBottom: 1 }} fullWidth>
        <TextField
          className="white soften"
          type="string"
          variant="outlined"
          placeholder="Username"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, username: e.target.value })
          }
        />
        <TextField
          className="white soften"
          type="password"
          placeholder="Password"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, password: e.target.value })
          }
        />
      </FormControl>
      <div className="center-text">
        <p>
          <Link to="/register">Click Here</Link> to Register
        </p>
      </div>
    </>
  );

  const Register = (
    <div>
      <FormControl sx={{ marginBottom: 1 }} fullWidth>
        <TextField
          className="white soften"
          size="small"
          type="string"
          variant="outlined"
          placeholder="Username"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, username: e.target.value })
          }
        />
        <TextField
          className="white soften"
          size="small"
          type="password"
          placeholder="Password"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, password: e.target.value })
          }
        />
        <TextField
          className="white soften"
          size="small"
          type="password"
          placeholder="Password"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, password2: e.target.value })
          }
        />
        <TextField
          className="white soften"
          size="small"
          type="email"
          placeholder="Email Address"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, email: e.target.value })
          }
        />
        <TextField
          className="white soften"
          size="small"
          type="string"
          placeholder="First Name"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, first_name: e.target.value })
          }
        />
        <TextField
          className="white soften"
          size="small"
          type="string"
          placeholder="Last Name"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, last_name: e.target.value })
          }
        />
        <TextField
          className="white soften"
          size="small"
          type="password"
          placeholder="Ask Admin for Referral Code"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, referral_code: e.target.value })
          }
        />
      </FormControl>
      <div className="center-text">
        <p>
          <Link to="/login">Click Here</Link> to Login
        </p>
      </div>
    </div>
  );

  return (
    <Card className="wrapcard">
      <div>
        <span>
          <h3 className="textRow">{toHeaderCase(page)} </h3>
        </span>
        {page === "login" ? Login : Register}
        <div className="reversed-row">
          <Button
            variant="contained"
            onClick={page === "login" ? handleLogin : handleRegister}
            onKeyDown={detectKeyDown}
            sx={{ mt: 2, width: "100%" }}
          >
            {toHeaderCase(page)}
          </Button>
        </div>
      </div>
    </Card>
  );
}
