import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function PostList({data}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center overflow-y-auto h-full mt-10 p-4">
    {data?.map((blog,index)=>(
    <div className="border-purple-400 border-3 p-1 mt-2 max-w-[700px] min-h-[300px] rounded-lg flex flex-col justify-between items-center hover:scale-105 bg-blue-200">
        <Image src={blog?.urlToImage} alt="image" width={700} height={200} className="max-h-[200px] rounded-t-lg"/>
           <div className="text-base font-semibold">{blog?.title}</div>
           <div className="text-xs text">{blog?.description}</div>
           <Link className="text-black font-medium underline items-end" href={`/posts/${blog?.id}`}>View Details</Link>
        </div>
        ))}
    </div>
  )
}

export default PostList;