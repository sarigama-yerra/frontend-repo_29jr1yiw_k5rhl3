import { Routes, Route, Link } from 'react-router-dom'
import Landing from './components/Landing'
import PropertySearch from './components/PropertySearch'
import Dashboard from './components/Dashboard'
import { I18nProvider } from './components/i18n'

function App() {
  return (
    <I18nProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/properties" element={<PropertySearch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </I18nProvider>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b798b]/10 to-[#ae965a]/10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Page not found</h1>
        <Link className="text-[#2b798b] underline" to="/">Go Home</Link>
      </div>
    </div>
  )
}

export default App
