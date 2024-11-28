import BookCard from "@/components/book-card";
import CreateBookForm from "@/components/book-form";
import { Book } from "@/data";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/books");
  const data: Book[] = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 gap-4 py-8">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Book Library</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your book collection with ease!
          </p>
        </header>

        {/* Create Book Form */}
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <CreateBookForm />
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((book) => (
            <BookCard
              key={book.id}
              author={book.author}
              imgUrl={book.imgUrl}
              title={book.title}
              id={book.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
