import React from 'react'

//formik
import {Formik, Form,Field,ErrorMessage }from 'formik'

//form validation
import * as Yup from 'yup'

//get context form post
import { UsePostContext } from "../context/PostContext";

//react-router-dom
import {useNavigate} from 'react-router-dom'


function PostForm() {

  //context
  const {createNewPost} = UsePostContext()

  //navigate
  const navigate = useNavigate()

  return (
    <>
    <Formik
      initialValues={{title:'',description:''}}
      validationSchema={Yup.object({
        title:Yup.string().required('Title is required'),
        description:Yup.string().required('Description is required')
      })}
      onSubmit={(values,action)=>{
        createNewPost(values)
        navigate('/')
      }}
    >
      {({handleSubmit})=>(
        
        <Form className='container bg-slate-600 p-16 flex flex-col ' onSubmit={handleSubmit}>
        <h2>Title</h2>
        <Field name="title" type="text" className="w-[80%] bg-slate-400 px-4 py-2 focus:none rounded-sm mb-3 text-white font-normal" />
        <ErrorMessage component="p" className='text-red-500 mb-5 text-sm font-semibold'  name="title" />
        <h2>Description</h2>
        <Field name="description"  className="w-[80%] bg-slate-400  px-4 py-6 focus:none rounded-sm mb-4 text-white font-normal" type="text" />
        <ErrorMessage component="p" className='text-red-500 mb-5 text-sm font-semibold' name="description" />
        <button className='w-[20%] bg-green-500 text-white  hover:bg-green-800 py-3' type="submit">Save</button>
        </Form>

      )}
      
    </Formik>
    </>
  )
}

export default PostForm