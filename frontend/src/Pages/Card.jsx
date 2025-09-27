// import React from 'react'
// import { Link } from 'react-router-dom'

// const Card = ({path, imageURL, cardName, desc}) => {
//   return (
//     <div className='border-[1.5px] bg-white border-gray-300 rounded-xl hover:border-[#666c70]  cursor-pointer'>
//           <Link to={path}>
//             <div className='p-7'>
//               <div className='w-3 h-5'><img src={ imageURL} /></div>
//               <div className='text-2xl text-gray-700 font-semibold mt-0.5' >{ cardName}</div>
//               <div className="para text-[0.8rem] text-[#737983] mt-1 font-medium">{desc}</div>
//             </div>
//           </Link>
//     </div>
//   )
// }

// export default Card


import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({path, imageURL, cardName, desc}) => {
  return (
    <div className='border-[1.5px] bg-white border-gray-300 rounded-xl hover:border-[#666c70] cursor-pointer transition-all duration-300'>
      <Link to={path}>
        <div className='p-4 sm:p-6 flex flex-col items-center text-center'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 mb-3'>
            <img src={imageURL} alt={cardName} className='w-full h-full object-contain' />
          </div>
          <div className='text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold'>{cardName}</div>
          <div className="para text-xs sm:text-sm md:text-[0.8rem] text-[#737983] mt-1 font-medium">
            {desc}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
