import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify

type FormData = {
  email: string;
  password: string;
};

export default function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitHandler: SubmitHandler<FormData> = (data) => {
    // Here you can add your login logic.
    console.log('Username:', data.email);
    console.log('Password:', data.password);
  };

  return (
    <div className="flex justify-end h-screen bg-slate-100">
      <div className="ml-32 flex justify-center items-center">
        <img
          src="https://www.foundit.in/rio/public/images/login-illustration.png"
          alt="Img"
          className="w-80"
        />
      </div>
      <div className="flex justify-center items-center w-1/2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="w-96 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-24 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 flex justify-center items-center mx-auto"
            >
              Login
            </button>
          </form>
          {/* ... */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
