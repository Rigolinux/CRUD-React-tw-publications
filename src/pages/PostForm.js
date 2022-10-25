import React, { useEffect,useState } from 'react'

//formik
import {Formik, Form,Field,ErrorMessage }from 'formik'

//form validation
import * as Yup from 'yup'

//get context form post
import { UsePostContext } from "../context/PostContext";

//react-router-dom
import {useNavigate,useParams,Link} from 'react-router-dom'



function PostForm() {

  //context
  const {createNewPost,getPostById,updatePostById} = UsePostContext();


 

  //navigate
  const navigate = useNavigate()

  //params
  const params = useParams()

  //hook
  const [post, setPost] = useState({
    title:'',
    description:'',
    image: null

  })

  useEffect( () => {

    //anonymous function
    //get data from database
   (async()=>{ if(params.id){
      const data = await getPostById(params.id)
      setPost(data)
      
      
    }})();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  
  return (
    <>
    <header className='flex flex-row text-white justify-between mb-2'>
      <h2 className='text-3xl'>New Post</h2>
      <Link className='bg-red-500 hover:bg-red-700 py-1 px-3 rounded-sm' to="/">Back</Link>
    </header>
      
    <Formik
      initialValues={post}
      validationSchema={Yup.object({
        title:Yup.string().required('Title is required'),
        description:Yup.string().required('Description is required')
      })}
      onSubmit={(values,action)=>{

        if(params.id){
          updatePostById(params.id,values)
          
        }else{
        createNewPost(values)
       
        }
        action.setSubmitting(false)
        navigate('/')
      }}
      enableReinitialize={true}
    >
      {({handleSubmit,setFieldValue,isSubmitting})=>(
        
        <Form className='container bg-slate-600 p-16 flex flex-col justify-center  ' onSubmit={handleSubmit}>
        <h2 className='mb-2 justify-start text-white'>Title</h2>
        <Field name="title" type="text" className="w-[80%] bg-slate-400 px-4 py-2 focus:none rounded-sm mb-3 text-white font-normal" />
        <ErrorMessage component="p" className='text-red-500 mb-5 text-sm font-semibold'  name="title" />
        <h2 className='mb-2 justify-start text-white'>Description</h2>
        <Field name="description"  className="w-[80%] bg-slate-400  px-4 py-6 focus:none rounded-sm mb-4 text-white font-normal" type="text" />
        <ErrorMessage component="p" className='text-red-500 mb-5 text-sm font-semibold' name="description" />
        <h2 className='mb-2 justify-start text-white'>File</h2>
        <input onChange={(e)=>setFieldValue('image',e.target.files[0])} type="file" name="image" id="file" className='w-[80%] bg-slate-400  px-4 py-6 focus:none rounded-sm mb-4 text-white font-normal'/>
        <button disabled={isSubmitting} className='w-[20%] bg-green-500 text-white  hover:bg-green-800 py-3' type="submit">{isSubmitting ? 'Loading': 'Save'}</button>
        </Form>

      )}
      
    </Formik>
    </>
  )
}

export default PostForm