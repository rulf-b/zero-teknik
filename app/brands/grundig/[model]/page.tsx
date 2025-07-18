import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import Image from "next/image";

export default function GrundigModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Grundig" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">{modelData.brand} {modelData.model}</h1>
            <p className="text-lg text-gray-700 mb-6">{modelData.description}</p>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-blue-600 mr-2">{modelData.price}</span>
              <span className="text-lg text-gray-600 line-through">${modelData.originalPrice}</span>
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={modelData.image}
              alt={modelData.model}
              width={500}
              height={500}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(modelData.specs).map(([key, value]) => (
              <div key={key}>
                <span className="font-semibold text-gray-700">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Average Rating: {modelData.rating}</h3>
            <p>{modelData.reviews} reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
} 