import { createContext, useContext, useState } from 'react'

export const CURRENCIES = [
  { code: 'KZT', symbol: '₸', suffix: true,  label: '₸' },
  { code: 'USD', symbol: '$', suffix: false, label: '$' },
  { code: 'RUB', symbol: '₽', suffix: true,  label: '₽' },
]

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState('KZT')
  const currency = CURRENCIES.find((c) => c.code === code)

  return (
    <CurrencyContext.Provider value={{ currency, code, setCode, CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

/** Format a number with the active currency symbol */
export function fmt(amount, currency) {
  if (amount === 0) return currency.suffix ? `0 ${currency.symbol}` : `${currency.symbol}0`
  const n = Number(amount)
  const formatted = n % 1 === 0
    ? n.toLocaleString('ru-RU')
    : n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return currency.suffix ? `${formatted} ${currency.symbol}` : `${currency.symbol}${formatted}`
}
