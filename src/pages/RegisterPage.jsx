import { useState,useEffect } from "react";
import { register } from "../services/api.service";
import { NavLink,useNavigate } from "react-router-dom";
import { isLoggedin } from "../services/auth.service";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  const [loginState, setLoginState]=useState(isLoggedin())


    useEffect(()=>{
    
           if (loginState) {
            navigate("/")
           }
    
        },[])


  async function handleRegister(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      let response = await register({
        username,
        email,
        password,
      });
      console.log(response.data);
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
    // alert("Registration successful!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Register to get started
        </p>
        <p>{message ? message : ""}</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              UserName
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
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

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
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            {isLoading ? "..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <NavLink
            to="/login"
            className="ml-1 font-semibold text-indigo-600 hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
