import { Link, useNavigate } from "react-router-dom";
import styles from "../../User.module.css";
import { FormEvent, useState } from "react";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");

  function handleGoogleLogin() {
    window.location.href = 'http://localhost:8000/auth/google';
  }
  function handleFaceBookLogin() {
    window.location.href = 'http://localhost:8000/auth/facebook';
  }
  async function handleLogin(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();
    const userLogin = {
      email: email,
      password: password
    }
    axios.post("http://localhost:8000/auth", userLogin).then((data) => {
      if (data.data.status === 200) {
        localStorage.setItem("token", data?.data?.access_token)
        localStorage.setItem("username", JSON.stringify(data?.data?.user))
        setEmail("");
        setPassword("");
        setError({ email: "", password: "" });
        if(data.data.user.roleId==2) {
          navigate("/admin")
        } else {
          navigate("/")
        }
        
      } else  {
        setError({
          email: data.data.msg,
          password: "Email or password is not match",
        });
      }
    }).catch((error) => {
      console.log(error);
      setError({
        email: "Email or password is not match",
        password: "Email or password is not match",
      });
    });
  }

  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleLogin} action="" className={styles.formLogin}>
        <h1>LOG IN</h1>
        <p>Please enter your e-mail and password:</p>
        <div className={styles.inputLogin}><input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
        />
          <p className={styles.renderError}> {error.email}</p></div>
        <div className={styles.inputLogin}><input
          className={styles.lastinputt}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
        /><Link to="/auth/forgotpassword"><span className={styles.forgotpassword}>Forgot Password</span></Link>
          <p className={styles.renderError}> {error.password}</p></div>
        <div ><button className={styles.btnLoginGoogle} onClick={handleGoogleLogin}>Sign in with Google</button></div>
        <div ><button className={styles.btnLoginGoogle} onClick={handleFaceBookLogin}>Sign in with FaceBook</button></div>
        <input className={styles.btnLogin} type="submit" value="LOGIN" />
        <p>
          Don't have an account? <Link to="/auth/register">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
