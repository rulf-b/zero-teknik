'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);

    // In a real application, you would send this data to your backend
    // Example: await submitContactForm(formData);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Mesajınız Başarıyla Gönderildi!
        </h3>
        <p className="text-gray-600 mb-6">
          Bizimle iletişime geçtiğiniz için teşekkürler. Mesai saatleri içinde 2 saat içinde size dönüş yapacağız.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Yeni Bir Mesaj Gönder
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Ad Soyad *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adınızı ve soyadınızı girin"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Telefon Numarası *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+90 5XX XXX XX XX"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-posta Adresi *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Konu *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Konu Seçin</option>
            <option value="quote">Teklif Talebi</option>
            <option value="repair">TV Tamir Sorgusu</option>
            <option value="warranty">Garanti Hakkında</option>
            <option value="complaint">Şikayet</option>
            <option value="other">Diğer</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Mesaj *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Lütfen TV arızanızı veya talebinizi detaylı şekilde yazınız..."
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4"
        >
          Mesajı Gönder
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;