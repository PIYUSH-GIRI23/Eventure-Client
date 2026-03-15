"use client"

import React, { useState, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { FiUploadCloud } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { uploadVideoAction } from '@/app/actions/eventAction'
import LoadingSpinner from '../../../LoadingSpinner'
import { env } from '@/app/init/env'

const ALLOWED_MIME_TYPES = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm']

const Video = ({ isOpen, onClose, eventId, activeTheme, onVideoUploaded }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const validateFile = (file) => {
    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError(`Invalid video format. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`)
      return false
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024)
    const videoSizeLimit = env.limits.video_size_limit || 20
    if (fileSizeInMB > videoSizeLimit) {
      setError(`Video size exceeds limit of ${videoSizeLimit}MB`)
      return false
    }

    // Only allow 1 video at a time
    if (videos.length >= 1) {
      setError(`Only 1 video allowed at a time. Please upload the current video first.`)
      return false
    }

    return true
  }

  const handleFileSelect = (filesArray) => {
    // Only process the first file
    const file = filesArray[0]
    if (file && validateFile(file)) {
      const newVideo = {
        file,
        filename: file.name,
        size: file.size,
        uploaded: false,
        uploading: false
      }
      setVideos([newVideo])
      setError(null)
    }
  }

  const uploadVideoFile = async (videoItem, index) => {
    setLoading(true)
    setError(null)

    try {
      // Mark as uploading
      setVideos(prev => prev.map((vid, i) =>
        i === index ? { ...vid, uploading: true } : vid
      ))

      const accessToken = localStorage.getItem("access_token")
      const refreshToken = localStorage.getItem("refresh_token")

      const payload = {
        video: videoItem.file,
        event_id: eventId,
        access_token: accessToken,
        refresh_token: refreshToken
      }

      const response = await uploadVideoAction(payload)

      if (!response.success) {
        setError(response.message || "Failed to upload video")
        setVideos(prev => prev.map((vid, i) =>
          i === index ? { ...vid, uploading: false, uploaded: false } : vid
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
      setVideos(prev => prev.map((vid, i) =>
        i === index ? { ...vid, uploaded: true, uploading: false, url: response.data.url } : vid
      ))

      // Callback if provided
      if (onVideoUploaded) {
        onVideoUploaded(response.data.url, response.data.publicId)
      }

      // Close modal and refresh after 1 second
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 1000)
    } catch (err) {
      setError(err.message || "An error occurred while uploading video")
      setVideos(prev => prev.map((vid, i) =>
        i === index ? { ...vid, uploading: false, uploaded: false } : vid
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

  const handleRemoveVideo = (index) => {
    setVideos(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
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
            Upload Videos
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
          {/* Drop Zone - Only show if no videos */}
          {videos.length === 0 && (
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
                Drag and drop videos or click to select
              </p>
              <p className="text-sm" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>
                Max {env.limits.video_limit || 3} videos, {env.limits.video_size_limit || 20}MB per video
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

          {/* Upload Button - Show after video selection */}
          {videos.length === 1 && !videos[0].uploaded && (
            <div className="flex gap-3">
              <button
                onClick={() => uploadVideoFile(videos[0], 0)}
                disabled={videos[0].uploading}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all"
              >
                {videos[0].uploading ? 'Uploading...' : 'Upload Video'}
              </button>
              <button
                onClick={() => handleRemoveVideo(0)}
                disabled={videos[0].uploading}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
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

          {/* Video List */}
          {videos.length > 0 && (
            <div className="space-y-2">
              {videos.map((videoItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: activeTheme.divColor2 }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: activeTheme.textColor }}>
                      {videoItem.filename}
                    </p>
                    <p className="text-xs mt-1" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>
                      {formatFileSize(videoItem.size)}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    {/* Status Indicator */}
                    {videoItem.uploading && (
                      <span className="text-blue-500 font-bold text-sm">Uploading...</span>
                    )}
                    {!videoItem.uploading && videoItem.uploaded && (
                      <div className="text-green-500 font-bold text-lg">✓</div>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveVideo(index)}
                      disabled={videoItem.uploading}
                      className="p-2 rounded-full bg-red-500 transition-all hover:opacity-80 disabled:opacity-50"
                      title="Remove"
                    >
                      <MdDeleteOutline size={18} color="white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Message */}
          {videos.length === 0 && (
            <p style={{ color: activeTheme.textColor2, textAlign: 'center', opacity: 0.7 }}>
              No videos added yet
            </p>
          )}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}
    </div>
  )
}

export default Video
