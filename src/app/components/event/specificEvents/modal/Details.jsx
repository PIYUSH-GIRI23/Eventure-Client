import React from 'react'
import { IoClose } from 'react-icons/io5'
import formatDateTime from '@/app/utils/formatDateTime'

const Details = ({ isOpen, onClose, event, activeTheme }) => {
  if (!isOpen || !event) return null

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
        className="bg-white rounded-lg w-full max-w-2xl max-h-96 overflow-y-auto shadow-xl"
        style={{ backgroundColor: activeTheme.divColor }}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 border-b z-10" style={{ borderColor: activeTheme.divColor2, backgroundColor: activeTheme.divColor }}>
          <h3 className="text-lg font-bold" style={{ color: activeTheme.textColor }}>Event Details</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
            style={{ color: activeTheme.textColor }}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="font-bold mb-2" style={{ color: activeTheme.textColor }}>Description</h4>
            <p style={{ color: activeTheme.textColor2, opacity: 0.9 }}>
              {event.description || 'No description available'}
            </p>
          </div>

          {/* Skills */}
          {event.skills && event.skills.length > 0 && (
            <div>
              <h4 className="font-bold mb-2" style={{ color: activeTheme.textColor }}>Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {event.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: activeTheme.divColor2, color: activeTheme.textColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {event.experience && event.experience.length > 0 && (
            <div>
              <h4 className="font-bold mb-2" style={{ color: activeTheme.textColor }}>Experience Required</h4>
              <ul className="space-y-1">
                {event.experience.map((exp, index) => (
                  <li key={index} style={{ color: activeTheme.textColor2, opacity: 0.9 }}>
                    • {exp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Event Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-semibold mb-1" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>Volunteers</h5>
              <p className="text-xl font-bold" style={{ color: activeTheme.textColor }}>
                {event.volunteer_count || 0}
              </p>
            </div>
            <div>
              <h5 className="text-sm font-semibold mb-1" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>Date Posted</h5>
              <p className="text-sm" style={{ color: activeTheme.textColor }}>
                {formatDateTime(event.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
