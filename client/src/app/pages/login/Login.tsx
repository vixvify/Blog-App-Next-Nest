"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../../../../types/login.type";
import { signIn } from "next-auth/react";

export default function Login() {
  const [data, setData] = useState<login>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const inputValue = (fields: string) => {
    return (e: any) => setData({ ...data, [fields]: e.target.value });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.ok && !res.error) {
        Swal.fire({
          title: "Login Complete",
          icon: "success",
          draggable: true,
        });
        router.push("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="font-bold text-5xl text-white">Login</h1>
      <form className="mt-10 flex flex-col gap-5" onSubmit={sendData}>
        <p className="text-xl text-white">Email</p>
        <input
          type="text"
          className="border border-white w-100 h-10 p-3 text-white"
          onInput={inputValue("email")}
        ></input>
        <p className="text-xl text-white">Password</p>
        <input
          type="password"
          className="border border-white w-100 h-10 p-3 text-white"
          onInput={inputValue("password")}
        ></input>
        <button
          type="submit"
          className="text-2xl bg-white p-3 rounded-md text-black"
        >
          Login
        </button>
        <div className="flex justify-center items-center gap-5 mt-5">
          <p className="text-white">Don't have any account?</p>
          <Link href={"/pages/signup"}>
            <p className="text-sky-400">Sign up</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
