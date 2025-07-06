"use client";
import { useState, useEffect } from "react";
import { usePrices } from '@/lib/PricesContext';

const USERNAME = "1";
const PASSWORD = "1";

// Sabit değerler
const BRANDS = ['Samsung', 'LG', 'Sony', 'Philips', 'Vestel', 'TCL', 'Hisense'];
const SIZES = ['32"', '40"', '43"', '50"', '55"', '65"', '75"', '85"'];
const ISSUES = ['Kırık Ekran', 'Siyah Ekran', 'Arka Aydınlatma Sorunları', 'Ölü Piksel', 'Renk Sorunları', 'Güç Yok', 'Diğer'];

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [section, setSection] = useState("applications");
  const { prices, updatePrice, loading } = usePrices();
  
  // Fiyat yönetimi state'leri
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [priceRange, setPriceRange] = useState({ start: '', end: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPriceRange, setCurrentPriceRange] = useState<string | null>(null);

  // Genel fiyat aralığı state'leri
  const [generalPriceRange, setGeneralPriceRange] = useState({ start: '', end: '' });

  // Başvuru yönetimi için state
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login.username === USERNAME && login.password === PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Kullanıcı adı veya şifre hatalı.");
    }
  };

  // Mevcut fiyatı kontrol et
  const checkCurrentPrice = () => {
    if (!selectedBrand || !selectedSize || !selectedIssue || !prices) {
      setCurrentPriceRange(null);
      setPriceRange({ start: '', end: '' });
      return;
    }

    const brandData = prices[selectedBrand];
    if (brandData && typeof brandData === 'object' && !Array.isArray(brandData)) {
      const sizeData = (brandData as any)[selectedSize];
      if (sizeData && typeof sizeData === 'object') {
        const price = sizeData[selectedIssue];
        if (typeof price === 'string' && price.includes('~')) {
          // Fiyat aralığı formatında kaydedilmiş
          // Sadece rakamları al, tüm ayraçları temizle
          const match = price.match(/₺([0-9.,\s]+)\s*~\s*₺([0-9.,\s]+)/);
          if (match) {
            const start = match[1].replace(/[^0-9]/g, '');
            const end = match[2].replace(/[^0-9]/g, '');
            setCurrentPriceRange(price);
            setPriceRange({ start, end });
            setIsEditing(true);
            return;
          }
        } else if (typeof price === 'number') {
          // Eski format - tek fiyat
          const minPrice = Math.round(price * 0.8);
          const maxPrice = Math.round(price * 1.2);
          const rangeString = `₺${minPrice.toLocaleString()} ~ ₺${maxPrice.toLocaleString()}`;
          setCurrentPriceRange(rangeString);
          setPriceRange({ start: minPrice.toString(), end: maxPrice.toString() });
          setIsEditing(true);
          return;
        }
      }
    }
    
    setCurrentPriceRange(null);
    setPriceRange({ start: '', end: '' });
    setIsEditing(false);
  };

  // Seçim değiştiğinde fiyatı kontrol et
  useEffect(() => {
    checkCurrentPrice();
  }, [selectedBrand, selectedSize, selectedIssue, prices]);

  // Genel fiyat aralığını yükle
  useEffect(() => {
    if (prices?.generalQuoteRange) {
      const range = prices.generalQuoteRange;
      const match = range.match(/₺([0-9.,\s]+)\s*[~-]\s*₺([0-9.,\s]+)/);
      if (match) {
        const start = match[1].replace(/[^0-9]/g, '');
        const end = match[2].replace(/[^0-9]/g, '');
        setGeneralPriceRange({ start, end });
      }
    }
  }, [prices]);

  // Fiyat kaydet
  const savePrice = async () => {
    if (!selectedBrand || !selectedSize || !selectedIssue || !prices) {
      alert('Lütfen tüm alanları seçin');
      return;
    }

    const startPrice = parseInt(priceRange.start);
    const endPrice = parseInt(priceRange.end);
    
    if (isNaN(startPrice) || isNaN(endPrice)) {
      alert('Geçerli fiyat aralığı giriniz');
      return;
    }

    if (startPrice > endPrice) {
      alert('Başlangıç fiyatı bitiş fiyatından büyük olamaz');
      return;
    }

    // Fiyat aralığı formatında kaydet
    const rangeString = `₺${startPrice.toLocaleString()} ~ ₺${endPrice.toLocaleString()}`;

    // Yeni fiyat yapısını güncelle
    const updatedPrices = { ...prices };
    
    // Eğer marka yoksa oluştur
    if (!updatedPrices[selectedBrand] || typeof updatedPrices[selectedBrand] === 'number' || typeof updatedPrices[selectedBrand] === 'string') {
      updatedPrices[selectedBrand] = {};
    }
    
    const brandPrices = updatedPrices[selectedBrand] as any;
    
    // Eğer boyut yoksa oluştur
    if (!brandPrices[selectedSize]) {
      brandPrices[selectedSize] = {};
    }
    
    // Fiyatı güncelle
    brandPrices[selectedSize][selectedIssue] = rangeString;
    
    // API'ye gönder
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrices)
    });
    
    // Context'i güncelle
    updatePrice(selectedBrand as any, brandPrices);
    
    alert('Fiyat başarıyla kaydedildi!');
    setCurrentPriceRange(rangeString);
  };

  // Genel fiyat aralığını kaydet
  const saveGeneralPriceRange = async () => {
    if (!prices) return;

    const startPrice = parseInt(generalPriceRange.start);
    const endPrice = parseInt(generalPriceRange.end);
    
    if (isNaN(startPrice) || isNaN(endPrice)) {
      alert('Geçerli fiyat aralığı giriniz');
      return;
    }

    if (startPrice > endPrice) {
      alert('Başlangıç fiyatı bitiş fiyatından büyük olamaz');
      return;
    }

    const rangeString = `₺${startPrice.toLocaleString()} ~ ₺${endPrice.toLocaleString()}`;
    
    const updatedPrices = { ...prices, generalQuoteRange: rangeString };
    
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrices)
    });
    
    updatePrice('generalQuoteRange' as any, rangeString);
    alert('Genel fiyat aralığı kaydedildi!');
  };

  // Yeni fiyat ekle
  const addNewPrice = async () => {
    if (!selectedBrand || !selectedSize || !selectedIssue) {
      alert('Lütfen marka, boyut ve sorun tipini seçin');
      return;
    }

    const startPrice = parseInt(priceRange.start);
    const endPrice = parseInt(priceRange.end);
    
    if (isNaN(startPrice) || isNaN(endPrice)) {
      alert('Geçerli fiyat aralığı giriniz');
      return;
    }

    if (startPrice > endPrice) {
      alert('Başlangıç fiyatı bitiş fiyatından büyük olamaz');
      return;
    }

    // Fiyat aralığı formatında kaydet
    const rangeString = `₺${startPrice.toLocaleString()} ~ ₺${endPrice.toLocaleString()}`;

    if (!prices) return;

    // Yeni fiyat yapısını güncelle
    const updatedPrices = { ...prices };
    
    // Eğer marka yoksa oluştur
    if (!updatedPrices[selectedBrand] || typeof updatedPrices[selectedBrand] === 'number' || typeof updatedPrices[selectedBrand] === 'string') {
      updatedPrices[selectedBrand] = {};
    }
    
    const brandPrices = updatedPrices[selectedBrand] as any;
    
    // Eğer boyut yoksa oluştur
    if (!brandPrices[selectedSize]) {
      brandPrices[selectedSize] = {};
    }
    
    // Fiyatı ekle
    brandPrices[selectedSize][selectedIssue] = rangeString;
    
    // API'ye gönder
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrices)
    });
    
    // Context'i güncelle
    updatePrice(selectedBrand as any, brandPrices);
    
    alert('Yeni fiyat başarıyla eklendi!');
    setCurrentPriceRange(rangeString);
    setIsEditing(true);
  };

  // Başvuruları çek
  useEffect(() => {
    if (section === "applications") {
      setLoadingApps(true);
      fetch("/api/quote")
        .then((res) => res.json())
        .then((data) => {
          setApplications(data);
          setLoadingApps(false);
        });
    }
  }, [section]);

  // Başvuruyu sil
  const deleteApplication = async (id: string) => {
    await fetch("/api/quote", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setApplications((apps) => apps.filter((a) => a.id !== id));
  };

  // Okundu olarak işaretle
  const markAsRead = async (id: string, read: boolean) => {
    await fetch("/api/quote", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    setApplications((apps) =>
      apps.map((a) => (a.id === id ? { ...a, read } : a))
    );
  };

  if (loading || !prices) return <div className="text-center py-20">Fiyatlar yükleniyor...</div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-xs">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Girişi</h2>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={login.username}
            onChange={e => setLogin(v => ({ ...v, username: e.target.value }))}
            className="w-full mb-4 px-3 py-2 border rounded"
            autoFocus
          />
          <input
            type="password"
            placeholder="Şifre"
            value={login.password}
            onChange={e => setLogin(v => ({ ...v, password: e.target.value }))}
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          {loginError && <div className="text-red-600 mb-4 text-sm">{loginError}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Giriş Yap</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">Admin Paneli</h1>
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setSection("applications")} 
          className={`px-4 py-2 rounded ${section === "applications" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Başvurular
        </button>
        <button 
          onClick={() => setSection("prices")} 
          className={`px-4 py-2 rounded ${section === "prices" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Fiyat Yönetimi
        </button>
      </div>
      
      <div className="bg-white rounded shadow p-6">
        {section === "applications" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Ücretsiz Teşhis Başvuruları</h2>
            {loadingApps ? (
              <div>Yükleniyor...</div>
            ) : applications.length === 0 ? (
              <div>Başvuru yok.</div>
            ) : (
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Ad Soyad</th>
                    <th className="p-2 border">Telefon</th>
                    <th className="p-2 border">Marka</th>
                    <th className="p-2 border">Model</th>
                    <th className="p-2 border">Sorun</th>
                    <th className="p-2 border">Lokasyon</th>
                    <th className="p-2 border">Tarih</th>
                    <th className="p-2 border">Durum</th>
                    <th className="p-2 border">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className={app.read ? "bg-gray-50" : "bg-yellow-50"}>
                      <td className="border p-2">{app.name}</td>
                      <td className="border p-2">{app.phone}</td>
                      <td className="border p-2">{app.tvBrand}</td>
                      <td className="border p-2">{app.tvModel}</td>
                      <td className="border p-2">{app.issueType}</td>
                      <td className="border p-2">{app.location}</td>
                      <td className="border p-2">{app.createdAt ? new Date(app.createdAt).toLocaleString() : "-"}</td>
                      <td className="border p-2">
                        {app.read ? "Okundu" : "Yeni"}
                        <button
                          className="ml-2 text-xs text-blue-600 underline"
                          onClick={() => markAsRead(app.id, !app.read)}
                        >
                          {app.read ? "Yeniden işaretle" : "Okundu yap"}
                        </button>
                      </td>
                      <td className="border p-2">
                        <button
                          className="text-xs text-red-600 underline"
                          onClick={() => deleteApplication(app.id)}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        
        {section === "prices" && (
          <div className="space-y-8">
            {/* Genel Fiyat Aralığı */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Genel Fiyat Aralığı</h3>
              <p className="text-sm text-blue-600 mb-4">Bu fiyat aralığı, özel fiyat girilmemiş kombinasyonlar için kullanılır.</p>
              
              <div className="flex gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlangıç Fiyatı (₺)</label>
                  <input
                    type="number"
                    value={generalPriceRange.start}
                    onChange={(e) => setGeneralPriceRange(v => ({ ...v, start: e.target.value }))}
                    className="w-32 p-2 border rounded"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bitiş Fiyatı (₺)</label>
                  <input
                    type="number"
                    value={generalPriceRange.end}
                    onChange={(e) => setGeneralPriceRange(v => ({ ...v, end: e.target.value }))}
                    className="w-32 p-2 border rounded"
                    placeholder="5000"
                  />
                </div>
                <button
                  onClick={saveGeneralPriceRange}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </div>

            {/* Özel Fiyat Yönetimi */}
            <div>
              <h3 className="text-lg font-bold mb-4">Özel Fiyat Yönetimi</h3>
              <p className="text-sm text-gray-600 mb-6">Belirli marka, boyut ve sorun tipi kombinasyonları için özel fiyat belirleyin.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Marka</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Marka Seçin</option>
                    {BRANDS.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Boyut</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Boyut Seçin</option>
                    {SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sorun Tipi</label>
                  <select
                    value={selectedIssue}
                    onChange={(e) => setSelectedIssue(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Sorun Seçin</option>
                    {ISSUES.map(issue => (
                      <option key={issue} value={issue}>{issue}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setPriceRange({ start: '', end: '' });
                      setIsEditing(false);
                    }}
                    className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Temizle
                  </button>
                </div>
              </div>

              {/* Fiyat Girişi */}
              {selectedBrand && selectedSize && selectedIssue && (
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">
                      {selectedBrand} {selectedSize} - {selectedIssue}
                    </h4>
                    {currentPriceRange && (
                      <span className="text-sm text-gray-600">
                        Mevcut Fiyat: {currentPriceRange}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium mb-2">Başlangıç Fiyatı (₺)</label>
                      <input
                        type="number"
                        value={priceRange.start}
                        onChange={(e) => setPriceRange(v => ({ ...v, start: e.target.value }))}
                        className="w-32 p-2 border rounded"
                        placeholder="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bitiş Fiyatı (₺)</label>
                      <input
                        type="number"
                        value={priceRange.end}
                        onChange={(e) => setPriceRange(v => ({ ...v, end: e.target.value }))}
                        className="w-32 p-2 border rounded"
                        placeholder="5000"
                      />
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <button
                          onClick={savePrice}
                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                          Güncelle
                        </button>
                      ) : (
                        <button
                          onClick={addNewPrice}
                          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                          Ekle
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {priceRange.start && priceRange.end && (
                    <div className="mt-4 p-3 bg-blue-100 rounded">
                      <div className="text-sm text-blue-800">
                        <strong>Fiyat Aralığı:</strong> ₺{parseInt(priceRange.start).toLocaleString()} ~ ₺{parseInt(priceRange.end).toLocaleString()}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Bu fiyat aralığı kullanıcılara gösterilecek
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;