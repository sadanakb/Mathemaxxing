'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurriculumStore } from '@/store/curriculumStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { PageWrapper } from '@/components/layout/PageWrapper';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isOffline?: boolean;
};

type ProviderStatus = {
  providers: { anthropic: boolean; ollama: boolean; offline: boolean };
  activeProvider: 'anthropic' | 'ollama' | 'offline';
} | null;

const PROVIDER_LABEL: Record<string, string> = {
  anthropic: '☁️ Cloud (Claude)',
  ollama: '💻 Lokal (Ollama)',
  offline: '⚡ Offline',
};

const PROVIDER_VARIANT: Record<string, 'success' | 'info' | 'warning'> = {
  anthropic: 'success',
  ollama: 'info',
  offline: 'warning',
};

export default function TutorPage() {
  const { klasse } = useCurriculumStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hallo! Ich bin Finn, dein Mathe-Tutor 🦊 Stell mir eine Mathe-Frage — ich helfe dir gerne!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [providerStatus, setProviderStatus] = useState<ProviderStatus>(null);
  const [activeProvider, setActiveProvider] = useState<string>('offline');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Provider-Status beim Laden abfragen
  useEffect(() => {
    fetch('/api/tutor')
      .then((r) => r.json())
      .then((data: ProviderStatus) => {
        if (data) {
          setProviderStatus(data);
          setActiveProvider(data.activeProvider);
        }
      })
      .catch(() => {/* ignorieren */});
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          grade: klasse,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json() as { reply: string; isOffline?: boolean; provider?: string };
      if (data.provider) setActiveProvider(data.provider);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          isOffline: data.isOffline,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Entschuldigung, ich hatte gerade Verbindungsprobleme. Versuche es nochmal!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const variant = PROVIDER_VARIANT[activeProvider] ?? 'warning';

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🦊 Finn — Dein Mathe-Tutor</h1>
          <p className="text-gray-500 text-sm mt-1">Stell mir Fragen zu deinen Aufgaben!</p>
        </div>
        <Badge variant={variant}>
          {PROVIDER_LABEL[activeProvider] ?? '⚡ Offline'}
        </Badge>
      </div>

      {/* Provider-Info wenn Ollama oder Offline */}
      {activeProvider === 'ollama' && (
        <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-800">
          💻 <strong>Ollama aktiv:</strong> Deine Fragen werden lokal verarbeitet — keine Daten verlassen dein Gerät.
        </div>
      )}
      {activeProvider === 'offline' && providerStatus !== null && (
        <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
          ⚡ <strong>Offline-Modus:</strong> Kein KI-Provider verfügbar. Regelbasierte Antworten.
          {!providerStatus.providers.ollama && (
            <span className="block mt-1">Tipp: Installiere <strong>Ollama</strong> für lokale KI-Unterstützung.</span>
          )}
        </div>
      )}

      {/* Chat Messages */}
      <Card padding="none" className="mb-4 overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={['flex', msg.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}
            >
              <div
                className={[
                  'max-w-xs sm:max-w-sm rounded-2xl px-4 py-2.5 text-sm',
                  msg.role === 'user'
                    ? 'bg-[var(--color-primary)] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm',
                ].join(' ')}
              >
                {msg.role === 'assistant' && (
                  <span className="font-bold text-xs block mb-0.5 text-gray-500">Finn 🦊</span>
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-2.5 text-sm rounded-bl-sm">
                <span className="font-bold text-xs block mb-0.5 text-gray-500">Finn 🦊</span>
                <span className="animate-pulse">Denkt nach...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </Card>

      {/* Input */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="Deine Mathe-Frage an Finn..."
            disabled={isLoading}
            aria-label="Nachricht an Tutor"
          />
        </div>
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          loading={isLoading}
          size="md"
        >
          Senden
        </Button>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Finn beantwortet nur Mathe-Fragen 📐
      </p>
    </PageWrapper>
  );
}
