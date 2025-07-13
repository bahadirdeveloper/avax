<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

function scanProductDirectory($baseDir) {
    $products = array();
    
    // Kategori klasörlerini tara
    $categoryMap = array(
        'products-taktik-gomlek' => 'Taktik Gömlek',
        'products-outdoor-tshirt' => 'Outdoor T-Shirt', 
        'products-taktik-pantolon' => 'Taktik Pantolon',
        'products-mont-yagmurluk' => 'Mont / Yağmurluk',
        'products-outdoor-ayakkabi' => 'Outdoor Ayakkabı',
        'products-taktik-bot' => 'Taktik Bot',
        'products-techizat-aksesuar' => 'Teçhizat & Aksesuar'
    );
    
    foreach ($categoryMap as $folderName => $categoryName) {
        $categoryPath = $baseDir . '/' . $folderName;
        
        if (is_dir($categoryPath)) {
            // Ürün klasörlerini tara
            $productDirs = scandir($categoryPath);
            
            foreach ($productDirs as $productDir) {
                if ($productDir === '.' || $productDir === '..' || $productDir === '.DS_Store') continue;
                
                $productPath = $categoryPath . '/' . $productDir;
                
                if (is_dir($productPath)) {
                    $product = array(
                        'name' => $productDir,
                        'category' => $categoryName,
                        'variants' => array(),
                        'thumbnail' => ''
                    );
                    
                    // Varyant klasörlerini tara
                    $variantDirs = scandir($productPath);
                    
                    foreach ($variantDirs as $variantDir) {
                        if ($variantDir === '.' || $variantDir === '..' || $variantDir === '.DS_Store') continue;
                        
                        $variantPath = $productPath . '/' . $variantDir;
                        
                        if (is_dir($variantPath)) {
                            $images = array();
                            $imageFiles = scandir($variantPath);
                            
                            foreach ($imageFiles as $imageFile) {
                                if (preg_match('/\.(jpg|jpeg|png|webp)$/i', $imageFile)) {
                                    $images[] = $folderName . '/' . $productDir . '/' . $variantDir . '/' . $imageFile;
                                }
                            }
                            
                            if (!empty($images)) {
                                $product['variants'][] = array(
                                    'color' => $variantDir,
                                    'images' => $images
                                );
                                
                                // İlk varyantın ilk görselini thumbnail olarak kullan
                                if (empty($product['thumbnail'])) {
                                    $product['thumbnail'] = $images[0];
                                }
                            }
                        }
                    }
                    
                    if (!empty($product['variants'])) {
                        $products[] = $product;
                    }
                }
            }
        }
    }
    
    return $products;
}

// Ana dizin yolu
$baseDirectory = './';

try {
    $products = scanProductDirectory($baseDirectory);
    echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>
