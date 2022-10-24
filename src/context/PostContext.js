
import { useState,useContext,createContext,useEffect } from "react";

//get current post from backen
import { getPosts,createPost } from "../api/post";

const context = createContext();

//hook context
export const UsePostContext = () => {
    const contextPost = useContext(context);
    return contextPost

} 

export const PostProvider = ({ children }) => {

    //posts
    const [posts, setPosts] = useState([])

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

    useEffect(() => {
        loadPosts()
      },[]) 
    

    return <context.Provider value={{posts,setPosts, loadPosts,createNewPost}}>
        {children}
    </context.Provider>
}