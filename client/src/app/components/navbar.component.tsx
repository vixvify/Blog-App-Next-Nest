"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";

export default function Navbarcomponent() {
  const { data: session } = useSession();
  const [isLogin, setIsLogin] = useState(false);

  const confirmLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };

  useEffect(() => {
    if (session && session.user && session?.user?.id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [session]);

  return (
    <div className="">
      <nav>
        <ul className="flex justify-end pr-20 items-center gap-10 text-xl h-20 text-white ">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <Link href={"/pages/form"}>
            <li>Post</li>
          </Link>
          {isLogin && (
            <li className="cursor-pointer" onClick={confirmLogout}>
              Log out
            </li>
          )}
          {isLogin && (
            <li className="flex justify-center items-center  gap-3 cursor-pointer">
              <CgProfile />
              <h2>{session?.user?.username?.toLocaleUpperCase()}</h2>
            </li>
          )}
          {!isLogin && (
            <Link href={"/pages/login"}>
              <li>Log in</li>
            </Link>
          )}
          {!isLogin && (
            <Link href={"/pages/signup"}>
              <li>Sign up</li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
