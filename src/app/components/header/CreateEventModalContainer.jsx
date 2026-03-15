"use client"

import React from 'react'
import CreateEventModalView from './CreateEventModalView'
import { useCreateEventModal } from './useCreateEventModal'

const CreateEventModalContainer = ({ isOpen, onClose, activeTheme, onEventCreated }) => {
  const {
    isClient,
    eventName,
    setEventName,
    title,
    setTitle,
    description,
    setDescription,
    street,
    setStreet,
    selectedCountry,
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
    image,
    imagePreview,
    loading,
    error,
    fileInputRef,
    handleAddSkill,
    handleRemoveSkill,
    handleAddExperience,
    handleRemoveExperience,
    handleUpdateExperience,
    handleImageSelect,
    handleRemoveImage,
    handleSubmit,
    handleBackdropClick
  } = useCreateEventModal({ isOpen, onClose, onEventCreated })

  if (!isOpen || !isClient) return null

  return (
    <CreateEventModalView
      isOpen={isOpen}
      activeTheme={activeTheme}
      onClose={onClose}
      eventName={eventName}
      setEventName={setEventName}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      street={street}
      setStreet={setStreet}
      selectedState={selectedState}
      setSelectedState={setSelectedState}
      city={city}
      setCity={setCity}
      pinCode={pinCode}
      setPinCode={setPinCode}
      landmark={landmark}
      setLandmark={setLandmark}
      startDate={startDate}
      setStartDate={setStartDate}
      startTime={startTime}
      setStartTime={setStartTime}
      skills={skills}
      skillInput={skillInput}
      setSkillInput={setSkillInput}
      experience={experience}
      handleAddSkill={handleAddSkill}
      handleRemoveSkill={handleRemoveSkill}
      handleAddExperience={handleAddExperience}
      handleRemoveExperience={handleRemoveExperience}
      handleUpdateExperience={handleUpdateExperience}
      imagePreview={imagePreview}
      loading={loading}
      error={error}
      fileInputRef={fileInputRef}
      handleImageSelect={handleImageSelect}
      handleRemoveImage={handleRemoveImage}
      handleSubmit={handleSubmit}
      handleBackdropClick={handleBackdropClick}
    />
  )
}

export default CreateEventModalContainer
