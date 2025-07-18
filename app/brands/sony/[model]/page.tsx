import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import Image from "next/image";

export default function SonyModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Sony" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">{/* ... same as Samsung ... */}</div>
  );
} 