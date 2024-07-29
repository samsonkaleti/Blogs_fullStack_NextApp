import React from 'react'
import BlogOverView from '../components/bog-over-view' 



 const GetBlogs = async () =>{
  try {
    const response = await fetch('http://localhost:3000/api/get-blog',{
      method: 'GET',
      cache: 'no-store'
    })
   
    const result = await response.json() 
  
    if(!result.success){
      throw new Error(result.message)
    }

    return result
  
    
  } catch (error) {
    console.error('Error fetching blogs:', error)
    
  }
 }

 
 


const Blogs = async () => {  
  const blogList = await GetBlogs()


 

  return (
 <BlogOverView blogList = {blogList}/>
  )
}

export default Blogs