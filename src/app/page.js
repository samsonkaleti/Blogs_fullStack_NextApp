import Image from "next/image";
import Link from "next/link"; 


export default function Home() {
  return (
   <div className = "min-h-screen w-full flex  flex-col justify-center items-center bg-gradient-to-r from-black to-blue-800 p-6">

     <div className="mx-auto justify-center items-center flex-col  flex">
      <h1 className = "text-4xl text-white font-bold mb-4">Explore our Blogs</h1>  
     <Link href ={"/blogs"} className = "bg-white px-6 py-2 rounded-md font-bold hover:text-green-700 text-blue-700">Explore Blogs</Link>

     </div>
    
   </div>
  );
}
