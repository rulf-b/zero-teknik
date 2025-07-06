import Link from "next/link";
import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';
import { Metadata } from 'next';

const serviceAreas = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Kocaeli', 'Mersin', 'Kayseri', 'Eskişehir'
];

const services = [
  {
    name: 'TV Ekran Değişimi',
    description: 'Kırık veya hasarlı ekranlar için orijinal parça değişimi',
    price: "₺800'den itibaren",
    duration: '2-4 saat'
  },
  {
    name: 'LED Panel Tamiri',
    description: 'Arızalı arka aydınlatma ve LED şerit onarımı',
    price: "₺500'den itibaren",
    duration: '1-3 saat'
  },
  {
    name: 'Anakart Tamiri',
    description: 'Gelişmiş anakart ve elektronik kart onarımları',
    price: "₺600'den itibaren",
    duration: '2-5 saat'
  }
];

const whyChooseUs = [
  'Aynı gün servis imkanı',
  'Ücretsiz alım ve teslimat',
  'Tüm büyük TV markaları desteklenir',
  '12 ay garanti',
  'Sertifikalı ve deneyimli teknisyenler',
  'Şeffaf fiyatlandırma, gizli maliyet yok'
];

export const metadata: Metadata = {
  title: 'Hizmet Bölgeleri | Ekran Sitesi',
  description: 'Ekran Sitesi olarak hizmet verdiğimiz bölgeleri ve şehirleri inceleyin. Türkiye genelinde LED ekran ve dijital tabela çözümleri.',
  keywords: 'hizmet bölgeleri, ekran sitesi, LED ekran, dijital tabela, şehirler',
  openGraph: {
    title: 'Hizmet Bölgeleri | Ekran Sitesi',
    description: 'Türkiye genelinde LED ekran ve dijital tabela çözümlerimiz için hizmet verdiğimiz bölgeler.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hizmet Bölgeleri | Ekran Sitesi',
    description: 'Türkiye genelinde LED ekran ve dijital tabela çözümlerimiz için hizmet verdiğimiz bölgeler.',
  },
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20 pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-blue-600 font-semibold">Lokasyonlar</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Türkiye Genelinde TV Tamir Hizmetleri
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Türkiye genelinde profesyonel TV ekran değişimi ve tamir hizmetleri. Aynı gün servis, uzman teknisyenler ve tüm onarımlarda 12 ay garanti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/quote">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                Ücretsiz Fiyat Teklifi Al
              </Button>
            </Link>
            <a href="tel:+905551234567">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hizmet Verdiğimiz Şehirler
            </h2>
            <p className="text-xl text-gray-600">
              Türkiye'nin birçok ilinde TV tamir hizmeti sunuyoruz
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 p-4 text-center hover:shadow-lg transition-shadow">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">{area}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Şehrinizi listede göremiyor musunuz? Çevre illere de hizmet veriyoruz.
            </p>
            <a href="tel:+905551234567">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Uygunluk İçin Ara
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600">
              Tüm ihtiyaçlarınız için kapsamlı TV tamir çözümleri
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Başlangıç Fiyatı</div>
                    <div className="text-lg font-bold text-blue-600">{service.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Süre</div>
                    <div className="text-lg font-bold text-green-600">{service.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <ul className="text-lg text-gray-700 list-disc list-inside max-w-xl mx-auto">
              {whyChooseUs.map((item, i) => (
                <li key={i} className="mb-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 