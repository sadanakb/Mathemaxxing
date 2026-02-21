import type { UserProgress } from '@/lib/curriculum/types';
import { getTopicDetails, getTroubleSpots } from './parent-report';

export type Recommendation = {
  type: 'strength' | 'weakness' | 'suggestion';
  title: string;
  description: string;
  icon: string;
};

export function generateRecommendations(progress: UserProgress): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const details = getTopicDetails(progress);
  const troubles = getTroubleSpots(progress);

  // Strengths
  const mastered = details.filter(t => t.masteryLevel === 'mastered');
  if (mastered.length > 0) {
    recommendations.push({
      type: 'strength',
      title: `${mastered.length} Themen gemeistert`,
      description: `Dein Kind hat ${mastered.length} Themen erfolgreich abgeschlossen. Weiter so!`,
      icon: '\u2B50',
    });
  }

  // Streak
  if (progress.streakDays >= 7) {
    recommendations.push({
      type: 'strength',
      title: `${progress.streakDays}-Tage-Streak`,
      description: 'Beeindruckende Konstanz beim Lernen!',
      icon: '\uD83D\uDD25',
    });
  }

  // Weaknesses
  if (troubles.length > 0) {
    const topicNames = troubles.slice(0, 3).map(t => t.topicId).join(', ');
    recommendations.push({
      type: 'weakness',
      title: `${troubles.length} Problemthemen`,
      description: `Diese Themen brauchen mehr \u00DCbung: ${topicNames}`,
      icon: '\u26A0\uFE0F',
    });
  }

  // Suggestions
  const totalAttempts = details.reduce((sum, t) => sum + t.attempts, 0);
  if (totalAttempts < 50) {
    recommendations.push({
      type: 'suggestion',
      title: 'Mehr \u00FCben',
      description: 'Regelm\u00E4\u00DFiges \u00DCben (15-20 Minuten t\u00E4glich) verbessert die Ergebnisse deutlich.',
      icon: '\uD83D\uDCA1',
    });
  }

  const notStarted = details.filter(t => t.masteryLevel === 'not-started');
  if (notStarted.length > 5) {
    recommendations.push({
      type: 'suggestion',
      title: 'Neue Themen entdecken',
      description: `Es gibt noch ${notStarted.length} unentdeckte Themen. Schau mal in die Lernkarte!`,
      icon: '\uD83D\uDDFA\uFE0F',
    });
  }

  return recommendations;
}
