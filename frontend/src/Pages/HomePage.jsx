// import React from 'react'
// import Card from './Card'
// import { CardDetails } from '../Constants/CardDetails'
// import Carousel from '../Components/Carousel'

// const HomePage = () => {
//   return (
//     <div className='mt-0'>
//       <div className='bg-[#eceef3]'>
      
//       <div className='mt-0'>
//           <Carousel />
//           <div><h1 className=' font-bold text-[40px] w-2/3 mx-auto mt-4'>Every tool you need to work with PDFs in one place</h1></div>

//           <div className='max-w-[80vw]'>
//              <div className="grid grid-cols-3 grid-rows-3 gap-6 p-4 mt-3 mr-20 ml-20">
//                     {CardDetails.map((element, index) => {
//                       return (
//                         <Card
//                               key={index}
//                               path={element.path}
//                           imageURL={element.image}
//                           cardName={element.cardName}
//                           desc={element.desc}
//                         />
//                       );
//                     })}
//               </div>
//           </div>
         

//           </div>
//        </div>
//     </div>
    
//   )
// }

// export default HomePage



import React from 'react'
import Card from './Card'
import { CardDetails } from '../Constants/CardDetails'
import Carousel from '../Components/Carousel'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <div className='mt-0'>
      <div className='bg-[#eceef3]'>
        <div className='mt-0'>
          <Carousel />

          <div className='text-center px-4 sm:px-6 md:px-10 mt-6'>
            <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] mx-auto'>
              Every tool you need to work with PDFs in one place
            </h1>
          </div>

          <div className='max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] mx-auto mt-6'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2 sm:p-4">
              {CardDetails.map((element, index) => (
                <Card 
                  key={index}
                  path={element.path}
                  imageURL={element.image} 
                  cardName={element.cardName} 
                  desc={element.desc} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  )
}

export default HomePage
