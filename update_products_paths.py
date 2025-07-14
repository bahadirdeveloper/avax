#!/usr/bin/env python3
import re
import os

def update_products_data():
    """Update products-data.js with normalized paths"""
    
    # Mapping of old folder names to new normalized names
    folder_mappings = {
        # Mont / Yağmurluk
        'AKN SOGUK IKLIM MONT ': 'akn-soguk-iklim-mont',
        'RÜZGARLIK:YAĞMURLUK ': 'ruzgarlik-yagmurluk',
        
        # Outdoor Ayakkabı
        'VOGEL m1493 SÜET AYAKKABI': 'vogel-m1493-suet-ayakkabi',
        
        # Outdoor T-shirt
        'BİSİKLET KISA KOL TAKTİK': 'bisiklet-kisa-kol-taktik',
        'BSKLT YAKA UZUN KOL TAKTİK TİŞÖRT': 'bsklt-yaka-uzun-kol-taktik-tisort',
        'POLO YAKA KISA KOL TAKTİK TİŞÖRT': 'polo-yaka-kisa-kol-taktik-tisort',
        
        # Taktik Gömlek
        'AKN 225 GÖMLEK': 'akn-225-gomlek',
        'AVX 311 TAKTİK GÖMLEK': 'avx-311-taktik-gomlek',
        'AVX 312 TAKTİK GÖMLEK': 'avx-312-taktik-gomlek',
        
        # Taktik Bot
        'LOWA ZEPHYR MK2 Gtx ASKERİ BOT': 'lowa-zephyr-mk2-gtx-askeri-bot',
        'VOGEL 1490': 'vogel-1490',
        'VOGEL 1491 FERMUARLI OUTDOOR BOT': 'vogel-1491-fermuarli-outdoor-bot',
        'VOGEL 1492 ': 'vogel-1492',
        'VOGEL GUARD RS ': 'vogel-guard-rs',
        'VOGEL STARK COYOTE TAKTİK BOT': 'vogel-stark-coyote-taktik-bot',
        
        # Taktik Pantolon
        'AKN 112 TAKTİK PANTOLON': 'akn-112-taktik-pantolon',
        'AKN 162 JANDARMA SOFTSHELL PANTOLON': 'akn-162-jandarma-softshell-pantolon',
        'AKN 162 TAKTİK PANTOLON SOFTSHELL': 'akn-162-taktik-pantolon-softshell',
        'AKN 513 TAKTİK PANTOLON': 'akn-513-taktik-pantolon',
        'AKN 514 TAKTİK PANTOLON': 'akn-514-taktik-pantolon',
        'AKN 516 TAKTİK PANTOLON': 'akn-516-taktik-pantolon',
        'AKN515 TAKTİK PANTOLON': 'akn515-taktik-pantolon',
        
        # Teçhizat & Aksesuar
        'AKN AOUTDOOR 45 LT ÇANTA': 'akn-aoutdoor-45-lt-canta',
        'AKN BALİSTİK PLAKA TAŞIYICI HÜCUM YELEĞİ TSK': 'akn-balistik-plaka-tasiyici-hucum-yelegi-tsk',
        'AKN BALİSTİK PLAKA TAŞIYICI HÜCÜM YELEĞİ': 'akn-balistik-plaka-tasiyici-hucum-yelegi',
        'AKN EŞOFMAN TAKIMI ': 'akn-esofman-takimi',
        'AKN OPERASYON KOMBAT JANDARMA': 'akn-operasyon-kombat-jandarma',
        'AKN OPERASYON PANTOLONU - JANDARMA': 'akn-operasyon-pantolonu---jandarma',
        'DİZLİK DİRSEKLİK KORUMA SETİ ASKERİ YEŞİL': 'dizlik-dirseklik-koruma-seti-askeri-yesil',
        'JANDARMA ASAYİŞ TAKIMI YAZLIK': 'jandarma-asayis-takimi-yazlik',
        'TABANCA GÖZLÜK TAKTİK ÜÇGEN ÇANTA': 'tabanca-gozluk-taktik-ucgen-canta',
        'TABANCA TAŞIMA GÖZLÜ KARE ': 'tabanca-tasima-gozlu-kare'
    }
    
    # Renk isimleri, dosya sistemindeki klasör adlarıyla eşleşmelidir.
    color_mappings = {
        'beyaz': 'BEYAZ',
        'haki': 'HAKI',
        'siyah': 'SIYAH',
        'bej': 'BEJ',
        'lavicert': 'LAVICERT',
        'vizon': 'VIZON',
        'kahve': 'KAHVE',
        'antrasit': 'ANTRASIT',
        'taş': 'TAS',
        'füme': 'FUME',
        'lacivert': 'LACIVERT',
        'jandarma': 'JANDARMA',
        'tsk': 'TSK',
        'standart': 'STANDART',
        'coyote': 'COYOTE',
        'gri': 'GRI',
        'krem': 'KREM',
        'askeri-yesil': 'ASKERI-YESIL'
    }
    
    # Read the products-data.js file
    with open('products-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Backup the original
    with open('products-data.js.backup', 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Replace folder names in paths
    for old_name, new_name in folder_mappings.items():
        # Replace in paths (between quotes)
        pattern = f'"{old_name}/'
        replacement = f'"{new_name}/'
        content = content.replace(pattern, replacement)
        
        pattern = f'/{old_name}/'
        replacement = f'/{new_name}/'
        content = content.replace(pattern, replacement)
    
    # Replace color names in paths
    for old_color, new_color in color_mappings.items():
        # Replace in paths (between slashes), case-insensitive
        pattern = re.compile(f'/({re.escape(old_color)})/', re.IGNORECASE)
        replacement = f'/{new_color}/'
        content = pattern.sub(replacement, content)
    
    # Also update thumbnail paths at the beginning of product definitions
    # This is for paths like "mont-yagmurluk/AKN SOGUK IKLIM MONT /BEYAZ/136.webp"
    for old_name, new_name in folder_mappings.items():
        # Pattern for thumbnail paths
        pattern = f'"thumbnail": "{old_name}/'
        replacement = f'"thumbnail": "{new_name}/'
        content = content.replace(pattern, replacement)
        
        # Also check without the trailing space
        pattern = f'"thumbnail": "{old_name.rstrip()}/'
        replacement = f'"thumbnail": "{new_name}/'
        content = content.replace(pattern, replacement)
    
    # Save the updated content
    with open('products-data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("products-data.js has been updated with normalized paths")
    print("Backup saved as products-data.js.backup")

if __name__ == "__main__":
    update_products_data()
