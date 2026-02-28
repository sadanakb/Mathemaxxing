import type { StoryBeat } from '@/lib/story/types';
import { registerStoryBeats } from '@/lib/story/story-engine';

/**
 * Story beats for the K3 Forscher (scientist/lab) world.
 * Simple German text for 8-year-old children.
 */
export const FORSCHER_BEATS: StoryBeat[] = [
  {
    id: 'forscher-1',
    worldId: 'forscher',
    triggerAfterMastered: 4,
    title: 'Das Labor oeffnet seine Tueren!',
    text:
      'Du betrittst ein faszinierendes Labor voller Wissenschaft! Ueberall brodeln bunte Reagenzglaeser, Mikroskope glitzern und es riecht nach spannenden Experimenten. Willkommen in der Welt der Forscher — hier wird Mathematik lebendig!',
    illustrationPath: '/worlds/forscher/story/labor.webp',
    finnMood: 'happy',
  },
  {
    id: 'forscher-2',
    worldId: 'forscher',
    triggerAfterMastered: 7,
    title: 'Der erste Versuch gelingt!',
    text:
      'Dein erstes Experiment ist ein riesiger Erfolg! Die gluehende Potion in deinem Reagenzglas wird rot, dann blau, dann gold — die ganze Laborwerkstatt strahlt! Deine Forscherkolleg*innen jubeln dir zu. Du bist ein echter Wissenschaftler!',
    illustrationPath: '/worlds/forscher/story/versuch.webp',
    finnMood: 'encouraging',
  },
  {
    id: 'forscher-3',
    worldId: 'forscher',
    triggerAfterMastered: 10,
    title: 'Das Mikroskop enthuellt Geheimnisse',
    text:
      'Du schaust durchs maechtiges Mikroskop und traust deinen Augen kaum! In den Kristallen entdeckst du verborgene Zahlenmuster — Dreiecke, Quadrate und magische Formen. Die Natur selbst ist ein Meisterwerk der Mathematik!',
    illustrationPath: '/worlds/forscher/story/mikroskop.webp',
    finnMood: 'happy',
  },
  {
    id: 'forscher-4',
    worldId: 'forscher',
    triggerAfterMastered: 14,
    title: 'Die grosse Entdeckung!',
    text:
      'Du hast eine bahnbrechende Entdeckung gemacht! Deine Formel loest das groesste Raetsel des Labors. Das ganze Team springt auf und feiert dich wie einen Star. Du bist wirklich eine Wissenschaftlerin oder ein Wissenschaftler von Rang und Namen!',
    illustrationPath: '/worlds/forscher/story/entdeckung.webp',
    finnMood: 'celebrating',
  },
  {
    id: 'forscher-5',
    worldId: 'forscher',
    triggerAfterMastered: 17,
    title: 'Professor der Mathematik!',
    text:
      'Du hast alle 17 Experimente gemeistert — du bist jetzt ein echter Professor der Mathematik! Das Labor vergibt dir ein goldenes Diplom und eine mystische Forscherroben. Die ganze Welt staunt auf deine mathematischen Superkraefte!',
    illustrationPath: '/worlds/forscher/story/professor.webp',
    finnMood: 'celebrating',
  },
];

registerStoryBeats('forscher', FORSCHER_BEATS);
