import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import formatDateTime from '@/app/utils/formatDateTime'

const Bookmarked = ({ isOpen, onClose, bookmarked, activeTheme }) => {
  const router = useRouter()

  if (!isOpen) return null

  const handleUserClick = (username, type) => {
    router.push(`/${type}/${username}`)
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
          <h3 className="text-lg font-bold" style={{ color: activeTheme.textColor }}>Bookmarked</h3>
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
          {!bookmarked || bookmarked.length === 0 ? (
            <p style={{ color: activeTheme.textColor2 }}>No bookmarks yet</p>
          ) : (
            <div className="space-y-3">
              {bookmarked.map((bookmark, index) => (
                <div
                  key={index}
                  onClick={() => handleUserClick(bookmark.username, bookmark.type)}
                  className="p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: activeTheme.divColor2 }}
                >
                  <p className="font-semibold" style={{ color: activeTheme.textColor }}>
                    @{bookmark.username}
                  </p>
                  <p className="text-sm" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>
                    {formatDateTime(bookmark.bookmark_time)}
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

export default Bookmarked