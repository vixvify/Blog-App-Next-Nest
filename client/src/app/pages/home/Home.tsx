"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { fullblog } from "../../../../types/fullblog.type";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function Home() {
  const [data, setData] = useState<fullblog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/data/getData`
      );
      setData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id);
      }
    });
  };
  const deleteData = async (id: string) => {
    try {
      Swal.fire({
        title: "Work in process...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/data/deleteData/${id}`
      );
      Swal.fire({
        title: "Delete Complete",
        icon: "success",
        draggable: true,
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-80 text-center">
        <h1 className="text-5xl font-bold text-white">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center mt-10 mb-20">
        <h1 className="text-5xl text-center text-white font-bold">
          Blog App - By Next.js And Nest.js
        </h1>
        <div className="flex flex-col justify-center items-center gap-10 mt-20">
          {data.map((e: fullblog) => {
            const date = new Date(e.createdAt);
            const isMind = session?.user.id === e.userId;
            return (
              <div
                className="flex flex-col w-[50%] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl"
                key={e.id}
              >
                <h1 className="text-2xl font-bold text-white">{e.title}</h1>
                <p className="text-white mt-3 clamp-3">{e.content}</p>
                <div className="flex justify-start items-center mt-5 gap-3">
                  <h2 className="font-bold text-white">Author</h2>
                  <p className="text-white">{e.author}</p>
                  <h2 className="font-bold ml-5 text-white">Date</h2>
                  <p className="text-white">{date.toLocaleString()}</p>
                  {session && isMind && (
                    <FaPen
                      style={{ color: "skyblue" }}
                      className="ml-5 cursor-pointer"
                      onClick={() => {
                        router.push(`/pages/editform/${e.id}`);
                      }}
                    />
                  )}
                  {session && isMind && (
                    <FaTrash
                      style={{ color: "red" }}
                      className="cursor-pointer"
                      onClick={() => confirmDelete(e.id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
