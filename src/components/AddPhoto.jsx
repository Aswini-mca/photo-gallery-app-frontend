import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from '../global.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';


function AddPhoto() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //validation Schema
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        photoUrl: Yup.string().required('Photo Url is required, Kindly give photo URL as link'),
        photoDescription: Yup.string().required('Photo Description is required')
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            photoUrl: '',
            photoDescription: ''

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const newPhoto = {
                "title": values.title,
                "photoUrl": values.photoUrl,
                "photoDescription": values.photoDescription
            };
            await fetch(`${API}/gallery/add-photo`, {
                method: 'POST',
                body: JSON.stringify(newPhoto),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            }).then(() => {
                alert("New Photo Added successfully");
                navigate("/gallery");
            }).catch((error) => console.log(error))
        },
    })
    return (
        <div className='contanier m-5 p-4'>
            <div className='text-center'><h5><Link to={'/gallery'}>Gallery</Link></h5></div>
            <h5 className='container text-center'>Add Photo Form</h5>
            <div className='container-signup mx-auto'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3' title="Title">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Photo Title'
                            name='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className='text-danger m-2'>*{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div className='mb-3' title="Enter Photo Url Link">
                        <label htmlFor="photoUrl" className="form-label">Photo URL</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Photo URL'
                            name='photoUrl'
                            value={formik.values.photoUrl}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.photoUrl && formik.errors.photoUrl ? (
                            <div className='text-danger m-2'>*{formik.errors.photoUrl}</div>
                        ) : null}
                    </div>
                    <div className='mb-3' title="Enter Photo Description">
                        <label htmlFor="photoDescription" className="form-label">Photo Description</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Photo Description'
                            name='photoDescription'
                            value={formik.values.photoDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.photoDescription && formik.errors.photoDescription ? (
                            <div className='text-danger m-2'>*{formik.errors.photoDescription}</div>
                        ) : null}
                    </div>
                    <div className='text-center'>
                    <button className='btn btn-outline-success mt-5'>Add Photo</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPhoto