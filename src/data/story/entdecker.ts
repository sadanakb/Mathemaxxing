import type { StoryBeat } from '@/lib/story/types';
import { registerStoryBeats } from '@/lib/story/story-engine';

/**
 * Story beats for the K1 Entdecker (explorer/nature) world.
 * Simple German text for 6-year-old children.
 */
export const ENTDECKER_BEATS: StoryBeat[] = [
  {
    id: 'entdecker-1',
    worldId: 'entdecker',
    triggerAfterMastered: 3,
    title: 'Der magische Wald erwacht!',
    text:
      'Du betrittst einen wunderschönen, magischen Wald. Die Bäume leuchten in bunten Farben! Auf dem Boden siehst du einen Weg aus glitzernden Zahlen — er führt tief in den Wald hinein.',
    illustrationPath: '/worlds/entdecker/story/wald.webp',
    finnMood: 'happy',
  },
  {
    id: 'entdecker-2',
    worldId: 'entdecker',
    triggerAfterMastered: 6,
    title: 'Die Kristallhöhle',
    text:
      'Hinter einem großen Felsen findest du eine funkelnde Höhle. Überall hängen bunte Kristalle — rosa, blau und golden! In jedem Kristall steckt ein kleines Mathe-Geheimnis, das nur du lösen kannst.',
    illustrationPath: '/worlds/entdecker/story/kristallhoehle.webp',
    finnMood: 'encouraging',
  },
  {
    id: 'entdecker-3',
    worldId: 'entdecker',
    triggerAfterMastered: 9,
    title: 'Der reißende Fluss',
    text:
      'Du kommst an einen sprudelnden Fluss. Das Wasser rauscht laut! Mitten im Fluss liegen Trittsteinen mit Zahlen drauf. Kannst du die Aufgaben lösen und sicher ans andere Ufer springen?',
    illustrationPath: '/worlds/entdecker/story/fluss.webp',
    finnMood: 'happy',
  },
  {
    id: 'entdecker-4',
    worldId: 'entdecker',
    triggerAfterMastered: 12,
    title: 'Der verborgene Schatz',
    text:
      'Du hast eine alte Truhe gefunden, versteckt unter einem riesigen Baum! Die Truhe ist verschlossen — sie braucht einen geheimen Zahlencode. Du weißt die Antwort, denn du bist schon so gut in Mathe!',
    illustrationPath: '/worlds/entdecker/story/schatz.webp',
    finnMood: 'celebrating',
  },
  {
    id: 'entdecker-5',
    worldId: 'entdecker',
    triggerAfterMastered: 16,
    title: 'Der wahre Entdecker',
    text:
      'Du hast den ganzen magischen Wald erkundet! Von der Kristallhöhle bis zum Schatz — kein Weg war zu schwer für dich. Du bist jetzt ein echter Entdecker! Der Wald feiert mit dir!',
    illustrationPath: '/worlds/entdecker/story/entdecker-held.webp',
    finnMood: 'celebrating',
  },
];

registerStoryBeats('entdecker', ENTDECKER_BEATS);
