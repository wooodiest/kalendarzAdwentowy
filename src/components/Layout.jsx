import ClassSelector from './ClassSelector';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-winter-light via-white to-winter-light">
      <header className="bg-gradient-to-r from-winter-blue to-winter-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            📅 Kalendarz Adwentowy - Zadania Matematyczne
          </h1>
          <ClassSelector />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="mt-12 py-6 text-center text-gray-600 border-t border-gray-200">
        <p className="text-sm">
          © 2025 Kalendarz Adwentowy - Matematyka dla Klas 1 i 4
        </p>
      </footer>
    </div>
  );
}

