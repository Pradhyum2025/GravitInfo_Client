// ---------------------------------------------------------------------
// <copyright file="Bookings.jsx" company="Gravit InfoSystem">
// Copyright (c) Gravit InfoSystem. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { setBookings } from '@/store/slices/bookingsSlice'
import { setEvents } from '@/store/slices/eventsSlice'
import { bookingsAPI, eventsAPI } from '@/api'
import BookingCard from './BookingCard'

const Bookings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { bookings } = useSelector((state) => state.bookings)
  const { events } = useSelector((state) => state.events)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (user?.id) {
        setLoading(true)
        try {
          const [bookingsRes, eventsRes] = await Promise.all([
            bookingsAPI.getUserBookings(user.id),
            eventsAPI.getAll()
          ])
          if (bookingsRes.success) dispatch(setBookings(bookingsRes.data || []))
          if (eventsRes.success) dispatch(setEvents(eventsRes.data || []))
        } catch (err) {
          console.error('Failed to load data:', err)
        } finally {
          setLoading(false)
        }
      }
    }
    loadData()
  }, [dispatch, user?.id])

  return (
    <div className="w-full space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : bookings.length === 0 ? (
        <Card className="shadow-lg">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground text-lg">No bookings found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
          {bookings.map((booking, index) => {
            const event = events.find((e) => e.id === booking.eventId)
            return (
              <BookingCard key={booking.id} event={event} booking={booking} index={index} />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Bookings
