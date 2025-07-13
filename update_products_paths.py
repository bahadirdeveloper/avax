#!/usr/bin/env python3
import re
import os

def update_products_data():
    """Update products-data.js with normalized paths"""
    
    # Mapping of old folder names to new normalized names
    folder_mappings = {
        # Mont / Yağmurluk
        'AKN SOĞUK İKLİM MONT ': 'akn-soguk-iklim-mont-',
        'RÜZGARLIK:YAĞMURLUK ': 'ruzgarlik-yagmurluk-',
        
        # Outdoor Ayakkabı
        'VOGEL m1493 SÜET AYAKKABI': 'vogel-m1493-süet-ayakkabi',
        
        # Outdoor T-shirt
        'BİSİKLET KISA KOL TAKTİK': 'bi̇si̇klet-kisa-kol-takti̇k',
        'BSKLT YAKA UZUN KOL TAKTİK TİŞÖRT': 'bsklt-yaka-uzun-kol-takti̇k-ti̇şört',
        'POLO YAKA KISA KOL TAKTİK TİŞÖRT': 'polo-yaka-kisa-kol-takti̇k-ti̇şört',
        
        # Taktik Gömlek
        'AKN 225 GÖMLEK': 'akn-225-gömlek',
        'AVX 311 TAKTİK GÖMLEK': 'avx-311-takti̇k-gömlek',
        'AVX 312 TAKTİK GÖMLEK': 'avx-312-takti̇k-gömlek',
        
        # Taktik Bot
        'LOWA ZEPHYR MK2 Gtx ASKERİ BOT': 'lowa-zephyr-mk2-gtx-askeri̇-bot',
        'VOGEL 1490': 'vogel-1490',
        'VOGEL 1491 FERMUARLI OUTDOOR BOT': 'vogel-1491-fermuarli-outdoor-bot',
        'VOGEL 1492 ': 'vogel-1492-',
        'VOGEL GUARD RS ': 'vogel-guard-rs-',
        'VOGEL STARK COYOTE TAKTİK BOT': 'vogel-stark-coyote-takti̇k-bot',
        
        # Taktik Pantolon
        'AKN 112 TAKTİK PANTOLON': 'akn-112-takti̇k-pantolon',
        'AKN 162 JANDARMA SOFTSHELL PANTOLON': 'akn-162-jandarma-softshell-pantolon',
        'AKN 162 TAKTİK PANTOLON SOFTSHELL': 'akn-162-takti̇k-pantolon-softshell',
        'AKN 513 TAKTİK PANTOLON': 'akn-513-takti̇k-pantolon',
        'AKN 514 TAKTİK PANTOLON': 'akn-514-takti̇k-pantolon',
        'AKN 516 TAKTİK PANTOLON': 'akn-516-takti̇k-pantolon',
        'AKN515 TAKTİK PANTOLON': 'akn515-takti̇k-pantolon',
        
        # Teçhizat & Aksesuar
        'AKN AOUTDOOR 45 LT ÇANTA': 'akn-aoutdoor-45-lt-çanta',
        'AKN BALİSTİK PLAKA TAŞIYICI HÜCUM YELEĞİ TSK': 'akn-bali̇sti̇k-plaka-taşiyici-hücum-yeleği̇-tsk',
        'AKN BALİSTİK PLAKA TAŞIYICI HÜCÜM YELEĞİ': 'akn-bali̇sti̇k-plaka-taşiyici-hücüm-yeleği̇',
        'AKN EŞOFMAN TAKIMI ': 'akn-eşofman-takimi-',
        'AKN OPERASYON KOMBAT JANDARMA': 'akn-operasyon-kombat-jandarma',
        'AKN OPERASYON PANTOLONU - JANDARMA': 'akn-operasyon-pantolonu---jandarma',
        'DİZLİK DİRSEKLİK KORUMA SETİ ASKERİ YEŞİL': 'di̇zli̇k-di̇rsekli̇k-koruma-seti̇-askeri̇-yeşi̇l',
        'JANDARMA ASAYİŞ TAKIMI YAZLIK': 'jandarma-asayi̇ş-takimi-yazlik',
        'TABANCA GÖZLÜK TAKTİK ÜÇGEN ÇANTA': 'tabanca-gözlük-takti̇k-üçgen-çanta',
        'TABANCA TAŞIMA GÖZLÜ KARE ': 'tabanca-taşima-gözlü-kare-'
    }
    
    # Renk isimleri de lowercase olmalı (ama Türkçe karakterler korunmalı)
    color_mappings = {
        'BEYAZ': 'beyaz',
        'HAKİ': 'haki̇',
        'SİYAH': 'si̇yah',
        'BEJ': 'bej',
        'LAVİCERT': 'lavi̇cert',
        'VİZON': 'vi̇zon',
        'KAHVE': 'kahve',
        'ANTRASİT': 'antrasi̇t',
        'TAŞ': 'taş',
        'FÜME': 'füme',
        'LACİVERT': 'laci̇vert',
        'JANDARMA': 'jandarma',
        'TSK': 'tsk',
        'STANDART': 'standart',
        'COYOTE': 'coyote'
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
        # Replace in paths (between slashes)
        pattern = f'/{old_color}/'
        replacement = f'/{new_color}/'
        content = content.replace(pattern, replacement)
    
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
