import PostList from "@/components/postList";
import Loader from "@/components/loader";
import { useState,useEffect } from "react";

export async function getStaticProps() {
    const res = await fetch('http://localhost:3001/api/posts');
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  }
  
  export default function PostPage({ data }) {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);


    return <>
    <div className="flex justify-center items-center mt-5">
        <span className="text-3xl font-extrabold text-amber-400 underline">BLOGS</span>
    </div>
    {loading?<Loader/>:<PostList data={data}/>}
    
    </>
  }