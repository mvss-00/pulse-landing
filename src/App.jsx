import { CurrencyProvider } from './context/CurrencyContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import TryItSection from './components/TryItSection'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-[#FAFAF8]">
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <HowItWorks />
          <Features />
          <TryItSection />
          <CTA />
        </main>
        <Footer />
      </div>
    </CurrencyProvider>
  )
}
