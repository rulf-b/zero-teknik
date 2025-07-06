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
        // Fiyatları getir - eski JSON formatına uyumlu
        try {
            // Tüm fiyatları çek
            $stmt = $pdo->query("SELECT * FROM prices ORDER BY brand, screen_size, issue_type");
            $prices = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Eski JSON formatına dönüştür
            $formattedPrices = [
                'screenReplacement' => '1801',
                'ledRepair' => 900,
                'motherboardRepair' => 1200,
                'samsung55nu7100' => 1800,
                'ledRepairRange' => '₺500 - ₺2.000',
                'motherboardRepairRange' => '₺600 - ₺2.500',
                'generalQuoteRange' => '₺500 - ₺8.000'
            ];
            
            // Marka bazında fiyatları organize et
            foreach ($prices as $price) {
                $brand = $price['brand'];
                $size = $price['screen_size'];
                $issue = $price['issue_type'];
                $priceValue = $price['price_range'] ?: $price['price'];
                
                if (!isset($formattedPrices[$brand])) {
                    $formattedPrices[$brand] = [];
                }
                
                if (!isset($formattedPrices[$brand][$size])) {
                    $formattedPrices[$brand][$size] = [];
                }
                
                $formattedPrices[$brand][$size][$issue] = $priceValue;
            }
            
            echo json_encode($formattedPrices, JSON_UNESCAPED_UNICODE);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Fiyatlar okunamadı: ' . $e->getMessage()]);
        }
        break;
        
    case 'POST':
        // Fiyatları güncelle
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['error' => 'Geçersiz JSON verisi']);
            exit();
        }
        
        try {
            // Transaction başlat
            $pdo->beginTransaction();
            
            // Eski fiyatları temizle (marka bazında)
            foreach ($input as $brand => $brandData) {
                if (is_array($brandData) && $brand !== 'screenReplacement' && $brand !== 'ledRepair' && 
                    $brand !== 'motherboardRepair' && $brand !== 'samsung55nu7100' && 
                    $brand !== 'ledRepairRange' && $brand !== 'motherboardRepairRange' && 
                    $brand !== 'generalQuoteRange') {
                    
                    $stmt = $pdo->prepare("DELETE FROM prices WHERE brand = ?");
                    $stmt->execute([$brand]);
                    
                    // Yeni fiyatları ekle
                    foreach ($brandData as $size => $sizeData) {
                        if (is_array($sizeData)) {
                            foreach ($sizeData as $issue => $price) {
                                $stmt = $pdo->prepare("
                                    INSERT INTO prices (brand, screen_size, issue_type, price, price_range) 
                                    VALUES (?, ?, ?, ?, ?) 
                                    ON DUPLICATE KEY UPDATE price = ?, price_range = ?
                                ");
                                
                                // Fiyat değerini sayıya çevir
                                $numericPrice = is_numeric($price) ? $price : 0;
                                $priceRange = is_string($price) ? $price : null;
                                
                                $stmt->execute([
                                    $brand, $size, $issue, $numericPrice, $priceRange,
                                    $numericPrice, $priceRange
                                ]);
                            }
                        }
                    }
                }
            }
            
            $pdo->commit();
            echo json_encode(['success' => true]);
        } catch(PDOException $e) {
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Fiyatlar kaydedilemedi: ' . $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Desteklenmeyen HTTP metodu']);
        break;
}
?> 