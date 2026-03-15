"use client"

import React from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { MdClose } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'
import LoadingSpinner from '../LoadingSpinner'

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString + 'T00:00:00')
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const day = String(date.getDate()).padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

const CreateEventModalView = ({
  isOpen,
  activeTheme,
  onClose,
  eventName,
  setEventName,
  title,
  setTitle,
  description,
  setDescription,
  street,
  setStreet,
  selectedState,
  setSelectedState,
  city,
  setCity,
  pinCode,
  setPinCode,
  landmark,
  setLandmark,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  skills,
  skillInput,
  setSkillInput,
  experience,
  handleAddSkill,
  handleRemoveSkill,
  handleAddExperience,
  handleRemoveExperience,
  handleUpdateExperience,
  imagePreview,
  loading,
  error,
  fileInputRef,
  handleImageSelect,
  handleRemoveImage,
  handleSubmit,
  handleBackdropClick
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col"
        style={{ backgroundColor: activeTheme.divColor }}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b z-10" style={{ borderColor: activeTheme.divColor2 }}>
          <h2 className="text-2xl font-bold" style={{ color: activeTheme.textColor }}>
            Create New Event
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
            style={{ color: activeTheme.textColor }}
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div
              className="p-3 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b'
              }}
            >
              {error}
            </div>
          )}

          {/* Event Name and Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
                Event Name *
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., Community Cleanup Drive"
                style={{
                  backgroundColor: activeTheme.bgColor,
                  color: activeTheme.textColor,
                  borderColor: activeTheme.divColor2
                }}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title"
                style={{
                  backgroundColor: activeTheme.bgColor,
                  color: activeTheme.textColor,
                  borderColor: activeTheme.divColor2
                }}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event..."
              rows="3"
              style={{
                backgroundColor: activeTheme.bgColor,
                color: activeTheme.textColor,
                borderColor: activeTheme.divColor2
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          {/* Location Section */}
          <div>
            <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-3">
              Location Details *
            </label>
            <div className="space-y-3 p-3 rounded-lg" style={{ backgroundColor: activeTheme.bgColor }}>
              {/* Country (India only) */}
              <div>
                <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
                  Country *
                </label>
                <div
                  style={{
                    backgroundColor: activeTheme.divColor,
                    color: activeTheme.textColor,
                    borderColor: activeTheme.divColor2
                  }}
                  className="px-3 py-2 border rounded-lg"
                >
                  India
                </div>
              </div>

              {/* State */}
              <div>
                <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
                  State *
                </label>
                <input
                  type="text"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  placeholder="e.g., Maharashtra, Karnataka, Delhi"
                  style={{
                    backgroundColor: activeTheme.divColor,
                    color: activeTheme.textColor,
                    borderColor: activeTheme.divColor2
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                />
              </div>

              {/* City and Pin Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  style={{
                    backgroundColor: activeTheme.divColor,
                    color: activeTheme.textColor,
                    borderColor: activeTheme.divColor2
                  }}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                />
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="Pin Code"
                  style={{
                    backgroundColor: activeTheme.divColor,
                    color: activeTheme.textColor,
                    borderColor: activeTheme.divColor2
                  }}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                />
              </div>

              {/* Street and Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street"
                  style={{
                    backgroundColor: activeTheme.divColor,
                    color: activeTheme.textColor,
                    borderColor: activeTheme.divColor2
                  }}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                />
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Landmark (e.g., near Main Square)"
                  style={{
                    backgroundColor: activeTheme.divColor,
                    color: activeTheme.textColor,
                    borderColor: activeTheme.divColor2
                  }}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                />
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  backgroundColor: activeTheme.bgColor,
                  color: activeTheme.textColor,
                  borderColor: activeTheme.divColor2
                }}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              />
             
            </div>

            <div>
              <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
                Start Time *
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  backgroundColor: activeTheme.bgColor,
                  color: activeTheme.textColor,
                  borderColor: activeTheme.divColor2
                }}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
              Skills (Press Enter/Space to add) *
            </label>
            <div
              style={{
                backgroundColor: activeTheme.bgColor,
                borderColor: activeTheme.divColor2
              }}
              className="px-3 py-2 border rounded-lg"
            >
              {/* Skills Display */}
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 rounded-full"
                    style={{ backgroundColor: activeTheme.divColor2 }}
                  >
                    <span style={{ color: activeTheme.textColor }}>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: activeTheme.textColor }}
                    >
                      <MdClose size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Input */}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type skill and press Enter or Space"
                style={{
                  backgroundColor: activeTheme.bgColor,
                  color: activeTheme.textColor,
                  borderColor: activeTheme.divColor2
                }}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 text-sm"
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
              Experience *
            </label>
            <div className="space-y-2">
              {experience.map((exp, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={exp}
                    onChange={(e) => handleUpdateExperience(index, e.target.value)}
                    placeholder={`Experience ${index + 1}`}
                    style={{
                      backgroundColor: activeTheme.bgColor,
                      color: activeTheme.textColor,
                      borderColor: activeTheme.divColor2
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  />
                  {experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(index)}
                      className="px-3 py-2 rounded-lg hover:opacity-70 transition-opacity"
                      style={{
                        backgroundColor: activeTheme.divColor2,
                        color: activeTheme.textColor
                      }}
                    >
                      <MdClose size={20} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddExperience}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-70 transition-opacity mt-2"
                style={{
                  backgroundColor: activeTheme.divColor2,
                  color: activeTheme.textColor
                }}
              >
                <FiPlus size={20} />
                Add Experience
              </button>
            </div>
          </div>

          {/* Image Upload (Optional) */}
          <div>
            <label style={{ color: activeTheme.textColor }} className="block text-sm font-semibold mb-2">
              Event Banner Image (Optional)
            </label>
            {!imagePreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  backgroundColor: activeTheme.bgColor,
                  borderColor: activeTheme.divColor2,
                  color: activeTheme.textColor
                }}
                className="w-full px-4 py-3 border-2 border-dashed rounded-lg hover:opacity-80 transition-opacity font-semibold"
              >
                Click to select image or drag and drop
              </button>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden max-h-96 w-full flex items-center justify-center" style={{ backgroundColor: activeTheme.bgColor }}>
                  <Image
                    src={imagePreview}
                    alt="Event banner preview"
                    width={500}
                    height={700}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <MdClose size={20} />
                  Remove Image
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </form>

        {/* Footer with Buttons */}
        <div className="border-t p-6 flex gap-3 sticky bottom-0" style={{ borderColor: activeTheme.divColor2 }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              backgroundColor: activeTheme.divColor2,
              color: activeTheme.textColor
            }}
            className="flex-1 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-all disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              'Create Event'
            )}
          </button>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      {loading && <LoadingSpinner />}
    </div>
  )
}

export default CreateEventModalView
