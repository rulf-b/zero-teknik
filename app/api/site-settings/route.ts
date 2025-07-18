import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const siteSettingsFile = path.join(process.cwd(), 'data', 'site-settings.json');

export async function GET(req: NextRequest) {
  try {
    if (fs.existsSync(siteSettingsFile)) {
      const data = fs.readFileSync(siteSettingsFile, 'utf-8');
      return new Response(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Varsayılan ayarları döndür
      const defaultSettings = {
        companyName: 'Zero TV Servisi',
        phone: '+90 555 123 45 67',
        email: 'info@zerotv.com',
        address: 'İstanbul, Türkiye',
        whatsapp: '+90 555 123 45 67',
        workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
        description: 'TV tamir ve servis hizmetleri'
      };
      return new Response(JSON.stringify(defaultSettings), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Site ayarları okunamadı.' }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    fs.writeFileSync(siteSettingsFile, JSON.stringify(body, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Site ayarları kaydedilemedi.' }), { status: 500 });
  }
} 