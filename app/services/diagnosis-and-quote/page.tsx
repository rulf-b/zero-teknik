'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Clock, Star, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const steps = [
  { step: 1, title: 'Ücretsiz Teşhis', description: 'TV\u0027niz detaylıca incelenir, arıza tespiti yapılır.' },
  { step: 2, title: 'Fiyat Teklifi', description: 'Şeffaf ve net fiyatlandırma, onay sonrası işleme başlanır.' },
  { step: 3, title: 'Onarım & Değişim', description: 'Gerekli parça değişimi veya onarım profesyonelce yapılır.' },
  { step: 4, title: 'Test & Garanti', description: 'Tüm testler yapılır, 12 ay garanti ile teslim edilir.' },
];

const advantages = [
  { icon: Shield, title: 'Güvenli Hizmet', desc: 'Tüm işlemler kayıt altındadır, orijinal parça ve uzman teknisyen garantisi.' },
  { icon: Clock, title: 'Hızlı Sonuç', desc: 'Çoğu onarım aynı gün içinde tamamlanır.' },
  { icon: Star, title: '12 Ay Garanti', desc: 'Tüm işlemler 12 ay garanti kapsamındadır.' },
];

function getTurkishIssue(issue: string) {
  switch(issue) {
    case 'Cracked Screen': return 'Kırık Ekran';
    case 'Black Screen': return 'Siyah Ekran';
    case 'Backlight Issues': return 'Arka Aydınlatma Sorunları';
    case 'Dead Pixels': return 'Ölü Piksel';
    case 'Color Problems': return 'Renk Sorunları';
    case 'No Power': return 'Güç Yok';
    case 'Other': return 'Diğer';
    default: return issue;
  }
}

export default function DiagnosisAndQuotePage() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    brand: searchParams?.get('brand') || '',
    model: '',
    size: searchParams?.get('size') || '',
    issue: searchParams?.get('issue') || '',
    description: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Başvuru gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Detaylı Teklif Başvurusu</h1>
          <p className="text-lg text-gray-600 mb-6">TV'niz için hızlı teşhis ve net fiyat teklifi almak için formu doldurun. Uzmanlarımız en kısa sürede sizi arayacak.</p>
        </div>
      </section>
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form Alanı */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Kişisel Bilgiler */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Adınızı ve soyadınızı girin" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={form.phone} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="+90 5XX XXX XX XX" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="ornek@email.com" 
                      />
                    </div>
                  </div>
                </div>

                {/* TV Bilgileri */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">TV Bilgileri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">TV Markası *</label>
                      <select 
                        name="brand" 
                        value={form.brand} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Marka Seçin</option>
                        <option value="Samsung">Samsung</option>
                        <option value="LG">LG</option>
                        <option value="Sony">Sony</option>
                        <option value="Philips">Philips</option>
                        <option value="Panasonic">Panasonic</option>
                        <option value="Hisense">Hisense</option>
                        <option value="TCL">TCL</option>
                        <option value="Vestel">Vestel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">TV Modeli</label>
                      <input 
                        type="text" 
                        name="model" 
                        value={form.model} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Örn: 55NU7100" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ekran Boyutu *</label>
                      <select 
                        name="size" 
                        value={form.size} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Boyut Seçin</option>
                        <option value="32">32"</option>
                        <option value="40">40"</option>
                        <option value="43">43"</option>
                        <option value="49">49"</option>
                        <option value="50">50"</option>
                        <option value="55">55"</option>
                        <option value="65">65"</option>
                        <option value="75">75"</option>
                        <option value="85">85"</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Arıza Türü *</label>
                      <select 
                        name="issue" 
                        value={form.issue} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Arıza Seçin</option>
                        <option value="Cracked Screen">Kırık Ekran</option>
                        <option value="Black Screen">Siyah Ekran</option>
                        <option value="Backlight Issues">Arka Aydınlatma Sorunları</option>
                        <option value="Dead Pixels">Ölü Piksel</option>
                        <option value="Color Problems">Renk Sorunları</option>
                        <option value="No Power">Güç Yok</option>
                        <option value="Other">Diğer</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sorununuzu Açıklayın</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="TV'nizdeki sorunu kısaca açıklayın..."
                      />
                    </div>
                  </div>
                </div>

                {/* Servis Detayları */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Servis Detayları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lokasyon *</label>
                      <select 
                        name="location" 
                        value={form.location} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Lokasyon Seçin</option>
                        <option value="Istanbul">İstanbul</option>
                        <option value="Ankara">Ankara</option>
                        <option value="Izmir">İzmir</option>
                        <option value="Bursa">Bursa</option>
                        <option value="Antalya">Antalya</option>
                        <option value="Other">Diğer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tercih Edilen Tarih</label>
                      <input 
                        type="date" 
                        name="preferredDate" 
                        value={form.preferredDate} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="gg.aa.yyyy" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tercih Edilen Saat</label>
                      <select 
                        name="preferredTime" 
                        value={form.preferredTime} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Herhangi bir saat</option>
                        <option value="09:00-12:00">09:00-12:00</option>
                        <option value="12:00-15:00">12:00-15:00</option>
                        <option value="15:00-18:00">15:00-18:00</option>
                        <option value="18:00-21:00">18:00-21:00</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                >
                  Ücretsiz Fiyat Teklifi Al
                </Button>
              </form>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Talebiniz Alındı!</h2>
                <p className="text-lg text-gray-600 mb-6">En kısa sürede uzmanımız sizi arayacak ve detaylı teklif iletecek.</p>
                <div className="flex justify-center gap-4 mt-6">
                  <a href="tel:+905551234567">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Hemen Ara</Button>
                  </a>
                  <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* Bilgi Kutusu */}
          <div className="md:col-span-1 flex flex-col h-full">
            <div className="flex flex-col flex-grow h-full min-h-full justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">Neden Detaylı Teklif Almalısınız?</h3>
              <p className="text-lg text-gray-700 mb-8 text-center max-w-xl mx-auto">Sadece fiyat almak değil, TV'niz için en doğru çözümü ve güveni de sunuyoruz. Uzman ekibimizle, şeffaf ve hızlı hizmetin farkını yaşayın.</p>
              <div className="flex flex-col divide-y divide-blue-200 flex-grow">
                <div className="flex items-start gap-4 py-5">
                  <span className="bg-green-100 text-green-600 rounded-full p-3 mt-1">
                    <CheckCircle className="w-8 h-8" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-blue-900">Net ve Şeffaf Fiyatlandırma</div>
                    <div className="text-gray-600">Sürpriz masraflar yok, her adımda bilgilendirme.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <span className="bg-blue-100 text-blue-600 rounded-full p-3 mt-1">
                    <Shield className="w-8 h-8" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-blue-900">Kişiye ve Cihaza Özel Teşhis</div>
                    <div className="text-gray-600">Her marka ve modele özel, uzman incelemesi.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <span className="bg-yellow-100 text-yellow-600 rounded-full p-3 mt-1">
                    <Clock className="w-8 h-8" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-blue-900">Zaman ve Para Tasarrufu</div>
                    <div className="text-gray-600">Gereksiz masraf ve zaman kaybı olmadan, hızlı çözüm.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <span className="bg-purple-100 text-purple-600 rounded-full p-3 mt-1">
                    <Star className="w-8 h-8" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-blue-900">12 Ay Garanti ve Uzman Destek</div>
                    <div className="text-gray-600">Tüm işlemlerde uzun süreli garanti ve teknik destek.</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center text-base text-blue-800 font-medium">
                <span className="inline-block bg-blue-100 rounded px-4 py-2">Sorularınız için <a href="tel:+905551234567" className="underline font-bold">bizi hemen arayın</a> veya <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" className="underline font-bold">WhatsApp'tan yazın</a>.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}