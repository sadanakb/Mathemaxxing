import { NextRequest, NextResponse } from 'next/server';

// ─── AI Provider Interface ────────────────────────────────────
// API key NEVER exposed to client. Server-side only.

type TutorRequest = {
  message: string;
  topicId?: string;
  grade?: number;
  history?: { role: 'user' | 'assistant'; content: string }[];
};

type TutorResponse = {
  reply: string;
  isOffline?: boolean;
};

// ─── Offline Rule-Based Tutor (no API needed) ─────────────────

function offlineTutor(request: TutorRequest): string {
  const msg = request.message.toLowerCase();

  // Detect question type
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

  // Default helpful response
  return `Das ist eine tolle Frage! ${request.topicId ? `Für das Thema "${request.topicId}" empfehle ich` : 'Ich empfehle'}: Fang mit einem einfachen Beispiel an und steigere dich langsam. Hast du schon unsere Übungsaufgaben probiert? 🌟`;
}

// ─── API Route Handler ────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<TutorResponse>> {
  try {
    const body: TutorRequest = await request.json();

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json({ reply: 'Bitte stell eine Frage.', isOffline: true });
    }

    // Check if Anthropic API key is configured server-side
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Use offline tutor
      const reply = offlineTutor(body);
      return NextResponse.json({ reply, isOffline: true });
    }

    // Call Anthropic API server-side (key never reaches client)
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
          system: `Du bist "Finn", ein freundlicher Mathe-Tutor für Schüler der Klassen 1-7 in Deutschland.
          Antworte immer auf Deutsch. Sei geduldig, ermutigend und erkläre Konzepte klar und altersgerecht.
          Aktuell lernt der Schüler: ${body.topicId ?? 'Mathematik allgemein'}, Klasse ${body.grade ?? '?'}.
          Halte deine Antworten kurz (max 3 Sätze) und praktisch.`,
          messages: [
            ...(body.history ?? []).map((h) => ({ role: h.role, content: h.content })),
            { role: 'user', content: body.message },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json() as { content: { text: string }[] };
      const reply = data.content[0]?.text ?? 'Ich bin mir nicht sicher. Versuch die Aufgabe nochmal!';
      return NextResponse.json({ reply });
    } catch {
      // Fallback to offline tutor on API error
      const reply = offlineTutor(body);
      return NextResponse.json({ reply, isOffline: true });
    }
  } catch {
    return NextResponse.json(
      { reply: 'Ein Fehler ist aufgetreten. Probiere es erneut!', isOffline: true },
      { status: 500 }
    );
  }
}
