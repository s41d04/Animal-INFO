import type { CuratedVisualAssets, SpeciesComparison } from '../types/species';

export const CURATED_VISUALS_BY_ID: Record<string, CuratedVisualAssets> = {
  'guepardo-vs-leopardo': {
    imageA: '/src/assets/images/cheetah_savanna_profile_1795104021252.jpg',
    imageB: '/src/assets/images/leopard_savanna_profile_1795104021794.jpg',
    captionA: 'Manchas redondas sólidas · Líneas lagrimales negras · Complexión esbelta',
    captionB: 'Patrón en rosetas abiertas · Sin líneas lagrimales · Musculatura compacta',
    comparisonContext:
      'Desliza para comparar el perfil aerodinámico del guepardo frente a la estructura muscular del leopardo.',
  },
  'cocodrilo-vs-caiman': {
    imageA: '/src/assets/images/nile_crocodile_profile_1795104022789.jpg',
    imageB: '/src/assets/images/spectacled_caiman_profile_1795104023280.jpg',
    captionA: 'Hocico estrecho en forma de V · Cuarto diente inferior visible al cerrar',
    captionB: 'Hocico ancho en forma de U · Dentadura inferior oculta en la mandíbula',
    comparisonContext:
      'Desliza para contrastar la geometría craneal y la dentición externa entre ambos reptiles.',
  },
  'orca-vs-tiburon-blanco': {
    imageA: '/src/assets/images/orca_ocean_profile_1795104024018.jpg',
    imageB: '/src/assets/images/great_white_shark_profile_1795104023479.jpg',
    captionA: 'Aleta caudal horizontal · Espiráculo dorsal · Mamífero marino social',
    captionB: 'Aleta caudal vertical · Cinco hendiduras branquiales · Pez cartilaginoso',
    comparisonContext:
      'Desliza para observar las diferencias evolutivas entre un cetáceo mamífero y un escualo cartilaginoso.',
  },
};

export const CURATED_COMPARISONS: SpeciesComparison[] = [
  {
    id: 'guepardo-vs-leopardo',
    query: '¿Cuál es la diferencia entre guepardo y leopardo?',
    headline: 'Guepardo vs. Leopardo',
    summary:
      'Aunque comparten hábitats africanos y pelaje moteado, el guepardo (Acinonyx jubatus) está especializado en la velocidad pura a campo abierto, con cuerpo esbelto, garras semirretráctiles y dos líneas negras lagrimales; en cambio, el leopardo (Panthera pardus) es un depredador de emboscada mucho más robusto, con manchas en forma de roseta y gran fuerza para trepar árboles cargando presas.',
    category: 'Mamíferos',
    speciesA: {
      commonName: 'Guepardo',
      scientificName: 'Acinonyx jubatus',
      taxonomyClass: 'Mammalia · Felidae',
      habitat: 'Sabanas abiertas y praderas semiáridas de África e Irán',
      diet: 'Carnívoro diurno (gacelas, impalas, liebres)',
      conservationStatus: 'Vulnerable (UICN)',
      lengthMeters: 1.45,
      weightKg: 54,
      topSpeedKmh: 112,
      lifespanYears: 12,
      silhouetteCategory: 'feline',
      distinctiveTraits: [
        'Líneas negras desde los ojos hasta la boca contra el reflejo solar',
        'Manchas negras circulares y sólidas sin anillo central',
        'Garras semirretráctiles que actúan como tacos para tracción',
      ],
      anatomicalMarkers: [
        {
          id: 'cheetah-face',
          label: 'Líneas lagrimales',
          detail: 'Bandas oscuras antirreflejo exclusivas del guepardo para cazar de día.',
          xPercent: 27,
          yPercent: 30,
        },
        {
          id: 'cheetah-coat',
          label: 'Manchas sólidas',
          detail: 'Puntos negros macizos distribuidos de forma uniforme sobre el pelaje.',
          xPercent: 54,
          yPercent: 48,
        },
        {
          id: 'cheetah-paws',
          label: 'Garras semirretráctiles',
          detail: 'Permanecen expuestas para ganar agarre al acelerar de 0 a 100 km/h.',
          xPercent: 37,
          yPercent: 78,
        },
      ],
    },
    speciesB: {
      commonName: 'Leopardo',
      scientificName: 'Panthera pardus',
      taxonomyClass: 'Mammalia · Felidae',
      habitat: 'Bosques, sabanas arboladas y montañas de África y Asia',
      diet: 'Carnívoro oportunista nocturno (antílopes, monos, aves)',
      conservationStatus: 'Vulnerable (UICN)',
      lengthMeters: 1.65,
      weightKg: 72,
      topSpeedKmh: 58,
      lifespanYears: 15,
      silhouetteCategory: 'feline',
      distinctiveTraits: [
        'Pelaje cubierto de rosetas abiertas sin punto interior',
        'Cráneo ancho, cuello poderoso y extremidades musculadas',
        'Garras totalmente retráctiles adaptadas para escalar troncos',
      ],
      anatomicalMarkers: [
        {
          id: 'leopard-jaw',
          label: 'Mandíbula y cuello',
          detail: 'Musculatura cervical capaz de subir presas más pesadas que él a un árbol.',
          xPercent: 30,
          yPercent: 34,
        },
        {
          id: 'leopard-rosettes',
          label: 'Rosetas en anillo',
          detail: 'Anillos oscuros que rodean un centro dorado más intenso para camuflaje.',
          xPercent: 56,
          yPercent: 47,
        },
        {
          id: 'leopard-tail',
          label: 'Cola equilibradora',
          detail: 'Larga y gruesa, le da estabilidad al desplazarse entre ramas altas.',
          xPercent: 80,
          yPercent: 52,
        },
      ],
    },
    comparisonRows: [
      { attribute: 'Longitud corporal (sin cola)', unit: 'm', valueA: '1.15 – 1.45 m', valueB: '1.25 – 1.65 m' },
      { attribute: 'Peso adulto promedio', unit: 'kg', valueA: '38 – 65 kg', valueB: '50 – 90 kg' },
      { attribute: 'Velocidad máxima', unit: 'km/h', valueA: '112 km/h', valueB: '58 km/h' },
      { attribute: 'Patrón del pelaje', valueA: 'Manchas circulares sólidas', valueB: 'Rosetas en forma de anillo' },
      { attribute: 'Marcas faciales', valueA: 'Dos líneas lagrimales negras', valueB: 'Sin líneas lagrimales' },
      { attribute: 'Garras y escalada', valueA: 'Semirretráctiles · No trepa bien', valueB: 'Retráctiles · Excelente trepador' },
      { attribute: 'Horario de caza', valueA: 'Principalmente diurno', valueB: 'Crepuscular y nocturno' },
      { attribute: 'Vocalización', valueA: 'Maullidos y chirridos (no ruge)', valueB: 'Rugido profundo y gruñidos' },
    ],
    keyDifferences: [
      {
        title: 'Diseño corporal para velocidad vs. potencia',
        description:
          'El guepardo posee columna vertebral flexible, tórax profundo y patas largas para alcanzar zancadas de 7 metros; el leopardo prioriza masa muscular y hombros anchos para someter presas grandes.',
        category: 'Morfología',
      },
      {
        title: 'Identificación visual inmediata en el rostro',
        description:
          'Dos franjas negras bajan desde el lagrimal hasta la comisura bucal del guepardo para absorber el brillo del sol diurno, rasgo ausente en el leopardo.',
        category: 'Morfología',
      },
      {
        title: 'Estrategia de caza y resguardo',
        description:
          'El guepardo caza por persecución veloz y consume rápido en tierra; el leopardo acecha sigilosamente y sube su captura a las copas de los árboles para protegerla de hienas y leones.',
        category: 'Comportamiento',
      },
    ],
    curatedImages: CURATED_VISUALS_BY_ID['guepardo-vs-leopardo'],
    source: 'curated',
  },
  {
    id: 'cocodrilo-vs-caiman',
    query: 'Cocodrilo del Nilo vs caimán',
    headline: 'Cocodrilo del Nilo vs. Caimán',
    summary:
      'Los cocodrilos y caimanes pertenecen a familias distintas dentro del orden Crocodylia. El cocodrilo del Nilo (Crocodylus niloticus) tiene un hocico alargado y estrecho en forma de V que deja expuesto el cuarto diente inferior al cerrar la boca, además de glándulas funcionales para tolerar agua salada. El caimán (Caiman crocodilus) presenta un hocico más corto y ancho en forma de U, oculta los dientes inferiores y habita casi exclusivamente agua dulce en América.',
    category: 'Reptiles',
    speciesA: {
      commonName: 'Cocodrilo del Nilo',
      scientificName: 'Crocodylus niloticus',
      taxonomyClass: 'Reptilia · Crocodylidae',
      habitat: 'Ríos, lagos y estuarios salobres de África subsahariana',
      diet: 'Carnívoro ápice (peces, cebras, ñus, aves)',
      conservationStatus: 'Preocupación menor (UICN)',
      lengthMeters: 4.5,
      weightKg: 450,
      topSpeedKmh: 32,
      lifespanYears: 65,
      silhouetteCategory: 'reptile',
      distinctiveTraits: [
        'Hocico afilado en forma de V',
        'Cuarto diente mandibular inferior sobresale con la boca cerrada',
        'Glándulas linguales secretoras de sal para aguas estuarinas',
      ],
      anatomicalMarkers: [
        {
          id: 'croc-snout',
          label: 'Hocico en V',
          detail: 'Mandíbula estrecha y triangular optimizada para capturas rápidas.',
          xPercent: 25,
          yPercent: 48,
        },
        {
          id: 'croc-tooth',
          label: '4.º diente expuesto',
          detail: 'Encaja en una muesca externa del maxilar superior y permanece visible.',
          xPercent: 29,
          yPercent: 56,
        },
        {
          id: 'croc-osteoderms',
          label: 'Placas dorsales',
          detail: 'Osteodermos óseos gruesos de tono verde oliva con manchas oscuras.',
          xPercent: 64,
          yPercent: 44,
        },
      ],
    },
    speciesB: {
      commonName: 'Caimán de anteojos',
      scientificName: 'Caiman crocodilus',
      taxonomyClass: 'Reptilia · Alligatoridae',
      habitat: 'Pantanos, ciénagas y ríos de agua dulce en América Central y del Sur',
      diet: 'Carnívoro (peces, crustáceos, anfibios, pequeños mamíferos)',
      conservationStatus: 'Preocupación menor (UICN)',
      lengthMeters: 2.1,
      weightKg: 42,
      topSpeedKmh: 24,
      lifespanYears: 35,
      silhouetteCategory: 'reptile',
      distinctiveTraits: [
        'Hocico ancho y redondeado en forma de U con cresta interocular',
        'Dientes inferiores encajan dentro de cavidades internas del maxilar superior',
        'Escamas ventrales más osificadas y coloración gris-oliva oscura',
      ],
      anatomicalMarkers: [
        {
          id: 'caiman-ridge',
          label: 'Cresta ocular',
          detail: 'Puente óseo entre ambos ojos que le da el apodo de "anteojos".',
          xPercent: 42,
          yPercent: 39,
        },
        {
          id: 'caiman-jaw',
          label: 'Oclusión cerrada',
          detail: 'La mandíbula superior es más ancha y oculta los dientes inferiores.',
          xPercent: 28,
          yPercent: 53,
        },
        {
          id: 'caiman-scales',
          label: 'Armadura ventral',
          detail: 'Posee placas óseas también en el vientre para protección en humedales.',
          xPercent: 66,
          yPercent: 54,
        },
      ],
    },
    comparisonRows: [
      { attribute: 'Longitud total promedio', unit: 'm', valueA: '3.5 – 5.0 m', valueB: '1.5 – 2.5 m' },
      { attribute: 'Peso adulto', unit: 'kg', valueA: '225 – 700 kg', valueB: '20 – 60 kg' },
      { attribute: 'Forma del hocico', valueA: 'Estrecho y puntiagudo (V)', valueB: 'Ancho y redondeado (U)' },
      { attribute: 'Visibilidad dental', valueA: '4.º diente inferior visible', valueB: 'Dientes inferiores ocultos' },
      { attribute: 'Tolerancia a salinidad', valueA: 'Alta (glándulas linguales)', valueB: 'Muy baja (agua dulce)' },
      { attribute: 'Distribución geográfica', valueA: 'África y cuenca del Nilo', valueB: 'América Central y del Sur' },
      { attribute: 'Esperanza de vida', unit: 'años', valueA: '50 – 70 años', valueB: '30 – 40 años' },
    ],
    keyDifferences: [
      {
        title: 'Geometría del cráneo y sonrisa dental',
        description:
          'Con la mandíbula cerrada, el cocodrilo muestra claramente su cuarto diente inferior apuntando hacia arriba, mientras que el caimán mantiene la dentadura inferior oculta bajo un hocico ancho.',
        category: 'Morfología',
      },
      {
        title: 'Adaptación fisiológica al agua salada',
        description:
          'Los cocodrilos filtran exceso de sal mediante glándulas especializadas en la lengua; los caimanes carecen de glándulas funcionales eficientes y dependen de ríos y pantanos dulces.',
        category: 'Fisiología',
      },
      {
        title: 'Escala corporal y distribución',
        description:
          'El cocodrilo del Nilo puede superar fácilmente los 4 metros y cazar grandes mamíferos en África; la mayoría de caimanes americanos son mucho más compactos y se concentran en presas medianas.',
        category: 'Hábitat',
      },
    ],
    curatedImages: CURATED_VISUALS_BY_ID['cocodrilo-vs-caiman'],
    source: 'curated',
  },
  {
    id: 'orca-vs-tiburon-blanco',
    query: 'Orca vs tiburón blanco',
    headline: 'Orca vs. Tiburón Blanco',
    summary:
      'Aunque ambos son superdepredadores oceánicos de silueta hidrodinámica similar, la orca (Orcinus orca) es un mamífero cetáceo de sangre caliente que respira aire por un espiráculo, posee esqueleto óseo y caza en grupos familiares coordinados; el tiburón blanco (Carcharodon carcharias) es un pez cartilaginoso ectotermo que respira mediante cinco hendiduras branquiales y caza en solitario.',
    category: 'Marinos',
    speciesA: {
      commonName: 'Orca',
      scientificName: 'Orcinus orca',
      taxonomyClass: 'Mammalia · Delphinidae',
      habitat: 'Todos los océanos del mundo, desde aguas polares hasta tropicales',
      diet: 'Carnívoro social (peces, focas, calamares, otros cetáceos)',
      conservationStatus: 'Datos insuficientes (UICN)',
      lengthMeters: 8.0,
      weightKg: 4500,
      topSpeedKmh: 56,
      lifespanYears: 60,
      silhouetteCategory: 'marine_mammal',
      distinctiveTraits: [
        'Aleta caudal horizontal impulsada de arriba hacia abajo',
        'Respiración pulmonar a través de espiráculo superior',
        'Ecolocalización y estructura social matriarcal compleja',
      ],
      anatomicalMarkers: [
        {
          id: 'orca-dorsal',
          label: 'Aleta dorsal alta',
          detail: 'Alcanza hasta 1.8 m en machos adultos; sin soporte óseo rígido.',
          xPercent: 51,
          yPercent: 32,
        },
        {
          id: 'orca-patch',
          label: 'Parche ocular y silla',
          detail: 'Contraste blanco y negro característico con parche gris detrás de la aleta.',
          xPercent: 25,
          yPercent: 52,
        },
        {
          id: 'orca-fluke',
          label: 'Cola horizontal',
          detail: 'Impulso vertical de la columna vertebral, rasgo propio de mamíferos marinos.',
          xPercent: 86,
          yPercent: 50,
        },
      ],
    },
    speciesB: {
      commonName: 'Tiburón blanco',
      scientificName: 'Carcharodon carcharias',
      taxonomyClass: 'Chondrichthyes · Lamnidae',
      habitat: 'Aguas costeras templadas y pelágicas de océanos abiertos',
      diet: 'Carnívoro solitario (pinnípedos, peces grandes, tortugas)',
      conservationStatus: 'Vulnerable (UICN)',
      lengthMeters: 5.5,
      weightKg: 1900,
      topSpeedKmh: 48,
      lifespanYears: 70,
      silhouetteCategory: 'shark',
      distinctiveTraits: [
        'Aleta caudal vertical en media luna con movimiento lateral',
        'Cinco hendiduras branquiales laterales para extraer oxígeno del agua',
        'Ampollas de Lorenzini para detectar campos bioeléctricos de presas',
      ],
      anatomicalMarkers: [
        {
          id: 'shark-gills',
          label: '5 hendiduras branquiales',
          detail: 'Permiten respirar oxígeno disuelto en el agua sin subir a la superficie.',
          xPercent: 34,
          yPercent: 51,
        },
        {
          id: 'shark-snout',
          label: 'Ampollas de Lorenzini',
          detail: 'Electrorreceptores en el hocico cónico que detectan latidos cercanos.',
          xPercent: 16,
          yPercent: 53,
        },
        {
          id: 'shark-tail',
          label: 'Aleta caudal vertical',
          detail: 'Impulso lateral en forma de media luna para aceleraciones explosivas.',
          xPercent: 87,
          yPercent: 48,
        },
      ],
    },
    comparisonRows: [
      { attribute: 'Clasificación biológica', valueA: 'Mamífero cetáceo (delfínido)', valueB: 'Pez cartilaginoso (condrictio)' },
      { attribute: 'Longitud adulta típica', unit: 'm', valueA: '6.0 – 8.5 m', valueB: '4.0 – 6.0 m' },
      { attribute: 'Peso corporal', unit: 'kg', valueA: '3,000 – 5,500 kg', valueB: '1,100 – 2,200 kg' },
      { attribute: 'Respiración', valueA: 'Pulmonar (espiráculo en superficie)', valueB: 'Branquial (5 hendiduras laterales)' },
      { attribute: 'Movimiento de la cola', valueA: 'Aleta horizontal (arriba-abajo)', valueB: 'Aleta vertical (lado a lado)' },
      { attribute: 'Esqueleto', valueA: 'Óseo', valueB: 'Cartilaginoso' },
      { attribute: 'Comportamiento social', valueA: 'Manadas matriarcales cooperativas', valueB: 'Solitario y migratorio' },
      { attribute: 'Velocidad pico', unit: 'km/h', valueA: '56 km/h', valueB: '48 km/h' },
    ],
    keyDifferences: [
      {
        title: 'Mamífero respirador de aire vs. pez branquial',
        description:
          'Pese a su convergencia evolutiva hidrodinámica, la orca desciende de mamíferos terrestres, amamanta a sus crías y sube a respirar; el tiburón blanco respira bajo el agua mediante branquias.',
        category: 'Fisiología',
      },
      {
        title: 'Plano de propulsión de la aleta caudal',
        description:
          'Se distinguen al instante por la cola: la orca la tiene horizontal y bate verticalmente, mientras que el tiburón la tiene vertical y oscila lateralmente.',
        category: 'Morfología',
      },
      {
        title: 'Inteligencia táctica y estructura social',
        description:
          'Las orcas transmiten dialectos acústicos y tácticas de caza coordinada por generaciones, llegando incluso a cazar tiburones blancos en solitario o pareja.',
        category: 'Comportamiento',
      },
    ],
    curatedImages: CURATED_VISUALS_BY_ID['orca-vs-tiburon-blanco'],
    source: 'curated',
  },
  {
    id: 'aguila-real-vs-halcon-peregrino',
    query: 'Águila real vs halcón peregrino',
    headline: 'Águila Real vs. Halcón Peregrino',
    summary:
      'Aunque ambas son aves rapaces diurnas emblemáticas, pertenecen a órdenes distintos. El águila real (Aquila chrysaetos) supera los 2 metros de envergadura, posee alas anchas para planear aprovechando corrientes térmicas y caza mamíferos terrestres con garras enormes; el halcón peregrino (Falco peregrinus) es mucho más compacto, tiene alas largas y puntiagudas y alcanza más de 320 km/h en picada para cazar otras aves en pleno vuelo.',
    category: 'Aves',
    speciesA: {
      commonName: 'Águila real',
      scientificName: 'Aquila chrysaetos',
      taxonomyClass: 'Aves · Accipitridae',
      habitat: 'Zonas montañosas, acantilados y estepas del hemisferio norte',
      diet: 'Carnívoro (liebres, marmotas, zorros, aves grandes)',
      conservationStatus: 'Preocupación menor (UICN)',
      lengthMeters: 2.15,
      weightKg: 5.2,
      topSpeedKmh: 240,
      lifespanYears: 28,
      silhouetteCategory: 'bird',
      distinctiveTraits: [
        'Envergadura alar superior a 2 metros con plumas primarias separadas',
        'Tarsos completamente emplumados hasta los dedos',
        'Presa principal en tierra capturada mediante planeo y presión de garras',
      ],
      anatomicalMarkers: [
        {
          id: 'eagle-wings',
          label: 'Alas anchas',
          detail: 'Superficie alar amplia para planear largas horas sin gastar energía.',
          xPercent: 64,
          yPercent: 34,
        },
        {
          id: 'eagle-beak',
          label: 'Pico ganchudo liso',
          detail: 'Borde cortante sin escotadura dental para desgarrar presas grandes.',
          xPercent: 25,
          yPercent: 39,
        },
        {
          id: 'eagle-talons',
          label: 'Garras y tarsos emplumados',
          detail: 'Dedos gruesos capaces de ejercer enorme presión de agarre.',
          xPercent: 40,
          yPercent: 72,
        },
      ],
    },
    speciesB: {
      commonName: 'Halcón peregrino',
      scientificName: 'Falco peregrinus',
      taxonomyClass: 'Aves · Falconidae',
      habitat: 'Acantilados costeros, montañas y rascacielos urbanos globales',
      diet: 'Ornitófago aéreo (palomas, estorninos, patos en vuelo)',
      conservationStatus: 'Preocupación menor (UICN)',
      lengthMeters: 1.05,
      weightKg: 0.95,
      topSpeedKmh: 389,
      lifespanYears: 16,
      silhouetteCategory: 'bird',
      distinctiveTraits: [
        'Alas estrechas y puntiagudas en forma de hoz para maniobrar a alta velocidad',
        'Bigotera oscura facial y diente tomial en el pico superior',
        'Tubérculos óseos en las narinas para respirar durante picadas extremas',
      ],
      anatomicalMarkers: [
        {
          id: 'falcon-wings',
          label: 'Alas en hoz',
          detail: 'Perfil aerodinámico plegable para alcanzar más de 320 km/h en picada.',
          xPercent: 66,
          yPercent: 36,
        },
        {
          id: 'falcon-beak',
          label: 'Diente tomial',
          detail: 'Muesca en el pico superior diseñada para seccionar vértebras de aves.',
          xPercent: 26,
          yPercent: 38,
        },
        {
          id: 'falcon-eye',
          label: 'Bigotera oscura',
          detail: 'Banda negra bajo el ojo que reduce el deslumbramiento en vuelo.',
          xPercent: 33,
          yPercent: 35,
        },
      ],
    },
    comparisonRows: [
      { attribute: 'Envergadura alar', unit: 'm', valueA: '1.85 – 2.30 m', valueB: '0.85 – 1.15 m' },
      { attribute: 'Peso corporal adulto', unit: 'kg', valueA: '3.5 – 6.5 kg', valueB: '0.6 – 1.3 kg' },
      { attribute: 'Velocidad máxima en picada', unit: 'km/h', valueA: '240 km/h', valueB: '389 km/h' },
      { attribute: 'Morfología del ala', valueA: 'Ancha y digitada (planeo)', valueB: 'Estrecha y puntiaguda (velocidad)' },
      { attribute: 'Método letal principal', valueA: 'Aplastamiento con garras', valueB: 'Impacto aéreo y diente tomial' },
      { attribute: 'Dieta predominante', valueA: 'Mamíferos medianos y carroña', valueB: 'Aves capturadas en el aire' },
    ],
    keyDifferences: [
      {
        title: 'Tamaño y arquitectura alar opuesta',
        description:
          'El águila real tiene más del doble de envergadura y hasta cinco veces el peso del halcón peregrino, optimizada para sustentación térmica y carga de presas pesadas.',
        category: 'Morfología',
      },
      {
        title: 'El animal más veloz del planeta vs. cazador terrestre',
        description:
          'El halcón peregrino se lanza en picada vertical superando los 320 km/h para golpear aves en el aire; el águila real patrulla a baja o media altura buscando presas en el suelo.',
        category: 'Comportamiento',
      },
      {
        title: 'Anatomía del pico y respiración extrema',
        description:
          'Los halcones poseen un diente tomial en el pico y deflectores nasales para respirar a velocidades extremas; las águilas tienen pico liso curvo y matan por presión de sus garras.',
        category: 'Fisiología',
      },
    ],
    source: 'curated',
  },
  {
    id: 'lobo-gris-vs-coyote',
    query: 'Lobo gris vs coyote',
    headline: 'Lobo Gris vs. Coyote',
    summary:
      'El lobo gris (Canis lupus) y el coyote (Canis latrans) son cánidos cercanos, pero el lobo duplica o triplica en peso al coyote, presenta hocico más ancho y redondeado, orejas proporcionalmente más cortas y caza presas grandes en manadas jerárquicas; el coyote es más estilizado, posee hocico afilado y orejas grandes, y destaca por su versatilidad solitaria o en parejas incluso cerca de áreas urbanas.',
    category: 'Mamíferos',
    speciesA: {
      commonName: 'Lobo gris',
      scientificName: 'Canis lupus',
      taxonomyClass: 'Mammalia · Canidae',
      habitat: 'Bosques boreales, tundras, praderas y montañas de Norteamérica y Eurasia',
      diet: 'Carnívoro social de gran presa (ciervos, alces, bisontes, caribúes)',
      conservationStatus: 'Preocupación menor (UICN)',
      lengthMeters: 1.55,
      weightKg: 45,
      topSpeedKmh: 65,
      lifespanYears: 10,
      silhouetteCategory: 'canine',
      distinctiveTraits: [
        'Hocico amplio, trufa gruesa y cráneo macizo',
        'Orejas cortas y redondeadas en proporción a la cabeza',
        'Patas largas con huellas grandes (10–13 cm) y porte recto de cola al trotar',
      ],
      anatomicalMarkers: [
        {
          id: 'wolf-snout',
          label: 'Hocico ancho',
          detail: 'Mandíbula robusta capaz de ejercer más de 400 PSI para derribar ungulados.',
          xPercent: 22,
          yPercent: 40,
        },
        {
          id: 'wolf-ears',
          label: 'Orejas cortas',
          detail: 'Más redondeadas y proporcionalmente pequeñas para conservar calor.',
          xPercent: 35,
          yPercent: 28,
        },
        {
          id: 'wolf-paws',
          label: 'Patas y zancada',
          detail: 'Extremidades largas y musculosas para recorrer decenas de kilómetros diarios.',
          xPercent: 40,
          yPercent: 78,
        },
      ],
    },
    speciesB: {
      commonName: 'Coyote',
      scientificName: 'Canis latrans',
      taxonomyClass: 'Mammalia · Canidae',
      habitat: 'Desiertos, praderas, bosques abiertos y suburbios de América del Norte y Central',
      diet: 'Omnívoro oportunista (roedores, conejos, frutos, insectos)',
      conservationStatus: 'Preocupación menor (UICN)',
      lengthMeters: 1.15,
      weightKg: 14,
      topSpeedKmh: 69,
      lifespanYears: 11,
      silhouetteCategory: 'canine',
      distinctiveTraits: [
        'Hocico estrecho y puntiagudo con aspecto ligero',
        'Orejas grandes, erguidas y triangulares',
        'Cola esponjosa que mantiene baja entre las patas al correr',
      ],
      anatomicalMarkers: [
        {
          id: 'coyote-snout',
          label: 'Hocico afilado',
          detail: 'Más fino y alargado, adaptado para capturar roedores y presas pequeñas.',
          xPercent: 22,
          yPercent: 42,
        },
        {
          id: 'coyote-ears',
          label: 'Orejas grandes',
          detail: 'Muy agudas para detectar el movimiento de roedores bajo la hierba o nieve.',
          xPercent: 36,
          yPercent: 26,
        },
        {
          id: 'coyote-tail',
          label: 'Cola baja',
          detail: 'Suele llevarla apuntando hacia abajo durante la carrera o el trote.',
          xPercent: 86,
          yPercent: 58,
        },
      ],
    },
    comparisonRows: [
      { attribute: 'Peso adulto promedio', unit: 'kg', valueA: '30 – 65 kg', valueB: '9 – 20 kg' },
      { attribute: 'Longitud total (con cola)', unit: 'm', valueA: '1.35 – 1.80 m', valueB: '1.05 – 1.30 m' },
      { attribute: 'Forma del hocico', valueA: 'Ancho y bloqueado', valueB: 'Estrecho y puntiagudo' },
      { attribute: 'Proporción de orejas', valueA: 'Cortas y redondeadas', valueB: 'Grandes y puntiagudas' },
      { attribute: 'Tamaño de huella', unit: 'cm', valueA: '10 – 13 cm', valueB: '5 – 6.5 cm' },
      { attribute: 'Organización social', valueA: 'Manadas familiares estables', valueB: 'Solitario, parejas o pequeños grupos' },
      { attribute: 'Dieta principal', valueA: 'Ungulados grandes', valueB: 'Roedores, lagomorfos y frutos' },
    ],
    keyDifferences: [
      {
        title: 'Envergadura física y estructura facial',
        description:
          'El lobo gris pesa entre dos y cuatro veces más que un coyote, con cráneo pesado, hocico ancho y patas robustas; el coyote luce más liviano, con hocico fino y orejas prominentes.',
        category: 'Morfología',
      },
      {
        title: 'Posición de la cola y vocalizaciones',
        description:
          'Al desplazarse, el lobo mantiene la cola horizontal o ligeramente elevada, mientras que el coyote la lleva baja; sus aullidos también difieren: graves y sostenidos en el lobo frente a ladridos agudos y yips en el coyote.',
        category: 'Comportamiento',
      },
      {
        title: 'Nicho trófico y adaptabilidad urbana',
        description:
          'El lobo depende de grandes presas y territorios silvestres amplios; el coyote es omnívoro flexible capaz de prosperar tanto en desiertos áridos como en parques periurbanos.',
        category: 'Hábitat',
      },
    ],
    source: 'curated',
  },
  {
    id: 'elefante-africano-vs-asiatico',
    query: 'Elefante africano vs elefante asiático',
    headline: 'Elefante Africano vs. Elefante Asiático',
    summary:
      'El elefante africano de sabana (Loxodonta africana) es el mamífero terrestre más grande, con orejas enormes en forma aproximada del mapa de África, lomo cóncavo y dos lóbulos prensiles en la punta de la trompa; el elefante asiático (Elephas maximus) es más compacto, tiene orejas más pequeñas y redondeadas, espalda convexa abovedada, cabeza con dos protuberancias frontales y un solo lóbulo en la trompa.',
    category: 'Mamíferos',
    speciesA: {
      commonName: 'Elefante africano de sabana',
      scientificName: 'Loxodonta africana',
      taxonomyClass: 'Mammalia · Elephantidae',
      habitat: 'Sabanas, matorrales y bosques abiertos de África subsahariana',
      diet: 'Herbívoro ramoneador (cortezas, hojas, ramas, pastos)',
      conservationStatus: 'En peligro (UICN)',
      lengthMeters: 6.5,
      weightKg: 5800,
      topSpeedKmh: 40,
      lifespanYears: 65,
      silhouetteCategory: 'elephant',
      distinctiveTraits: [
        'Orejas muy grandes que cubren los hombros para disipar calor',
        'Punta de la trompa con dos "dedos" prensiles opuestos',
        'Lomo con ligera curvatura cóncava (en silla de montar)',
      ],
      anatomicalMarkers: [
        {
          id: 'african-ears',
          label: 'Orejas enormes',
          detail: 'Superan el metro de longitud y actúan como radiadores térmicos en la sabana.',
          xPercent: 34,
          yPercent: 40,
        },
        {
          id: 'african-trunk',
          label: 'Trompa de 2 dedos',
          detail: 'Posee dos proyecciones prensiles en el extremo para agarrar objetos con pinza.',
          xPercent: 20,
          yPercent: 68,
        },
        {
          id: 'african-back',
          label: 'Lomo cóncavo',
          detail: 'Los hombros suelen ser el punto más alto de su silueta dorsal.',
          xPercent: 60,
          yPercent: 33,
        },
      ],
    },
    speciesB: {
      commonName: 'Elefante asiático',
      scientificName: 'Elephas maximus',
      taxonomyClass: 'Mammalia · Elephantidae',
      habitat: 'Selvas húmedas, bosques caducifolios y praderas del sur y sudeste de Asia',
      diet: 'Herbívoro (pastos, bambú, palmas, cortezas, frutos)',
      conservationStatus: 'En peligro (UICN)',
      lengthMeters: 5.6,
      weightKg: 4100,
      topSpeedKmh: 35,
      lifespanYears: 60,
      silhouetteCategory: 'elephant',
      distinctiveTraits: [
        'Orejas más pequeñas y rectas que no rebasan el cuello',
        'Cabeza con dos domos craneales marcados y frente abombada',
        'Punta de la trompa con un único lóbulo prensil superior',
      ],
      anatomicalMarkers: [
        {
          id: 'asian-head',
          label: 'Doble domo craneal',
          detail: 'Dos protuberancias claras en la parte superior de la cabeza, punto más alto.',
          xPercent: 31,
          yPercent: 32,
        },
        {
          id: 'asian-trunk',
          label: 'Trompa de 1 dedo',
          detail: 'Un solo lóbulo dorsal en la punta; enrolla la trompa para sujetar hierba.',
          xPercent: 20,
          yPercent: 68,
        },
        {
          id: 'asian-back',
          label: 'Lomo convexo',
          detail: 'Espalda arqueada hacia arriba o plana en la zona media.',
          xPercent: 62,
          yPercent: 32,
        },
      ],
    },
    comparisonRows: [
      { attribute: 'Altura a la cruz', unit: 'm', valueA: '3.0 – 3.9 m', valueB: '2.4 – 3.0 m' },
      { attribute: 'Peso corporal adulto', unit: 'kg', valueA: '4,500 – 6,500 kg', valueB: '3,000 – 4,800 kg' },
      { attribute: 'Tamaño y forma de orejas', valueA: 'Grandes (cubren hombros)', valueB: 'Más pequeñas y redondeadas' },
      { attribute: 'Perfil del cráneo', valueA: 'Frente lisa y redondeada', valueB: 'Doble domo prominente' },
      { attribute: 'Perfil del lomo', valueA: 'Cóncavo (hombros altos)', valueB: 'Convexo o arqueado' },
      { attribute: 'Punta de la trompa', valueA: 'Dos lóbulos prensiles', valueB: 'Un lóbulo prensil superior' },
      { attribute: 'Presencia de colmillos', valueA: 'Machos y hembras los desarrollan', valueB: 'Solo machos (y no todos)' },
    ],
    keyDifferences: [
      {
        title: 'Orejas, cráneo y línea dorsal inconfundibles',
        description:
          'El elefante africano destaca por sus orejas gigantes y lomo hundido con hombros elevados; el asiático muestra orejas pequeñas, espalda convexa y dos cúpulas marcadas en la cabeza.',
        category: 'Morfología',
      },
      {
        title: 'Anatomía de la trompa y colmillos por sexo',
        description:
          'En África tanto machos como hembras tienen colmillos visibles y usan una trompa con dos puntas tipo pinza; en Asia solo algunos machos desarrollan colmillos largos y la trompa tiene un solo dedo.',
        category: 'Fisiología',
      },
      {
        title: 'Ecología forestal vs. sabana abierta',
        description:
          'El mayor tamaño de orejas y piel más arrugada del elefante africano responde al calor seco de las sabanas abiertas, mientras que el asiático está adaptado a selvas húmedas densas.',
        category: 'Hábitat',
      },
    ],
    source: 'curated',
  },
];

export const QUICK_QUERY_SUGGESTIONS: string[] = [
  '¿Cuál es la diferencia entre guepardo y leopardo?',
  'Cocodrilo del Nilo vs caimán',
  'Orca vs tiburón blanco',
  'Águila real vs halcón peregrino',
  'Lobo gris vs coyote',
  'Elefante africano vs elefante asiático',
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function matchCuratedVisualPairId(text: string): string | undefined {
  const normalized = normalizeText(text);

  if (normalized.includes('guepardo') && normalized.includes('leopardo')) {
    return 'guepardo-vs-leopardo';
  }
  if (
    (normalized.includes('cocodrilo') || normalized.includes('crocodile')) &&
    (normalized.includes('caiman') || normalized.includes('aligator'))
  ) {
    return 'cocodrilo-vs-caiman';
  }
  if (
    normalized.includes('orca') &&
    (normalized.includes('tiburon') || normalized.includes('shark'))
  ) {
    return 'orca-vs-tiburon-blanco';
  }
  return undefined;
}

export function findExactCuratedComparison(query: string): SpeciesComparison | undefined {
  const normalized = normalizeText(query.trim());

  const exactByText = CURATED_COMPARISONS.find(
    (c) =>
      normalizeText(c.query) === normalized ||
      normalizeText(c.headline) === normalized
  );
  if (exactByText) return exactByText;

  // Coincidencia directa cuando el usuario formula con sus propias palabras alguno de los pares curados
  if (normalized.length < 72) {
    if (normalized.includes('guepardo') && normalized.includes('leopardo')) {
      return CURATED_COMPARISONS.find((c) => c.id === 'guepardo-vs-leopardo');
    }
    if (
      (normalized.includes('cocodrilo') || normalized.includes('crocodile')) &&
      (normalized.includes('caiman') || normalized.includes('aligator'))
    ) {
      return CURATED_COMPARISONS.find((c) => c.id === 'cocodrilo-vs-caiman');
    }
    if (normalized.includes('orca') && normalized.includes('tiburon')) {
      return CURATED_COMPARISONS.find((c) => c.id === 'orca-vs-tiburon-blanco');
    }
    if (normalized.includes('aguila') && normalized.includes('halcon')) {
      return CURATED_COMPARISONS.find((c) => c.id === 'aguila-real-vs-halcon-peregrino');
    }
    if (normalized.includes('lobo') && normalized.includes('coyote')) {
      return CURATED_COMPARISONS.find((c) => c.id === 'lobo-gris-vs-coyote');
    }
    if (
      normalized.includes('elefante') &&
      normalized.includes('africano') &&
      normalized.includes('asiatico')
    ) {
      return CURATED_COMPARISONS.find((c) => c.id === 'elefante-africano-vs-asiatico');
    }
  }

  return undefined;
}
