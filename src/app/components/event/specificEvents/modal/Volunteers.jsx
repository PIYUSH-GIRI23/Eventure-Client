import React, { useState, useEffect, useCallback } from 'react'
import { IoClose } from 'react-icons/io5'
import { FiDownload } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { getMultipleVolunteerDetailsAction } from '@/app/actions/userAction'
import { generateVolunteersExcelWithSummary } from '@/app/utils/exportVolunteersExcel'

const Volunteers = ({ isOpen, onClose, volunteers, activeTheme, eventData }) => {
  const router = useRouter()
  const [detailedVolunteers, setDetailedVolunteers] = useState([])
  const [loading, setLoading] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(null)
  
  const userType = useSelector(state => state.userdata?.type)

  const fetchVolunteerDetails = useCallback(async () => {
    if (!volunteers || volunteers.length === 0) {
      console.log('No volunteers to fetch')
      return
    }

    setLoading(true)
    try {
      const usernames = volunteers.map(v => v.username)
      console.log('Fetching details for usernames:', usernames)
      
      const response = await getMultipleVolunteerDetailsAction({
        volunteerUsernames: usernames,
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token')
      })
      
      console.log('Volunteer details response:', response)
      if (response.success && response.data.volunteers) {
        setDetailedVolunteers(response.data.volunteers)
      } else {
        console.error('Failed to fetch volunteer details:', response.message)
      }
    } catch (error) {
      console.error('Error fetching volunteer details:', error)
    } finally {
      setLoading(false)
    }
  }, [volunteers])

  useEffect(() => {
    console.log('useEffect triggered:', { isOpen })
    if (isOpen) {
      
      fetchVolunteerDetails()
    }
  }, [isOpen, fetchVolunteerDetails])

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

  const handleExportExcel = () => {
    // Use detailed volunteers if available, otherwise use basic volunteer data
    const dataToExport = detailedVolunteers.length > 0 ? detailedVolunteers : volunteers
    
    if (dataToExport && dataToExport.length > 0) {
      generateVolunteersExcelWithSummary(dataToExport, eventData)
    } else {
      alert('No volunteer data to export')
    }
  }

  const displayVolunteers = detailedVolunteers.length > 0 ? detailedVolunteers : volunteers

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-auto"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-2xl max-h-[600px] overflow-y-auto shadow-xl flex flex-col"
        style={{ backgroundColor: activeTheme.divColor }}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 border-b z-10" style={{ borderColor: activeTheme.divColor2, backgroundColor: activeTheme.divColor }}>
          <h3 className="text-lg font-bold" style={{ color: activeTheme.textColor }}>Volunteers ({volunteers?.length || 0})</h3>
          <div className="flex items-center gap-2">
            {userType === 'manager' && (
              <button
                onClick={handleExportExcel}
                disabled={!volunteers || volunteers.length === 0}
                className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: activeTheme.textColor2 }}
                title="Export volunteer data to Excel"
              >
                <FiDownload size={16} />
                Export
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1 hover:opacity-70 transition-opacity"
              style={{ color: activeTheme.textColor }}
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {loading ? (
            <p style={{ color: activeTheme.textColor2 }}>Loading volunteer details...</p>
          ) : !volunteers || volunteers.length === 0 ? (
            <p style={{ color: activeTheme.textColor2 }}>No volunteers yet</p>
          ) : (
            <div className="space-y-3">
              {displayVolunteers.map((volunteer, index) => (
                <div key={index} className="rounded-lg overflow-hidden" style={{ backgroundColor: activeTheme.divColor2 }}>
                  {/* Summary Row */}
                  <div
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
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
                      <div className="text-xl" style={{ color: activeTheme.textColor2 }}>
                        {expandedIndex === index ? '▼' : '▶'}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedIndex === index && (
                    <div className="px-3 pb-3 border-t" style={{ borderColor: activeTheme.divColor }}>
                      <div className="mt-3 space-y-2 text-sm">
                        {volunteer.contact && (
                          <p style={{ color: activeTheme.textColor2 }}>
                            <span className="font-semibold">Contact:</span> {volunteer.contact}
                          </p>
                        )}
                        {(volunteer.city || volunteer.country) && (
                          <p style={{ color: activeTheme.textColor2 }}>
                            <span className="font-semibold">Location:</span> {volunteer.city}{volunteer.country ? `, ${volunteer.country}` : ''}
                          </p>
                        )}
                        {volunteer.pinCode && (
                          <p style={{ color: activeTheme.textColor2 }}>
                            <span className="font-semibold">Pincode:</span> {volunteer.pinCode}
                          </p>
                        )}
                        {volunteer.introduction && (
                          <p style={{ color: activeTheme.textColor2 }}>
                            <span className="font-semibold">Introduction:</span> {volunteer.introduction}
                          </p>
                        )}
                        {volunteer.skills && volunteer.skills.length > 0 && (
                          <div>
                            <p className="font-semibold" style={{ color: activeTheme.textColor2 }}>Skills:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {volunteer.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 rounded text-xs font-medium"
                                  style={{ backgroundColor: activeTheme.divColor, color: activeTheme.textColor }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {volunteer.total_events_participated > 0 && (
                          <p style={{ color: activeTheme.textColor2 }}>
                            <span className="font-semibold">Events Participated:</span> {volunteer.total_events_participated}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleVolunteerClick(volunteer.username)}
                        className="mt-3 w-full py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: activeTheme.textColor2 }}
                      >
                        View Full Profile
                      </button>
                    </div>
                  )}
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
