import { createContext, useContext, useMemo, useState } from 'react'

const translations = {
  en: {
    brand: 'Mouqab Al Noor',
    tagline: 'Premium Real Estate & Property Management',
    search: 'Search',
    location: 'Location',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    bedrooms: 'Bedrooms',
    type: 'Property Type',
    viewDetails: 'View Details',
    featured: 'Featured',
    contactAgent: 'Contact Agent',
    scheduleViewing: 'Schedule Viewing',
    send: 'Send',
    save: 'Save',
    favorites: 'Favorites',
    maintenance: 'Building Maintenance',
    propertyManagement: 'Property Management',
    admin: 'Admin',
    properties: 'Properties',
    filters: 'Filters',
    price: 'Price',
    bathrooms: 'Bathrooms',
    area: 'Area',
    back: 'Back',
    createListing: 'Create Listing',
    list: 'List',
    title: 'Title',
    description: 'Description',
    city: 'City',
    country: 'Country',
    currency: 'Currency',
    status: 'Status',
    available: 'Available',
    sold: 'Sold',
    rented: 'Rented',
    pending: 'Pending',
    submit: 'Submit',
    noResults: 'No results found',
  },
  ar: {
    brand: 'موقب النور',
    tagline: 'عقارات فاخرة وإدارة ممتلكات',
    search: 'بحث',
    location: 'الموقع',
    minPrice: 'السعر الأدنى',
    maxPrice: 'السعر الأعلى',
    bedrooms: 'غرف النوم',
    type: 'نوع العقار',
    viewDetails: 'عرض التفاصيل',
    featured: 'مميز',
    contactAgent: 'تواصل مع الوكيل',
    scheduleViewing: 'حجز معاينة',
    send: 'إرسال',
    save: 'حفظ',
    favorites: 'المفضلة',
    maintenance: 'صيانة المباني',
    propertyManagement: 'إدارة العقارات',
    admin: 'لوحة التحكم',
    properties: 'العقارات',
    filters: 'فلاتر',
    price: 'السعر',
    bathrooms: 'الحمامات',
    area: 'المساحة',
    back: 'عودة',
    createListing: 'إضافة عقار',
    list: 'قائمة',
    title: 'العنوان',
    description: 'الوصف',
    city: 'المدينة',
    country: 'الدولة',
    currency: 'العملة',
    status: 'الحالة',
    available: 'متاح',
    sold: 'مباع',
    rented: 'مؤجر',
    pending: 'قيد الانتظار',
    submit: 'إرسال',
    noResults: 'لا توجد نتائج',
  }
}

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = useMemo(() => translations[lang], [lang])
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir}>{children}</div>
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
