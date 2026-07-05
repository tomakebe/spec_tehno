import { useTranslations } from 'next-intl'
import Image from 'next/image'
import SectionHeader from '@/src/components/ui/SectionHeader'
import { buttonLinkClass } from '@/src/components/ui/Button'
import AnimateOnScroll from '@/src/components/ui/AnimateOnScroll'

type CategoryId = 'earthmoving' | 'lifting' | 'transport' | 'road'

interface CatalogItem {
  key: string
  // Replace these src values with your actual machinery photos
  img: string
  size_multiply: number
}

const CATALOG: Record<CategoryId, { items: CatalogItem[] }> = {
  earthmoving: {
    items: [
      { key: 'excavator',  img: '/photos/excovator.jpg', size_multiply: 0.8 },
      { key: 'bulldozer',  img: '/photos/pogruzchik_1.jpg', size_multiply: 1  },
      { key: 'miniLoader', img: '/photos/mini_pogruzchik.png', size_multiply: 0.8 },
    ],
  },
  lifting: {
    items: [
      { key: 'truckCrane',  img: '/photos/avtokran.png', size_multiply: 1 },
      { key: 'manipulator', img: '/photos/manipulator.jpg', size_multiply: 1 },
    ],
  },
  transport: {
    items: [
      { key: 'dumpTruck', img: '/photos/tyagach.jpg', size_multiply: 1 },
      { key: 'trailer',   img: '/photos/tral.jpg', size_multiply: 1 },
    ],
  },
  road: {
    items: [
      { key: 'mixer',        img: '/photos/betonomixer.jpeg', size_multiply: 1 },
      { key: 'concretePump', img: '/photos/betononasos.png', size_multiply: 0.8 },
    ],
  },
}

const CATEGORIES = Object.keys(CATALOG) as CategoryId[]

// ─── Category icons ───────────────────────────────────────────────────────────

function EarthmovingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 20h18"/><path d="M5 20v-6l4-5 5 5v6"/><path d="M14 14l3-7 3 3-6 4"/>
    </svg>
  )
}

function LiftingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v16"/><path d="M12 3l8 4"/><path d="M12 3L4 7"/><path d="M18 7v5"/><path d="M16 14h4"/><path d="M18 12v4"/>
    </svg>
  )
}

function TransportIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 7h14v10H1z"/><path d="M15 10h4l3 4v3h-7V10z"/><circle cx="5.5" cy="19.5" r="2"/><circle cx="18.5" cy="19.5" r="2"/>
    </svg>
  )
}

function RoadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="8" width="14" height="9" rx="4.5"/><path d="M16 12h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4"/><path d="M9 8V5"/><path d="M7 5h4"/>
    </svg>
  )
}

const categoryIcons: Record<CategoryId, React.ReactNode> = {
  earthmoving: <EarthmovingIcon />,
  lifting:     <LiftingIcon />,
  transport:   <TransportIcon />,
  road:        <RoadIcon />,
}

// ─── Photo card ───────────────────────────────────────────────────────────────

interface PhotoCardProps {
  name: string
  description: string
  img: string
  orderLabel: string
  size_multiply: number
}

function PhotoCard({ name, description, img, orderLabel, size_multiply }: PhotoCardProps) {
  return (
    <div className="group relative overflow-hidden bg-white h-40 sm:h-80 lg:h-[340px] cursor-pointer">
      {/* Photo */}
      <Image
        src={img}
        alt={name}
        fill
        style={{ transform: `scale(${size_multiply})`}}
        className={`object-contain transition-transform duration-700 ease-out group-hover:scale-105 bg-white`}
        sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
      />

      {/* Permanent bottom gradient — keeps name readable at all times */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent
                      group-hover:from-black/90 group-hover:via-black/50 transition-all duration-400" />

      {/* Content pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-5">

        {/* Description + CTA — hidden by default, revealed on hover */}
        <div className="overflow-hidden
                        max-h-0 opacity-0 mb-0
                        group-hover:max-h-48 group-hover:opacity-100 group-hover:mb-3
                        sm:max-h-0 sm:opacity-0 sm:mb-0
                        sm:group-hover:max-h-48 sm:group-hover:opacity-100 sm:group-hover:mb-3
                        transition-all duration-300 ease-out">
          <p className="text-white/90 text-sm leading-relaxed">
            {description}
          </p>
          <a href="#contact" className={`${buttonLinkClass('primary', 'sm')} mt-3 rounded-none`}>
            {orderLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Name — always visible */}
        <h4 className="text-white font-bold text-base sm:text-lg leading-tight">
          {name}
        </h4>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CatalogSection() {
  const t = useTranslations('Catalog')

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="scroll-mt-16 lg:scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">

        <AnimateOnScroll animation="fade-up">
          <SectionHeader
            id="catalog-title"
            title={t('title')}
            subtitle={t('subtitle')}
            centered
          />
        </AnimateOnScroll>

        {/* Category quick-nav */}
        <AnimateOnScroll animation="fade-in" delay={150}>
          <nav aria-label="Категории техники" className="mt-10 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(catId => (
              <a
                key={catId}
                href={`#cat-${catId}`}
                className="px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-primary hover:text-gray-900 transition-colors"
              >
                {t(`categories.${catId}`)}
              </a>
            ))}
          </nav>
        </AnimateOnScroll>

        {/* Categories */}
        <div className="mt-16 space-y-14">
          {CATEGORIES.map(catId => (
            <div key={catId} id={`cat-${catId}`} className="scroll-mt-24">

              {/* Category heading */}
              <AnimateOnScroll animation="fade-left" className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-light text-gray-900 flex items-center justify-center">
                    {categoryIcons[catId]}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {t(`categories.${catId}`)}
                  </h3>
                </div>
              </AnimateOnScroll>

              {/* Photo cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CATALOG[catId].items.map(({ key, img, size_multiply }, idx) => (
                  <AnimateOnScroll key={key} animation="fade-up" delay={idx * 100}>
                    <PhotoCard
                      name={t(`items.${key}.name`)}
                      description={t(`items.${key}.description`)}
                      img={img}
                      orderLabel={t('orderButton')}
                      size_multiply={size_multiply}
                    />
                  </AnimateOnScroll>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
