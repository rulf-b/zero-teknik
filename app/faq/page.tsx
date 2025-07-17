import Link from 'next/link';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'TV ekranım kırıldı, tamir mi edilmeli yoksa değişmeli mi?',
    answer: 'Çoğu durumda kırık ekranlar tamir edilemez, ekran değişimi gerekir. Ancak panelin tipi ve hasarın boyutuna göre en uygun çözümü uzmanlarımız belirler.'
  },
  {
    question: 'TV tamiri ne kadar sürer?',
    answer: 'Çoğu TV ekran değişimi ve tamiri aynı gün içinde tamamlanır. Parça temini veya özel arızalarda süre değişebilir.'
  },
  {
    question: 'Tamir sonrası garanti veriyor musunuz?',
    answer: 'Evet, tüm ekran değişimi ve tamir işlemlerimizde 12 ay garanti sunuyoruz.'
  },
  {
    question: 'TV ekranımda ses var ama görüntü yok, neden olabilir?',
    answer: 'Bu sorun genellikle arka aydınlatma arızası, panel veya anakart kaynaklı olabilir. Uzman teşhisi gereklidir.'
  },
  {
    question: 'TV ekran değişimi fiyatları neye göre belirleniyor?',
    answer: 'Fiyatlar; TV\'nin marka/modeli, ekran boyutu, panel tipi ve yedek parça maliyetine göre belirlenir. Net fiyat için ücretsiz teklif alabilirsiniz.'
  }
];

export default function FAQPage() {
  return (
    <section className="pt-40 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">Sıkça Sorulan Sorular</h1>
        <div className="space-y-6 mb-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{faq.question}</h2>
              <p className="text-gray-700 text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Ana Sayfaya Dön</Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 