import type { SilhouetteCategory } from '../types/species';

interface ZoologicalSilhouetteProps {
  category: SilhouetteCategory;
  variant: 'primary' | 'secondary';
  className?: string;
}

const PATH_BY_CATEGORY: Record<SilhouetteCategory, string> = {
  feline:
    'M18 46 C20 39 24 34 30 33 L35 28 C37 28 38 30 39 32 L45 34 C56 34 72 35 84 41 C91 45 100 54 111 53 C114 53 116 56 113 58 C102 60 93 53 86 48 L84 69 L88 86 L81 86 L77 68 L69 57 C61 58 52 57 46 56 L42 70 L45 86 L38 86 L35 69 L36 55 C29 53 23 50 18 46 Z',
  canine:
    'M17 44 L26 37 L30 27 L34 33 L39 27 L41 35 C52 36 68 38 79 42 C88 45 96 52 104 60 L98 63 C91 56 85 52 80 51 L83 70 L86 86 L79 86 L74 68 L67 57 C59 58 50 58 43 56 L39 71 L41 86 L34 86 L32 69 L33 54 L23 51 L17 48 Z',
  reptile:
    'M10 53 L28 48 L36 45 C47 44 63 45 77 48 C90 51 103 53 116 53 C104 59 90 61 75 60 L79 70 L73 72 L67 60 L44 60 L39 72 L33 70 L36 59 L22 58 L10 56 Z',
  bird:
    'M18 42 L26 38 L31 31 C36 30 41 34 45 39 L74 22 C83 28 89 36 93 46 L68 50 L87 63 L79 68 L58 57 C51 60 44 61 39 58 L37 72 L43 76 L33 76 L34 56 C27 52 22 47 18 42 Z',
  marine_mammal:
    'M14 55 C21 44 35 39 50 40 L54 20 C59 24 62 32 63 41 C77 43 91 48 103 52 L114 45 L112 55 L114 65 L103 58 C88 61 72 64 56 64 L49 77 C44 74 42 68 43 63 C31 62 20 60 14 55 Z',
  shark:
    'M12 54 C24 44 38 40 53 41 L57 22 C62 27 65 34 66 42 C79 44 92 48 103 52 L115 34 L110 54 L115 73 L102 58 C88 61 72 63 57 63 L50 76 C45 73 43 67 44 62 C31 61 20 58 12 54 Z',
  bear:
    'M18 48 C20 39 26 33 33 32 L36 27 L41 31 C53 29 69 30 82 36 C90 40 96 47 97 56 L95 72 L97 86 L86 86 L83 68 L73 66 L70 86 L59 86 L59 66 L48 66 L45 86 L34 86 L35 66 C27 62 21 56 18 48 Z',
  primate:
    'M28 32 C31 24 40 22 46 28 L53 33 C63 34 73 40 79 49 L86 73 L91 86 L82 86 L75 66 L66 59 L63 86 L54 86 L54 61 L42 63 L36 86 L27 86 L34 58 L28 45 Z',
  ungulate:
    'M17 38 L27 32 L30 22 L35 28 L40 22 L42 31 C53 34 70 36 84 40 C91 43 96 50 96 58 L92 61 L88 53 L85 72 L87 88 L81 88 L77 68 L69 57 L47 57 L43 72 L45 88 L39 88 L36 69 L37 54 L26 48 L17 44 Z',
  elephant:
    'M14 66 C15 51 20 38 29 33 C37 29 46 31 53 34 C65 30 80 32 90 40 C96 46 99 54 98 63 L94 86 L82 86 L81 66 L68 66 L66 86 L55 86 L54 66 L41 66 L39 86 L29 86 L30 60 C24 58 21 63 21 71 C21 76 24 78 26 77 L27 81 C20 83 14 76 14 66 Z',
  amphibian:
    'M22 52 C27 40 38 35 50 37 C63 39 76 46 84 56 L92 68 L99 72 L86 74 L77 65 L59 64 L54 75 L46 75 L49 62 L35 61 L27 72 L20 71 L27 59 Z',
  cephalopod:
    'M24 38 C24 25 38 19 52 24 C63 28 69 38 69 49 L95 57 L93 62 L69 57 L92 69 L88 74 L65 62 L81 79 L75 82 L58 64 L55 84 L49 84 L50 62 C36 60 24 50 24 38 Z',
  general:
    'M18 48 C24 36 37 32 51 34 C66 36 81 40 94 48 C100 52 104 56 106 60 C96 61 86 58 78 56 L77 78 L70 78 L69 59 L47 59 L43 78 L36 78 L38 57 C29 56 22 53 18 48 Z',
};

export function ZoologicalSilhouette({
  category,
  variant,
  className = '',
}: ZoologicalSilhouetteProps) {
  const pathData = PATH_BY_CATEGORY[category] || PATH_BY_CATEGORY.general;
  const fillColor = variant === 'primary' ? '#15803D' : '#1E3A2F';
  const strokeColor = variant === 'primary' ? '#0F5328' : '#112419';

  return (
    <svg
      viewBox="0 0 128 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d={pathData}
        fill={fillColor}
        fillOpacity={0.86}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
