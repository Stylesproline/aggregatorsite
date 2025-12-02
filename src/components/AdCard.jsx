import Link from 'next/link';

export default function AdCard({ ad }) {
  return (
    <Link href={`/ad/${ad.id}`} passHref>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer">
        {ad.image && (
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-40 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{ad.title}</h3>
          <p className="text-gray-600 text-sm mt-1 truncate">{ad.description}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">{ad.price} руб.</span>
            <span className="text-sm text-gray-500">{ad.date}</span>
          </div>
          <div className="mt-2 text-xs bg-blue-100 text-blue-800 inline-block px-2 py-1 rounded">
            {ad.category}
          </div>
        </div>
      </div>
    </Link>
  );
}
