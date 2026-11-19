import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SPECIES_SILHOUETTE_TYPES = [
  'feline',
  'canine',
  'reptile',
  'bird',
  'marine_mammal',
  'shark',
  'bear',
  'primate',
  'ungulate',
  'elephant',
  'amphibian',
  'cephalopod',
  'general',
] as const;

const comparisonSchema = {
  type: Type.OBJECT,
  properties: {
    headline: {
      type: Type.STRING,
      description: 'Título corto de la comparación, por ejemplo "Águila Real vs. Halcón Peregrino".',
    },
    summary: {
      type: Type.STRING,
      description:
        'Respuesta directa, clara y científicamente rigurosa en español (2 a 4 oraciones) explicando las diferencias principales respecto a la consulta.',
    },
    category: {
      type: Type.STRING,
      description: 'Una de: Mamíferos, Reptiles, Marinos, Aves, General.',
    },
    speciesA: {
      type: Type.OBJECT,
      properties: {
        commonName: { type: Type.STRING },
        scientificName: { type: Type.STRING },
        taxonomyClass: {
          type: Type.STRING,
          description: 'Clase y familia separadas por punto medio, ej. "Aves · Accipitridae".',
        },
        habitat: { type: Type.STRING },
        diet: { type: Type.STRING },
        conservationStatus: { type: Type.STRING, description: 'Ej. "Preocupación menor (UICN)".' },
        lengthMeters: {
          type: Type.NUMBER,
          description: 'Longitud o envergadura adulta representativa en metros (número decimal positivo).',
        },
        weightKg: {
          type: Type.NUMBER,
          description: 'Peso adulto promedio en kilogramos (número positivo).',
        },
        topSpeedKmh: {
          type: Type.NUMBER,
          description: 'Velocidad máxima estimada en km/h.',
        },
        lifespanYears: {
          type: Type.NUMBER,
          description: 'Esperanza de vida promedio en años en estado silvestre.',
        },
        silhouetteCategory: {
          type: Type.STRING,
          description: `Categoría visual más cercana entre: ${SPECIES_SILHOUETTE_TYPES.join(', ')}.`,
        },
        distinctiveTraits: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Exactamente 3 rasgos distintivos clave.',
        },
        anatomicalMarkers: {
          type: Type.ARRAY,
          description: 'Exactamente 3 marcadores anatómicos para mostrar sobre la silueta.',
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              label: { type: Type.STRING, description: 'Etiqueta corta de 2-3 palabras.' },
              detail: { type: Type.STRING, description: 'Explicación breve de 1 oración.' },
              xPercent: { type: Type.NUMBER, description: 'Posición horizontal entre 18 y 82.' },
              yPercent: { type: Type.NUMBER, description: 'Posición vertical entre 28 y 72.' },
            },
            required: ['id', 'label', 'detail', 'xPercent', 'yPercent'],
          },
        },
      },
      required: [
        'commonName',
        'scientificName',
        'taxonomyClass',
        'habitat',
        'diet',
        'conservationStatus',
        'lengthMeters',
        'weightKg',
        'topSpeedKmh',
        'lifespanYears',
        'silhouetteCategory',
        'distinctiveTraits',
        'anatomicalMarkers',
      ],
    },
    speciesB: {
      type: Type.OBJECT,
      properties: {
        commonName: { type: Type.STRING },
        scientificName: { type: Type.STRING },
        taxonomyClass: { type: Type.STRING },
        habitat: { type: Type.STRING },
        diet: { type: Type.STRING },
        conservationStatus: { type: Type.STRING },
        lengthMeters: { type: Type.NUMBER },
        weightKg: { type: Type.NUMBER },
        topSpeedKmh: { type: Type.NUMBER },
        lifespanYears: { type: Type.NUMBER },
        silhouetteCategory: { type: Type.STRING },
        distinctiveTraits: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        anatomicalMarkers: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              label: { type: Type.STRING },
              detail: { type: Type.STRING },
              xPercent: { type: Type.NUMBER },
              yPercent: { type: Type.NUMBER },
            },
            required: ['id', 'label', 'detail', 'xPercent', 'yPercent'],
          },
        },
      },
      required: [
        'commonName',
        'scientificName',
        'taxonomyClass',
        'habitat',
        'diet',
        'conservationStatus',
        'lengthMeters',
        'weightKg',
        'topSpeedKmh',
        'lifespanYears',
        'silhouetteCategory',
        'distinctiveTraits',
        'anatomicalMarkers',
      ],
    },
    comparisonRows: {
      type: Type.ARRAY,
      description: 'Entre 6 y 8 filas comparando atributos medibles y morfológicos.',
      items: {
        type: Type.OBJECT,
        properties: {
          attribute: { type: Type.STRING },
          unit: { type: Type.STRING },
          valueA: { type: Type.STRING },
          valueB: { type: Type.STRING },
        },
        required: ['attribute', 'valueA', 'valueB'],
      },
    },
    keyDifferences: {
      type: Type.ARRAY,
      description: 'Exactamente 3 diferencias principales claras.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          category: {
            type: Type.STRING,
            description: 'Una de: Morfología, Comportamiento, Hábitat, Fisiología.',
          },
        },
        required: ['title', 'description', 'category'],
      },
    },
  },
  required: [
    'headline',
    'summary',
    'category',
    'speciesA',
    'speciesB',
    'comparisonRows',
    'keyDifferences',
  ],
};

function normalizeCategory(raw: string): 'Mamíferos' | 'Reptiles' | 'Marinos' | 'Aves' | 'General' {
  const valid = ['Mamíferos', 'Reptiles', 'Marinos', 'Aves', 'General'] as const;
  return (valid.find((item) => item.toLowerCase() === raw?.toLowerCase()) ?? 'General');
}

function normalizeSilhouette(raw: string) {
  return (SPECIES_SILHOUETTE_TYPES.find((item) => item === raw) ?? 'general');
}

function isTransientError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error ?? '');
  return (
    msg.includes('503') ||
    msg.includes('UNAVAILABLE') ||
    msg.includes('429') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('high demand')
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout (${ms}ms) en ${label}`));
    }, ms);
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

async function generateComparisonWithRetry(rawQuery: string) {
  const systemInstruction =
    'Eres un zoólogo experto de BioFauna. Responde en español natural y preciso. Si el usuario menciona dos especies, compáralas directamente. Si menciona una sola o hace una pregunta abierta, compárala con su pariente o especie más confundida habitualmente. Da cifras zoológicas realistas (longitud en metros, peso en kg, velocidad en km/h) y sé conciso en cada campo.';

  const modelAttempts: Array<{ model: string; thinkingLevel?: ThinkingLevel; delayMs: number }> = [
    { model: 'gemini-4-hydrogen', thinkingLevel: ThinkingLevel.LOW, delayMs: 0 },
    { model: 'gemini-3.1-flash-lite', thinkingLevel: ThinkingLevel.MINIMAL, delayMs: 250 },
    { model: 'gemini-3.1-flash-lite', delayMs: 600 },
  ];

  let lastError: unknown;

  for (const attempt of modelAttempts) {
    if (attempt.delayMs > 0) {
      await sleep(attempt.delayMs);
    }

    try {
      const response = await withTimeout(
        ai.models.generateContent({
          model: attempt.model,
          contents: `Consulta del usuario: "${rawQuery}"`,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: comparisonSchema,
            ...(attempt.thinkingLevel
              ? { thinkingConfig: { thinkingLevel: attempt.thinkingLevel } }
              : {}),
          },
        }),
        10000,
        attempt.model
      );

      const text = (response.text ?? '').trim();
      if (text) {
        return text;
      }
    } catch (error) {
      lastError = error;
      const msg = error instanceof Error ? error.message : '';
      if (!isTransientError(error) && !msg.includes('Timeout')) {
        throw error;
      }
      console.warn(`Reintento tras error transitorio en ${attempt.model}:`, msg);
    }
  }

  throw lastError ?? new Error('Los modelos no respondieron temporalmente.');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/compare', async (req, res) => {
    const rawQuery = typeof req.body?.query === 'string' ? req.body.query.trim() : '';

    if (!rawQuery) {
      return res.status(400).json({
        error: 'Escribe una pregunta o dos especies para realizar la comparación.',
      });
    }

    if (rawQuery.length > 320) {
      return res.status(400).json({
        error: 'La consulta es demasiado larga. Resume tu pregunta en menos de 320 caracteres.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Falta configurar GEMINI_API_KEY en el servidor para realizar consultas.',
      });
    }

    try {
      const text = await generateComparisonWithRetry(rawQuery);
      const parsed = JSON.parse(text);

      const formatted = {
        id: `query-${Date.now()}`,
        query: rawQuery,
        headline: parsed.headline,
        summary: parsed.summary,
        category: normalizeCategory(parsed.category),
        speciesA: {
          ...parsed.speciesA,
          silhouetteCategory: normalizeSilhouette(parsed.speciesA?.silhouetteCategory),
        },
        speciesB: {
          ...parsed.speciesB,
          silhouetteCategory: normalizeSilhouette(parsed.speciesB?.silhouetteCategory),
        },
        comparisonRows: Array.isArray(parsed.comparisonRows) ? parsed.comparisonRows : [],
        keyDifferences: Array.isArray(parsed.keyDifferences) ? parsed.keyDifferences : [],
        source: 'gemini' as const,
      };

      return res.json(formatted);
    } catch (error) {
      console.error('Error en /api/compare:', error);
      const message =
        error instanceof Error ? error.message : 'Error inesperado al consultar el análisis.';
      return res.status(502).json({
        error: `El servicio de consulta zoológica está saturado en este momento. Intenta nuevamente en unos segundos. (${message})`,
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`BioFauna server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start BioFauna server:', err);
  process.exit(1);
});
