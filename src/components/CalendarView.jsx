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

  const days = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-winter-dark mb-2">
          Kalendarz Adwentowy - Klasa {classId}
        </h2>
        <p className="text-gray-600">
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
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((d) => (
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

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
        {days.map((day) => {
          const now = getNowForDebug();
          const unlocked = isUnlocked(day, now);
          return (
            <DayTile
              key={day}
              day={day}
              onClick={() => handleDayClick(day)}
              isUnlocked={unlocked}
            />
          );
        })}
      </div>

      {selectedDay && tasks[selectedDay] && (
        <DayModal
          show={showModal}
          onClose={handleCloseModal}
          task={tasks[selectedDay]}
          day={selectedDay}
        />
      )}
    </div>
  );
}

