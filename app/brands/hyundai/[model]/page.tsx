import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import Image from "next/image";

export default function HyundaiModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Hyundai" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{modelData.brand} {modelData.model}</h1>
        <p className="text-lg text-gray-800 mb-6">{modelData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <ul className="list-disc list-inside text-lg text-gray-800">
              <li>Brand: {modelData.brand}</li>
              <li>Model: {modelData.model}</li>
              <li>Screen Size: {modelData.screenSize}</li>
              <li>Resolution: {modelData.resolution}</li>
              <li>Refresh Rate: {modelData.refreshRate}</li>
              <li>Response Time: {modelData.responseTime}</li>
              <li>Contrast Ratio: {modelData.contrastRatio}</li>
              <li>Brightness: {modelData.brightness}</li>
              <li>Color Support: {modelData.colorSupport}</li>
              <li>Ports: {modelData.ports.join(", ")}</li>
              <li>Weight: {modelData.weight}</li>
              <li>Dimensions: {modelData.dimensions}</li>
              <li>Warranty: {modelData.warranty}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside text-lg text-gray-800">
              {modelData.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={modelData.imageUrl}
            alt={`${modelData.brand} ${modelData.model}`}
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Price</h2>
          <p className="text-3xl font-bold text-blue-600">${modelData.price}</p>
        </div>
      </div>
    </div>
  );
} 