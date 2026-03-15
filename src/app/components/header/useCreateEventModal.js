import { useState, useRef, useSyncExternalStore } from 'react'
import { createEventAction } from '@/app/actions/eventAction'

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

export const useCreateEventModal = ({ isOpen, onClose, onEventCreated }) => {
  // Hydration fix
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  // Form state
  const [eventName, setEventName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [street, setStreet] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('IN')
  const [selectedState, setSelectedState] = useState('')
  const [city, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [landmark, setLandmark] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')
  const [experience, setExperience] = useState([''])
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const validateForm = () => {
    setError('')
    
    if (!eventName.trim()) {
      setError('Event name is required')
      return false
    }
    if (!title.trim()) {
      setError('Title is required')
      return false
    }
    if (!description.trim()) {
      setError('Description is required')
      return false
    }
    if (!street.trim() || !selectedCountry || !selectedState.trim() || !city.trim() || !pinCode.trim()) {
      setError('All location fields are required')
      return false
    }
    if (!startDate) {
      setError('Start date is required')
      return false
    }
    if (!startTime) {
      setError('Start time is required')
      return false
    }
    if (skills.length === 0) {
      setError('At least one skill is required')
      return false
    }
    const validExperiences = experience.filter(exp => exp.trim())
    if (validExperiences.length === 0) {
      setError('At least one experience field is required')
      return false
    }
    
    return true
  }

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const trimmedSkill = skillInput.trim()
      if (trimmedSkill && !skills.includes(trimmedSkill)) {
        setSkills([...skills, trimmedSkill])
        setSkillInput('')
      }
    }
  }

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleAddExperience = () => {
    setExperience([...experience, ''])
  }

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const handleUpdateExperience = (index, value) => {
    const newExperience = [...experience]
    newExperience[index] = value
    setExperience(newExperience)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        setError('Invalid image format. Allowed: JPEG, PNG, GIF, WebP')
        return
      }

      // Validate file size
      const fileSizeInMB = file.size / (1024 * 1024)
      if (fileSizeInMB > 5) {
        setError('Image size exceeds 5MB limit')
        return
      }

      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')

      const location = `${street}, ${city}, ${selectedState}, ${selectedCountry}, ${pinCode}${landmark ? ` near ${landmark}` : ''}`

      const bodyData = {
        event_name: eventName,
        title,
        description,
        location,
        skills,
        experience: experience.filter(exp => exp.trim()),
        start_date: formatDate(startDate),
        start_time: startTime
      }

      const payload = {
        image,
        bodyData,
        access_token: accessToken,
        refresh_token: refreshToken
      }

      const response = await createEventAction(payload)

      if (!response.success) {
        setError(response.message || 'Failed to create event')
        setLoading(false)
        return
      }

      // Update tokens if refreshed
      if (response.new_access_token) {
        localStorage.setItem('access_token', response.new_access_token)
      }
      if (response.new_refresh_token) {
        localStorage.setItem('refresh_token', response.new_refresh_token)
      }

      // Reset form
      resetForm()
      onClose()

      // Call callback if provided and refresh
      if (onEventCreated) {
        onEventCreated()
      }

      // Trigger refresh on header - find and click refresh button
      setTimeout(() => {
        const refreshButton = document.querySelector('button[title="Refresh events"]')
        if (refreshButton) {
          refreshButton.click()
        }
      }, 500)
    } catch (err) {
      setError(err.message || 'An error occurred while creating event')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEventName('')
    setTitle('')
    setDescription('')
    setStreet('')
    setSelectedCountry('IN')
    setSelectedState('')
    setCity('')
    setPinCode('')
    setLandmark('')
    setStartDate('')
    setStartTime('')
    setSkills([])
    setSkillInput('')
    setExperience([''])
    setImage(null)
    setImagePreview(null)
    setError('')
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return {
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
    setSelectedCountry,
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
  }
}
