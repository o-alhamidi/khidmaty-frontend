import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="border-b border-border/60 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-10 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl rtl:-left-20 rtl:right-auto"
          />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-pretty text-3xl font-semibold tracking-tight md:text-4xl">
                هل أنت محترف ذو مهارة؟ ضاعف دخلك مع منصة الخدمات الذكية.
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                انضم إلى فريقنا وحقق أرباحاً أكثر، احصل على حجوزات مستمرة، وأدر جدول أعمالك بالكامل من مكان واحد وبكل سهولة.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    انضم كمزود خدمة
                    <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  تواصل مع الدعم
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">بدون التزامات مسبقة · تسجيل مجاني · توثيق خلال 24 ساعة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}