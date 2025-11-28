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
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1">{day}</div>
          {isWeekend && (
            <div className="text-sm mt-1 opacity-0 select-none">
              placeholder
            </div>
          )}
          {!isWeekend && !unlocked && (
            <div className="flex flex-col items-center mt-0.5 sm:mt-1">
              <LockClosedIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mb-0.5 sm:mb-1" />
              <span className="text-xs"></span>
            </div>
          )}
          {!isWeekend && unlocked && (
            <div className="text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 opacity-90">Kliknij!</div>
          )}
        </>
      )}
    </div>
  );
}

