import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPreview = () => {
  const blogPosts = [
    {
      title: 'TV Ekranında Dikey Çizgiler Nasıl Giderilir?',
      excerpt: 'TV ekranında dikey çizgilerin yaygın nedenlerini ve ne zaman profesyonel tamir gerektiğini öğrenin. Sorun giderme adımlarını ve çözüm seçeneklerini anlatıyoruz.',
      image: 'https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Teknoloji Uzmanı',
      date: '15 Ocak 2025',
      slug: 'fix-vertical-lines-tv-screen',
      category: 'TV Tamir İpuçları'
    },
    {
      title: 'Samsung ve LG: Hangi TV Ekranı Daha Dayanıklı?',
      excerpt: 'Samsung ve LG TV ekranlarının dayanıklılığını ve ömrünü karşılaştırarak bilinçli bir tercih yapın. Detaylı analiz ve güvenilirlik.',
      image: 'https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Teknoloji Uzmanı',
      date: '12 Ocak 2025',
      slug: 'samsung-vs-lg-tv-screen-durability',
      category: 'TV Markaları'
    },
    {
      title: 'TV Anakartı Arızası Belirtileri',
      excerpt: 'TV anakartınızın profesyonel tamir veya değişim gerektirdiğini gösteren uyarı işaretlerini öğrenin. Yaygın semptomlar ve çözümler.',
      image: 'https://images.pexels.com/photos/4009604/pexels-photo-4009604.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Teknoloji Uzmanı',
      date: '10 Ocak 2025',
      slug: 'tv-motherboard-repair-signs',
      category: 'Donanım Sorunları'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            En Son TV Tamir İpuçları & Rehberler
          </h2>
          <p className="text-xl text-gray-600">
            TV tamiri hakkında uzman tavsiyeleri ve pratik bilgiler
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Devamını Oku
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 mb-12">
          <Link href="/blog">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Tüm Makaleleri Gör
            </Button>
          </Link>
        </div>

        {/* Sıkça Sorulan Sorular */}
        <div className="max-w-3xl mx-auto mt-24 mb-6">
          <h3 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">Sıkça Sorulan Sorular</h3>
          <div className="space-y-4">
            {/* SSS 1 */}
            <details className="bg-blue-50 rounded-lg p-4 group" open>
              <summary className="font-semibold text-lg text-blue-800 cursor-pointer flex items-center justify-between">
                TV ekranım kırıldı, tamir mi edilmeli yoksa değişmeli mi?
                <span className="ml-2 text-blue-400 group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <div className="mt-2 text-gray-700">
                Çoğu durumda kırık ekranlar tamir edilemez, ekran değişimi gerekir. Ancak panelin tipi ve hasarın boyutuna göre en uygun çözümü uzmanlarımız belirler.
              </div>
            </details>
            {/* SSS 2 */}
            <details className="bg-blue-50 rounded-lg p-4 group">
              <summary className="font-semibold text-lg text-blue-800 cursor-pointer flex items-center justify-between">
                TV tamiri ne kadar sürer?
                <span className="ml-2 text-blue-400 group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <div className="mt-2 text-gray-700">
                Çoğu TV ekran değişimi ve tamiri aynı gün içinde tamamlanır. Parça temini veya özel arızalarda süre değişebilir.
              </div>
            </details>
            {/* SSS 3 */}
            <details className="bg-blue-50 rounded-lg p-4 group">
              <summary className="font-semibold text-lg text-blue-800 cursor-pointer flex items-center justify-between">
                Tamir sonrası garanti veriyor musunuz?
                <span className="ml-2 text-blue-400 group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <div className="mt-2 text-gray-700">
                Evet, tüm ekran değişimi ve tamir işlemlerimizde 12 ay garanti sunuyoruz.
              </div>
            </details>
            {/* SSS 4 */}
            <details className="bg-blue-50 rounded-lg p-4 group">
              <summary className="font-semibold text-lg text-blue-800 cursor-pointer flex items-center justify-between">
                TV ekranımda ses var ama görüntü yok, neden olabilir?
                <span className="ml-2 text-blue-400 group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <div className="mt-2 text-gray-700">
                Bu sorun genellikle arka aydınlatma arızası, panel veya anakart kaynaklı olabilir. Uzman teşhisi gereklidir.
              </div>
            </details>
            {/* SSS 5 */}
            <details className="bg-blue-50 rounded-lg p-4 group">
              <summary className="font-semibold text-lg text-blue-800 cursor-pointer flex items-center justify-between">
                TV ekran değişimi fiyatları neye göre belirleniyor?
                <span className="ml-2 text-blue-400 group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <div className="mt-2 text-gray-700">
                Fiyatlar; TV'nin marka/modeli, ekran boyutu, panel tipi ve yedek parça maliyetine göre belirlenir. Net fiyat için ücretsiz teklif alabilirsiniz.
              </div>
            </details>
          </div>
          <div className="text-center mt-6">
            <Link href="/faq">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Tüm Soruları Gör
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;