import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CURATED_COMPARISONS } from '../data/curatedComparisons';
import type { SpeciesComparison } from '../types/species';

interface CuratedGallerySectionProps {
  activeComparisonId: string;
  onSelectComparison: (comparison: SpeciesComparison) => void;
}

type GalleryFilter = 'Todas' | 'Mamíferos' | 'Reptiles' | 'Marinos';

const FILTERS: GalleryFilter[] = ['Todas', 'Mamíferos', 'Reptiles', 'Marinos'];

export function CuratedGallerySection({
  activeComparisonId,
  onSelectComparison,
}: CuratedGallerySectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>('Todas');

  const photoComparisons = CURATED_COMPARISONS.filter((item) => Boolean(item.curatedImages));
  const filteredItems =
    filter === 'Todas'
      ? photoComparisons
      : photoComparisons.filter((item) => item.category === filter);

  return (
    <section
      id="galeria-curada"
      className="border-t border-[#E2ECE5] bg-[#F7FAF8] py-12"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-[#15803D]">
              Archivo visual de referencia
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-[#112419]">
              Comparaciones fotográficas curadas
            </h2>
            <p className="mt-1 text-sm text-[#4A6355]">
              Selecciona cualquier par de especies para cargar su tabla completa y compararlas en
              el deslizador visual.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-[#D1E0D6] bg-white p-1 self-start sm:self-auto">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === item
                    ? 'bg-[#15803D] text-white'
                    : 'text-[#4A6355] hover:text-[#112419]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredItems.map((item) => {
            const isActive = item.id === activeComparisonId;
            return (
              <article
                key={item.id}
                className={`group overflow-hidden rounded-xl border bg-white transition-colors ${
                  isActive
                    ? 'border-[#15803D] ring-1 ring-[#15803D]'
                    : 'border-[#D1E0D6] hover:border-[#15803D]/60'
                }`}
              >
                {item.curatedImages && (
                  <div className="grid aspect-[16/9] grid-cols-2 gap-0.5 bg-[#D1E0D6]">
                    <div className="relative overflow-hidden bg-[#EFF5F1]">
                      <img
                        src={item.curatedImages.imageA}
                        alt={item.speciesA.commonName}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="relative overflow-hidden bg-[#EFF5F1]">
                      <img
                        src={item.curatedImages.imageB}
                        alt={item.speciesB.commonName}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#4A6355]">
                    <span className="font-semibold text-[#15803D]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{item.speciesA.taxonomyClass}</span>
                  </div>

                  <h3 className="mt-1.5 font-display text-lg font-bold text-[#112419]">
                    {item.headline}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#4A6355]">
                    {item.summary}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectComparison(item)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D] hover:text-[#166534] cursor-pointer"
                  >
                    <span>{isActive ? 'Comparación activa' : 'Ver análisis y deslizador'}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
