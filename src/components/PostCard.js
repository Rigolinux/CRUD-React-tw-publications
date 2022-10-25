import React from "react";

//alerts
import toast  from "react-hot-toast";

//context
import { UsePostContext } from "../context/PostContext";

//router
import {useNavigate} from "react-router-dom";

function PostCard({ post }) {

  //navigate
  const navigate = useNavigate();

  //context destructuring delete post
  const {deletePostById} = UsePostContext()

  //delete post in database
  const deletepostdb = (id,alert_id) => {
    toast.dismiss(alert_id)
    deletePostById(id)

  }
  //go to edit page
  const handledit = (id,post) => {
    navigate(`/post/${id}`)
  }

  //question alert delete
  const handleDelete = async (_id) => {
    toast((t) => (
      
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <p className="text-white">Do you want to delete this file ? </p>
            <div className="flex flex-row gap-2 justify-center mt-2">
              <button onClick={()=>deletepostdb(_id,t.id)} className="bg-red-500 rounded-md p-2 text-white hover:bg-red-700">Yes</button>
              <button onClick={()=> toast.dismiss(t.id)} className="bg-green-500 rounded-md p-2 text-white hover:bg-green-700 ">No</button>
            </div>
          </div>
          </div>
          
    ),
    {
      style: {
        background: "#363636",
      }
    }
  
    );
    }
  
  return (
    <div onClick={()=>handledit(post._id,post)} className="col-span-1 ml-5 mt-5 bg-cyan-700 rounded-sm hover:bg-cyan-500 hover:cursor-pointer">
      <div className="grid grid-cols-2 grid-flow-col p-2">
        <h1 className="text-2xl row-span-2 text-white px-1 py-2 justify-start">{post.title}</h1>
        <button onClick={(e) => {
          //stop propagation for
          e.stopPropagation();
          handleDelete(post._id)}} className="bg-red-600 col-span-1  justify-end ml-auto mt-1 w-[60%] text-white rounded-md hover:bg-red-800 py-1 px-2  ">
          
          Delete
        </button>
      </div>
      <p>{post.description}</p>
      {post.image && <img className="mx-auto w-[50%]" src={post.image.url} alt=""/>}
    </div>
  );
}

export default PostCard;
