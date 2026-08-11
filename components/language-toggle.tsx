"use client"

import * as React from "react"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  // جعلنا العربية هي اللغة الافتراضية
  const [lang, setLang] = React.useState<"ar" | "en">("ar")

  React.useEffect(() => {
    const html = document.documentElement
    html.dir = lang === "ar" ? "rtl" : "ltr"
    html.lang = lang
  }, [lang])

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 text-xs font-medium"
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      aria-label="تغيير اللغة"
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">{lang === "ar" ? "English" : "العربية"}</span>
    </Button>
  )
}