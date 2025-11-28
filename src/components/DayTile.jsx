import { LockClosedIcon } from '@heroicons/react/24/solid';

export default function DayTile({ day, onClick, isUnlocked: unlocked, isWeekend = false }) {
  const baseClasses =
    'relative aspect-square rounded-lg sm:rounded-xl shadow-md transition-all duration-300 flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5';

  const unlockedClasses = unlocked
    ? 'bg-gradient-to-br from-winter-blue to-winter-dark text-white cursor-pointer hover:scale-105 hover:shadow-xl transform hover:from-winter-blue-light hover:to-winter-blue-dark'
    : 'bg-winter-light text-winter-dark/60 cursor-not-allowed border border-winter-light';

  const clickable = unlocked && !isWeekend;

  return (
    <div
      className={`${baseClasses} ${unlockedClasses}`}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : -1}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {day && (
        <>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 leading-none">{day}</div>
          <div className="h-[20px] sm:h-[24px] md:h-[28px] flex items-center justify-center">
            {isWeekend ? (
              <div className="text-sm opacity-0 select-none pointer-events-none">
                placeholder
              </div>
            ) : !unlocked ? (
              <div className="flex flex-col items-center justify-center">
                <LockClosedIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
            ) : (
              <div className="text-[10px] sm:text-xs md:text-sm opacity-90 leading-tight">Kliknij!</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

