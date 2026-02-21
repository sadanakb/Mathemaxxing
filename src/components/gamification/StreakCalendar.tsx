'use client';

type StreakCalendarProps = {
  activeDates: string[];   // ISO-Strings YYYY-MM-DD
  mode?: '7d' | '30d';
};

function getDateRange(days: number): string[] {
  const result: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

const WEEKDAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export function StreakCalendar({ activeDates, mode = '7d' }: StreakCalendarProps) {
  const days = mode === '7d' ? 7 : 30;
  const dateRange = getDateRange(days);
  const activeSet = new Set(activeDates);
  const today = new Date().toISOString().slice(0, 10);

  if (mode === '7d') {
    return (
      <div>
        <div className="flex justify-between gap-1">
          {dateRange.map((date, i) => {
            const isActive = activeSet.has(date);
            const isToday = date === today;
            const weekday = WEEKDAY_LABELS[new Date(date + 'T12:00:00').getDay() === 0 ? 6 : new Date(date + 'T12:00:00').getDay() - 1];

            return (
              <div key={date} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs text-gray-400">{weekday}</span>
                <div
                  className={[
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    isToday ? 'ring-2 ring-[var(--color-primary)] ring-offset-1' : '',
                    isActive
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-400',
                  ].join(' ')}
                  title={date}
                  aria-label={`${date}: ${isActive ? 'gelernt' : 'nicht gelernt'}`}
                >
                  {isActive ? '✓' : new Date(date + 'T12:00:00').getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 30-Tage-Gitter (5 Wochen × 6 Reihen oder 6 × 5)
  const weeks: string[][] = [];
  for (let i = 0; i < dateRange.length; i += 7) {
    weeks.push(dateRange.slice(i, i + 7));
  }

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="w-6 text-center text-xs text-gray-400 flex-1">{d}</div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="flex gap-1 mb-1">
          {week.map((date) => {
            const isActive = activeSet.has(date);
            const isToday = date === today;
            return (
              <div
                key={date}
                className={[
                  'flex-1 h-6 rounded-sm transition-all',
                  isToday ? 'ring-2 ring-[var(--color-primary)] ring-offset-0' : '',
                  isActive
                    ? 'bg-[var(--color-primary)] opacity-90'
                    : 'bg-gray-100',
                ].join(' ')}
                title={`${date}: ${isActive ? 'gelernt' : 'nicht gelernt'}`}
                aria-label={`${date}: ${isActive ? 'gelernt' : 'nicht gelernt'}`}
              />
            );
          })}
          {/* Padding wenn Woche kürzer */}
          {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, k) => (
            <div key={`pad-${k}`} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
