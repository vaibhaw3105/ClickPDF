
// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Navbar = () => {
// //   return (
// //     <div className="fixed top-0 left-0 w-full z-50 bg-[#f5f3f4] shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
// //       {/* Applied greyish box-shadow: subtle bottom shadow */}
// //       <div className="flex justify-around items-center h-15">
// //         <div className="w-3/5 flex justify-between">
// //           <Link to={"/"}>
// //             <div className="ml-10 text-left w-1/5 p-2 hover:cursor-pointer">
// //               ImageConvertor
// //             </div>
// //           </Link>
// //           <div className="flex justify-between gap-3 ml-3 p-2 px-5 text-left w-4/5">
// //             <Link to={"/merge-pdf"}>
// //               <div className="hover:cursor-pointer">Merge Pdf</div>
// //             </Link>
// //             <Link to={"/split-pdf"}>
// //               <div className="hover:cursor-pointer">Split Pdf</div>
// //             </Link>
// //             <Link to={"/compress-pdf"}>
// //               <div className="hover:cursor-pointer">Compress Pdf</div>
// //             </Link>
            
            
            
// //             <div className="hover:cursor-pointer">Convert Pdf</div>
// //             <div className="hover:cursor-pointer">Tools</div>
// //           </div>
// //         </div>
// //         <div className="w-2/5 mr-14 text-right ml-8">
// //           <div className="flex justify-end gap-10 items-center mr-5 h-full">
// //             <div className="hover:cursor-pointer">Login</div>
// //             <div className="hover:cursor-pointer">SignUp</div>
// //             <div className="hover:cursor-pointer">Icon</div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi"; // Hamburger and close icons

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-[#f5f3f4] shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
//       <div className="flex justify-between items-center h-16 px-4 sm:px-6 md:px-10">
//         {/* Logo */}
//         <Link to={"/"}>
//           <div className="text-xl font-bold hover:cursor-pointer">ImageConvertor</div>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link to={"/merge-pdf"}><div className="hover:cursor-pointer">Merge PDF</div></Link>
//           <Link to={"/split-pdf"}><div className="hover:cursor-pointer">Split PDF</div></Link>
//           <Link to={"/compress-pdf"}><div className="hover:cursor-pointer">Compress PDF</div></Link>
//           <div className="hover:cursor-pointer">Convert PDF</div>
//           <div className="hover:cursor-pointer">Tools</div>
//         </div>

//         {/* Desktop Right Side */}
//         <div className="hidden md:flex items-center gap-6">
//           <div className="hover:cursor-pointer">Login</div>
//           <div className="hover:cursor-pointer">SignUp</div>
//           <div className="hover:cursor-pointer">Icon</div>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMenu} className="text-2xl focus:outline-none">
//             {isOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-[#f5f3f4] shadow-md">
//           <div className="flex flex-col items-start p-4 gap-3">
//             <Link to={"/merge-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Merge PDF</div></Link>
//             <Link to={"/split-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Split PDF</div></Link>
//             <Link to={"/compress-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Compress PDF</div></Link>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Convert PDF</div>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Tools</div>
//             <hr className="w-full border-gray-300 my-2" />
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Login</div>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>SignUp</div>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Icon</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-[#f5f3f4] shadow-md">
//       <div className="flex justify-between items-center h-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20">
//         {/* Logo */}
//         <Link to={"/"}>
//           <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold hover:cursor-pointer">
//             ImageConvertor
//           </div>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6 xl:gap-8">
//           <Link to={"/merge-pdf"}><div className="hover:cursor-pointer">Merge PDF</div></Link>
//           <Link to={"/split-pdf"}><div className="hover:cursor-pointer">Split PDF</div></Link>
//           <Link to={"/compress-pdf"}><div className="hover:cursor-pointer">Compress PDF</div></Link>
//           <div className="hover:cursor-pointer">Convert PDF</div>
//           <div className="hover:cursor-pointer">Tools</div>
//         </div>

//         {/* Desktop Right Side */}
//         <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
//           <div className="hover:cursor-pointer">Login</div>
//           <div className="hover:cursor-pointer">SignUp</div>
//           <div className="hover:cursor-pointer">Icon</div>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMenu} className="text-2xl focus:outline-none">
//             {isOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-[#f5f3f4] shadow-md">
//           <div className="flex flex-col items-start p-4 gap-3">
//             <Link to={"/merge-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Merge PDF</div></Link>
//             <Link to={"/split-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Split PDF</div></Link>
//             <Link to={"/compress-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Compress PDF</div></Link>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Convert PDF</div>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Tools</div>
//             <hr className="w-full border-gray-300 my-2" />
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Login</div>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>SignUp</div>
//             <div className="hover:cursor-pointer" onClick={toggleMenu}>Icon</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#f5f3f4] shadow-md">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20">
        
        {/* Logo */}
        <Link to={"/"}>
          <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold hover:cursor-pointer">
            ClickPDF
          </div>
        </Link>

        {/* Tablet Menu (768px–1023px) */}
        <div className="hidden md:flex lg:hidden items-center gap-6">
          <div className="hover:cursor-pointer">All Tools</div>
        </div>

        {/* Desktop Menu (≥1024px) */}
        <div className="hidden lg:flex flex-wrap items-center gap-4 lg:gap-6 xl:gap-8">
          <Link to={"/merge-pdf"}><div className="hover:cursor-pointer">Merge PDF</div></Link>
          <Link to={"/split-pdf"}><div className="hover:cursor-pointer">Split PDF</div></Link>
          <Link to={"/compress-pdf"}><div className="hover:cursor-pointer">Compress PDF</div></Link>
          <div className="hover:cursor-pointer">Convert PDF</div>
          <div className="hover:cursor-pointer">All Tools</div>
        </div>

        {/* Desktop Right Side (≥1024px) */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8">
          <div className="hover:cursor-pointer">Login</div>
          <div className="hover:cursor-pointer">SignUp</div>
          <div className="hover:cursor-pointer">Icon</div>
        </div>

        {/* Hamburger Menu (all <1024px) */}
        <div className="flex items-center md:hidden lg:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Tablet Hamburger Menu (768–1023px) */}
        <div className="hidden md:flex lg:hidden items-center">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      {isOpen && (
        <div className="md:hidden lg:hidden bg-[#f5f3f4] shadow-md">
          <div className="flex flex-col items-start p-4 gap-3">
            <Link to={"/merge-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Merge PDF</div></Link>
            <Link to={"/split-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Split PDF</div></Link>
            <Link to={"/compress-pdf"} onClick={toggleMenu}><div className="hover:cursor-pointer">Compress PDF</div></Link>
            <div className="hover:cursor-pointer" onClick={toggleMenu}>Convert PDF</div>
            <div className="hover:cursor-pointer" onClick={toggleMenu}>All Tools</div>
            <hr className="w-full border-gray-300 my-2" />
            <div className="hover:cursor-pointer" onClick={toggleMenu}>Login</div>
            <div className="hover:cursor-pointer" onClick={toggleMenu}>SignUp</div>
            <div className="hover:cursor-pointer" onClick={toggleMenu}>Icon</div>
          </div>
        </div>
      )}

      {/* Tablet Menu Dropdown (768–1023px) */}
      {isOpen && (
        <div className="hidden md:flex lg:hidden bg-[#f5f3f4] shadow-md">
          <div className="flex flex-col items-start p-4 gap-3">
            <div className="hover:cursor-pointer" onClick={toggleMenu}>All Tools</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
