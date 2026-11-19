import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Clock, Loader2, Search, X } from 'lucide-react';
import { QUICK_QUERY_SUGGESTIONS } from '../data/curatedComparisons';

interface SearchHeroProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  activeQuery: string;
  recentQueries: string[];
  isLoading: boolean;
  onSearch: (query: string) => void;
}

const EXTRA_AUTOCOMPLETE_EXAMPLES = [
  'Diferencias entre rana y sapo',
  'Oso polar vs oso pardo',
  'Jaguar vs puma',
  'Pulpo vs calamar',
  'León marino vs foca',
  'Delfín mular vs marsopa',
  'Búho real vs lechuza común',
  'Tortuga marina vs tortuga terrestre',
];

export function SearchHero({
  inputRef,
  activeQuery,
  recentQueries,
  isLoading,
  onSearch,
}: SearchHeroProps) {
  const [inputValue, setInputValue] = useState(activeQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(activeQuery);
  }, [activeQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    const allPool = Array.from(
      new Set([...recentQueries, ...QUICK_QUERY_SUGGESTIONS, ...EXTRA_AUTOCOMPLETE_EXAMPLES])
    );
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) {
      return allPool.slice(0, 6);
    }
    return allPool
      .filter((item) => item.toLowerCase().includes(trimmed))
      .slice(0, 6);
  }, [inputValue, recentQueries]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleaned = inputValue.trim();
    if (!cleaned || isLoading) return;
    setIsOpen(false);
    onSearch(cleaned);
  };

  const handleSelectSuggestion = (query: string) => {
    setInputValue(query);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSearch(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault();
      handleSelectSuggestion(suggestions[highlightedIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <section id="buscador" className="border-b border-[#E2ECE5] bg-[#F7FAF8] pt-12 pb-10">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-xs font-medium tracking-wide text-[#15803D]">
          Zoología comparada · Fauna silvestre
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#112419] sm:text-5xl">
          Consulta las diferencias entre cualquier par de especies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4A6355]">
          Escribe una pregunta como en un buscador para obtener su ficha biológica, tabla
          comparativa y el deslizador visual interactivo debajo de los resultados.
        </p>

        <div ref={containerRef} className="relative mx-auto mt-8 max-w-3xl text-left">
          <form
            onSubmit={handleSubmit}
            className="flex items-center rounded-full border border-[#C6D9CC] bg-white px-4 py-2 shadow-[0_2px_14px_rgba(21,128,61,0.06)] focus-within:border-[#15803D] focus-within:ring-2 focus-within:ring-[#15803D]/15 transition-all"
          >
            <Search className="ml-1 h-5 w-5 shrink-0 text-[#4A6355]" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsOpen(true);
                setHighlightedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ej. ¿Cuál es la diferencia entre un guepardo y un leopardo?"
              aria-label="Buscar diferencias entre especies animales"
              className="min-w-0 flex-1 border border-dotted bg-[#ededed] px-3 py-2 text-base text-[#112419] placeholder:text-[#789182] focus:outline-none"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue('');
                  inputRef.current?.focus();
                  setIsOpen(true);
                }}
                aria-label="Limpiar búsqueda"
                className="mr-2 rounded-full p-1.5 text-[#5D7567] hover:bg-[#EFF5F1] hover:text-[#112419] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#166534] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analizando</span>
                </>
              ) : (
                <>
                  <span>Comparar</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {isOpen && suggestions.length > 0 && (
            <div
              role="listbox"
              aria-label="Sugerencias de búsqueda"
              className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-[#D1E0D6] bg-white shadow-lg"
            >
              {suggestions.map((suggestion, index) => {
                const isRecent = recentQueries.includes(suggestion);
                const isHighlighted = index === highlightedIndex;
                return (
                  <button
                    key={suggestion}
                    type="button"
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectSuggestion(suggestion);
                    }}
                    className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#EFF5F1] text-[#112419]'
                        : 'text-[#2B4335] hover:bg-[#F7FAF8]'
                    }`}
                  >
                    {isRecent ? (
                      <Clock className="h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                    ) : (
                      <Search className="h-4 w-4 shrink-0 text-[#789182]" aria-hidden="true" />
                    )}
                    <span className="truncate">{suggestion}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs font-medium text-[#5D7567]">Consultas rápidas:</span>
          {QUICK_QUERY_SUGGESTIONS.map((query) => {
            const isActive = activeQuery.toLowerCase() === query.toLowerCase();
            return (
              <button
                key={query}
                type="button"
                disabled={isLoading}
                onClick={() => handleSelectSuggestion(query)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'border-[#15803D] bg-[#15803D] text-white'
                    : 'border-[#D1E0D6] bg-white text-[#2B4335] hover:border-[#15803D]/50 hover:bg-[#EFF5F1]'
                }`}
              >
                {query}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
