import { useState } from 'react';
import DayTile from './DayTile';
import DayModal from './DayModal';
import { isUnlocked, getCurrentDate } from '../utils/dateUtils';

export default function CalendarView({ classId, tasks }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal,   setShowModal]   = useState(false);

  const handleDayClick = (day) => {
    if (isUnlocked(day)) {
      setSelectedDay(day);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDay(null);
  };

  const calendarYear    = new Date().getFullYear();
  const startOfDecember = new Date(calendarYear, 11, 1);
  const firstDayIndex   = (startOfDecember.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday

  // 4 tygodnie (4 x 7 = 28) – od 1 do 28 grudnia
  const weeks = Array.from({ length: 4 }, () => Array(7).fill(null));

  for (let day = 1; day <= 28; day += 1) {
    const positionIndex = firstDayIndex + (day - 1);
    const weekIndex     = Math.floor(positionIndex / 7);
    const dayIndex      = positionIndex % 7;

    if (weekIndex < weeks.length) {
      weeks[weekIndex][dayIndex] = day;
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8">
      <div className="w-full bg-white/95 rounded-3xl shadow-xl p-6 sm:p-8 backdrop-blur-sm border border-winter-light">
        <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-4 text-xs sm:text-sm font-semibold text-center">
          <div className="uppercase text-winter-dark">Pn</div>
          <div className="uppercase text-winter-dark">Wt</div>
          <div className="uppercase text-winter-dark">Śr</div>
          <div className="uppercase text-winter-dark">Cz</div>
          <div className="uppercase text-winter-dark">Pt</div>
          <div className="uppercase text-gray-400">So</div>
          <div className="uppercase text-gray-400">Nd</div>
        </div>

        <div className="grid grid-cols-7 gap-2.5 sm:gap-3.5">
          {weeks.map((week, wIndex) =>
            week.map((day, dIndex) => {
              const isWeekendCol = dIndex >= 5; // So, Nd

              if (!day) {
                return (
                  <div
                    key={`empty-${wIndex}-${dIndex}`}
                    className="aspect-square rounded-lg bg-transparent"
                  />
                );
              }

              const isAfter24    = day > 24;
              const isNonTaskDay = isWeekendCol || isAfter24;
              const unlocked     = !isNonTaskDay && day <= 24 && isUnlocked(day);

              return (
                <DayTile
                  key={`${day}-${wIndex}-${dIndex}`}
                  day={day}
                  onClick={() => handleDayClick(day)}
                  isUnlocked={unlocked}
                  isWeekend={isNonTaskDay}
                />
              );
            }),
          )}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 mb-4 text-center"> 
        <p className="text-winter-dark/70 text-sm sm:text-base">
          Kliknij na odblokowany dzień, aby zobaczyć zadanie matematyczne
        </p>
      </div>

      {selectedDay && tasks[selectedDay] && (
        <DayModal
          show={showModal}
          onClose={handleCloseModal}
          task={tasks[selectedDay]}
          day={selectedDay}
          classId={classId}
        />
      )}
    </div>
  );
}

