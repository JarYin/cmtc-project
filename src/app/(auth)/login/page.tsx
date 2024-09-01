"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  if(localStorage.getItem('token') != null){
    router.push('/');
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        // บันทึก token ลง localStorage
        localStorage.setItem('token', data.token);

        // รีเซ็ตค่า input
        setUsername('');
        setPassword('');

        // เปลี่ยนไปยังหน้าอื่น
        window.location.href = '/';
      } else {
        // จัดการกับข้อผิดพลาด
        console.error(data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Login</h1>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-gray-700 mb-2">
            Username:
          </label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <Link href="#" className="text-gray-500 hover:underline">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
