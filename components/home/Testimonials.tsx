'use client';
import { Star, Quote, Tv2, Award, Shield, Calendar } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useCounter } from '@/hooks/use-counter';

const Testimonials = () => {
  // Orijinal listenizi buraya istediğiniz gibi ekleyin veya güncelleyin.
  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      location: 'İstanbul, Kadıköy',
      rating: 5,
      text: 'Samsung 55" TV ekranım tamamen kırılmıştı. TechFix Pro sadece 2 saatte mükemmel yeni bir panelle değiştirdi. Kalite harika ve fiyat çok makuldü.',
      service: 'TV Ekran Değişimi',
      date: '2 hafta önce'
    },
    {
      name: 'Elif Kaya',
      location: 'İstanbul, Şişli',
      rating: 5,
      text: 'LG TV\'mde arka aydınlatma sorunu vardı. Ekip profesyonel, dakik ve mükemmel şekilde tamir etti. 12 ay garanti içimi rahatlattı.',
      service: 'LED Panel Tamiri',
      date: '1 ay önce'
    },
    {
      name: 'Mehmet Öztürk',
      location: 'İstanbul, Üsküdar',
      rating: 5,
      text: 'Harika hizmet! Sony TV\'min anakartı arızalıydı, hızlıca teşhis edip tamir ettiler. Çok dürüst fiyatlandırma ve mükemmel müşteri hizmeti.',
      service: 'Anakart Tamiri',
      date: '3 hafta önce'
    },
    {
      name: 'Fatma Demir',
      location: 'İstanbul, Beşiktaş',
      rating: 5,
      text: 'Philips TV\'min ekranı çizilmişti. Çok hızlı ve profesyonel hizmet aldım. Fiyatlar da çok uygun. Kesinlikle tavsiye ederim.',
      service: 'TV Ekran Değişimi',
      date: '1 hafta önce'
    },
    {
      name: 'Ali Korkmaz',
      location: 'İstanbul, Bakırköy',
      rating: 5,
      text: 'Vestel TV\'min LED paneli arızalıydı. Aynı gün içinde tamir ettiler. Çok memnun kaldım, teşekkürler.',
      service: 'LED Panel Tamiri',
      date: '2 ay önce'
    }
  ];

  // Sonsuz döngü için listeyi dinamik olarak genişletiyoruz.
  const displayTestimonials = useMemo(() => {
    if (testimonials.length === 0) return [];
    const firstClone = testimonials[0];
    const lastClone = testimonials[testimonials.length - 1];
    return [lastClone, ...testimonials, firstClone];
  }, [testimonials]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  // --- DÜZELTME BURADA ---
  // Sonsuz döngü interval'ı
  useEffect(() => {
    // Gösterilecek 3'ten az eleman varsa (1 gerçek + 2 klon) interval'ı başlatma
    if (displayTestimonials.length < 3) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
    // Hatanın kaynağı olan 'currentIndex' bağımlılığını kaldırıyoruz.
    // Böylece zamanlayıcı sürekli kendini yok edip yeniden kurmuyor.
  }, [displayTestimonials.length]);

  // Sonsuz döngü mantığı (değişiklik yok)
  const handleTransitionEnd = () => {
    if (currentIndex === displayTestimonials.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
    }
    if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(testimonials.length);
    }
  };
  
  // Geçiş animasyonunu yöneten useEffect (değişiklik yok)
  useEffect(() => {
    if (isTransitionEnabled) return;
    const timer = setTimeout(() => setIsTransitionEnabled(true), 50);
    return () => clearTimeout(timer);
  }, [isTransitionEnabled]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Müşterilerimizin Yorumları
          </h2>
          <p className="text-xl text-gray-600">
            5.000+ mutlu müşteri TV tamirinde bize güveniyor
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden">
          <div 
            className="flex"
            style={{
              width: `${displayTestimonials.length * 100}%`,
              transform: `translateX(-${currentIndex * (100 / displayTestimonials.length)}%)`,
              transition: isTransitionEnabled ? 'transform 1s ease-in-out' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {displayTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full"
                style={{ width: `${100 / displayTestimonials.length}%` }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover-lift animate-fade-in-up h-full">
                  {/* Yorum kartı içeriği */}
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Quote className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {testimonial.service}
                  </div>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="text-sm text-gray-500 mt-1">{testimonial.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section (Gelişmiş) - Sizin tasarımınızla birebir aynı */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Onarılan TV */}
            <div className="group bg-white/80 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50/80 border border-blue-100 flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Tv2 className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {useCounter({ end: 5000, start: 0, duration: 2000 })}+
              </div>
              <div className="text-gray-700 font-semibold mb-1">Onarılan TV</div>
              <div className="text-xs text-gray-500">Tüm marka ve modeller</div>
            </div>
            {/* Ortalama Puan */}
            <div className="group bg-white/80 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50/80 border border-blue-100 flex flex-col items-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-yellow-500 fill-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                4.9/5
              </div>
              <div className="text-gray-700 font-semibold mb-1">Ortalama Puan</div>
              <div className="text-xs text-gray-500">Google & WhatsApp yorumları</div>
            </div>
            {/* Başarı Oranı */}
            <div className="group bg-white/80 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50/80 border border-blue-100 flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                %{useCounter({ end: 99, start: 0, duration: 1800 })}
              </div>
              <div className="text-gray-700 font-semibold mb-1">Başarı Oranı</div>
              <div className="text-xs text-gray-500">Yüksek müşteri memnuniyeti</div>
            </div>
            {/* Garanti Süresi */}
            <div className="group bg-white/80 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50/80 border border-blue-100 flex flex-col items-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                12 <span className="text-base font-semibold">Ay</span>
              </div>
              <div className="text-gray-700 font-semibold mb-1">Garanti Süresi</div>
              <div className="text-xs text-gray-500">Tüm işlemlerde geçerli</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;