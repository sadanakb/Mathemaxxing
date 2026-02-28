import type { StoryBeat } from '@/lib/story/types';
import { registerStoryBeats } from '@/lib/story/story-engine';

/**
 * Story beats for the K2 Abenteuer (fairground/carnival) world.
 * Simple German text for 7-year-old children.
 */
export const ABENTEUER_BEATS: StoryBeat[] = [
  {
    id: 'abenteuer-1',
    worldId: 'abenteuer',
    triggerAfterMastered: 4,
    title: 'Willkommen auf dem Jahrmarkt!',
    text:
      'Du betrittst einen wunderbunten Jahrmarkt! Ueberall leuchten bunte Lichter, Musik spielt und es riecht nach Zuckerwatte. Vor dir warten spannende Fahrgeschaefte und lustige Spiele — los gehts auf dein grosses Abenteuer!',
    illustrationPath: '/worlds/abenteuer/story/jahrmarkt.webp',
    finnMood: 'happy',
  },
  {
    id: 'abenteuer-2',
    worldId: 'abenteuer',
    triggerAfterMastered: 7,
    title: 'Das Riesenrad dreht sich!',
    text:
      'Du steigst in das grosse Riesenrad ein und faehrst ganz nach oben. Von hier oben kannst du die ganze Mathewelt sehen — Zahlen und Formen soweit das Auge reicht! Der Wind pfeift und du lachst vor Freude.',
    illustrationPath: '/worlds/abenteuer/story/riesenrad.webp',
    finnMood: 'happy',
  },
  {
    id: 'abenteuer-3',
    worldId: 'abenteuer',
    triggerAfterMastered: 10,
    title: 'Die Achterbahn-Herausforderung',
    text:
      'Die Achterbahn rast durch aufregende Zahlentunnel! Kurven und Loopings machen die Fahrt zu einem echten Abenteuer. Du haeltst tapfer durch und loest jede Mathe-Aufgabe auf dem Weg — was fuer ein Held du bist!',
    illustrationPath: '/worlds/abenteuer/story/achterbahn.webp',
    finnMood: 'encouraging',
  },
  {
    id: 'abenteuer-4',
    worldId: 'abenteuer',
    triggerAfterMastered: 14,
    title: 'Der Hauptgewinn!',
    text:
      'Du hast das schwerste Spiel am Wurfstand gewonnen! Der Jahrmarkt-Chef ueberreicht dir den riesigen Hauptpreis — einen flauschigen Teddybaeren. Alle schauen staunend zu, denn du bist wirklich unschlagbar in Mathe!',
    illustrationPath: '/worlds/abenteuer/story/hauptgewinn.webp',
    finnMood: 'celebrating',
  },
  {
    id: 'abenteuer-5',
    worldId: 'abenteuer',
    triggerAfterMastered: 18,
    title: 'Koenig des Jahrmarkts!',
    text:
      'Du hast alle 18 Abenteuer gemeistert — du bist der Koenig des Jahrmarkts! Alle Fahrgeschaefte sind fuer dich freigeschaltet und der ganze Jahrmarkt feiert dich. Feuerwerk erleuchtet den Himmel zu deinen Ehren!',
    illustrationPath: '/worlds/abenteuer/story/koenig-jahrmarkt.webp',
    finnMood: 'celebrating',
  },
];

registerStoryBeats('abenteuer', ABENTEUER_BEATS);
