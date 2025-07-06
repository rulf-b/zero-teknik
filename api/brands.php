<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS request için CORS desteği
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Veritabanı bağlantısı
$host = 'localhost';
$dbname = 'tvrepair';
$username = 'root';
$password = '123456';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Veritabanı bağlantı hatası: ' . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Markaları getir
        try {
            $stmt = $pdo->query("SELECT * FROM brands WHERE active = 1 ORDER BY name");
            $brands = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Eski JSON formatına uyumlu hale getir
            $formattedBrands = [];
            foreach ($brands as $brand) {
                $formattedBrands[] = [
                    'name' => $brand['name'],
                    'models' => [] // Şimdilik boş, ileride model tablosu eklenebilir
                ];
            }
            
            echo json_encode($formattedBrands, JSON_UNESCAPED_UNICODE);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Markalar okunamadı: ' . $e->getMessage()]);
        }
        break;
        
    case 'POST':
        // Markaları güncelle
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['error' => 'Geçersiz JSON verisi']);
            exit();
        }
        
        try {
            // Transaction başlat
            $pdo->beginTransaction();
            
            // Tüm markaları pasif yap
            $stmt = $pdo->prepare("UPDATE brands SET active = 0");
            $stmt->execute();
            
            // Yeni markaları ekle veya aktif yap
            foreach ($input as $brandData) {
                if (isset($brandData['name'])) {
                    $stmt = $pdo->prepare("
                        INSERT INTO brands (name, description, active) 
                        VALUES (?, ?, 1) 
                        ON DUPLICATE KEY UPDATE active = 1, description = ?
                    ");
                    $stmt->execute([
                        $brandData['name'],
                        $brandData['name'] . ' TV modelleri için ekran değişimi ve tamir hizmetleri',
                        $brandData['name'] . ' TV modelleri için ekran değişimi ve tamir hizmetleri'
                    ]);
                }
            }
            
            $pdo->commit();
            echo json_encode(['success' => true]);
        } catch(PDOException $e) {
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Markalar kaydedilemedi: ' . $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Desteklenmeyen HTTP metodu']);
        break;
}
?> 