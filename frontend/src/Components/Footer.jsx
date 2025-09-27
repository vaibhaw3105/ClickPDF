// import React from 'react'

// const Footer = () => {
//   return (
//       <div className='h-20'>
          
//           <div><p>&copy;</p> Image Convertor 2025</div>
      
//     </div>
//   )
// }

// export default Footer

import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#f5f3f4] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm sm:text-base text-gray-600">
          &copy; ClickPDF 2025
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

