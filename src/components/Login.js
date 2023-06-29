import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const Login = ({ setAuthToken, isLoggedIn, setIsLoggedIn }) => {
    const DB_NAME = 'Git-Baked';
    const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
    // console.log("BASE_URL = ", `${DB_URL}` );
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginResponse, setLoginResponse] = useState('');

    useEffect(() => {
        if (isLoggedIn) navigate("/")
      }, []);

    const handleemail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

       

        try {
            const response = await fetch(`${DB_NAME}/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        email: email,
                        password: password
                })
            })
            const json = await response.json()
                       
            console.log("json:", json);
            if(!json.error) {
                console.log("token:", json.token);
                setAuthToken(json.token)
                window.localStorage.setItem('st-token', json.token)
                setLoginResponse(json.message)
                
                navigate('/');
            } else {
                setLoginResponse(json.error);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
      <div>
        <div className='content'>
            <h2>Login</h2>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className='reg-form'
                onSubmit={handleSubmit}
            >            
                <TextField
                    required
                    id="outlined-required"
                    label="email"
                    className='reg-form-elem'
                    value={email}
                    onChange={handleemail}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    className='reg-form-elem'
                    value={password}
                    onChange={handlePassword}
                />
              
                <Button className='reg-form-elem' type='submit' variant="contained" >Log in</Button>
                <h4>{loginResponse ? loginResponse : ''}</h4>
            </Box>
        </div>
      </div>
    );
  }
  
export default Login;