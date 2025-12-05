"use client";

import { useState, useEffect } from "react";
import { blog } from "../../../../types/blog.type";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Form() {
  const { data: session } = useSession();

  const [data, setData] = useState<blog>({
    title: "",
    content: "",
    author: "",
    userId: "",
  });
  const { title, content, author } = data;
  const [canSend, setCanSend] = useState(false);
  const router = useRouter();

  const inputValue = (fields: string) => {
    return (e: any) => setData({ ...data, [fields]: e.target.value });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Work in process...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API}/data/createData`, {
        ...data,
        userId: session?.user.id,
      });
      Swal.fire({
        title: "Post Complete",
        icon: "success",
        draggable: true,
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isFull = title && content && author;
    if (isFull) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [title, content, author]);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="font-bold text-5xl text-white">Post Blog</h1>
      <form className="mt-10 flex flex-col gap-5" onSubmit={sendData}>
        <p className="text-xl text-white">Title</p>
        <input
          type="text"
          className="border border-white w-100 h-10 p-3 text-white"
          onInput={inputValue("title")}
          placeholder="Enter your Title"
        ></input>
        <p className="text-xl text-white">Content</p>
        <textarea
          className="border border-white w-100 h-25 p-3 text-white"
          onInput={inputValue("content")}
          placeholder="Enter your Content"
        ></textarea>
        <p className="text-xl text-white">Author</p>
        <input
          type="text"
          className="border border-white w-100 h-10 p-3 text-white"
          onInput={inputValue("author")}
          placeholder="Enter your Name"
        ></input>
        <button
          type="submit"
          className="text-2xl bg-white p-3 rounded-md text-black disabled:opacity-20"
          disabled={!canSend}
        >
          Post
        </button>
      </form>
    </div>
  );
}
