'use client';

import { useEffect } from 'react';

export function DragDropInit() {
  useEffect(() => {
    import('mobile-drag-drop').then((mod) => {
      mod.polyfill({ holdToDrag: 300 });
    });
  }, []);
  return null;
}
