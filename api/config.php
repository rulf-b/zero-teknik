<?php
// Veritabanı bağlantı ayarları
// Bu dosyayı hosting ortamınıza göre güncelleyin

// Yerel geliştirme ortamı
$config = [
    'host' => 'localhost',
    'dbname' => 'tvrepair',
    'username' => 'root',
    'password' => '123456',
    'charset' => 'utf8mb4'
];

// Hosting ortamı için örnek (bunları hosting firmanızdan alacaksınız)
// $config = [
//     'host' => 'localhost',
//     'dbname' => 'kullaniciadi_veritabani',
//     'username' => 'kullaniciadi_kullanici',
//     'password' => 'veritabani_sifresi',
//     'charset' => 'utf8mb4'
// ];

// PDO bağlantısı oluştur
function getDBConnection() {
    global $config;
    
    try {
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
        $pdo = new PDO($dsn, $config['username'], $config['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch(PDOException $e) {
        throw new Exception('Veritabanı bağlantı hatası: ' . $e->getMessage());
    }
}

// Hata yanıtı gönder
function sendError($message, $code = 500) {
    http_response_code($code);
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit();
}

// Başarı yanıtı gönder
function sendSuccess($data = null) {
    $response = ['success' => true];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

// CORS headers
function setCORSHeaders() {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}
?> 