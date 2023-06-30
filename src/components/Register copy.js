import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = ({ setAuthToken }) => {
  const navigate = useNavigate();
  // const [email, setUsername] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regResponse, setRegResponse] = useState("");

  const DB_NAME = "Git-Baked";
  const DB_URL =
    process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();

      if (!json.error) {
        setAuthToken(json.token);
        window.localStorage.setItem("st-token", json.token);
        setRegResponse(json.message);

        navigate("/");
      } else {
        setRegResponse(json.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="content">
        <h2>Register</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="reg-form"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="outlined-required"
            label="email"
            className="reg-form-elem"
            value={email}
            onChange={handleEmail}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            className="reg-form-elem"
            value={password}
            onChange={handlePassword}
          />
          <Button className="reg-form-elem" type="submit" variant="contained">
            Register
          </Button>
          <h4>{regResponse ? regResponse : ""}</h4>
        </Box>
      </div>
    </div>
  );
};

export default Register;
