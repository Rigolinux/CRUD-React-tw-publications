import axios from 'axios'

// don't forget hte proxi in package.json 
// reference to the backend server
export const getPosts = async () => await axios.get('/posts')

export const createPost = async (post) =>{ 

    //create a new form data with sendind data values with images because its necesary
    //to send the image to the backend and save it in the cloudinary additonally is
    //especify the content type to multipart/form-data in the headers
    const form = new FormData()

    //use a for in loop to iterate over the object and add the values to the form
    // to convert the object to an array with the object entries in the form
    // convert this{ title: 'title', description: 'description', image: 'image' }
    // to this title= 'title', description= 'description', image= 'image'
    for (let key in post) {
        form.append(key, post[key]);
    }

    return await axios.post('/posts',form,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deletePost = async (id) => await axios.delete(`/posts/${id}`)

export const getPost = async (id) => await axios.get(`/posts/${id}`)

export const updatePost = async (id,post) => await axios.put(`/posts/${id}`,post)