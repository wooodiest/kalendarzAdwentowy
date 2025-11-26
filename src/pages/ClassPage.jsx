import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CalendarView from '../components/CalendarView';

const classDataModules = import.meta.glob('../data/klasa*/data.json', {
  eager: true,
});

const classDataById = Object.entries(classDataModules).reduce(
  (acc, [path, mod]) => {
    const match = path.match(/..\/data\/(klasa[^/]+)\/data\.json$/);
    if (!match) return acc;
    const [, classKey] = match;
    acc[classKey] = mod.default ?? mod;
    return acc;
  },
  {},
);

export default function ClassPage() {
  const { classId } = useParams();
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate loading data (in a real app, this might be an API call)
    setTimeout(() => {
      const data = classDataById[classId];
      setTasks(data || null);
      setLoading(false);
    }, 100);
  }, [classId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  if (!tasks) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-red-600">Nie znaleziono klasy: {classId}</div>
      </div>
    );
  }

  return <CalendarView classId={classId} tasks={tasks} />;
}

