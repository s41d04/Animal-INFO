export type SilhouetteCategory =
  | 'feline'
  | 'canine'
  | 'reptile'
  | 'bird'
  | 'marine_mammal'
  | 'shark'
  | 'bear'
  | 'primate'
  | 'ungulate'
  | 'elephant'
  | 'amphibian'
  | 'cephalopod'
  | 'general';

export interface AnatomicalMarker {
  id: string;
  label: string;
  detail: string;
  xPercent: number;
  yPercent: number;
}

export interface SpeciesProfile {
  commonName: string;
  scientificName: string;
  taxonomyClass: string;
  habitat: string;
  diet: string;
  conservationStatus: string;
  lengthMeters: number;
  weightKg: number;
  topSpeedKmh: number;
  lifespanYears: number;
  silhouetteCategory: SilhouetteCategory;
  distinctiveTraits: string[];
  anatomicalMarkers: AnatomicalMarker[];
}

export interface ComparisonRow {
  attribute: string;
  unit?: string;
  valueA: string;
  valueB: string;
}

export interface KeyDifference {
  title: string;
  description: string;
  category: 'Morfología' | 'Comportamiento' | 'Hábitat' | 'Fisiología';
}

export interface CuratedVisualAssets {
  imageA: string;
  imageB: string;
  captionA: string;
  captionB: string;
  comparisonContext: string;
}

export interface SpeciesComparison {
  id: string;
  query: string;
  headline: string;
  summary: string;
  category: 'Mamíferos' | 'Reptiles' | 'Marinos' | 'Aves' | 'General';
  speciesA: SpeciesProfile;
  speciesB: SpeciesProfile;
  comparisonRows: ComparisonRow[];
  keyDifferences: KeyDifference[];
  curatedImages?: CuratedVisualAssets;
  source: 'curated' | 'gemini';
}
