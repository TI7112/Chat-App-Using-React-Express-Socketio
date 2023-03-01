import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {

    const initUser = {
        username: '',
        name: '',
        email: '',
        pass: ''
    }

    const [user, setUser] = useState(initUser)

    const handleSubmit = () => {
        if (user.name === '') {
            alert('Name cant be empty.')
        }
        else if (user.username === '') {
            alert('Username cant be empty.')
        }
        else if (user.email === '') {
            alert('Email cant be empty.')
        }
        else if (user.pass === '') {
            alert('Password cant be empty.')
        }
        else {
            axios.post('http://localhost:5000/api/signup', user).then(
                result => {
                    setUser(initUser)
                    alert(result.data.error)
                    window.open('/' , '_self')
                })
        }
    }
    return (
        <div className="flex justify-center bg-slate-700 items-center min-h-screen">
            <div className="pb-6 rounded-xl bg-gray-500 px-4 text-white">
                <h1 className='text-2xl  font-semibold font-serif text-center pt-4 pb-8'>Signup</h1>
                <div className="flex flex-col gap-4">
                    <div className="">
                        <p className='pb-1'>Name</p>
                        <input name='name' value={user.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} className='bg-gray-600 border-b-2 outline-none px-2 py-1 focus:border-b-sky-300' size="45" type="text" />
                    </div>
                    <div className="">
                        <p className='pb-1'>Username</p>
                        <input name='username' value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} className='bg-gray-600 border-b-2 outline-none px-2 py-1 focus:border-b-sky-300' size="45" type="text" />
                    </div>
                    <div className="">
                        <p className='pb-1'>Email</p>
                        <input name='email' value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} className='bg-gray-600 border-b-2 outline-none px-2 py-1 focus:border-b-sky-300' size="45" type="text" />
                    </div>
                    <div className="">
                        <p className='pb-1'>Password</p>
                        <input name='pass' value={user.pass} onChange={(e) => { setUser({ ...user, pass: e.target.value }) }} className='bg-gray-600 border-b-2 outline-none px-2 py-1 focus:border-b-sky-300' size="45" type="password" />
                    </div>
                    <button onClick={handleSubmit} type="submit" className='bg-slate-600 py-1 hover:bg-slate-700'>Signup</button>
                    <p className='text-center'>Already have an account <a href="/" className='text-sky-200 hover:underline'>login here</a></p>
                </div>
            </div>
        </div>
    )
}

export default Signup