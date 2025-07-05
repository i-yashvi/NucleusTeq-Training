import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

function PostDetails({blog}) {
  return (
    <div className="flex flex-col justify-center items-center relative">
        <div className="text-3xl text-blue-500 font-extrabold underline mt-4">Details</div>
    <div className="border-purple-400 border-3 p-1 m-2 w-full max-w-[900px] min-h-[500px] rounded-lg flex flex-col justify-between  bg-blue-200">
            <Image src={blog?.urlToImage} alt="image" width={900} height={200} className="max-h-[300px] w-full rounded-t-lg"/>
               <div className="text-xl font-bold">{blog?.title}</div>
               <div className="text-base ">{blog?.description}</div>
               <div className="h-[2px] w-full bg-yellow-500 my-4 self-stretch" />
               <div className='text-sm'>{blog?.content}</div>
               <div className='w-full text-center'>{`-- ${blog?.author}`}</div>
    </div>
    <Link href={'/posts'} className='underline text-lg font-bold text-red-400 mt-4'>View Posts</Link>
    </div>
  )
}

export default PostDetails;