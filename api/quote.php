<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PATCH, OPTIONS');
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
        // Tüm başvuruları getir
        try {
            $stmt = $pdo->query("SELECT * FROM quotes ORDER BY created_at DESC");
            $quotes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($quotes);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Başvurular okunamadı: ' . $e->getMessage()]);
        }
        break;
        
    case 'POST':
        // Yeni başvuru ekle
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['error' => 'Geçersiz JSON verisi']);
            exit();
        }
        
        try {
            $stmt = $pdo->prepare("
                INSERT INTO quotes (
                    name, phone, email, tv_brand, tv_model, screen_size, 
                    issue_type, issue_description, location, preferred_date, 
                    preferred_time, estimated_price
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $input['name'] ?? '',
                $input['phone'] ?? '',
                $input['email'] ?? '',
                $input['tvBrand'] ?? '',
                $input['tvModel'] ?? '',
                $input['screenSize'] ?? '',
                $input['issueType'] ?? '',
                $input['issueDescription'] ?? '',
                $input['location'] ?? '',
                $input['preferredDate'] ?? null,
                $input['preferredTime'] ?? null,
                $input['estimatedPrice'] ?? null
            ]);
            
            $id = $pdo->lastInsertId();
            echo json_encode([
                'success' => true, 
                'quote' => [
                    'id' => $id,
                    'name' => $input['name'] ?? '',
                    'phone' => $input['phone'] ?? '',
                    'email' => $input['email'] ?? '',
                    'tvBrand' => $input['tvBrand'] ?? '',
                    'tvModel' => $input['tvModel'] ?? '',
                    'screenSize' => $input['screenSize'] ?? '',
                    'issueType' => $input['issueType'] ?? '',
                    'issueDescription' => $input['issueDescription'] ?? '',
                    'location' => $input['location'] ?? '',
                    'preferredDate' => $input['preferredDate'] ?? null,
                    'preferredTime' => $input['preferredTime'] ?? null,
                    'estimatedPrice' => $input['estimatedPrice'] ?? null,
                    'read' => false,
                    'createdAt' => date('Y-m-d H:i:s')
                ]
            ]);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Başvuru kaydedilemedi: ' . $e->getMessage()]);
        }
        break;
        
    case 'PATCH':
        // Başvuru durumunu güncelle (read/unread)
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id']) || !isset($input['read'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID ve read parametreleri gerekli']);
            exit();
        }
        
        try {
            $stmt = $pdo->prepare("UPDATE quotes SET read_status = ? WHERE id = ?");
            $result = $stmt->execute([$input['read'] ? 1 : 0, $input['id']]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Başvuru bulunamadı']);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Başvuru güncellenemedi: ' . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        // Başvuru sil
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID parametresi gerekli']);
            exit();
        }
        
        try {
            $stmt = $pdo->prepare("DELETE FROM quotes WHERE id = ?");
            $result = $stmt->execute([$input['id']]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Başvuru bulunamadı']);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Başvuru silinemedi: ' . $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Desteklenmeyen HTTP metodu']);
        break;
}
?> 