import HeroSlider from './components/HeroSlider'
import CatalogSection from './components/catalog/CatalogSection'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <CatalogSection />
      <ContactSection />
    </main>
  )
}
