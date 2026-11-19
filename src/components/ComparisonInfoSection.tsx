import { ArrowDown, Compass, ShieldCheck, Utensils } from 'lucide-react';
import type { SpeciesComparison, SpeciesProfile } from '../types/species';

interface ComparisonInfoSectionProps {
  comparison: SpeciesComparison;
  onJumpToVisual: () => void;
}

function SpeciesIdentityCard({
  species,
  label,
  accent,
}: {
  species: SpeciesProfile;
  label: string;
  accent: 'primary' | 'secondary';
}) {
  return (
    <article className="rounded-xl border border-[#D1E0D6] bg-white p-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-[#E8F0EA] pb-4">
        <div>
          <p
            className={`text-xs font-semibold tracking-wide ${
              accent === 'primary' ? 'text-[#15803D]' : 'text-[#355E47]'
            }`}
          >
            {label}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-[#112419]">
            {species.commonName}
          </h3>
          <p className="text-sm italic text-[#4A6355]">{species.scientificName}</p>
        </div>
        <span className="font-mono text-xs text-[#4A6355] whitespace-nowrap shrink-0">
          {species.taxonomyClass}
        </span>
      </div>

      <dl className="mt-4 space-y-2.5 text-sm text-[#2B4335]">
        <div className="flex items-start gap-2.5">
          <Compass className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
          <div>
            <dt className="inline font-semibold text-[#112419]">Hábitat: </dt>
            <dd className="inline">{species.habitat}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Utensils className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
          <div>
            <dt className="inline font-semibold text-[#112419]">Dieta: </dt>
            <dd className="inline">{species.diet}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
          <div>
            <dt className="inline font-semibold text-[#112419]">Conservación: </dt>
            <dd className="inline">{species.conservationStatus}</dd>
          </div>
        </div>
      </dl>

      <div className="mt-5 border-t border-[#E8F0EA] pt-4">
        <p className="text-xs font-semibold text-[#4A6355]">Rasgos distintivos</p>
        <ul className="mt-2 space-y-1.5 text-sm text-[#2B4335]">
          {species.distinctiveTraits.map((trait) => (
            <li key={trait} className="flex items-start gap-2">
              <span className="font-mono text-xs font-semibold text-[#15803D]" aria-hidden="true">
                —
              </span>
              <span>{trait}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ComparisonInfoSection({
  comparison,
  onJumpToVisual,
}: ComparisonInfoSectionProps) {
  return (
    <section id="resultados" className="mx-auto max-w-6xl px-6 pt-10 pb-8">
      {/* Síntesis directa de la consulta */}
      <div className="rounded-xl border border-[#D1E0D6] bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A6355]">
            <span className="font-semibold text-[#15803D]">{comparison.category}</span>
            <span aria-hidden="true">·</span>
            <span>{comparison.speciesA.commonName} vs. {comparison.speciesB.commonName}</span>
            <span aria-hidden="true">·</span>
            <span>
              {comparison.source === 'curated' ? 'Ficha zoológica curada' : 'Análisis comparativo'}
            </span>
          </div>

          <button
            type="button"
            onClick={onJumpToVisual}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Ir al comparador de imágenes</span>
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#112419] sm:text-3xl">
          {comparison.headline}
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#2B4335]">
          {comparison.summary}
        </p>

        {/* Métricas rápidas tabulares */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#E8F0EA] pt-5 sm:grid-cols-4">
          <div>
            <p className="text-xs text-[#5D7567]">Longitud comparada</p>
            <p className="mt-1 font-mono text-base font-semibold text-[#112419] tabular-nums">
              {comparison.speciesA.lengthMeters} m / {comparison.speciesB.lengthMeters} m
            </p>
          </div>
          <div>
            <p className="text-xs text-[#5D7567]">Peso adulto promedio</p>
            <p className="mt-1 font-mono text-base font-semibold text-[#112419] tabular-nums">
              {comparison.speciesA.weightKg} kg / {comparison.speciesB.weightKg} kg
            </p>
          </div>
          <div>
            <p className="text-xs text-[#5D7567]">Velocidad máxima</p>
            <p className="mt-1 font-mono text-base font-semibold text-[#112419] tabular-nums">
              {comparison.speciesA.topSpeedKmh} / {comparison.speciesB.topSpeedKmh} km/h
            </p>
          </div>
          <div>
            <p className="text-xs text-[#5D7567]">Longevidad media</p>
            <p className="mt-1 font-mono text-base font-semibold text-[#112419] tabular-nums">
              {comparison.speciesA.lifespanYears} / {comparison.speciesB.lifespanYears} años
            </p>
          </div>
        </div>
      </div>

      {/* Fichas taxonómicas lado a lado */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <SpeciesIdentityCard
          species={comparison.speciesA}
          label="Especie A (Lado izquierdo en el deslizador)"
          accent="primary"
        />
        <SpeciesIdentityCard
          species={comparison.speciesB}
          label="Especie B (Lado derecho en el deslizador)"
          accent="secondary"
        />
      </div>

      {/* Principales diferencias destacadas */}
      <div className="mt-8">
        <h3 className="font-display text-xl font-bold text-[#112419]">
          Principales diferencias biológicas
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {comparison.keyDifferences.map((diff) => (
            <div
              key={diff.title}
              className="rounded-xl border border-[#D1E0D6] bg-[#F7FAF8] p-5"
            >
              <p className="text-xs font-semibold text-[#15803D]">{diff.category}</p>
              <h4 className="mt-1 font-display text-base font-bold text-[#112419]">
                {diff.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#3D5748]">{diff.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla comparativa estructurada */}
      <div className="mt-8">
        <h3 className="font-display text-xl font-bold text-[#112419]">
          Tabla comparativa de rasgos
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-[#D1E0D6] bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#D1E0D6] bg-[#EFF5F1] text-xs font-semibold text-[#112419]">
                <th className="px-5 py-3.5">Característica</th>
                <th className="px-5 py-3.5 text-[#15803D]">{comparison.speciesA.commonName}</th>
                <th className="px-5 py-3.5 text-[#112419]">{comparison.speciesB.commonName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F0EA]">
              {comparison.comparisonRows.map((row, idx) => (
                <tr
                  key={row.attribute}
                  className={idx % 2 === 1 ? 'bg-[#F9FCFA]' : 'bg-white'}
                >
                  <td className="px-5 py-3.5 font-medium text-[#112419]">
                    {row.attribute}
                    {row.unit ? (
                      <span className="ml-1.5 font-mono text-xs text-[#6B8576]">
                        ({row.unit})
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[13px] text-[#1D3B2A] tabular-nums">
                    {row.valueA}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[13px] text-[#1D3B2A] tabular-nums">
                    {row.valueB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
