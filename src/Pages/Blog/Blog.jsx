import React, { useRef, useState } from 'react';
import {  useLoaderData } from 'react-router';
import img from "../../assets/leaf.png"


const Blog = () => {
    const blogs=useLoaderData()
    console.log(blogs)

    const modalRef = useRef(null);
     const [selectedBlog, setSelectedBlog] = useState(null);
    // helper function to get first 50 words
  const getPreviewText = (text) => {
    return text.split(" ").slice(0, 50).join(" ") + "...";
  };


   const openEditModal = (blog) => {
    setSelectedBlog(blog)
    modalRef.current.showModal();


   }


   const closeModal = () => {
    modalRef.current.close(); // close the modal
    setSelectedBlog(null);
  };

  return (
    <div className='my-10'>
        <h2 className="text-5xl font-extrabold text-center mb-10 text-secondary font-display">
    Blogs helps you for make your decisions
  </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-3">
      {blogs.map((blog) => (
       <div
  key={blog.id}
  className="bg-cover bg-center bg-no-repeat border border-purple-200 rounded-xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between"
  style={{ backgroundImage: `url(${img})` }}
>
  <div>
    {/* Title */}
    <h2 className="text-xl font-bold text-secondary mb-2 dark:text-[#6C3BAA]">
      {blog.title}
    </h2>

    {/* Meta Info */}
    <p className="text-sm text-gray-600 mb-3">
      By <span className="font-semibold">{blog.author}</span> • {blog.publishedDate}
    </p>

    {/* Description */}
    <p className="text-gray-700 text-sm mb-5 leading-relaxed text-justify">
      {getPreviewText(blog.content)}
    </p>
  </div>

  {/* Button */}
  <button
    onClick={() => openEditModal(blog)}
    className="inline-block w-full text-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-200 text-secondary font-semibold py-2 rounded-lg hover:opacity-90 transition dark:text-[#6C3BAA]"
  >
    Read Full Blog →
  </button>
</div>
      ))}
    </div>



    <dialog ref={modalRef} className="modal">
    <div className=' rounded-lg flex bg-white items-center justify-center w-9/12 mx-auto my-auto'>

    {selectedBlog && (
          <div className='p-6'>
            <h3 className="text-2xl text-secondary mb-2 dark:text-[#6C3BAA] font-semibold">{selectedBlog.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              By <span className="font-semibold">{selectedBlog.author}</span> • {selectedBlog.publishedDate}
            </p>
            <p className="text-gray-700 text-justify mb-4">{selectedBlog.content}</p>
            <button
              onClick={closeModal}
              className="btn my-btn-purple text-white rounded-xl font-semibold shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] border-0"
            >
              Cancel
            </button>
          </div>
        )}

    </div>
        
      </dialog>

    </div>
    
  );
};

export default Blog;