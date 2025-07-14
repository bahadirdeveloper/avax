
import os
import json
import re

# This mapping is based on the folder names and the desired display names in the UI
CATEGORY_MAP = {
    "taktik-gomlek": "Taktik Gömlek",
    "outdoor-tshirt": "Outdoor T-Shirt",
    "taktik-pantolon": "Taktik Pantolon",
    "mont-yagmurluk": "Mont / Yağmurluk",
    "outdoor-ayakkabi": "Outdoor Ayakkabı",
    "taktik-bot": "Taktik Bot",
    "techizat-aksesuar": "Teçhizat & Aksesuar"
}

# Function to generate a more readable name from a slug
def name_from_slug(slug):
    return slug.replace('-', ' ').replace('_', ' ').upper()

# Kategori slug'ı üretmek için fonksiyon

def slugify_category(category_name):
    # Türkçe karakterleri ASCII'ye çevir
    tr_map = str.maketrans('çğıöşüÇĞİÖŞÜ', 'cgiosuCGIOSU')
    s = category_name.translate(tr_map)
    # Küçük harfe çevir
    s = s.lower()
    # & ve / gibi özel karakterleri kaldır
    s = s.replace('&', '').replace('/', '').replace('(', '').replace(')', '')
    # Noktalama ve tire/boşluk fazlalıklarını kaldır
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s)
    s = s.strip('-')
    # 't-shirt' gibi tireli kelimeleri birleştir
    s = s.replace('t-shirt', 'tshirt')
    return s

def generate_product_data():
    products = []
    root_dirs = sorted([d for d in next(os.walk('.'))[1] if d in CATEGORY_MAP])

    for category_slug in root_dirs:
        category_path = category_slug
        category_name = CATEGORY_MAP.get(category_slug, "Diğer")
        
        if not os.path.isdir(category_path):
            continue

        for product_slug in sorted(os.listdir(category_path)):
            product_path = os.path.join(category_path, product_slug)
            
            if not os.path.isdir(product_path):
                continue
            
            product_name = name_from_slug(product_slug)
            product_data = {
                "name": product_name,
                "category": category_name,
                "categorySlug": slugify_category(category_name),
                "description": f"Bu ürün, {product_name}, en zorlu koşullara dayanacak şekilde tasarlanmıştır ve operasyonel ihtiyaçlarınız için üstün performans sunar.",
                "thumbnail": "",
                "variants": []
            }

            variant_path = product_path
            sub_items = sorted(os.listdir(variant_path))
            
            is_variant_folder = any(os.path.isdir(os.path.join(variant_path, i)) for i in sub_items)
            
            if is_variant_folder:
                for color_slug in sub_items:
                    color_path = os.path.join(variant_path, color_slug)
                    if os.path.isdir(color_path):
                        color_name = color_slug.upper()
                        images = sorted([os.path.join(color_path, f) for f in os.listdir(color_path) if f.lower().endswith(('.webp', '.jpg', '.jpeg', '.png'))])
                        if images:
                             product_data["variants"].append({
                                "color": color_name,
                                "images": images
                            })
            else:
                images = sorted([os.path.join(variant_path, f) for f in sub_items if f.lower().endswith(('.webp', '.jpg', '.jpeg', '.png'))])
                if images:
                    product_data["variants"].append({
                        "color": "STANDART",
                        "images": images
                    })

            if product_data["variants"] and product_data["variants"][0]["images"]:
                product_data["thumbnail"] = product_data["variants"][0]["images"][0]
                products.append(product_data)

    output_js = f"window.PRODUCTS_DATA = {json.dumps(products, indent=4, ensure_ascii=False)};"
    
    backup_path = 'products-data.js.backup'
    if os.path.exists(backup_path):
        # Create a unique backup name
        i = 1
        while os.path.exists(f"{backup_path}.{i}"):
            i += 1
        backup_path = f"{backup_path}.{i}"

    if os.path.exists('products-data.js'):
        os.rename('products-data.js', backup_path)
        print(f"Mevcut products-data.js dosyası {backup_path} olarak yedeklendi.")

    with open('products-data.js', 'w', encoding='utf-8') as f:
        f.write(output_js)
    
    print("products-data.js dosyası dosya yapısından yeniden oluşturuldu.")

if __name__ == "__main__":
    generate_product_data()

