"use client";
import Link from 'next/link';
import axios from "axios"
import { useRouter } from 'next/navigation';
import {toast, Toaster} from "sonner"

export default function Profile() {
  const router = useRouter()

  const handleLogout = async () => {
    // Add your logout logic here
    const res = await axios.get("/api/users/logout",)
if(res.status===200){
  toast.success("Logout Successfully !",{duration:2200})
  setTimeout(()=>{
    router.push('/login')
  },2000)
}    // Typically you would:
    // 1. Clear cookies/tokens
    // 2. Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">MyApp</h1>
              <nav className="ml-6 flex space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/profile" className="bg-gray-100 text-gray-900 px-3 py-2 text-sm font-medium rounded-md">
                  Profile
                </Link>
                <Link href="/settings" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                  Settings
                </Link>
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Your Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-lg text-gray-900">John Doe</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">john@example.com</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-lg text-gray-900">January 2023</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}