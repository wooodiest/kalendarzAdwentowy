import { getTaskImage } from '../utils/imageRegistry';

export default function DayModal({ show, onClose, task, day, classId }) {
  if (!show || !task) return null;

  const imageUrl = getTaskImage(classId, day);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2 sm:px-4">
      <div className="inline-block bg-winter-light rounded-xl shadow-2xl overflow-hidden max-w-4xl">
        <div className="bg-gradient-to-r from-winter-blue to-winter-dark text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            Dzień {day} - {task.title}
          </span>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none px-2"
            aria-label="Zamknij"
          >
            ×
          </button>
        </div>
        <div className="bg-winter-light p-3 sm:p-4">
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
                  Brak obrazka dla tego dnia.
                </p>
                <p className="text-sm">
                  Upewnij się, że w folderze <code>data/{classId}</code> istnieje plik <code>{day}.png</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

