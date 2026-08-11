import Link from "next/link"
import { Wrench } from "lucide-react"

const cols = [
  {
    title: "المنصة",
    links: ["كيف نعمل", "التصنيفات", "أبرز المزودين", "الأسعار"],
  },
  {
    title: "لمزودي الخدمة",
    links: ["انضم كمزود خدمة", "الموارد", "قصص النجاح", "المجتمع"],
  },
  {
    title: "عن المنصة",
    links: ["من نحن", "الوظائف", "الأخبار", "تواصل معنا"],
  },
  {
    title: "الشؤون القانونية",
    links: ["شروط الخدمة", "سياسة الخصوصية", "ملفات الارتباط", "الأمان"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="h-4 w-4" />
              </span>
              <span className="text-lg tracking-tight">الخدمات الذكية</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              السوق الموثوق الذي يربط العملاء بأفضل المحترفين ومقدمي الخدمات المعتمدين لتلبية كافة احتياجاتك.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="transition-colors hover:text-foreground">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} منصة الخدمات الذكية. جميع الحقوق محفوظة.</span>
          <span className="font-mono text-xs">تم البناء كمشروع تخرج · الإصدار 1.0</span>
        </div>
      </div>
    </footer>
  )
}