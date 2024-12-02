import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "../../../../services/validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URL, axiosInstance } from "../../../../services/EndPoints";
import logo from '../../../../assets/images/logo.png';
import styles from "../Register/register.module.css";

interface IFormInput {
  email: string;
  code: string;
  
}

export default function VerifyAccount() {
  let navigate = useNavigate();

  let {register,
    formState:{errors},
    handleSubmit
  } = useForm<IFormInput>();

  const onSubmit = async (data:any) => {
    try {
      let response =await axiosInstance.put<IFormInput>(AUTH_URL.VERIFY_ACCOUNT,data);
    
      toast?.success(response?.data?.message)
      navigate('/login')
      
    } catch (error:any) {
      toast?.error(error.response.data.message)
    }
  }
  return (
    <div className={styles['auth-container']}>
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 col-lg-4  rounded rounded-2 px-5 py-3 ">
            <div className={`${styles["container" ]} rounded rounded-2`}>
              <div className="logo-container  text-center">
                <img className='w-25' src={logo} alt=''/>
              </div>
              <div className={`${styles['title' ]}  my-3`}>
                <span className='text-muted'>Welcome to PMS</span>
                <h3 className='h5'>Verify Acount</h3>
                
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`${styles['input-gr' ]}  input-group mb-2`}>
              <label>Email</label>
                <input 
                type="text"
                className="w-100"
                placeholder="Enter Your E-mail"
                aria-label="email"
                 aria-describedby="basic-addon1"
                {...register('email',EMAIL_VALIDATION)}
                />
              </div>
              {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
              <div className={`${styles['input-gr' ]}  input-group mb-2`}>
              <label>OTP verification</label>
                <input 
                type="text" 
                className="" 
                placeholder="Enter verification" 
                aria-label="password" 
                aria-describedby="basic-addon1"
                {...register('code', {
                  required :'code is required',
                  
                })}
                />
              </div>
              {errors.code&&<span className='text-danger'>{errors.code.message}</span>}
              
              <button className={`${styles['btn-submit' ]} btn  w-75 my-2`}>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
