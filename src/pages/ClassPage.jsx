import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CalendarView from '../components/CalendarView';
import class1Data from '../data/class1.json';
import class4Data from '../data/class4.json';

export default function ClassPage() {
  const { classId } = useParams();
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate loading data (in a real app, this might be an API call)
    setTimeout(() => {
      if (classId === 'class1') {
        setTasks(class1Data);
      } else if (classId === 'class4') {
        setTasks(class4Data);
      } else {
        setTasks(null);
      }
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

