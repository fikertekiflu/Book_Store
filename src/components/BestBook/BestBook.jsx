import React from "react";
import Img1 from "../../assets/books/book2.jpg";
import Img2 from "../../assets/books/book1.jpg";
import Img3 from "../../assets/books/book3.jpg";
// import { Fastar } from "react-icons/fa";

const BooksData =[
    {
        id: 1,
        img : Img1,
        title: "his life",
        description: "And now I'm here, finally able to breathe. With the view of hope, with strength in my heart, and fire in my eyes."
        
    },
    {
        id: 2,
        img : Img2,
        title: "who's there",
        description: "And now I'm here, finally able to breathe. With the view of hope, with strength in my heart, and fire in my eyes."
        
    },
    {
        id: 3,
        img : Img3,
        title: "lost boy",
        description: "And now I'm here, finally able to breathe. With the view of hope, with strength in my heart, and fire in my eyes."
        
    },

]
const BestBook = () => {

    return <>
        <div id="BestBook" className="py-10">
           <div className="container">
            {/* header section */}
              <div className="text-center mb-20 max-w-[400px] mx-auto">
                <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r
                from-primary to-secondary">
                    Trending Books
                </p>
                <h1 className="text-3xl font-bold">
                    Best Books
                </h1>
                <p className="text-x5 text-gray-400" >
                And now I'm here, finally able to breathe. 
                With the view of hope, 
                with strength in my heart, and fire in my eyes{""}
                </p>
              </div>
              {/* card section */}
              <div className="grid grid-cols-1 sm:grid-cols-2
              md:grid-cols-3 md:gap-5 place-items-center">
              {BooksData.map((book) => (
              <div
               data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white
              relative shadow-xl duration-high group max-w-[300px]">
                <div className="h-[100px]">
                  <img src={book.img} alt=""className="max-w-[100px] block mx-auto transform -translate-y-14 group:hover:scale-105 duration-300 shadow-md"/>
                </div>
                <div className="p-4 text-center">
                
                  {/* <div className="w-full flex items-center justify-center">
                    <Fastar className="text-yellow-500"/>
                    <Fastar className="text-yellow-500"/>
                    <Fastar className="text-yellow-500"/>
                    <Fastar className="text-yellow-500"/>
                  </div> */}
                  <h1 className="text-xl font-bold">{book.title}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line">{book.description}</p>
                  <button className="bg-primary to-secondary text-white px-4 py-2 rounded-full mt-4 hover:scale-105 duration-200 group-hover:bg-white group-hover:text-primary">Order Now</button>
                </div>
               </div>
             ))
}
              </div>
            </div> 
        </div>
        </>
};




export default BestBook;