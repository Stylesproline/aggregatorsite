export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Агрегатор Объявлений</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Главная</a></li>
            <li><a href="#" className="hover:underline">Добавить объявление</a></li>
            <li><a href="#" className="hover:underline">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
