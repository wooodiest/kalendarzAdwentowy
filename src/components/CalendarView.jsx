import { useState, useEffect } from 'react';
import DayTile from './DayTile';
import DayModal from './DayModal';
import { isUnlocked } from '../utils/dateUtils';

export default function CalendarView({ classId, tasks }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [mockDay, setMockDay] = useState('');

  const getNowForDebug = () => {
    if (!debugMode || !mockDay) return new Date();

    const currentYear = new Date().getFullYear();
    const dayNumber = Number(mockDay);
    return new Date(currentYear, 11, dayNumber);
  };

  const handleDayClick = (day) => {
    const now = getNowForDebug();
    if (isUnlocked(day, now)) {
      setSelectedDay(day);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDay(null);
  };

  const currentYear = new Date().getFullYear();
  const startOfDecember = new Date(currentYear, 11, 1);
  const firstDayIndex = (startOfDecember.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday

  // 4 tygodnie (4 x 7 = 28) – od 1 do 28 grudnia
  const weeks = Array.from({ length: 3 }, () => Array(7).fill(null));

  for (let day = 1; day <= 21; day += 1) {
    const positionIndex = firstDayIndex + (day - 1);
    const weekIndex = Math.floor(positionIndex / 7);
    const dayIndex = positionIndex % 7;

    if (weekIndex < weeks.length) {
      weeks[weekIndex][dayIndex] = day;
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 sm:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-winter-dark mb-3">
          Kalendarz Adwentowy - Klasa {classId}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Kliknij na odblokowany dzień, aby zobaczyć zadanie matematyczne
        </p>

        {import.meta.env.DEV && (
          <div className="mt-4 flex flex-col items-center gap-2 px-3 py-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
            <div className="inline-flex items-center gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={debugMode}
                  onChange={(e) => setDebugMode(e.target.checked)}
                />
                <span>Tryb testowy</span>
              </label>
            </div>

            {debugMode && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span>Symuluj dzień grudnia:</span>
                <select
                  value={mockDay}
                  onChange={(e) => setMockDay(e.target.value)}
                  className="border border-yellow-300 rounded px-2 py-1 bg-white text-yellow-900 text-sm"
                >
                  <option value="">(dzisiajsza data)</option>
                  {Array.from({ length: 21 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d} grudnia
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-full bg-white/80 rounded-3xl shadow-lg p-6 sm:p-8">
        <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-4 text-xs sm:text-sm font-semibold text-center text-gray-600">
          <div className="uppercase">Pn</div>
          <div className="uppercase">Wt</div>
          <div className="uppercase">Śr</div>
          <div className="uppercase">Cz</div>
          <div className="uppercase">Pt</div>
          <div className="uppercase text-gray-400">So</div>
          <div className="uppercase text-gray-400">Nd</div>
        </div>

        <div className="grid grid-cols-7 gap-2.5 sm:gap-3.5">
          {weeks.map((week, wIndex) =>
            week.map((day, dIndex) => {
              const isWeekendCol = dIndex >= 5; // So, Nd

              // Puste miejsca przed 1 grudnia – przezroczyste
              if (!day) {
                return (
                  <div
                    key={`empty-${wIndex}-${dIndex}`}
                    className="aspect-square rounded-lg bg-transparent"
                  />
                );
              }

              const isAfter24 = day > 24;
              const isNonTaskDay = isWeekendCol || isAfter24;
              const now = getNowForDebug();
              const unlocked = !isNonTaskDay && day <= 24 && isUnlocked(day, now);

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

