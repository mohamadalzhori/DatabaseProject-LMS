import React from 'react'
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

function CreatePost() {

    const initialValues={
        title:"",
        postText:"",
        username:"",
    };

    const onSubmit = (data)=>{
        axios.post("http://localhost:3001/posts" , data).then((response) => {
        });
    }

    const validationSchema = Yup.object().shape({
        title:Yup.string().required(),
        postText:Yup.string().required(),
        username:Yup.string().min(3).max(15).required(),
    });
  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name='title' component="span" />
                <Field id="inputCreatePost" name="title" placeholder="(Ex. title...)"/>
                <label>Post: </label>
                <ErrorMessage name='postText' component="span" />
                <Field id="inputCreatePost" name="postText" placeholder="(Ex. post...)"/>
                <label>Username: </label>
                <ErrorMessage name='username' component="span" />
                <Field id="inputCreatePost" name="username" placeholder="(Ex. John...)"/>

                <button type='submit'>Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost