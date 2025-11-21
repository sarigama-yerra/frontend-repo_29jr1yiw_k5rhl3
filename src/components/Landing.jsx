import { FadeIn, Button, Card } from './ui'
import { useI18n } from './i18n'
import { Link } from 'react-router-dom'

export default function Landing() {
  const { t, lang, setLang } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b798b]/10 via-white to-[#ae965a]/10">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-[#2b798a]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2b798b] flex items-center justify-center shadow">
              <span className="text-white font-bold">MN</span>
            </div>
            <div>
              <p className="font-bold text-[#2b798b] text-lg">{t.brand}</p>
              <p className="text-xs text-[#2b798b]/60">{t.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="!bg-[#ae965a] hover:brightness-110">
              {lang === 'en' ? 'عربي' : 'EN'}
            </Button>
            <Link to="/admin"><Button>{t.admin}</Button></Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#2b798b22,transparent_40%),radial-gradient(circle_at_80%_0%,#ae965a22,transparent_30%)]" />
          <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Luxury Living, Smart Management
              </h1>
              <p className="mt-4 text-slate-600 text-lg">
                Discover premium properties across the UAE with seamless management services for buildings and facilities.
              </p>
              <div className="mt-6 flex gap-3">
                <Link to="/properties"><Button className="text-base px-6 py-3">{t.search}</Button></Link>
                <a href="#maintenance"><Button className="!bg-[#ae965a] text-white text-base px-6 py-3">{t.maintenance}</Button></a>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-5">
                <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMFNreWxpbmV8ZW58MHwwfHx8MTc2MzY5Mzc0MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Dubai Skyline" className="rounded-xl object-cover w-full h-72" />
              </Card>
            </FadeIn>
          </div>
        </section>

        <section id="maintenance" className="max-w-7xl mx-auto px-6 py-16">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.maintenance}</h2>
            <Card className="p-6">
              <p className="text-slate-600">Submit building maintenance requests with priority, track status, and get quick support.</p>
              <Link to="/dashboard"><Button className="mt-4">Open Dashboard</Button></Link>
            </Card>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-600 flex justify-between">
          <span>© {new Date().getFullYear()} Mouqab Al Noor</span>
          <a href="https://wa.me/0000000000" className="text-[#2b798b] hover:underline">WhatsApp</a>
        </div>
      </footer>
    </div>
  )
}
