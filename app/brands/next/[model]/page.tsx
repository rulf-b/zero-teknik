import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import Image from "next/image";

export default function NextModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Next" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">{modelData.model}</h1>
            <p className="text-lg text-gray-700 mb-6">{modelData.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-6">${modelData.price}</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
          <div>
            <Image
              src={modelData.image}
              alt={modelData.model}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modelData.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-green-500 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-6-6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-6 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(modelData.specifications).map(([key, value]) => (
              <div key={key}>
                <p className="font-semibold">{key}:</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 