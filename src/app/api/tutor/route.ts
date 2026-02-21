import { NextRequest, NextResponse } from 'next/server';

// ─── AI Provider Interface ────────────────────────────────────
// API keys NEVER exposed to client. Server-side only.

type TutorRequest = {
  message: string;
  topicId?: string;
  grade?: number;
  history?: { role: 'user' | 'assistant'; content: string }[];
};

type TutorResponse = {
  reply: string;
  isOffline?: boolean;
  provider?: 'anthropic' | 'ollama' | 'offline';
};

// ─── Mathe-only System Prompt ─────────────────────────────────

const MATH_SYSTEM_PROMPT = (topicId?: string, grade?: number) =>
  `Du bist "Finn", ein freundlicher Mathe-Tutor für Schüler der Klassen 1-7 in Deutschland.
Antworte IMMER auf Deutsch. Sei geduldig, ermutigend und erkläre Konzepte klar und altersgerecht.
Aktuell lernt der Schüler: ${topicId ?? 'Mathematik allgemein'}, Klasse ${grade ?? '?'}.
Halte deine Antworten kurz (max 3 Sätze) und praktisch.

WICHTIG: Du beantwortest NUR Fragen zu Mathematik (Rechnen, Geometrie, Algebra, Brüche, Statistik etc.).
Falls jemand ein anderes Thema fragt (Politik, Sport, Kochen, etc.), antworte freundlich:
"Ich kann nur bei Mathe helfen! Hast du eine Mathe-Frage?" — und biete an, beim aktuellen Thema zu helfen.`;

// ─── Offline Rule-Based Tutor (no API needed) ─────────────────

function offlineTutor(request: TutorRequest): string {
  const msg = request.message.toLowerCase();

  if (msg.includes('was ist') || msg.includes('wie viel') || msg.includes('rechne')) {
    return 'Das ist eine gute Frage! Versuch es Schritt für Schritt: Was weißt du schon? Welche Rechenzeichen kommen vor? 🤔';
  }
  if (msg.includes('hilf') || msg.includes('tipp') || msg.includes('hint')) {
    return 'Gerne! Welches Thema macht dir Schwierigkeiten? Beschreib die Aufgabe und ich helfe dir, sie zu verstehen. 📚';
  }
  if (msg.includes('bruch') || msg.includes('fraction')) {
    return 'Brüche sind der Schlüssel! Denk dran: Der Nenner zeigt, in wie viele Teile das Ganze geteilt wird. Der Zähler zeigt, wie viele Teile du hast. 🍕';
  }
  if (msg.includes('gleichung') || msg.includes('x =')) {
    return 'Bei Gleichungen gilt: Was du auf einer Seite machst, musst du auch auf der anderen Seite machen. So bleibt die Gleichung im Gleichgewicht! ⚖️';
  }
  if (msg.includes('prozent')) {
    return 'Prozent bedeutet "von hundert". 50% = 50/100 = 1/2. Um den Prozentwert zu berechnen: Grundwert × Prozentsatz / 100. 💯';
  }

  return `Das ist eine tolle Frage! ${request.topicId ? `Für das Thema "${request.topicId}" empfehle ich` : 'Ich empfehle'}: Fang mit einem einfachen Beispiel an und steigere dich langsam. Hast du schon unsere Übungsaufgaben probiert? 🌟`;
}

// ─── Ollama Provider ──────────────────────────────────────────

async function tryOllama(request: TutorRequest): Promise<string | null> {
  const ollamaUrl = process.env.OLLAMA_URL ?? 'http://localhost:11434';
  const ollamaModel = process.env.OLLAMA_MODEL ?? 'llama3.2';

  try {
    const messages = [
      { role: 'system', content: MATH_SYSTEM_PROMPT(request.topicId, request.grade) },
      ...(request.history ?? []).map((h) => ({ role: h.role, content: h.content })),
      { role: 'user', content: request.message },
    ];

    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: ollamaModel,
        messages,
        stream: false,
        options: { temperature: 0.7, num_predict: 256 },
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) return null;

    const data = await response.json() as { message?: { content?: string } };
    return data.message?.content ?? null;
  } catch {
    return null; // Ollama nicht erreichbar
  }
}

// ─── API Route Handler ────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<TutorResponse>> {
  try {
    const body: TutorRequest = await request.json();

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json({ reply: 'Bitte stell eine Frage.', isOffline: true, provider: 'offline' });
    }

    // 1. Anthropic API (wenn ANTHROPIC_API_KEY gesetzt)
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 512,
            system: MATH_SYSTEM_PROMPT(body.topicId, body.grade),
            messages: [
              ...(body.history ?? []).map((h) => ({ role: h.role, content: h.content })),
              { role: 'user', content: body.message },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json() as { content: { text: string }[] };
          const reply = data.content[0]?.text ?? 'Ich bin mir nicht sicher. Versuch die Aufgabe nochmal!';
          return NextResponse.json({ reply, provider: 'anthropic' });
        }
      } catch {
        // Fällt auf Ollama zurück
      }
    }

    // 2. Ollama (lokal, datenschutzfreundlich)
    const ollamaReply = await tryOllama(body);
    if (ollamaReply) {
      return NextResponse.json({ reply: ollamaReply, provider: 'ollama' });
    }

    // 3. Offline Regelbasiert (immer verfügbar)
    const reply = offlineTutor(body);
    return NextResponse.json({ reply, isOffline: true, provider: 'offline' });

  } catch {
    return NextResponse.json(
      { reply: 'Ein Fehler ist aufgetreten. Probiere es erneut!', isOffline: true, provider: 'offline' },
      { status: 500 }
    );
  }
}

// ─── Status Endpoint (GET) ────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;

  let ollamaAvailable = false;
  const ollamaUrl = process.env.OLLAMA_URL ?? 'http://localhost:11434';
  try {
    const res = await fetch(`${ollamaUrl}/api/tags`, {
      signal: AbortSignal.timeout(2000),
    });
    ollamaAvailable = res.ok;
  } catch {
    ollamaAvailable = false;
  }

  const activeProvider = hasAnthropic ? 'anthropic' : ollamaAvailable ? 'ollama' : 'offline';

  return NextResponse.json({
    providers: {
      anthropic: hasAnthropic,
      ollama: ollamaAvailable,
      offline: true,
    },
    activeProvider,
  });
}
