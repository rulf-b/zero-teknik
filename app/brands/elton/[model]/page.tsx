import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import Image from "next/image";

export default function EltonModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Elton" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">{modelData.model}</h1>
            <p className="text-lg text-gray-700 mb-6">{modelData.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-6">${modelData.price}</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={modelData.image}
              alt={modelData.model}
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 