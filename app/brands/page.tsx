import Link from 'next/link';
import Image from 'next/image';
import brandsData from '../../data/brands.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markalar | Ekran Sitesi',
  description: 'Ekran Sitesi olarak desteklediğimiz LED ekran ve dijital tabela markalarını inceleyin.',
  keywords: 'markalar, ekran sitesi, LED ekran markaları, dijital tabela markaları',
  openGraph: {
    title: 'Markalar | Ekran Sitesi',
    description: 'Desteklediğimiz LED ekran ve dijital tabela markalarını keşfedin.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markalar | Ekran Sitesi',
    description: 'Desteklediğimiz LED ekran ve dijital tabela markalarını keşfedin.',
  },
};

export default function BrandsPage() {
  const brands = brandsData as { name: string; models?: string[]; logo?: string }[];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-4">TV Markaları</h1>
      <p className="text-center mb-8 text-lg text-gray-600">
        Tüm büyük TV markaları için uzman onarım ve ekran değişimi hizmeti. Markanızı seçerek detaylı bilgi ve hizmetlerimize ulaşabilirsiniz.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => {
          // Özel durumlar için URL mapping
          const urlMapping: { [key: string]: string } = {
            'Arçelik': 'arcelik',
            'Hi-Level': 'hi-level',
            'SEG': 'seg'
          };
          
          const urlSlug = urlMapping[brand.name] || brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          
          return (
            <Link key={brand.name} href={`/brands/${urlSlug}`} className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <Image src={brand.logo || '/brands/placeholder.svg'} alt={brand.name} width={80} height={80} />
              </div>
              <span className="text-lg font-semibold text-center">{brand.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 