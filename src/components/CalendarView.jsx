import { useState, useEffect } from 'react';
import DayTile from './DayTile';
import DayModal from './DayModal';
import { isUnlocked } from '../utils/dateUtils';

export default function CalendarView({ classId, tasks }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
        {days.map((day) => {
          const unlocked = isUnlocked(day);
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

