import { motion } from 'framer-motion'

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white/90 backdrop-blur border border-[#ae965a]/20 rounded-2xl shadow-lg ${className}`}>
    {children}
  </div>
)

export const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-[#2b798b] hover:bg-[#256879] transition-all shadow hover:shadow-lg ${className}`}
  >
    {children}
  </button>
)

export const Badge = ({ children }) => (
  <span className="text-xs px-2 py-1 rounded-full bg-[#ae965a]/10 text-[#ae965a] border border-[#ae965a]/30">
    {children}
  </span>
)

export const FadeIn = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.6 }}>
    {children}
  </motion.div>
)
