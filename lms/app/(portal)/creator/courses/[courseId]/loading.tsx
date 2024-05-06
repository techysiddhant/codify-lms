import { Loader } from '@/components/loader'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full flex items-center justify-center h-screen'>
      <Loader size={60}  />

    </div>
  )
}

export default Loading