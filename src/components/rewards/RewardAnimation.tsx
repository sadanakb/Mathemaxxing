'use client';

import React, { Suspense, useEffect } from 'react';

type WorldId = 'entdecker' | 'abenteuer' | 'forscher' | 'weltraum';
type RewardType = 'correct' | 'mastered' | 'perfect';

interface RewardAnimationProps {
  worldId: WorldId | null;
  type: RewardType;
  onDone: () => void;
}

const EntdeckerReward = React.lazy(() => import('./EntdeckerReward'));
const AbenteuerReward = React.lazy(() => import('./AbenteuerReward'));
const ForscherReward = React.lazy(() => import('./ForscherReward'));
const WeltraumReward = React.lazy(() => import('./WeltraumReward'));

function WorldReward({
  worldId,
  type,
  onDone,
}: {
  worldId: WorldId;
  type: RewardType;
  onDone: () => void;
}) {
  switch (worldId) {
    case 'entdecker':
      return <EntdeckerReward type={type} onDone={onDone} />;
    case 'abenteuer':
      return <AbenteuerReward type={type} onDone={onDone} />;
    case 'forscher':
      return <ForscherReward type={type} onDone={onDone} />;
    case 'weltraum':
      return <WeltraumReward type={type} onDone={onDone} />;
    default:
      return null;
  }
}

function NullReward({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    onDone();
  }, [onDone]);
  return null;
}

export default function RewardAnimation({ worldId, type, onDone }: RewardAnimationProps) {
  if (worldId === null) {
    return <NullReward onDone={onDone} />;
  }

  return (
    <Suspense fallback={null}>
      <WorldReward worldId={worldId} type={type} onDone={onDone} />
    </Suspense>
  );
}
