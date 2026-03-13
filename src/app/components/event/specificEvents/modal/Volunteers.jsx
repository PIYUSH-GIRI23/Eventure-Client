import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const Volunteers = ({ isOpen, onClose, volunteers, activeTheme }) => {
  const router = useRouter()

  if (!isOpen) return null

  const handleVolunteerClick = (username) => {
    router.push(`/volunteer/${username}`)
    onClose()
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
        className="bg-white rounded-lg w-full max-w-md max-h-96 overflow-y-auto shadow-xl"
        style={{ backgroundColor: activeTheme.divColor }}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 border-b z-10" style={{ borderColor: activeTheme.divColor2, backgroundColor: activeTheme.divColor }}>
          <h3 className="text-lg font-bold" style={{ color: activeTheme.textColor }}>Volunteers ({volunteers?.length || 0})</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
            style={{ color: activeTheme.textColor }}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!volunteers || volunteers.length === 0 ? (
            <p style={{ color: activeTheme.textColor2 }}>No volunteers yet</p>
          ) : (
            <div className="space-y-3">
              {volunteers.map((volunteer, index) => (
                <div
                  key={index}
                  onClick={() => handleVolunteerClick(volunteer.username)}
                  className="p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: activeTheme.divColor2 }}
                >
                  <p className="font-semibold" style={{ color: activeTheme.textColor }}>
                    {volunteer.firstName} {volunteer.lastName}
                  </p>
                  <p className="text-sm" style={{ color: activeTheme.textColor2 }}>
                    @{volunteer.username}
                  </p>
                  <p className="text-xs mt-1" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>
                    {volunteer.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Volunteers
