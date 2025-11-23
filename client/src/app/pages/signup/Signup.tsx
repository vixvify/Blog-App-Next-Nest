"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../../../../types/register.type";

export default function Signup() {
  const [data, setData] = useState<register>({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = data;
  const [confirmPass, setConfirmPass] = useState("");
  const [canSend, setCanSend] = useState(false);

  const router = useRouter();

  const inputValue = (fields: string) => {
    return (e: any) => setData({ ...data, [fields]: e.target.value });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/signup`, data);
      Swal.fire({
        title: "Sign up Complete",
        icon: "success",
        draggable: true,
      });
      router.push("/pages/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isMatch = password === confirmPass;
    const isFull = username && email && password && confirmPass;
    if (isFull && isMatch) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [username, email, password, confirmPass]);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="font-bold text-5xl text-white">Sign up</h1>
      <form className="mt-10 flex flex-col gap-5" onSubmit={sendData}>
        <p className="text-xl text-white">Username</p>
        <input
          type="text"
          className="border border-white w-100 h-10 p-3 text-white"
          onInput={inputValue("username")}
        ></input>
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
        <p className="text-xl text-white">Confirm Password</p>
        <input
          type="password"
          className="border border-white w-100 h-10 p-3 text-white"
          onInput={(e: any) => setConfirmPass(e.target.value)}
        ></input>
        <button
          type="submit"
          className="text-2xl bg-white p-3 rounded-md text-black disabled:opacity-20"
          disabled={!canSend}
        >
          Sign up
        </button>
        <div className="flex justify-center items-center gap-5 mt-5">
          <p className="text-white">Have any account?</p>
          <Link href={"/pages/login"}>
            <p className="text-sky-400">Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
