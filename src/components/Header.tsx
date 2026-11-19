interface HeaderProps {
  onNewQuery: () => void;
}

export function Header({ onNewQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#D1E0D6] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <a
          href="#buscador"
          className="font-display text-xl font-bold tracking-tight text-[#112419] whitespace-nowrap shrink-0"
        >
          BioFauna
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A6355]">
          <a
            href="#buscador"
            className="hover:text-[#15803D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Buscador
          </a>
          <a
            href="#resultados"
            className="hover:text-[#15803D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Comparativa
          </a>
          <a
            href="#comparador-visual"
            className="hover:text-[#15803D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Comparador Visual
          </a>
          <a
            href="#galeria-curada"
            className="hover:text-[#15803D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Galería Curada
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onNewQuery}
            className="rounded-lg bg-[#15803D] px-4 py-2 text-sm font-medium text-white hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Nueva consulta
          </button>
        </div>
      </div>
    </header>
  );
}
