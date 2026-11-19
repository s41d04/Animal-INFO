import { useRef, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ComparisonInfoSection } from './components/ComparisonInfoSection';
import { CuratedGallerySection } from './components/CuratedGallerySection';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { VisualComparisonSlider } from './components/VisualComparisonSlider';
import {
  CURATED_COMPARISONS,
  CURATED_VISUALS_BY_ID,
  findExactCuratedComparison,
  matchCuratedVisualPairId,
} from './data/curatedComparisons';
import type { SpeciesComparison } from './types/species';

export default function App() {
  const [activeComparison, setActiveComparison] = useState<SpeciesComparison>(
    CURATED_COMPARISONS[0]
  );
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [recentQueries, setRecentQueries] = useState<string[]>([
    CURATED_COMPARISONS[0].query,
  ]);
  const [cacheByQuery, setCacheByQuery] = useState<Record<string, SpeciesComparison>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const recordRecentQuery = (query: string) => {
    setRecentQueries((prev) => {
      const next = [query, ...prev.filter((q) => q.toLowerCase() !== query.toLowerCase())];
      return next.slice(0, 5);
    });
  };

  const handleSearch = async (query: string) => {
    const cleaned = query.trim();
    if (!cleaned) return;

    setActiveQuery(cleaned);
    setErrorMessage(null);
    recordRecentQuery(cleaned);

    const cacheKey = cleaned.toLowerCase();
    if (cacheByQuery[cacheKey]) {
      setActiveComparison(cacheByQuery[cacheKey]);
      scrollToSection('resultados');
      return;
    }

    const curatedExact = findExactCuratedComparison(cleaned);
    if (curatedExact) {
      setActiveComparison(curatedExact);
      scrollToSection('resultados');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleaned }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload?.error || 'No se pudo obtener la comparación solicitada.'
        );
      }

      const matchedVisualId = matchCuratedVisualPairId(
        `${cleaned} ${payload.headline ?? ''} ${payload.speciesA?.commonName ?? ''} ${payload.speciesB?.commonName ?? ''}`
      );

      const enrichedComparison: SpeciesComparison = {
        ...payload,
        curatedImages: matchedVisualId ? CURATED_VISUALS_BY_ID[matchedVisualId] : undefined,
      };

      setCacheByQuery((prev) => ({
        ...prev,
        [cacheKey]: enrichedComparison,
      }));
      setActiveComparison(enrichedComparison);
      window.setTimeout(() => scrollToSection('resultados'), 80);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al consultar la comparación.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCurated = (comparison: SpeciesComparison) => {
    setErrorMessage(null);
    setActiveQuery(comparison.query);
    setActiveComparison(comparison);
    recordRecentQuery(comparison.query);
    scrollToSection('resultados');
  };

  const handleNewQuery = () => {
    scrollToSection('buscador');
    window.setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-white text-[#112419]">
      <Header onNewQuery={handleNewQuery} />

      <main>
        <SearchHero
          inputRef={searchInputRef}
          activeQuery={activeQuery}
          recentQueries={recentQueries}
          isLoading={isLoading}
          onSearch={handleSearch}
        />

        {errorMessage && (
          <div className="mx-auto mt-6 max-w-4xl px-6">
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <p className="font-semibold">No se pudo completar la consulta</p>
                  <p className="mt-0.5 text-amber-900">{errorMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleSearch(activeQuery)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-amber-100 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reintentar</span>
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <section aria-busy="true" className="mx-auto max-w-6xl px-6 py-10">
            <div className="animate-pulse space-y-6">
              <div className="rounded-xl border border-[#D1E0D6] bg-[#F7FAF8] p-8">
                <div className="h-4 w-40 rounded bg-[#D1E0D6]" />
                <div className="mt-3 h-8 w-80 max-w-full rounded bg-[#C6D9CC]" />
                <div className="mt-4 h-4 w-full rounded bg-[#E2ECE5]" />
                <div className="mt-2 h-4 w-5/6 rounded bg-[#E2ECE5]" />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="h-56 rounded-xl border border-[#D1E0D6] bg-[#F7FAF8]" />
                <div className="h-56 rounded-xl border border-[#D1E0D6] bg-[#F7FAF8]" />
              </div>
              <div className="aspect-[16/9] w-full rounded-2xl border border-[#D1E0D6] bg-[#EFF5F1]" />
            </div>
          </section>
        ) : (
          <>
            <ComparisonInfoSection
              comparison={activeComparison}
              onJumpToVisual={() => scrollToSection('comparador-visual')}
            />

            <VisualComparisonSlider comparison={activeComparison} />
          </>
        )}

        <CuratedGallerySection
          activeComparisonId={activeComparison.id}
          onSelectComparison={handleSelectCurated}
        />
      </main>

      <footer className="border-t border-[#E2ECE5] bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-xs text-[#5D7567] sm:flex-row sm:items-center">
          <p>BioFauna · Investigación comparativa de fauna silvestre y zoología</p>
          <div className="flex items-center gap-6">
            <a href="#buscador" className="hover:text-[#15803D] transition-colors">
              Buscador
            </a>
            <a href="#comparador-visual" className="hover:text-[#15803D] transition-colors">
              Comparador visual
            </a>
            <a href="#galeria-curada" className="hover:text-[#15803D] transition-colors">
              Galería curada
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
