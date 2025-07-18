import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import Image from "next/image";

export default function HiLevelModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Hi-Level" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{modelData.brand} {modelData.model}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <ul className="list-disc list-inside">
              <li>Brand: {modelData.brand}</li>
              <li>Model: {modelData.model}</li>
              <li>Screen Size: {modelData.screenSize}</li>
              <li>Resolution: {modelData.resolution}</li>
              <li>Refresh Rate: {modelData.refreshRate}</li>
              <li>Technology: {modelData.technology}</li>
              <li>Price: {modelData.price}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Image</h2>
            <Image
              src={modelData.image}
              alt={`${modelData.brand} ${modelData.model}`}
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 