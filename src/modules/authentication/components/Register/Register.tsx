import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AUTH_URL, axiosInstance } from '../../../../services/EndPoints';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { EMAIL_VALIDATION, passwordValidtion } from '../../../../services/validation';
import logo from '../../../../assets/images/logo.png';
import styles from "./register.module.css";



interface RegisterResponse {
  userName: string;
  email: string;
  country: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
 
}

export default function Register() {

  const[isPasswordVisible, setIsPasswordVisible] =useState(false);
  let navigate = useNavigate();

  let {register,
    formState:{errors},
    handleSubmit,
    
  } = useForm<RegisterResponse>({mode:"onChange"});

  
  const onSubmit = async (data:any) => {

    const formData = new FormData();
      formData.append("userName", data?.userName);
      formData.append("email", data?.email);
      formData.append("country", data?.country);
      formData.append("profileImage", data?.profileImage[0]);
      formData.append("phoneNumber", data?.phoneNumber);
      formData.append("password", data?.password);
      formData.append("confirmPassword", data?.confirmPassword);


    try {
      let response =await axiosInstance.post<RegisterResponse>(AUTH_URL.REGISTER,formData);
      toast?.success(response.data.message);
      navigate('/verify-account');
      console.log(response.data.message)
    } catch (error:any) {
      toast?.error(error.response.data.message)
      // console.log(error)
    }
  }
  

  return (
    <>
    <div  className={styles['auth-container']}>
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center ">
        <div className="col-md-8 col-lg-6   px-5 py-3 ">
          <div   className={`${styles["container" ]} rounded rounded-2`}>
            <div className="logo-container  text-center" >
              <img className='w-25' src={logo} alt=''/>
            </div>
            <div  className={`${styles['title' ]}  my-3`}>
              <span className=''>Welcome to PMS</span>
              <h3 className='h5'>Create New Account</h3>
              
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
            <input  className={styles['input-file']} type='file'  {...register("profileImage")}/>
              <div className='d-flex'>
                {/* userName  */}
              <div   className={`${styles['form-group' ]}  px-2`}>
              <div  className={`${styles['input-gr' ]}  input-group mb-2`}>
              <label>User Name</label>
              <input 
              
              type="text"
              className=""
              placeholder="User Name"
              aria-label="text"
               aria-describedby="basic-addon1"
              {...register('userName',{
                required :'UserName is required',
                
                
              })}
              />
            </div>
            {errors?.userName&&<span className='text-danger'>{errors.userName.message}</span>}
            {/* country  */}
            <div className={`${styles['input-gr' ]}  input-group mb-2`}>
            <label>Country</label>
              <input 
              
              type="text"
              className=""
              placeholder="Country"
              aria-label="text"
               aria-describedby="basic-addon1"
              {...register('country',{
                required :'country is required'
               
              })}
              />
            </div>
            {errors?.country&&<span className='text-danger'>{errors.country.message}</span>}
            {/* password  */}
            <div className={`${styles['input-gr' ]}  input-group mb-2`}>
              <label>Password</label>
              <input 
              type= {isPasswordVisible ? "text": "password"} 
              className="" 
              placeholder="password" 
              aria-label="password" 
              aria-describedby="basic-addon1"
              {...register('password', passwordValidtion)}
              />
              <button 
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              onMouseDown={(e) =>{e.preventDefault()}} 
              onMouseUp={(e) =>{e.preventDefault()}}
              type='button' className="input-group-text" id="basic-addon1">
                <span className='sr-only'>{isPasswordVisible? "hide password" : "show password"}</span>
                <i className={`fa-solid ${isPasswordVisible ?"fa-eye" :"fa-eye-slash"}`} aria-hidden='true'></i>
              </button>
            </div>
            {errors?.password&&<span className='text-danger'>{errors.password.message}</span>}
          
              </div>
              {/* email  */}
              <div className={`${styles['form-group' ]}  px-2`}>
              <div className={`${styles['input-gr' ]}  input-group mb-2`}>
              <label>E-mail</label>
              <input 
              // type= {isPasswordVisible ? "text": "password"}
              className="" 
              placeholder="Enter Your Email" 
              aria-label="email" 
              aria-describedby="basic-addon1"
              {...register('email', EMAIL_VALIDATION)}
              />
              
            </div>
            {errors?.email&&<span className='text-danger'>{errors.email.message}</span>}
             {/* phoneNumber  */}
            <div className={`${styles['input-gr' ]}  input-group mb-2`}>
            <label>Phone Number</label>
              <input 
              
              type='tel'
              className="" 
              placeholder="Phone Number" 
              aria-label="number" 
              aria-describedby="basic-addon1"
              {...register('phoneNumber',{
                required :'phoneNumber is required',
                
              })}
              />
              
            </div>
            {errors?.phoneNumber&&<span className='text-danger'>{errors.phoneNumber.message}</span>}
            {/* confirmPassword */}
            <div className={`${styles['input-gr' ]}  input-group mb-2`}>
            <label>Confirm Password</label>
              <input 
              type = {isPasswordVisible ? "text": "password"} 
              className="" 
              placeholder="Confirm New Password" 
              aria-label="password" 
              aria-describedby="basic-addon1"
              {...register('confirmPassword', passwordValidtion)}
              />
              <button 
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              onMouseDown={(e) =>{e.preventDefault()}} 
              onMouseUp={(e) =>{e.preventDefault()}}
              type='button' className="input-group-text" id="basic-addon1">
                <i className={`fa-solid ${isPasswordVisible ?"fa-eye" :"fa-eye-slash"}`} aria-hidden='true'></i>
              </button>
            </div>
            {errors?.confirmPassword &&<span className='text-danger'>{errors.confirmPassword.message}</span>}
              </div>
              </div>
            
           
            <button className={`${styles['btn-submit' ]} btn  w-75 my-2`}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}
