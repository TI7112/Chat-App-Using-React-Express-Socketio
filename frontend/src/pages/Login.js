import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [user , setUser] = useState({
        email:'',
        pass:''
    })

    const handleSubmit = async() =>{
        if(user.email === ""){
            alert('please Enter your Email Address');
        }
        else if(user.pass === ""){
            alert('please Enter your Password');
        }
        else{
            await axios.post('http://localhost:5000/api/login' , user)
            .then((result) => {
                (result.data.error) ? alert(result.data.error) : window.open('/chatpage' , '_self')
            })
            
        }
    }
    return (
        <div className="flex justify-center bg-slate-700 items-center min-h-screen">
            <div className="pb-6 rounded-xl bg-gray-500 px-4 text-white">
                <h1 className='text-2xl  font-semibold font-serif text-center pt-4 pb-8'>Login</h1>
                <div  className="flex flex-col gap-4">
                    <div className="">
                        <p className='pb-1'>Email or Username</p>
                        <input onChange={(e)=>{setUser({...user , email:e.target.value})}} className='bg-gray-600 border-b-2 outline-none px-2 py-1 focus:border-b-sky-300' size="45" name='email' type="text" />
                    </div>
                    <div className="">
                        <p className='pb-1'>Password</p>
                        <input onChange={(e)=>{setUser({...user , pass:e.target.value})}} className='bg-gray-600 border-b-2 outline-none px-2 py-1 focus:border-b-sky-300' size="45" name='pass' type="password" />
                    </div>
                    <button onClick={handleSubmit} type="submit"  className='bg-slate-600 py-1 hover:bg-slate-700'>Login</button>
                    <p className='text-center'>Dont have an account <a href="/signup" className='text-sky-200 hover:underline'>signup here</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login