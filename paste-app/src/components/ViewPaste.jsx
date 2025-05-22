import React from 'react'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
  const {id} = useParams()
  const pastes = JSON.parse(localStorage.getItem("pastes"))
  const paste = pastes.find((paste) => paste._id === id)
  if (!paste) {
    return <div className="text-center text-red-500">Paste not found</div>
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6">
        <h2 className="text-xl font-semibold">{paste.title}</h2>
        <p className="text-gray-700">{paste.content}</p>
      </div>
    </div>
  )
}

export default ViewPaste
