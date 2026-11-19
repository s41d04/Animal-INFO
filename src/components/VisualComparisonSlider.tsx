import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Eye,
  EyeOff,
  MoveHorizontal,
  RotateCcw,
  Ruler,
} from 'lucide-react';
import type { AnatomicalMarker, SpeciesComparison } from '../types/species';
import { ZoologicalSilhouette } from './ZoologicalSilhouette';

interface VisualComparisonSliderProps {
  comparison: SpeciesComparison;
}

type VisualMode = 'photo' | 'anatomy';

export function VisualComparisonSlider({ comparison }: VisualComparisonSliderProps) {
  const hasCuratedPhotos = Boolean(comparison.curatedImages);
  const [mode, setMode] = useState<VisualMode>(hasCuratedPhotos ? 'photo' : 'anatomy');
  const [sliderPercent, setSliderPercent] = useState<number>(50);
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [selectedMarker, setSelectedMarker] = useState<{
    side: 'A' | 'B';
    speciesName: string;
    marker: AnatomicalMarker;
  } | null>(null);
  const [imgErrorA, setImgErrorA] = useState(false);
  const [imgErrorB, setImgErrorB] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setMode(comparison.curatedImages ? 'photo' : 'anatomy');
    setSliderPercent(50);
    setSelectedMarker(null);
    setImgErrorA(false);
    setImgErrorB(false);
  }, [comparison.id, comparison.curatedImages]);

  const updatePositionFromClientX = (clientX: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(96, Math.max(4, raw));
    setSliderPercent(clamped);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button[data-marker="true"]')) {
      return;
    }
    isDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePositionFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePositionFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSliderPercent((prev) => Math.max(4, prev - 4));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSliderPercent((prev) => Math.min(96, prev + 4));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setSliderPercent(10);
    } else if (event.key === 'End') {
      event.preventDefault();
      setSliderPercent(90);
    }
  };

  const maxLength = Math.max(
    comparison.speciesA.lengthMeters || 1,
    comparison.speciesB.lengthMeters || 1,
    0.2
  );
  const scaleA = Math.max(0.32, comparison.speciesA.lengthMeters / maxLength);
  const scaleB = Math.max(0.32, comparison.speciesB.lengthMeters / maxLength);

  const rulerStep = maxLength > 4 ? 1 : maxLength > 1.5 ? 0.5 : 0.25;
  const rulerTicks: number[] = [];
  for (let t = 0; t <= maxLength + 0.001; t += rulerStep) {
    rulerTicks.push(Number(t.toFixed(2)));
  }

  return (
    <section id="comparador-visual" className="mx-auto max-w-6xl px-6 py-8">
      <div className="rounded-2xl border border-[#D1E0D6] bg-white p-6 sm:p-8">
        {/* Cabecera del comparador visual */}
        <div className="flex flex-col gap-4 border-b border-[#E8F0EA] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold text-[#15803D]">
              Comparación visual interactiva
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-[#112419]">
              Deslizador comparativo: {comparison.speciesA.commonName} vs.{' '}
              {comparison.speciesB.commonName}
            </h3>
            <p className="mt-1 text-sm text-[#4A6355]">
              {mode === 'photo' && comparison.curatedImages
                ? comparison.curatedImages.comparisonContext
                : 'Arrastra la barra central para superponer la anatomía y proporción de escala real entre ambas especies.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {hasCuratedPhotos && (
              <div className="flex items-center rounded-lg border border-[#D1E0D6] bg-[#F7FAF8] p-1">
                <button
                  type="button"
                  onClick={() => setMode('photo')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    mode === 'photo'
                      ? 'bg-[#15803D] text-white'
                      : 'text-[#3D5748] hover:text-[#112419]'
                  }`}
                >
                  <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Vista fotográfica</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('anatomy')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    mode === 'anatomy'
                      ? 'bg-[#15803D] text-white'
                      : 'text-[#3D5748] hover:text-[#112419]'
                  }`}
                >
                  <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Diagrama y escala</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowMarkers((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D1E0D6] bg-white px-3 py-2 text-xs font-medium text-[#2B4335] hover:bg-[#EFF5F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showMarkers ? (
                <EyeOff className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
              ) : (
                <Eye className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
              )}
              <span>{showMarkers ? 'Ocultar rasgos' : 'Mostrar rasgos'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSliderPercent(50)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D1E0D6] bg-white px-3 py-2 text-xs font-medium text-[#2B4335] hover:bg-[#EFF5F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
              <span>Centrar</span>
            </button>
          </div>
        </div>

        {/* Lienzo interactivo del deslizador */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative mt-6 aspect-[16/9] w-full select-none touch-none overflow-hidden rounded-xl border border-[#C6D9CC] bg-[#F7FAF8] cursor-ew-resize"
        >
          {/* Capa derecha: Especie B */}
          <div className="absolute inset-0">
            {mode === 'photo' && comparison.curatedImages && !imgErrorB ? (
              <img
                src={comparison.curatedImages.imageB}
                alt={`${comparison.speciesB.commonName} (${comparison.speciesB.scientificName})`}
                referrerPolicy="no-referrer"
                onError={() => setImgErrorB(true)}
                className="h-full w-full object-cover object-center pointer-events-none"
              />
            ) : (
              <div className="relative flex h-full w-full flex-col justify-between bg-[#EFF5F1] p-6 sm:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #D1E0D6 1px, transparent 1px), linear-gradient(to bottom, #D1E0D6 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10 flex justify-end">
                  <div className="rounded-lg border border-[#C6D9CC] bg-white/90 px-3 py-1.5 text-right">
                    <p className="text-xs font-semibold text-[#112419]">
                      {comparison.speciesB.commonName}
                    </p>
                    <p className="font-mono text-[11px] text-[#4A6355] tabular-nums">
                      Longitud ref.: {comparison.speciesB.lengthMeters} m ·{' '}
                      {comparison.speciesB.weightKg} kg
                    </p>
                  </div>
                </div>
                <div className="relative z-10 flex flex-1 items-center justify-center">
                  <div
                    className="flex items-center justify-center transition-transform duration-200"
                    style={{
                      width: `${Math.round(scaleB * 66)}%`,
                      maxHeight: '78%',
                    }}
                  >
                    <ZoologicalSilhouette
                      category={comparison.speciesB.silhouetteCategory}
                      variant="secondary"
                      className="h-auto w-full max-h-64 drop-shadow-sm"
                    />
                  </div>
                </div>
                <div className="relative z-10 border-t border-[#B9CEBF] pt-2">
                  <div className="flex justify-between font-mono text-[10px] text-[#4A6355] tabular-nums">
                    {rulerTicks.map((tick) => (
                      <span key={`b-${tick}`}>{tick} m</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mode === 'photo' && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            )}

            {/* Etiqueta inferior derecha de Especie B */}
            <div className="pointer-events-none absolute bottom-4 right-4 z-10 max-w-[44%] text-right">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${
                  mode === 'photo'
                    ? 'bg-black/65 text-white backdrop-blur-xs'
                    : 'bg-[#112419] text-white'
                }`}
              >
                {comparison.speciesB.commonName}
              </span>
            </div>

            {/* Marcadores anatómicos Especie B (lado derecho visible) */}
            {showMarkers &&
              comparison.speciesB.anatomicalMarkers.map((marker) => {
                if (marker.xPercent <= sliderPercent + 2) return null;
                const isSelected =
                  selectedMarker?.marker.id === marker.id && selectedMarker.side === 'B';
                return (
                  <button
                    key={`B-${marker.id}`}
                    type="button"
                    data-marker="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMarker({
                        side: 'B',
                        speciesName: comparison.speciesB.commonName,
                        marker,
                      });
                    }}
                    style={{
                      left: `${marker.xPercent}%`,
                      top: `${marker.yPercent}%`,
                    }}
                    aria-label={`${comparison.speciesB.commonName}: ${marker.label}`}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm transition-transform hover:scale-105 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'border-white bg-[#112419] text-white ring-2 ring-white/60'
                        : 'border-[#112419]/20 bg-white/95 text-[#112419]'
                    }`}
                  >
                    {marker.label}
                  </button>
                );
              })}
          </div>

          {/* Capa izquierda: Especie A recortada según sliderPercent */}
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: `inset(0 ${100 - sliderPercent}% 0 0)`,
            }}
          >
            {mode === 'photo' && comparison.curatedImages && !imgErrorA ? (
              <img
                src={comparison.curatedImages.imageA}
                alt={`${comparison.speciesA.commonName} (${comparison.speciesA.scientificName})`}
                referrerPolicy="no-referrer"
                onError={() => setImgErrorA(true)}
                className="h-full w-full object-cover object-center pointer-events-none"
              />
            ) : (
              <div className="relative flex h-full w-full flex-col justify-between bg-white p-6 sm:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #E8F0EA 1px, transparent 1px), linear-gradient(to bottom, #E8F0EA 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10 flex justify-start">
                  <div className="rounded-lg border border-[#15803D]/30 bg-[#F7FAF8] px-3 py-1.5 text-left">
                    <p className="text-xs font-semibold text-[#15803D]">
                      {comparison.speciesA.commonName}
                    </p>
                    <p className="font-mono text-[11px] text-[#3D5748] tabular-nums">
                      Longitud ref.: {comparison.speciesA.lengthMeters} m ·{' '}
                      {comparison.speciesA.weightKg} kg
                    </p>
                  </div>
                </div>
                <div className="relative z-10 flex flex-1 items-center justify-center">
                  <div
                    className="flex items-center justify-center transition-transform duration-200"
                    style={{
                      width: `${Math.round(scaleA * 66)}%`,
                      maxHeight: '78%',
                    }}
                  >
                    <ZoologicalSilhouette
                      category={comparison.speciesA.silhouetteCategory}
                      variant="primary"
                      className="h-auto w-full max-h-64 drop-shadow-sm"
                    />
                  </div>
                </div>
                <div className="relative z-10 border-t border-[#C6D9CC] pt-2">
                  <div className="flex justify-between font-mono text-[10px] text-[#15803D] tabular-nums">
                    {rulerTicks.map((tick) => (
                      <span key={`a-${tick}`}>{tick} m</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mode === 'photo' && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            )}

            {/* Etiqueta inferior izquierda de Especie A */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 max-w-[44%]">
              <span className="inline-block rounded-md bg-[#15803D] px-2.5 py-1 text-xs font-semibold text-white shadow-xs">
                {comparison.speciesA.commonName}
              </span>
            </div>

            {/* Marcadores anatómicos Especie A (lado izquierdo visible) */}
            {showMarkers &&
              comparison.speciesA.anatomicalMarkers.map((marker) => {
                if (marker.xPercent >= sliderPercent - 2) return null;
                const isSelected =
                  selectedMarker?.marker.id === marker.id && selectedMarker.side === 'A';
                return (
                  <button
                    key={`A-${marker.id}`}
                    type="button"
                    data-marker="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMarker({
                        side: 'A',
                        speciesName: comparison.speciesA.commonName,
                        marker,
                      });
                    }}
                    style={{
                      left: `${marker.xPercent}%`,
                      top: `${marker.yPercent}%`,
                    }}
                    aria-label={`${comparison.speciesA.commonName}: ${marker.label}`}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm transition-transform hover:scale-105 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'border-white bg-[#15803D] text-white ring-2 ring-white/70'
                        : 'border-[#15803D]/30 bg-white/95 text-[#15803D]'
                    }`}
                  >
                    {marker.label}
                  </button>
                );
              })}
          </div>

          {/* Línea divisoria y manija interactiva */}
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Deslizador comparativo entre ${comparison.speciesA.commonName} y ${comparison.speciesB.commonName}`}
            aria-valuemin={4}
            aria-valuemax={96}
            aria-valuenow={Math.round(sliderPercent)}
            onKeyDown={handleSliderKeyDown}
            style={{ left: `${sliderPercent}%` }}
            className="absolute inset-y-0 z-30 -translate-x-1/2 focus:outline-none group"
          >
            <div className="mx-auto h-full w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)]" />
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#15803D] text-white shadow-lg group-focus-visible:ring-4 group-focus-visible:ring-[#15803D]/35">
              <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Barra de lectura visual y detalle de marcador seleccionado */}
        <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-[#E2ECE5] bg-[#F7FAF8] p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-[#15803D]">
              Izquierda · {comparison.speciesA.commonName}
            </p>
            <p className="mt-1 text-sm text-[#2B4335]">
              {mode === 'photo' && comparison.curatedImages
                ? comparison.curatedImages.captionA
                : comparison.speciesA.distinctiveTraits[0]}
            </p>
          </div>
          <div className="sm:border-l sm:border-[#D1E0D6] sm:pl-4">
            <p className="text-xs font-semibold text-[#112419]">
              Derecha · {comparison.speciesB.commonName}
            </p>
            <p className="mt-1 text-sm text-[#2B4335]">
              {mode === 'photo' && comparison.curatedImages
                ? comparison.curatedImages.captionB
                : comparison.speciesB.distinctiveTraits[0]}
            </p>
          </div>
        </div>

        {selectedMarker && (
          <div className="mt-3 flex items-start justify-between gap-4 rounded-xl border border-[#15803D]/30 bg-[#EFF5F1] px-4 py-3 text-sm">
            <div>
              <p className="text-xs font-semibold text-[#15803D]">
                Rasgo anatómico · {selectedMarker.speciesName}
              </p>
              <p className="mt-0.5 font-semibold text-[#112419]">
                {selectedMarker.marker.label}
              </p>
              <p className="mt-0.5 text-[#2B4335]">{selectedMarker.marker.detail}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMarker(null)}
              className="text-xs font-medium text-[#4A6355] hover:text-[#112419] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
