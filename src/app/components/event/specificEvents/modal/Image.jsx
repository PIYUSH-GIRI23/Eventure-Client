"use client"

import React, { useState, useRef } from 'react'
import NextImage from 'next/image'
import { IoClose } from 'react-icons/io5'
import { FiUploadCloud } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { uploadImageAction } from '@/app/actions/eventAction'
import LoadingSpinner from '../../../LoadingSpinner'
import { env } from '@/app/init/env'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const Image = ({ isOpen, onClose, eventId, activeTheme, onImageUploaded }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const validateFile = (file) => {
    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError(`Invalid image format. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`)
      return false
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024)
    const imageSizeLimit = env.limits.image_size_limit || 5
    if (fileSizeInMB > imageSizeLimit) {
      setError(`Image size exceeds limit of ${imageSizeLimit}MB`)
      return false
    }

    // Only allow 1 image at a time
    if (images.length >= 1) {
      setError(`Only 1 image allowed at a time. Please upload the current image first.`)
      return false
    }

    return true
  }

  const handleFileSelect = (filesArray) => {
    // Only process the first file
    const file = filesArray[0]
    if (file && validateFile(file)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          file,
          preview: e.target.result,
          uploaded: false,
          uploading: false
        }
        setImages([newImage])
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImageFile = async (imageItem, index) => {
    setLoading(true)
    setError(null)

    try {
      // Mark as uploading
      setImages(prev => prev.map((img, i) =>
        i === index ? { ...img, uploading: true } : img
      ))

      const accessToken = localStorage.getItem("access_token")
      const refreshToken = localStorage.getItem("refresh_token")

      const payload = {
        image: imageItem.file,
        event_id: eventId,
        access_token: accessToken,
        refresh_token: refreshToken
      }

      const response = await uploadImageAction(payload)
      
      if (!response.success) {
        setError(response.message || "Failed to upload image")
        setImages(prev => prev.map((img, i) =>
          i === index ? { ...img, uploading: false, uploaded: false } : img
        ))
        setLoading(false)
        return
      }

      // Update tokens if refreshed
      if (response.new_access_token) {
        localStorage.setItem("access_token", response.new_access_token)
      }
      if (response.new_refresh_token) {
        localStorage.setItem("refresh_token", response.new_refresh_token)
      }

      // Mark as uploaded
      setImages(prev => prev.map((img, i) =>
        i === index ? { ...img, uploaded: true, uploading: false, url: response.data.url } : img
      ))

      // Callback if provided
      if (onImageUploaded) {
        onImageUploaded(response.data.url, response.data.publicId)
      }

      // Close modal and refresh after 1 second
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 1000)
    } catch (err) {
      setError(err.message || "An error occurred while uploading image")
      setImages(prev => prev.map((img, i) =>
        i === index ? { ...img, uploading: false, uploaded: false } : img
      ))
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files)
    handleFileSelect(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = Array.from(e.dataTransfer.files)
    handleFileSelect(files)
  }

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-auto"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl flex flex-col"
        style={{ backgroundColor: activeTheme.divColor }}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 border-b z-10" style={{ borderColor: activeTheme.divColor2 }}>
          <h3 className="text-lg font-bold" style={{ color: activeTheme.textColor }}>
            Upload Images
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
            style={{ color: activeTheme.textColor }}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {/* Drop Zone - Only show if no images */}
          {images.length === 0 && (
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all"
              style={{
                borderColor: activeTheme.textColor2,
                backgroundColor: activeTheme.divColor2
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUploadCloud size={40} className="mx-auto mb-2" style={{ color: activeTheme.textColor2 }} />
              <p className="font-semibold mb-1" style={{ color: activeTheme.textColor }}>
                Drag and drop images or click to select
              </p>
              <p className="text-sm" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>
                Max {env.limits.image_limit || 10} images, {env.limits.image_size_limit || 5}MB per image
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ALLOWED_MIME_TYPES.join(',')}
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b'
              }}
            >
              {error}
            </div>
          )}

          {/* Image Preview - Improved Design */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div 
                className="rounded-xl overflow-hidden shadow-lg border-2" 
                style={{ borderColor: activeTheme.textColor2 + '40' }}
              >
                <div className="relative w-full max-h-80" style={{ aspectRatio: '16 / 9' }}>
                  <NextImage
                    src={images[0].preview}
                    alt="Image Preview"
                    fill
                    className="object-contain"
                    priority
                  />
                  
                  {/* Status Overlay */}
                  {images[0].uploading && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                      <div className="w-10 h-10 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-white font-semibold">Uploading...</p>
                    </div>
                  )}
                  
                  {images[0].uploaded && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="bg-green-500 text-white p-4 rounded-full">
                        ✓
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Button - Show after image selection */}
              {!images[0].uploaded && (
                <div className="flex gap-3">
                  <button
                    onClick={() => uploadImageFile(images[0], 0)}
                    disabled={images[0].uploading}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    {images[0].uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FiUploadCloud size={20} />
                        Upload Image
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleRemoveImage(0)}
                    disabled={images[0].uploading}
                    className="px-4 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Info Message */}
          {images.length === 0 && (
            <p style={{ color: activeTheme.textColor2, textAlign: 'center', opacity: 0.7 }}>
              No images added yet
            </p>
          )}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}
    </div>
  )
}

export default Image
