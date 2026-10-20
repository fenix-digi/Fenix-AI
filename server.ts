import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Gemini SDK client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// SSE Streaming Chat Endpoint
app.post('/api/chat/stream', async (req: Request, res: Response) => {
  const { contents, systemInstruction, enableSearch, temperature } = req.body;

  if (!contents || !Array.isArray(contents)) {
    return res.status(400).json({ error: 'Contents array is required' });
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  try {
    const config: Record<string, any> = {
      temperature: typeof temperature === 'number' ? temperature : 0.7,
    };

    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }

    if (enableSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents,
      config,
    });

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }

      // Check if grounding metadata exists
      const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata?.groundingChunks?.length) {
        const sources = groundingMetadata.groundingChunks
          .map((c: any) => ({
            title: c.web?.title || 'Web Result',
            url: c.web?.uri || '',
          }))
          .filter((s: any) => s.url);

        if (sources.length > 0) {
          res.write(`data: ${JSON.stringify({ sources })}\n\n`);
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Gemini Stream Error:', error);
    const errorMessage = error?.message || 'Error communicating with Gemini AI';
    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// Gemini Text-to-Speech Endpoint
app.post('/api/tts', async (req: Request, res: Response) => {
  const { text, voiceName, style } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required for TTS' });
  }

  // Clean markdown syntax for spoken speech
  const cleanedText = text
    .replace(/```[\s\S]*?```/g, ' [Code block omitted] ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~>]/g, '')
    .trim()
    .slice(0, 1500); // limit to first 1500 chars for responsive tts

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanedText,
              speechMetadata: {
                style: style || 'Clear, natural, warm and friendly Indian assistant tone',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voiceName || 'Kore',
            },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: 'Failed to generate speech audio' });
    }

    res.json({
      audio: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    console.error('Gemini TTS Error:', error);
    res.status(500).json({ error: error?.message || 'TTS generation failed' });
  }
});

// Audio Transcription Endpoint
app.post('/api/transcribe', async (req: Request, res: Response) => {
  const { audioData, mimeType, prompt } = req.body;

  if (!audioData) {
    return res.status(400).json({ error: 'Audio data is required' });
  }

  try {
    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: audioData,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text:
              prompt ||
              'Transcribe this audio precisely. The speaker may be speaking Marathi, Hindi, or English. Retain original language and words faithfully.',
          },
        ],
      },
    });

    res.json({ transcription: response.text || '' });
  } catch (error: any) {
    console.error('Gemini Transcribe Error:', error);
    res.status(500).json({ error: error?.message || 'Transcription failed' });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const httpServer = http.createServer(app);

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Mitra AI Server listening on http://0.0.0.0:${port} [${isProduction ? 'production' : 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
