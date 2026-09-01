import { ProviderProfile } from '@/components/provider/provider-profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الملف الشخصي للمزود - منصة الخدمات الذكية',
  description: 'عرض الملف الشخصي المفصل لمزود الخدمة بما في ذلك التقييمات، المراجعات، المهارات، وأوقات العمل.',
}

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <main>
      <ProviderProfile providerId={id} />
    </main>
  )
}