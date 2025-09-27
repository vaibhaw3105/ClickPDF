import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Carousel from './Components/Carousel'
import JPG_to_PDF from './Pages/Conversion/JPG_to_PDF'
import PDF_to_JPG from './Pages/Conversion/PDF_to_JPG'
import MergePDF from './Pages/Pdf_Tools/MergePDF'
import SplitPDF from './Pages/Pdf_Tools/SplitPDF'
import CompressPDF from './Pages/Pdf_Tools/CompressPDF'
import Word_to_PDF from './Pages/Conversion/Word_to_PDF'
import PDF_to_Word from './Pages/Conversion/PDF_to_Word'
import ImageCompression from './Pages/ImageCompression'
import PNG_to_JPG from './Pages/Conversion/PNG_to_JPG'


const App = () => {
  return (
    <div>
      <Navbar />
       <div className="pt-14 mt-0">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<Carousel />} /> */}
          <Route path="/jpg-to-pdf" element={<JPG_to_PDF />} />
          <Route path="/pdf-to-jpg" element={<PDF_to_JPG />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/split-pdf" element={<SplitPDF />} />
          <Route path="/compress-pdf" element={<CompressPDF />} />
          <Route path="/word-to-pdf" element={<Word_to_PDF />} />
          <Route path="/pdf-to-word" element={<PDF_to_Word />} />
          <Route path="/pdf-to-jpg" element={<PDF_to_JPG />} />
          <Route path="/compress-image" element={<ImageCompression />} />
          <Route path="/png-to-jpg" element={<PNG_to_JPG />} />
      </Routes>
      </div>
      
    </div>
  )
}

export default App
