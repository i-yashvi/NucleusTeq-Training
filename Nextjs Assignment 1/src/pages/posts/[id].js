import PostDetails from "@/components/postDetails";
import Loader from "@/components/loader";
import { useState,useEffect } from "react";

export async function getServerSideProps(context) {
    const { id } = context.params;
    const res = await fetch('http://localhost:3001/api/posts');
    const articles = await res.json();
  
    const post = articles[parseInt(id)];
  
    return {
      props: {
        post,
      },
    };
  }
  
  export default function IndividualPostDetail({ post }) {
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500); 
        return () => clearTimeout(timer);
      }, []);

      if(loading)return <Loader/>;

    return (
      
         <PostDetails blog = {post}/>
      
    );
  }