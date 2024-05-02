import Navbar from '../components/Navbar'
import {useForm} from 'react-hook-form'
import axios from 'axios';

import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { authActions } from "../store/index";


export default function Login() {
  const  dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();

  const {register, handleSubmit} = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    await axios.post('http://localhost:8080/api/auth/signin', {
      username: data.username,
      password: data.password
    })
    .then(function (response) {
      console.log(response.data.email);
      setIsLoading(false)
      dispatch(authActions.login({ nemail: response.data.email , nusername: response.data.username, nid: response.data.id }))
      if(response.data.roles[0] == "ROLE_USER"){
        history("/user")
      }
      else if(response.data.roles[0] == "ROLE_MODERATOR"){
        history("/teacher")

      }
    })
    .catch(function (error) {
      console.log(error);
      setErrorMessage("Incorrect Username Or Password");
      setIsLoading(false);
    });
  }
  useEffect(()=> {
    if(!isLoggedIn){
      history("/login")
    }
  }, [isLoggedIn])

  
  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-10 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  {...register("username")}
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {errorMessage && <div class="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span class="block sm:inline">{errorMessage}</span>
              </div>}
            <div>
            {isLoading ?
              <button
               disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Loading..
              </button>
              :
              <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
              }
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a User?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Add New Account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
