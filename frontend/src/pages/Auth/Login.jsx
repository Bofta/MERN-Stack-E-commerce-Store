import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate }  from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth); // get user info from redux state

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);



  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        </div>
        
      </section>
    </div>
  )
}

export default Login;
