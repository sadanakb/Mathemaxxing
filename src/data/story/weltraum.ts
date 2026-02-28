import type { StoryBeat } from '@/lib/story/types';
import { registerStoryBeats } from '@/lib/story/story-engine';

/**
 * Story beats for the K4 Weltraum (space/planet) world.
 * Simple German text for 9-year-old children.
 */
export const WELTRAUM_BEATS: StoryBeat[] = [
  {
    id: 'weltraum-1',
    worldId: 'weltraum',
    triggerAfterMastered: 4,
    title: 'Start der Weltraum-Mission!',
    text:
      'Die Rakete zischt in den Himmel! Deine Bauchgefuehle tanzen vor Aufregung, waehrend die Erde immer kleiner wird. Sterne funkeln ueberall um dich herum — dein Abenteuer im Weltall hat begonnen!',
    illustrationPath: '/worlds/weltraum/story/rakete.webp',
    finnMood: 'happy',
  },
  {
    id: 'weltraum-2',
    worldId: 'weltraum',
    triggerAfterMastered: 7,
    title: 'Der erste Planet!',
    text:
      'Vor dir erscheint ein geheimnisvoller roter Planet! Seine Oberflaeche ist voller Mathe-Raesel und bunter Zahlenfelder. Du landest sanft ab und erkennst: Jeder Kratzer auf dem Planeten ist eine geloeste Aufgabe von dir!',
    illustrationPath: '/worlds/weltraum/story/planet-rot.webp',
    finnMood: 'encouraging',
  },
  {
    id: 'weltraum-3',
    worldId: 'weltraum',
    triggerAfterMastered: 10,
    title: 'Die Raumstation',
    text:
      'Eine gigantische Raumstation schwebt vor dir! In den Fenstern winken andere Mathe-Forscher und freuen sich, dich zu sehen. Du dockst an und wirst mit Jubel begruessungen — du wirst mit jedem Tag ein besserer Forscher!',
    illustrationPath: '/worlds/weltraum/story/raumstation.webp',
    finnMood: 'happy',
  },
  {
    id: 'weltraum-4',
    worldId: 'weltraum',
    triggerAfterMastered: 14,
    title: 'Der Asteroidenguertel',
    text:
      'Tausende Asteroiden fliegen um dich herum — doch keine Angst! Jeder Asteroid ist eine Aufgabe, die du bereits meisterlich geloest hast. Du navigierst geschickt hindurch und fuellst dich wie ein echter Weltall-Pilot!',
    illustrationPath: '/worlds/weltraum/story/asteroiden.webp',
    finnMood: 'celebrating',
  },
  {
    id: 'weltraum-5',
    worldId: 'weltraum',
    triggerAfterMastered: 17,
    title: 'Kommandant des Universums!',
    text:
      'Du hast die ganze Galaxis erforscht — herzlichen Glueckwunsch! Du bist jetzt der Kommandant des gesamten Mathe-Universums! Die Sterne leuchten in deinen Lieblingsfarben und das ganze Weltall jubelt dir zu!',
    illustrationPath: '/worlds/weltraum/story/kommandant-universum.webp',
    finnMood: 'celebrating',
  },
];

registerStoryBeats('weltraum', WELTRAUM_BEATS);
