import { useEffect, useState } from 'react'
import { Button, Card, FadeIn, Badge } from './ui'
import { useI18n } from './i18n'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard() {
  const { t } = useI18n()
  const [tab, setTab] = useState('properties')

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#2b798b]/5">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-500">Manage listings, agents and maintenance</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setTab('properties')}>{t.properties}</Button>
              <Button className="!bg-[#ae965a]" onClick={() => setTab('maintenance')}>{t.maintenance}</Button>
            </div>
          </div>

          {tab === 'properties' ? <PropertiesAdmin /> : <MaintenanceAdmin />}
        </FadeIn>
      </div>
    </div>
  )
}

function PropertiesAdmin() {
  const [form, setForm] = useState({ title_en: '', title_ar: '', price: '', currency: 'AED', location: '', city: '', property_type: 'apartment', bedrooms: 1, images: [] })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/properties/search`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      const data = await res.json()
      setItems(data.items || [])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    const payload = { ...form, price: Number(form.price), bedrooms: Number(form.bedrooms), images: form.images ? form.images.split(',').map(s => s.trim()) : [] }
    const res = await fetch(`${backend}/properties`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      setForm({ title_en: '', title_ar: '', price: '', currency: 'AED', location: '', city: '', property_type: 'apartment', bedrooms: 1, images: [] })
      load()
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Create Listing</h3>
        <div className="space-y-2">
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Title (EN)" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Title (AR)" value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Currency" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          <select className="w-full px-3 py-2 border rounded-lg" value={form.property_type} onChange={e => setForm({ ...form, property_type: e.target.value })}>
            <option>apartment</option>
            <option>villa</option>
            <option>townhouse</option>
            <option>office</option>
            <option>retail</option>
            <option>warehouse</option>
          </select>
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Bedrooms" value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Image URLs (comma separated)" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} />
          <Button onClick={create}>Create</Button>
        </div>
      </Card>

      <div className="md:col-span-2">
        {loading && <p>Loading...</p>}
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((p) => (
            <Card key={p._id} className="overflow-hidden">
              <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop'} className="w-full h-40 object-cover" />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{p.title_en}</h4>
                  {p.featured && <Badge>Featured</Badge>}
                </div>
                <p className="text-[#2b798b] font-semibold">{p.price} {p.currency}</p>
                <p className="text-slate-500 text-sm">{p.city}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function MaintenanceAdmin() {
  const [form, setForm] = useState({ building: '', unit: '', category: 'plumbing', priority: 'medium', description: '', contact_phone: '' })
  const [items, setItems] = useState([])

  const load = async () => {
    const res = await fetch(`${backend}/maintenance-requests`)
    const data = await res.json()
    setItems(data.items || [])
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    const res = await fetch(`${backend}/maintenance-requests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { setForm({ building: '', unit: '', category: 'plumbing', priority: 'medium', description: '', contact_phone: '' }); load() }
  }

  const updateStatus = async (id, status) => {
    const res = await fetch(`${backend}/maintenance-requests/${id}?status=${status}`, { method: 'PATCH' })
    if (res.ok) load()
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-3">New Maintenance Request</h3>
        <div className="space-y-2">
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Building" value={form.building} onChange={e => setForm({ ...form, building: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Unit" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
          <select className="w-full px-3 py-2 border rounded-lg" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option>plumbing</option>
            <option>electrical</option>
            <option>hvac</option>
            <option>cleaning</option>
            <option>other</option>
          </select>
          <select className="w-full px-3 py-2 border rounded-lg" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
            <option>low</option>
            <option>medium</option>
            <option>high</option>
            <option>urgent</option>
          </select>
          <textarea className="w-full px-3 py-2 border rounded-lg" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="Phone" value={form.contact_phone} onChange={e => setForm({ ...form, contact_phone: e.target.value })} />
          <Button onClick={create}>Create</Button>
        </div>
      </Card>

      <div className="md:col-span-2">
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((m) => (
            <Card key={m._id} className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{m.building} {m.unit && `• ${m.unit}`}</h4>
                <Badge>{m.status}</Badge>
              </div>
              <p className="text-slate-600 text-sm">{m.category} • {m.priority}</p>
              <p className="text-slate-500 text-sm mt-2">{m.description}</p>
              <div className="mt-3 flex gap-2">
                <Button className="!bg-[#ae965a]" onClick={() => updateStatus(m._id, 'in_progress')}>Start</Button>
                <Button onClick={() => updateStatus(m._id, 'resolved')}>Resolve</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
