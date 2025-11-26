import { getTaskImage } from '../utils/imageRegistry';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function DayModal({ show, onClose, task, day, classId }) {
  if (!show || !task) return null;

  const imageUrl = getTaskImage(classId, day);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-winter-dark/70 backdrop-blur-sm px-2 sm:px-4"
      onClick={onClose}
    >
      <div 
        className="inline-block bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl border border-winter-light"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-winter-blue to-winter-dark text-white px-4 sm:px-2 py-3 sm:py-2 flex items-center justify-between">
          <span className="text-xl font-bold">
            {task.title}
          </span>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white w-10 h-10 hover:bg-white/10 rounded transition-colors flex items-center justify-center shrink-0"
            aria-label="Zamknij"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-white p-3 sm:p-4">
          <div className="flex justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Zadanie dla dnia ${day}`}
                className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-lg bg-white"
              />
            ) : (
              <div className="px-6 py-10 text-center text-gray-600">
                <p className="font-semibold mb-2">
                  Brak obrazka z zadaniem dla tego dnia.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

