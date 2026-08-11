'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Users, ArrowRight, Mail, Lock, User, Phone, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCard } from '@/components/auth/auth-card';
import { FormField } from '@/components/auth/form-field';
import { PasswordInput } from '@/components/auth/password-input';
import { SocialButtons } from '@/components/auth/social-buttons';

const userTypes = [
  {
    id: 'customer',
    title: 'أبحث عن خدمات',
    description: 'اعثر على أفضل المحترفين المعتمدين لخدماتك',
    icon: Users,
    benefits: ['تصفح كافة الخدمات', 'حجز المواعيد', 'تقييم الخدمة', 'متابعة الطلبات'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'provider',
    title: 'أنا مزود خدمة',
    description: 'قدم مهاراتك ووسع نطاق أعمالك',
    icon: Briefcase,
    benefits: ['إنشاء ملف تعريفي', 'إدارة الحجوزات', 'زيادة دخلك', 'بناء سمعتك'],
    color: 'from-emerald-500 to-emerald-600',
  },
];

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('type') as 'customer' | 'provider' | null;

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    location: '',
    experience: '',
    certifications: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'الاسم يجب أن يكون حرفين على الأقل';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (!formData.phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^\+?[0-9]{10,}$/.test(formData.phone.replace(/\s|-/g, ''))) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'يجب أن تحتوي كلمة المرور على أحرف كبيرة وصغيرة وأرقام';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'يرجى تأكيد كلمة المرور';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    if (userType === 'provider') {
      if (!formData.specialization.trim()) newErrors.specialization = 'التخصص مطلوب';
      if (!formData.location.trim()) newErrors.location = 'الموقع مطلوب';
      if (!formData.experience) newErrors.experience = 'مستوى الخبرة مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/dashboard');
    setIsLoading(false);
  };

  const handleSelectType = (type: string) => {
    router.push(`/signup?type=${type}`);
  };

  if (!userType || !['customer', 'provider'].includes(userType)) {
    return (
      <AuthLayout title="انضم إلى منصة الخدمات الذكية" subtitle="اختر كيف تود البدء">
        <div className="space-y-6">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button key={type.id} onClick={() => handleSelectType(type.id)} className="w-full text-start group">
                <div className="rounded-xl border-2 border-border/50 bg-card p-6 hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${type.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">ابدأ الآن</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                </div>
              </button>
            );
          })}
          <div className="text-center text-sm pt-4">
            <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
            <Link href="/login" className="text-primary hover:underline font-medium">سجل دخولك</Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  const title = userType === 'customer' ? 'إنشاء حساب جديد' : 'كن مزود خدمة';
  const subtitle = userType === 'customer' ? 'اعثر على خدماتك واحجزها في دقائق' : 'ابدأ في الكسب من خلال تقديم خدماتك';

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-5 text-start">
          <FormField id="fullName" type="text" label="الاسم الكامل" placeholder="أحمد محمد" icon={<User className="w-5 h-5" />} value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} error={errors.fullName} disabled={isLoading} />
          <FormField id="email" type="email" label="البريد الإلكتروني" placeholder="you@example.com" icon={<Mail className="w-5 h-5" />} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} error={errors.email} disabled={isLoading} />
          <FormField id="phone" type="tel" label="رقم الهاتف" placeholder="+967 771 123 456" icon={<Phone className="w-5 h-5" />} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} error={errors.phone} disabled={isLoading} />

          {userType === 'provider' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">التخصص</label>
                <select value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary">
                  <option value="">اختر التخصص</option>
                  <option value="electrical">كهرباء</option>
                  <option value="plumbing">سباكة</option>
                  <option value="carpentry">نجارة</option>
                </select>
              </div>
              <FormField id="location" type="text" label="موقع الخدمة" placeholder="صنعاء، اليمن" icon={<MapPin className="w-5 h-5" />} value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} error={errors.location} disabled={isLoading} />
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">سنوات الخبرة</label>
                <select value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary">
                  <option value="">اختر مستوى الخبرة</option>
                  <option value="0-2">0-2 سنة</option>
                  <option value="2-5">2-5 سنوات</option>
                  <option value="5+">5+ سنوات</option>
                </select>
              </div>
            </>
          )}

          <PasswordInput id="password" label="كلمة المرور" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} error={errors.password} disabled={isLoading} />
          <PasswordInput id="confirmPassword" label="تأكيد كلمة المرور" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} error={errors.confirmPassword} disabled={isLoading} />

          <Button type="submit" disabled={isLoading} className="w-full h-11 text-base">
            {isLoading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
            <Link href="/login" className="text-primary hover:underline font-medium">سجل دخولك</Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <SignupContent />
    </Suspense>
  );
} 