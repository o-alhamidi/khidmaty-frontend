'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCard } from '@/components/auth/auth-card';
import { FormField } from '@/components/auth/form-field';
import { PasswordInput } from '@/components/auth/password-input';
import { SocialButtons } from '@/components/auth/social-buttons';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // محاكاة الاتصال بواجهة برمجة التطبيقات (API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // عرض تجريبي: توجيه المستخدم إلى لوحة التحكم عند النجاح
      console.log('[v0] تسجيل الدخول ناجح:', formData);
      router.push('/dashboard');
    } catch (error) {
      console.error('[v0] خطأ في تسجيل الدخول:', error);
      setErrors({ submit: 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log('[v0] تسجيل الدخول عبر وسائل التواصل مع:', provider);
    // تنفيذ منطق تسجيل الدخول عبر وسائل التواصل الاجتماعي
  };

  return (
    <AuthLayout title="مرحباً بعودتك" subtitle="سجل الدخول إلى حسابك في منصة الخدمات الذكية">
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-6 text-start">
          {/* حقل البريد الإلكتروني */}
          <FormField
            id="email"
            type="email"
            label="البريد الإلكتروني"
            placeholder="you@example.com"
            icon={<Mail className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            disabled={isLoading}
          />

          {/* حقل كلمة المرور */}
          <PasswordInput
            id="password"
            label="كلمة المرور"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            disabled={isLoading}
          />

          {/* تذكرني ونسيت كلمة المرور */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="w-4 h-4 rounded border border-input accent-primary cursor-pointer"
              />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                تذكرني
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-primary hover:underline font-medium transition-colors"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* رسالة الخطأ */}
          {errors.submit && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              {errors.submit}
            </div>
          )}

          {/* زر الإرسال */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 text-base font-medium"
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>

          {/* تسجيل الدخول عبر منصات التواصل */}
          <SocialButtons onClick={handleSocialLogin} />

          {/* رابط إنشاء حساب */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">ليس لديك حساب؟ </span>
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium transition-colors"
            >
              سجل الآن
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}