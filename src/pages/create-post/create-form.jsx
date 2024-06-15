
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver } from "@hookform/resolvers/yup";
import {addDoc,collection} from 'firebase/firestore';
import {useNavigate}from 'react-router-dom'
import {auth,db} from "../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

import '../../App.css';

export const CreateForm=()=>{

    const [user]=useAuthState(auth);
    const navigate=useNavigate();
    const schema=yup.object().shape({
        title:yup.string().required("You must add a title."),
        description:yup.string().required("You must add a description"),
    })
    const {register,handleSubmit, formState: { errors }}=useForm({
        resolver:yupResolver(schema),
    });

    const postsRef=collection(db,"posts");
    
    const onCreatePost=async (data)=>{
        console.log(data);
        await addDoc(postsRef,{
            title:data.title,
            description:data.description,
            username:user?.displayName,
            userId:user?.uid,
        })
        navigate("/");

       
    }
    if (!user) {
        navigate("/login");
    }

    return (
        <div className="create-form-container">
            <form onSubmit={handleSubmit(onCreatePost)} className="create-form">
                <input className="create-form-input" placeholder='Title...' {...register('title')} />
                {errors.title && <p className="error-message">{errors.title.message}</p>}
                <textarea className="create-form-textarea" placeholder='Description...' {...register('description')} />
                {errors.description && <p className="error-message">{errors.description.message}</p>}
                <input type='submit' className="create-form-submit" />
            </form>
        </div>
    );
};