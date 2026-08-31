'use client'

import { BookingForm } from '@/components/booking/booking-form'

export default function BookingPage({
  params,
}: {
  params: Promise<{ providerId: string; serviceId: string }>
}) {
  return params.then(({ providerId, serviceId }) => (
    <BookingForm providerId={providerId} serviceId={serviceId} />
  ))
}
