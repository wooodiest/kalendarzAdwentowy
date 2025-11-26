import { LockClosedIcon } from '@heroicons/react/24/solid';

export default function DayTile({ day, onClick, isUnlocked: unlocked, isWeekend = false }) {
  const baseClasses =
    'relative aspect-square rounded-lg shadow-md transition-all duration-300 flex flex-col items-center justify-center p-4';

  const unlockedClasses = unlocked
    ? 'bg-gradient-to-br from-winter-blue to-winter-dark text-white cursor-pointer hover:scale-105 hover:shadow-xl transform'
    : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-70';

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
      {!isWeekend && (
        <>
          <div className="text-2xl font-bold mb-1">{day}</div>
          {!unlocked && (
            <div className="flex flex-col items-center mt-1">
              <LockClosedIcon className="w-5 h-5 mb-1" />
              <span className="text-xs"></span>
            </div>
          )}
          {unlocked && (
            <div className="text-sm mt-1 opacity-90">Kliknij!</div>
          )}
        </>
      )}
    </div>
  );
}

