import axios from 'axios'

export const getPosts = async () => await axios.get('/posts')

export const createPost = async (post) => await axios.post('/posts',post)