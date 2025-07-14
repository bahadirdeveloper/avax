#!/usr/bin/env python3
import os
import shutil
import unicodedata

def normalize_turkish(text):
    """Convert Turkish characters to ASCII equivalents, remove all diacritics, force lowercase, hyphenate, and NFC normalization"""
    # 1. Unicode NFD (ayrıştırılmış) formuna çevir
    text = unicodedata.normalize('NFD', text)
    # 2. Tüm diakritik işaretleri kaldır (örn: ı̇, ü, ş, ö, ç, ğ, â, î, û, ü, ö, ş, ç, ı, İ, etc.)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    # 3. Türkçe karakterleri ASCII'ye çevir
    turkish_chars = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'I': 'i',
        'İ': 'i',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U'
    }
    result = text
    for turkish, ascii_char in turkish_chars.items():
        result = result.replace(turkish, ascii_char)
    # 4. Küçük harfe çevir, boşlukları tire yap
    result = result.replace(' ', '-').lower()
    # 5. Unicode NFC'ye döndür
    result = unicodedata.normalize('NFC', result)
    return result

def rename_files_and_folders(root_path):
    """Recursively rename files and folders with Turkish characters"""
    renamed_items = []
    
    # First, rename all files
    for dirpath, dirnames, filenames in os.walk(root_path, topdown=False):
        # Skip .git directory
        if '.git' in dirpath:
            continue
            
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            normalized_name = normalize_turkish(filename)
            
            if normalized_name != filename:
                new_path = os.path.join(dirpath, normalized_name)
                
                # Check if target exists
                if os.path.exists(new_path):
                    print(f"Warning: {new_path} already exists, skipping")
                    continue
                    
                try:
                    os.rename(old_path, new_path)
                    renamed_items.append((old_path, new_path))
                    print(f"Renamed file: {old_path} -> {new_path}")
                except Exception as e:
                    print(f"Error renaming {old_path}: {e}")
    
    # Then, rename directories (from deepest to shallowest)
    for dirpath, dirnames, filenames in os.walk(root_path, topdown=False):
        # Skip .git directory
        if '.git' in dirpath:
            continue
            
        for dirname in dirnames:
            if dirname == '.git':
                continue
                
            old_dir_path = os.path.join(dirpath, dirname)
            normalized_dirname = normalize_turkish(dirname)
            
            if normalized_dirname != dirname:
                new_dir_path = os.path.join(dirpath, normalized_dirname)
                
                # Check if target exists
                if os.path.exists(new_dir_path):
                    print(f"Warning: {new_dir_path} already exists, skipping")
                    continue
                    
                try:
                    os.rename(old_dir_path, new_dir_path)
                    renamed_items.append((old_dir_path, new_dir_path))
                    print(f"Renamed directory: {old_dir_path} -> {new_dir_path}")
                except Exception as e:
                    print(f"Error renaming {old_dir_path}: {e}")
    
    return renamed_items

def update_products_data(renamed_items):
    """Update products-data.js with new paths"""
    products_file = 'products-data.js'
    
    if not os.path.exists(products_file):
        print(f"Warning: {products_file} not found")
        return
    
    with open(products_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update all renamed paths in the JavaScript file
    for old_path, new_path in renamed_items:
        # Remove the root directory prefix for relative paths
        old_relative = old_path.replace(os.getcwd() + '/', '')
        new_relative = new_path.replace(os.getcwd() + '/', '')
        
        # Replace in content
        content = content.replace(old_relative, new_relative)
        
        # Also replace URL encoded versions
        import urllib.parse
        old_encoded = urllib.parse.quote(old_relative)
        new_encoded = urllib.parse.quote(new_relative)
        content = content.replace(old_encoded, new_encoded)
    
    # Write updated content back
    with open(products_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {products_file} with new paths")

if __name__ == "__main__":
    root_directory = os.getcwd()
    print(f"Starting normalization in: {root_directory}")
    
    # Rename files and folders
    renamed_items = rename_files_and_folders(root_directory)
    
    # Update products-data.js
    if renamed_items:
        update_products_data(renamed_items)
        print(f"\nTotal items renamed: {len(renamed_items)}")
    else:
        print("\nNo items needed renaming")
