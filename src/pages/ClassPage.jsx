import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CalendarView from '../components/CalendarView';

export default function ClassPage() {
  const { classId } = useParams();
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const url = `/data/${classId}/data.json`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          setTasks(null);
          setLoading(false);
          return;
        }

        const json = await response.json();
        setTasks(json);
      } catch (e) {
        console.error('Błąd ładowania JSON:', e);
        setTasks(null);
      }

      setLoading(false);
    }

    loadData();
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
        <div className="text-xl text-red-600">
          Nie znaleziono klasy: {classId}
        </div>
      </div>
    );
  }

  return <CalendarView classId={classId} tasks={tasks} />;
}
