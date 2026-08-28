import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  const hashedPassword = await bcrypt.hash('password123', 10)

  // ==================== CATEGORIES ====================
  const categories = await prisma.category.createMany({
    data: [
      { name: 'كهرباء', slug: 'electrical', description: 'فنيون متخصصون في تأسيس وصيانة الأنظمة الكهربائية', icon: 'Zap', color: 'amber', featured: true },
      { name: 'سباكة', slug: 'plumbing', description: 'خدمات تركيب وإصلاح شبكات المياه والصرف الصحي', icon: 'Wrench', color: 'sky', featured: true },
      { name: 'تكييف وتبريد', slug: 'hvac', description: 'تركيب وصيانة أجهزة التكييف وأنظمة التهوية', icon: 'AirVent', color: 'cyan', featured: false },
      { name: 'نجارة', slug: 'carpentry', description: 'تركيب الأثاث، إصلاح الأبواب، والأعمال الخشبية', icon: 'Hammer', color: 'orange', featured: false },
      { name: 'نظافة عامة', slug: 'cleaning', description: 'خدمات التنظيف الاحترافية للمنازل والمكاتب', icon: 'Sparkles', color: 'fuchsia', featured: true },
      { name: 'تنسيق حدائق', slug: 'landscaping', description: 'العناية بالحدائق، زراعة الأشجار، وتنسيق المساحات الخارجية', icon: 'Leaf', color: 'green', featured: false },
      { name: 'دهانات', slug: 'painting', description: 'خدمات الدهان الداخلي والخارجي', icon: 'PaintRoller', color: 'rose', featured: false },
      { name: 'هندسة مدنية', slug: 'engineering', description: 'خدمات الهندسة المعمارية والإنشائية', icon: 'HardHat', color: 'emerald', featured: false },
      { name: 'تقنية وشبكات', slug: 'tech', description: 'خدمات الشبكات والتقنية', icon: 'Cpu', color: 'indigo', featured: false },
      { name: 'نقل عفش', slug: 'moving', description: 'خدمات نقل الأثاث والممتلكات', icon: 'Truck', color: 'yellow', featured: false },
      { name: 'أقفال ومفاتيح', slug: 'locksmith', description: 'خدمات فتح الأقفال وتركيبها', icon: 'Lock', color: 'slate', featured: false },
      { name: 'أنظمة أمنية', slug: 'security', description: 'تركيب كاميرات وأجهزة إنذار', icon: 'Camera', color: 'red', featured: false },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${categories.count} categories`)

  // ==================== ADMIN ====================
  await prisma.profile.create({
    data: {
      fullName: 'مدير النظام',
      email: 'admin@smart-service.com',
      phone: '+967 700 000 000',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Created admin user')

  // ==================== CUSTOMERS ====================
  const customers = await Promise.all([
    prisma.profile.create({
      data: {
        fullName: 'يارا سالم',
        email: 'yara.salem@example.com',
        phone: '+967 771 123 456',
        password: hashedPassword,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
    }),
    prisma.profile.create({
      data: {
        fullName: 'أحمد السيد',
        email: 'ahmed.elsayed@example.com',
        phone: '+967 771 234 567',
        password: hashedPassword,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
    }),
    prisma.profile.create({
      data: {
        fullName: 'منى حسن',
        email: 'mona.hassan@example.com',
        phone: '+967 733 345 678',
        password: hashedPassword,
        role: 'CUSTOMER',
        status: 'INACTIVE',
      },
    }),
    prisma.profile.create({
      data: {
        fullName: 'فاطمة أحمد',
        email: 'fatima.ahmed@example.com',
        phone: '+967 711 456 789',
        password: hashedPassword,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
    }),
    prisma.profile.create({
      data: {
        fullName: 'عمر إبراهيم',
        email: 'omar.ibrahim@example.com',
        phone: '+967 774 567 890',
        password: hashedPassword,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
    }),
    prisma.profile.create({
      data: {
        fullName: 'ليلى محمد',
        email: 'layla.mohamed@example.com',
        phone: '+967 735 678 901',
        password: hashedPassword,
        role: 'CUSTOMER',
        status: 'SUSPENDED',
      },
    }),
  ])
  console.log(`✅ Created ${customers.length} customers`)

  // ==================== PROVIDERS ====================
  const providerData = [
    {
      name: 'كريم السيد',
      email: 'karim.elsayed@example.com',
      phone: '+967 771 111 111',
      specialization: 'كهرباء',
      location: 'تعز',
      experience: '10+',
      hourlyRate: 2500,
      rating: 4.9,
      reviewsCount: 312,
      jobsCompleted: 540,
      earnings: 45200,
      verified: true,
      status: 'VERIFIED',
      skills: JSON.stringify(['تمديدات كهربائية', 'تركيب لوحات', 'منازل ذكية', 'قواطع دوائر', 'إضاءة LED']),
      specialties: JSON.stringify(['تمديدات سكنية', 'تركيبات تجارية', 'أنظمة المنازل الذكية', 'إصلاحات طارئة']),
      biography: 'فني كهرباء معتمد بخبرة تزيد عن 12 عاماً في الأعمال الكهربائية السكنية والتجارية.',
    },
    {
      name: 'منى حسن',
      email: 'mona.provider@example.com',
      phone: '+967 772 222 222',
      specialization: 'سباكة',
      location: 'عدن',
      experience: '5-10',
      hourlyRate: 2200,
      rating: 4.6,
      reviewsCount: 89,
      jobsCompleted: 98,
      earnings: 32100,
      verified: false,
      status: 'PENDING',
      skills: JSON.stringify(['تسربات', 'سخانات', 'صرف صحي']),
      specialties: JSON.stringify(['إصلاح تسربات', 'تركيب سخانات']),
      biography: 'أخصائية سباكة محترفة مع خبرة واسعة في حل مشاكل المياه والصرف.',
    },
    {
      name: 'أحمد فرح',
      email: 'ahmed.farah@example.com',
      phone: '+967 773 333 333',
      specialization: 'تكييف وتبريد',
      location: 'صنعاء',
      experience: '5-10',
      hourlyRate: 3200,
      rating: 4.9,
      reviewsCount: 56,
      jobsCompleted: 62,
      earnings: 28500,
      verified: true,
      status: 'VERIFIED',
      skills: JSON.stringify(['تركيب مكيفات', 'صيانة دورية', 'تعبئة غاز']),
      specialties: JSON.stringify(['مكيفات سبليت', 'مكيفات مركزية']),
      biography: 'فني تكييف معتمد متخصص في تركيب وصيانة جميع أنواع المكيفات.',
    },
    {
      name: 'ليلى الرشيد',
      email: 'layla.rashid@example.com',
      phone: '+967 774 444 444',
      specialization: 'نظافة عامة',
      location: 'صنعاء',
      experience: '2-5',
      hourlyRate: 1800,
      rating: 4.9,
      reviewsCount: 523,
      jobsCompleted: 1250,
      earnings: 78300,
      verified: true,
      status: 'VERIFIED',
      skills: JSON.stringify(['تنظيف عميق', 'تعقيم', 'مواد صديقة للبيئة']),
      specialties: JSON.stringify(['تنظيف منازل', 'تنظيف مكاتب', 'تنظيف ما بعد البناء']),
      biography: 'أخصائية تنظيف محترفة تقدم خدمات تنظيف شاملة بأعلى معايير الجودة.',
    },
    {
      name: 'حسام عادل',
      email: 'hossam.adel@example.com',
      phone: '+967 775 555 555',
      specialization: 'سباكة',
      location: 'تعز',
      experience: '10+',
      hourlyRate: 2200,
      rating: 4.8,
      reviewsCount: 487,
      jobsCompleted: 920,
      earnings: 48500,
      verified: true,
      status: 'VERIFIED',
      skills: JSON.stringify(['تسربات', 'سخانات', 'صرف صحي', 'تركيب خلاطات']),
      specialties: JSON.stringify(['إصلاح تسربات', 'تركيب سخانات', 'تسليك مجاري']),
      biography: 'سباك محترف بخبرة 15 عاماً في جميع أعمال السباكة والصرف الصحي.',
    },
    {
      name: 'سارة إبراهيم',
      email: 'sara.ibrahim@example.com',
      phone: '+967 776 666 666',
      specialization: 'تكييف وتبريد',
      location: 'تعز',
      experience: '5-10',
      hourlyRate: 3200,
      rating: 4.9,
      reviewsCount: 256,
      jobsCompleted: 410,
      earnings: 52100,
      verified: true,
      status: 'VERIFIED',
      skills: JSON.stringify(['تركيب مكيفات', 'صيانة دورية']),
      specialties: JSON.stringify(['مكيفات سبليت', 'مكيفات شباك']),
      biography: 'فنية تكييف معتمدة متخصصة في تركيب وصيانة أجهزة التكييف.',
    },
  ]

  for (const p of providerData) {
    const user = await prisma.profile.create({
      data: {
        fullName: p.name,
        email: p.email,
        phone: p.phone,
        password: hashedPassword,
        role: 'PROVIDER',
        status: 'ACTIVE',
        provider: {
          create: {
            specialization: p.specialization,
            location: p.location,
            experience: p.experience,
            hourlyRate: p.hourlyRate,
            rating: p.rating,
            reviewsCount: p.reviewsCount,
            jobsCompleted: p.jobsCompleted,
            earnings: p.earnings,
            verified: p.verified,
            status: p.status as any,
            skills: p.skills,
            specialties: p.specialties,
            biography: p.biography,
          },
        },
      },
      include: { provider: true },
    })

    const category = await prisma.category.findFirst({ where: { name: p.specialization } })
    if (category && user.provider) {
      await prisma.provider.update({
        where: { id: user.provider.id },
        data: {
          categories: { connect: { id: category.id } },
        },
      })
    }
  }
  console.log(`✅ Created ${providerData.length} providers`)

  // ==================== NOTIFICATIONS ====================
  await prisma.notification.createMany({
    data: [
      { type: 'VERIFICATION', title: 'طلب توثيق جديد', message: 'قدم أحمد حسن (فني كهرباء) وثائق الاعتماد وهو بانتظار الموافقة.', severity: 'WARNING', read: false },
      { type: 'DISPUTE', title: 'شكوى جديدة', message: 'العميلة يارا سالم قدمت شكوى ضد المزود كريم السيد بخصوص الطلب #4521.', severity: 'CRITICAL', read: false },
      { type: 'SYSTEM', title: 'تنبيه أداء النظام', message: 'زادت أوقات استعلام قاعدة البيانات بنسبة 40% في الساعة الماضية.', severity: 'INFO', read: false },
      { type: 'VERIFICATION', title: 'تمت الموافقة على توثيق المزود', message: 'تم توثيق منى حسن (سباكة) بنجاح وهي الآن نشطة.', severity: 'SUCCESS', read: true },
      { type: 'SYSTEM', title: 'ضغط عالي في النظام', message: 'قامت المنصة بمعالجة 2,450 حجز اليوم (أعلى من المتوسط بـ 20%).', severity: 'INFO', read: true },
      { type: 'COMPLIANCE', title: 'مراجعة الامتثال مطلوبة', message: 'المزودة ليلى محمد لم تكمل المراجعة المطلوبة للامتثال خلال 30 يوماً.', severity: 'WARNING', read: true },
      { type: 'FRAUD', title: 'اكتشاف نشاط مشبوه', message: 'تم اكتشاف محاولات دفع فاشلة متعددة من عنوان IP 192.168.1.1.', severity: 'CRITICAL', read: true },
      { type: 'SYSTEM', title: 'اكتمل تحديث النظام', message: 'اكتملت صيانة المنصة بنجاح. جميع الأنظمة تعمل بشكل طبيعي ومستقرة.', severity: 'SUCCESS', read: true },
    ],
  })
  console.log('✅ Created notifications')

  console.log('\n🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })