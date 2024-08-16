import React, { useState } from 'react';
import { uploadImage } from '../api/catApi';

const Uploadpage: React.FunctionComponent = () => {
  const [files, setFiles] = useState<File[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files))
    }
  }

  // Check if image uploaded, if yes then test it, if it suceeds, redirect, otherwise, error message
  const handleUpload = () => {
    // Clear any old errors
    setErrorMessage(null)
    if (files.length > 0) {
      const uploadPromises = files.map((file) => uploadImage(file))
      Promise.all(uploadPromises)
        .then(() => {
          window.location.replace("/")
        })
        .catch((error) => {
          setErrorMessage('An error occurred while uploading one or more images. Please try again.')
          console.error('Upload Error:', error)
        })
    } else {
      setErrorMessage('An error occurred while uploading one or more images. Please try again.')
    }
  }

  return (
    <div className='container mx-auto pt-4'>
      <div className="flex justify-center gap-4">
        <div className="w-10/12 md:w-6/12 bg-white p-4 shadow-md rounded-lg overflow-hidden mx-auto">
          <h1 className="text-2xl font-bold mb-5 text-teal">Upload an Image</h1>
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            className="mb-4"
          />
          <br/>
          <button
            onClick={handleUpload}
            className="teal-btn mt-4 py-2 px-4 rounded text-white"
          >
            Submit
          </button>
          {files.length > 0 && (
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Files to Upload:</h2>
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-500 mt-4 py-2 px-4 rounded text-red-800 border-red">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Uploadpage;