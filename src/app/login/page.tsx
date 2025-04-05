"use client";

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {toast, Toaster} from "sonner"
function Login() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    // name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = React.useState({
    // name: '',
    email: '',
    password: '',
  });

  const[loading,setLoading]=React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {
    //   name: '',
      email: '',
      password: '',
    };
    let isValid = true;

    // if (!formData.name.trim()) {
    //   newErrors.name = 'Name is required';
    //   isValid = false;
    // }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
      setLoading(true)
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('/api/users/login', formData); // replace with your actual API route
      if(res.success=true && res.status===200){
        setLoading(false)
        toast.success("User Login Sucessfully",{duration:2200})
          console.log('Signed up successfully:', res.data);
        setTimeout(()=>{
            router.push('/profile'); // navigate to login or dashboard

        },2000)
      }
    } catch (error: any) {
        const message = error.response?.data?.error || "Something Went Wrong "
        setLoading(false)
        toast.error(message,{duration:2200})
      console.error('Sign up error:', error.response?.data || error.message);    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl mt-[10%]">
      <h2 className="text-2xl font-semibold mb-6 text-center text-black">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label className="block text-sm font-medium mb-1 text-black">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name'
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div> */}

        <div>
          <label className="block text-sm font-medium text-black mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            placeholder='example23@gmail.com'
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium  text-black mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
{loading?"Loading....":"Login"}


        </button>
        <div className="text-center mt-4 text-sm text-gray-700">
  <span>Don't have an account?</span>
  <Link href="/signup" className="ml-1 text-blue-600 hover:underline">
    Create
  </Link>
</div>
      </form>
    </div>
  );
}

export default Login;
