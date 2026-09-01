import { PrismaClient, BookingStatus, NotificationType, Severity } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const demoPassword = 'password123'

const categories = [
  ['كهرباء', 'electrical', 'فنيون متخصصون في تأسيس وصيانة الأنظمة الكهربائية', 'Zap', 'amber', true],
  ['سباكة', 'plumbing', 'خدمات تركيب وإصلاح شبكات المياه والصرف الصحي', 'Wrench', 'sky', true],
  ['تكييف وتبريد', 'hvac', 'تركيب وصيانة أجهزة التكييف وأنظمة التهوية', 'AirVent', 'cyan', false],
  ['نجارة', 'carpentry', 'تركيب الأثاث وإصلاح الأبواب والأعمال الخشبية', 'Hammer', 'orange', false],
  ['نظافة عامة', 'cleaning', 'خدمات التنظيف الاحترافية للمنازل والمكاتب', 'Sparkles', 'fuchsia', true],
  ['تنسيق حدائق', 'landscaping', 'العناية بالحدائق وتنسيق المساحات الخارجية', 'Leaf', 'green', false],
  ['دهانات', 'painting', 'خدمات الدهان الداخلي والخارجي', 'PaintRoller', 'rose', false],
  ['هندسة مدنية', 'engineering', 'خدمات الهندسة المعمارية والإنشائية', 'HardHat', 'emerald', false],
  ['تقنية وشبكات', 'tech', 'خدمات الشبكات والدعم التقني', 'Cpu', 'indigo', false],
  ['نقل عفش', 'moving', 'خدمات نقل الأثاث والممتلكات بأمان', 'Truck', 'yellow', false],
  ['أقفال ومفاتيح', 'locksmith', 'فتح وتركيب وإصلاح الأقفال', 'Lock', 'slate', false],
  ['أنظمة أمنية', 'security', 'تركيب الكاميرات وأجهزة الإنذار', 'Camera', 'red', false],
] as const

const providerData = [
  { name: 'كريم السيد', email: 'karim.elsayed@example.com', phone: '+967 771 111 111', specialization: 'كهرباء', location: 'تعز', experience: '10+', hourlyRate: 2500, rating: 4.9, reviewsCount: 312, jobsCompleted: 540, earnings: 45200, verified: true, status: 'VERIFIED' as const, skills: ['تمديدات كهربائية', 'تركيب لوحات', 'منازل ذكية', 'قواطع دوائر', 'إضاءة LED'], biography: 'فني كهرباء معتمد بخبرة تزيد عن 12 عاماً في الأعمال الكهربائية السكنية والتجارية.', services: [{ title: 'فحص وإصلاح الأعطال الكهربائية', description: 'فحص شامل للأعطال وتنفيذ الإصلاحات الكهربائية المنزلية باحترافية.', price: 150, priceType: 'fixed' }, { title: 'تركيب وتمديدات كهربائية', description: 'تنفيذ وتمديد الدوائر الكهربائية وتركيب اللوحات والقواطع.', price: 2500, priceType: 'hourly' }] },
  { name: 'منى حسن', email: 'mona.provider@example.com', phone: '+967 772 222 222', specialization: 'سباكة', location: 'عدن', experience: '5-10', hourlyRate: 2200, rating: 4.6, reviewsCount: 89, jobsCompleted: 98, earnings: 32100, verified: false, status: 'PENDING' as const, skills: ['تسربات', 'سخانات', 'صرف صحي'], biography: 'أخصائية سباكة محترفة مع خبرة واسعة في حل مشاكل المياه والصرف.', services: [{ title: 'إصلاح تسربات المياه', description: 'كشف وإصلاح تسربات المياه في المطابخ والحمامات والخزانات.', price: 120, priceType: 'fixed' }, { title: 'تركيب سخان منزلي', description: 'تركيب وفحص السخانات المنزلية مع ضمان على الخدمة.', price: 350, priceType: 'fixed' }] },
  { name: 'أحمد فرح', email: 'ahmed.farah@example.com', phone: '+967 773 333 333', specialization: 'تكييف وتبريد', location: 'صنعاء', experience: '5-10', hourlyRate: 3200, rating: 4.9, reviewsCount: 56, jobsCompleted: 62, earnings: 28500, verified: true, status: 'VERIFIED' as const, skills: ['تركيب مكيفات', 'صيانة دورية', 'تعبئة غاز'], biography: 'فني تكييف معتمد متخصص في تركيب وصيانة جميع أنواع المكيفات.', services: [{ title: 'صيانة مكيف سبليت', description: 'تنظيف وفحص وصيانة مكيفات السبليت وتحسين كفاءة التبريد.', price: 180, priceType: 'fixed' }] },
  { name: 'ليلى الرشيد', email: 'layla.rashid@example.com', phone: '+967 774 444 444', specialization: 'نظافة عامة', location: 'صنعاء', experience: '2-5', hourlyRate: 1800, rating: 4.9, reviewsCount: 523, jobsCompleted: 1250, earnings: 78300, verified: true, status: 'VERIFIED' as const, skills: ['تنظيف عميق', 'تعقيم', 'مواد صديقة للبيئة'], biography: 'أخصائية تنظيف محترفة تقدم خدمات تنظيف شاملة بأعلى معايير الجودة.', services: [{ title: 'تنظيف عميق للمنزل', description: 'تنظيف شامل للمطابخ والحمامات والغرف باستخدام مواد آمنة.', price: 300, priceType: 'fixed' }, { title: 'تنظيف مكتب صغير', description: 'خدمة تنظيف دورية للمكاتب والمساحات التجارية الصغيرة.', price: 180, priceType: 'fixed' }] },
  { name: 'حسام عادل', email: 'hossam.adel@example.com', phone: '+967 775 555 555', specialization: 'سباكة', location: 'تعز', experience: '10+', hourlyRate: 2200, rating: 4.8, reviewsCount: 487, jobsCompleted: 920, earnings: 48500, verified: true, status: 'VERIFIED' as const, skills: ['تسربات', 'سخانات', 'صرف صحي', 'تركيب خلاطات'], biography: 'سباك محترف بخبرة 15 عاماً في جميع أعمال السباكة والصرف الصحي.', services: [{ title: 'تسليك وصيانة الصرف الصحي', description: 'تسليك وتنظيف خطوط الصرف ومعالجة الانسدادات المتكررة.', price: 200, priceType: 'fixed' }] },
  { name: 'سارة إبراهيم', email: 'sara.ibrahim@example.com', phone: '+967 776 666 666', specialization: 'تكييف وتبريد', location: 'تعز', experience: '5-10', hourlyRate: 3200, rating: 4.9, reviewsCount: 256, jobsCompleted: 410, earnings: 52100, verified: true, status: 'VERIFIED' as const, skills: ['تركيب مكيفات', 'صيانة دورية'], biography: 'فنية تكييف معتمدة متخصصة في تركيب وصيانة أجهزة التكييف.', services: [{ title: 'تركيب مكيف سبليت', description: 'تركيب احترافي لمكيفات السبليت مع اختبار التشغيل.', price: 450, priceType: 'fixed' }] },
]

const customerData = [
  { fullName: 'يارا سالم', email: 'yara.salem@example.com', phone: '+967 771 123 456', status: 'ACTIVE' as const },
  { fullName: 'أحمد السيد', email: 'ahmed.elsayed@example.com', phone: '+967 771 234 567', status: 'ACTIVE' as const },
  { fullName: 'منى حسن', email: 'mona.hassan@example.com', phone: '+967 733 345 678', status: 'INACTIVE' as const },
  { fullName: 'فاطمة أحمد', email: 'fatima.ahmed@example.com', phone: '+967 711 456 789', status: 'ACTIVE' as const },
  { fullName: 'عمر إبراهيم', email: 'omar.ibrahim@example.com', phone: '+967 774 567 890', status: 'ACTIVE' as const },
  { fullName: 'ليلى محمد', email: 'layla.mohamed@example.com', phone: '+967 735 678 901', status: 'SUSPENDED' as const },
]

async function main() {
  console.log('🌱 Starting idempotent demo seed...')
  const password = await bcrypt.hash(demoPassword, 10)

  for (const [name, slug, description, icon, color, featured] of categories) {
    await prisma.category.upsert({ where: { slug }, update: { name, description, icon, color, featured, status: 'ACTIVE' }, create: { name, slug, nameAr: name, description, icon, color, featured } })
  }
  console.log(`✅ Upserted ${categories.length} categories`)

  const admin = await prisma.profile.upsert({ where: { email: 'admin@smart-service.com' }, update: { fullName: 'مدير النظام', phone: '+967 700 000 000', password, role: 'ADMIN', status: 'ACTIVE' }, create: { fullName: 'مدير النظام', email: 'admin@smart-service.com', phone: '+967 700 000 000', password, role: 'ADMIN', status: 'ACTIVE' } })
  const customers = []
  for (const customer of customerData) {
    customers.push(await prisma.profile.upsert({ where: { email: customer.email }, update: { ...customer, password, role: 'CUSTOMER' }, create: { ...customer, password, role: 'CUSTOMER' } }))
  }
  console.log(`✅ Upserted admin and ${customers.length} customers`)

  const providers = []
  for (const p of providerData) {
    const category = await prisma.category.findUniqueOrThrow({ where: { name: p.specialization } })
    const profile = await prisma.profile.upsert({
      where: { email: p.email },
      update: { fullName: p.name, phone: p.phone, password, role: 'PROVIDER', status: 'ACTIVE', provider: { upsert: { update: { specialization: p.specialization, location: p.location, experience: p.experience, hourlyRate: p.hourlyRate, rating: p.rating, reviewsCount: p.reviewsCount, jobsCompleted: p.jobsCompleted, earnings: p.earnings, verified: p.verified, status: p.status, skills: JSON.stringify(p.skills), biography: p.biography }, create: { specialization: p.specialization, location: p.location, experience: p.experience, hourlyRate: p.hourlyRate, rating: p.rating, reviewsCount: p.reviewsCount, jobsCompleted: p.jobsCompleted, earnings: p.earnings, verified: p.verified, status: p.status, skills: JSON.stringify(p.skills), biography: p.biography, categories: { connect: { id: category.id } } } } } },
      create: { fullName: p.name, email: p.email, phone: p.phone, password, role: 'PROVIDER', status: 'ACTIVE', provider: { create: { specialization: p.specialization, location: p.location, experience: p.experience, hourlyRate: p.hourlyRate, rating: p.rating, reviewsCount: p.reviewsCount, jobsCompleted: p.jobsCompleted, earnings: p.earnings, verified: p.verified, status: p.status, skills: JSON.stringify(p.skills), biography: p.biography, categories: { connect: { id: category.id } } } } },
      include: { provider: true },
    })
    if (profile.provider) {
      await prisma.provider.update({ where: { id: profile.provider.id }, data: { categories: { connect: { id: category.id } } } })
      providers.push(profile.provider)
      for (const service of p.services) {
        const existing = await prisma.service.findFirst({ where: { providerId: profile.provider.id, title: service.title } })
        if (existing) await prisma.service.update({ where: { id: existing.id }, data: { ...service, categoryId: category.id, status: 'ACTIVE', featured: p.verified } })
        else await prisma.service.create({ data: { ...service, images: [], categoryId: category.id, providerId: profile.provider.id, status: 'ACTIVE', featured: p.verified } })
      }
    }
  }
  console.log(`✅ Upserted ${providers.length} providers and their services`)

  const serviceList = await prisma.service.findMany({ include: { provider: true }, orderBy: { createdAt: 'asc' } })
  const activeCustomers = customers.filter((customer) => customer.status === 'ACTIVE')
  const bookingRows = [
    { customer: activeCustomers[0], service: serviceList[0], status: BookingStatus.COMPLETED, days: -12, time: '09:00', address: 'شارع جمال، تعز', notes: 'يرجى الاتصال قبل الوصول', totalPrice: 150 },
    { customer: activeCustomers[1], service: serviceList[1] || serviceList[0], status: BookingStatus.CONFIRMED, days: 2, time: '10:30', address: 'حي المنصورة، عدن', notes: 'الخدمة في الطابق الثاني', totalPrice: 2500 },
    { customer: activeCustomers[2], service: serviceList[2] || serviceList[0], status: BookingStatus.PENDING, days: 4, time: '16:00', address: 'حي حدة، صنعاء', notes: 'أحتاج تقديرًا قبل البدء', totalPrice: 180 },
    { customer: activeCustomers[3], service: serviceList[3] || serviceList[0], status: BookingStatus.IN_PROGRESS, days: 0, time: '14:00', address: 'شارع الستين، صنعاء', notes: 'تنظيف عميق للمنزل', totalPrice: 300 },
    { customer: activeCustomers[4], service: serviceList[4] || serviceList[0], status: BookingStatus.COMPLETED, days: -30, time: '11:00', address: 'بير باشا، تعز', notes: null, totalPrice: 200 },
  ]
  const bookings = []
  for (const row of bookingRows) {
    if (!row.customer || !row.service) continue
    const date = new Date(); date.setDate(date.getDate() + row.days); date.setHours(0, 0, 0, 0)
    const existing = await prisma.booking.findFirst({ where: { customerId: row.customer.id, serviceId: row.service.id, date, time: row.time } })
    const booking = existing || await prisma.booking.create({ data: { customerId: row.customer.id, providerId: row.service.providerId, serviceId: row.service.id, status: row.status, date, time: row.time, address: row.address, notes: row.notes, totalPrice: row.totalPrice, tax: row.totalPrice * 0.05 } })
    bookings.push(booking)
    if (row.status === BookingStatus.COMPLETED) await prisma.review.upsert({ where: { bookingId: booking.id }, update: { rating: 5, comment: 'خدمة ممتازة والتزام بالموعد.' }, create: { bookingId: booking.id, customerId: row.customer.id, serviceId: row.service.id, rating: 5, comment: 'خدمة ممتازة والتزام بالموعد.' } })
  }
  console.log(`✅ Upserted ${bookings.length} demo bookings and reviews`)

  const notifications = [
    { title: 'طلب توثيق جديد', message: 'قدم مزود خدمة جديد وثائق الاعتماد وهو بانتظار المراجعة.', type: NotificationType.VERIFICATION, severity: Severity.WARNING, read: false, userId: admin.id },
    { title: 'تم تأكيد الحجز', message: 'تم تأكيد حجزك القادم، ويمكنك مراجعة التفاصيل من لوحة التحكم.', type: NotificationType.BOOKING, severity: Severity.SUCCESS, read: false, userId: activeCustomers[0]?.id },
    { title: 'تقييم جديد', message: 'شكرًا لمشاركة تقييمك بعد إتمام الخدمة.', type: NotificationType.REVIEW, severity: Severity.INFO, read: true, userId: activeCustomers[1]?.id },
  ]
  for (const notification of notifications) {
    const existing = await prisma.notification.findFirst({ where: { title: notification.title, userId: notification.userId } })
    if (existing) await prisma.notification.update({ where: { id: existing.id }, data: notification })
    else await prisma.notification.create({ data: notification })
  }
  console.log('✅ Upserted demo notifications')
  console.log(`\n🎉 Seed completed successfully! Demo password: ${demoPassword}`)
}

main().catch((error) => { console.error(error); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
