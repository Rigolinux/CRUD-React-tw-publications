
import { useState,useContext,createContext,useEffect } from "react";

//get current post from backen
import { getPosts,createPost,deletePost,getPost,updatePost } from "../api/post";

//alerts
import toast  from "react-hot-toast";

const context = createContext();

//hook context
export const UsePostContext = () => {
    const contextPost = useContext(context);
    return contextPost

} 

export const PostProvider = ({ children }) => {

    //posts
    const [posts, setPosts] = useState([])
    //post
    

    //load post
    const loadPosts = async () => {
        await getPosts().then(res => {
            setPosts(res.data)
        })
    }
    //create post
    const createNewPost = async (post) => {
        await createPost(post).then(res => {
            setPosts([...posts,res.data])
            
        })
    }
    //delete post
    const deletePostById = async (id) => {
        await deletePost(id).then(res => {
            setPosts(posts.filter(post => post._id !== id))
            toast.success('Data deleted successfully')

        })
       
    }
    //get post
    const getPostById = async (id) => {
        const post = await getPost(id)
        return post.data
        
       
    }
    //update post
    const updatePostById = async (id,post) => {
        await updatePost(id,post).then(res => {
            setPosts(posts.map(post => post._id === id ? res.data : post))
            toast.success('Data updated successfully')
        })
       

    }

    useEffect(() => {
        loadPosts()
      },[]) 
    

    return <context.Provider value={{posts,setPosts, loadPosts,createNewPost,deletePostById ,getPostById,updatePostById}}>
        {children}
    </context.Provider>
}