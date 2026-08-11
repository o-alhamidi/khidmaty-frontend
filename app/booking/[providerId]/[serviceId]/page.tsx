'use client'

import { BookingForm } from '@/components/booking/booking-form'

export default function BookingPage({
  params,
}: {
  params: { providerId: string; serviceId: string }
}) {
  return <BookingForm providerId={params.providerId} serviceId={params.serviceId} />
}
