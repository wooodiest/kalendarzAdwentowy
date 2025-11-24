import { Modal } from 'flowbite-react';

export default function DayModal({ show, onClose, task, day }) {
  if (!task) return null;

  return (
    <Modal show={show} onClose={onClose} size="md">
      <Modal.Header className="bg-gradient-to-r from-winter-blue to-winter-dark text-white">
        <span className="text-xl font-bold">Dzień {day} - {task.title}</span>
      </Modal.Header>
      <Modal.Body className="bg-winter-light">
        <div className="space-y-4">
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-winter-dark mb-4">
              {task.content}
            </p>
            {task.image && (
              <img 
                src={task.image} 
                alt={`Task for day ${day}`}
                className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-winter-light">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-winter-blue text-white rounded-lg hover:bg-winter-dark transition-colors font-semibold"
        >
          Zamknij
        </button>
      </Modal.Footer>
    </Modal>
  );
}

