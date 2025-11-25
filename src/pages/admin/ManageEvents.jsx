// ---------------------------------------------------------------------
// <copyright file="ManageEvents.jsx" company="Gravit InfoSystem">
// Copyright (c) Gravit InfoSystem. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setEvents, removeEvent } from '@/store/slices/eventsSlice'
import { eventsAPI } from '@/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'
import EventFormModal from '@/components/EventFormModal'
import { toast } from 'sonner'

const ManageEvents = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { events } = useSelector((state) => state.events)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const loadEvents = async () => {
    setLoading(true)
    try {
      const response = await eventsAPI.getAll()
      if (response.success) {
        dispatch(setEvents(response.data || []))
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard', { replace: true })
      return
    }
    loadEvents()
  }, [dispatch, user, navigate])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setDeletingId(id)
      try {
        const response = await eventsAPI.delete(id)
        if (response.success) {
          dispatch(removeEvent(id))
          toast.success('Event deleted successfully!')
        } else {
          toast.error(response.message || 'Failed to delete event')
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Failed to delete event')
      } finally {
        setDeletingId(null)
      }
    }
  }

  const handleAddEvent = () => {
    setSelectedEventId(null)
    setModalOpen(true)
  }

  const handleEditEvent = (id) => {
    setSelectedEventId(id)
    setModalOpen(true)
  }

  const handleModalSuccess = () => {
    loadEvents()
  }

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: 'bg-blue-100 text-blue-800',
      live: 'bg-green-100 text-green-800 animate-pulse',
      closed: 'bg-red-100 text-red-800',
    }
    return badges[status] || badges.upcoming
  }

  return (
    <>
      <div className="w-full space-y-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 mb-4">No events found</p>
              <Button onClick={handleAddEvent}>
                Create Your First Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="relative">
                  {event.image && (
                    <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-t-lg relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(event.status)}`}>
                        {event.status?.toUpperCase() || 'UPCOMING'}
                      </div>
                    </div>
                  )}
                  {!event.image && (
                    <div className="relative">
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold z-10 ${getStatusBadge(event.status)}`}>
                        {event.status?.toUpperCase() || 'UPCOMING'}
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                    <CardDescription>{event.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-primary">₹{event.price}</span>
                      <span className="text-sm text-gray-500">
                        {event.availableSeats || 0} seats
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEditEvent(event.id)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(event.id)}
                        disabled={deletingId === event.id}
                      >
                        {deletingId === event.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <EventFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        eventId={selectedEventId}
        onSuccess={handleModalSuccess}
      />
    </>
  )
}

export default ManageEvents
