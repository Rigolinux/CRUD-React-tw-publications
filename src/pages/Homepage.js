import React from "react";

//global values
import { UsePostContext } from "../context/PostContext";

//link
import { Link } from "react-router-dom";

//icons
import { VscEmptyWindow } from "react-icons/vsc";

function Homepage() {
  //context
  const { posts } = UsePostContext();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="text-white w-48 h-48" />

        <h1 className="text-white w-22 h-20">Nothing posts has founded</h1>
      </div>
    );
  }

  return (
    <>
      <div className=" container flex items-stretch justify-between ">
        <div className=" text-white h-10 w-10">Homepage</div>
        <Link
          className="bg-green-500  rounded-md  hover:bg-green-800 text-white p-2"
          to="/new"
        >
          New Post
        </Link>
      </div>

      <div className="container grid grid-cols-4 gap-4 ">
        {posts.map((post) => (
          <div className="col-span-1 ml-5 mt-5 bg-cyan-600" key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Homepage;
