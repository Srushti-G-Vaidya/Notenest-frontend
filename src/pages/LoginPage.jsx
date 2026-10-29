import { useState,useEffect } from "react";
import { login } from "../services/api.service";
import { NavLink , useNavigate} from "react-router-dom";
import { isLoggedin } from "../services/auth.service";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);    
  const [loginState, setLoginState]=useState(isLoggedin())
  
  const [message, setMessage] = useState("");
  const navigate=useNavigate()



     useEffect(()=>{
  
         if (loginState) {
          navigate("/")
         }
  
      },[])
  

  async function handleLogin(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      let response = await login({
        username,
        password,
      });

      console.log(response.data);
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("isLoggedin", true)
      localStorage.setItem("username",username)
      // setMessage(response.data.message);
      navigate("/")
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Welcome Back!
        </h1>

        <p className="mb-8 text-center text-gray-500">Login to your account</p>

        <p className="mb-4 text-center text-sm text-gray-600">
          {message ? message : ""}
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Login Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <NavLink
            to="/register"
            className="ml-1 font-semibold text-indigo-600 hover:underline"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
