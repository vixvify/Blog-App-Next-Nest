"use client";

import { useState, useEffect } from "react";
import { blog } from "../../../../../types/blog.type";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Editform() {
  const [data, setData] = useState<blog>({
    title: "",
    content: "",
    author: "",
    userId: "",
  });
  const { title, content, author } = data;
  const [canSend, setCanSend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  const inputValue = (fields: string) => {
    return (e: any) => setData({ ...data, [fields]: e.target.value });
  };

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/data/getSingleData/${id}`
    );
    const data = res.data.data;
    setData({
      title: data.title,
      content: data.content,
      author: data.author,
      userId: data.userId,
    });
    setIsLoading(false);
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/data/updateData/${id}`, {
        title: data.title,
        content: data.content,
        author: data.author,
        userId: data.userId,
      });
      Swal.fire({
        title: "Update Complete",
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
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="font-bold text-5xl text-white">Edit Blog</h1>
        <form className="mt-10 flex flex-col gap-5" onSubmit={sendData}>
          <p className="text-xl text-white">Title</p>
          <input
            type="text"
            className="border border-white w-100 h-10 p-3 text-white"
            onInput={inputValue("title")}
            value={title}
          ></input>
          <p className="text-xl text-white">Content</p>
          <textarea
            className="border border-white w-100 h-25 p-3 text-white"
            onInput={inputValue("content")}
            value={content}
          ></textarea>
          <p className="text-xl text-white">Author</p>
          <input
            type="text"
            className="border border-white w-100 h-10 p-3 text-white"
            onInput={inputValue("author")}
            value={author}
          ></input>
          <button
            type="submit"
            className="text-2xl bg-white p-3 rounded-md text-black disabled:opacity-20"
            disabled={!canSend}
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}
