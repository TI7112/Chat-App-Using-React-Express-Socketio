import React from 'react'

const Sidebar = ({ socket, msg, setMsg ,chatData }) => {


  const Userchats = ({ user }) => {

    const openChat =(user) =>{
      setMsg({...msg , reciever: user.email , chatID:user.chatID , message:''})

      socket.emit('fetch_user_chat' , {chatID : user.chatID})

    }

    return (
      <div onClick={()=>{openChat(user)}} className="flex gap-2 py-2 items-center border-b rounded-xl border-slate-400 cursor-pointer hover:bg-slate-600">
        <div className="px-3">
          <img className='w-16 rounded-full' src="//picsum.photos/150/150" alt="" />
        </div>
        <div className="">
          <p className='font-semibold text-xl'>{user.name}</p>
          <p className='font-semibold text-sm text-slate-300'>{user.last_msg}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-slate-800 px-5 h-20 rounded-tl-xl text-white flex justify-between items-center">
        <p className='text-3xl font-thin'>Logo</p>
        <div className="flex gap-2 items-center">
          <img className='w-12 rounded-full' src="//picsum.photos/150/150" alt="" />
          <div className="leading-4">
            <p className='font-semibold'>Ayush Jha</p>
            <button className='text-sm hover:underline text-red-500'>logout</button>
          </div>
        </div>
      </div>
      <div className="bg-slate-700 rounded-bl-xl text-white ">
        <input className='bg-slate-700 p-2 border-b-2 w-full outline-none' placeholder='Find a user' type="search" />
        <div className="overflow-y-scroll min-h-[65vh]">

        {chatData.map((curElem , index)=>(
          <Userchats key={index} user={curElem}/>
        ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar