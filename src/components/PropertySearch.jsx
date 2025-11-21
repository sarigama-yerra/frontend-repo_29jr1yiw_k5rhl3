import { useEffect, useState } from 'react'
import { FadeIn, Button, Card, Badge } from './ui'
import { useI18n } from './i18n'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PropertySearch() {
  const { t, lang } = useI18n()
  const [filters, setFilters] = useState({ q: '', location: '', min_price: '', max_price: '', bedrooms: '', property_type: '' })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const search = async () => {
    setLoading(true)
    try {
      const body = {
        q: filters.q || undefined,
        location: filters.location || undefined,
        min_price: filters.min_price ? Number(filters.min_price) : undefined,
        max_price: filters.max_price ? Number(filters.max_price) : undefined,
        bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
        property_type: filters.property_type || undefined,
      }
      const res = await fetch(`${backend}/properties/search`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { search() }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <FadeIn>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.properties}</h2>
        <Card className="p-4 mb-6">
          <div className="grid md:grid-cols-6 gap-3">
            <input className="col-span-2 px-3 py-2 border rounded-lg" placeholder={t.search} value={filters.q} onChange={e => setFilters({ ...filters, q: e.target.value })} />
            <input className="px-3 py-2 border rounded-lg" placeholder={t.location} value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} />
            <input className="px-3 py-2 border rounded-lg" placeholder={t.minPrice} value={filters.min_price} onChange={e => setFilters({ ...filters, min_price: e.target.value })} />
            <input className="px-3 py-2 border rounded-lg" placeholder={t.maxPrice} value={filters.max_price} onChange={e => setFilters({ ...filters, max_price: e.target.value })} />
            <select className="px-3 py-2 border rounded-lg" value={filters.property_type} onChange={e => setFilters({ ...filters, property_type: e.target.value })}>
              <option value="">{t.type}</option>
              <option>apartment</option>
              <option>villa</option>
              <option>townhouse</option>
              <option>office</option>
              <option>retail</option>
              <option>warehouse</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={search}>{t.search}</Button>
          </div>
        </Card>

        {loading && <p className="text-slate-500">Loading...</p>}

        {!loading && items.length === 0 && (
          <p className="text-slate-500">{t.noResults}</p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((p) => (
            <Card key={p._id} className="overflow-hidden">
              <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop'} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{lang === 'ar' ? p.title_ar : p.title_en}</h3>
                  {p.featured && <Badge>{t.featured}</Badge>}
                </div>
                <p className="text-[#2b798b] font-semibold">{p.price?.toLocaleString()} {p.currency}</p>
                <p className="text-slate-500 text-sm">{p.city} • {p.bedrooms || 0} {t.bedrooms}</p>
                <div className="mt-3 flex gap-2">
                  <a className="text-[#2b798b] hover:underline" href={`https://wa.me/${p.whatsapp || ''}`} target="_blank">WhatsApp</a>
                  <a className="text-[#ae965a] hover:underline" href={`mailto:info@mouqab-al-noor.com`}>{t.contactAgent}</a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}
