export default function DashboardPaymentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10 text-start">
      <div className="rounded-xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">المدفوعات</h1>
        <p className="mt-2 text-muted-foreground">ستظهر هنا سجل المدفوعات والفواتير الخاصة بحجوزاتك.</p>
        <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">لا توجد مدفوعات مسجلة حتى الآن.</div>
      </div>
    </div>
  )
}
