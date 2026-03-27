#!/usr/bin/env python3
"""
🔧 清理 enrich_every_minute.py 题库中的重复和格式问题
"""

import re

ENRICH_SCRIPT = "/root/.nanobot/workspace/guessing-game/enrich_every_minute.py"

def clean_animal_questions():
    """清理动物题库"""
    with open(ENRICH_SCRIPT, 'r', encoding='utf-8') as f:
        script = f.read()
    
    # 提取动物题库
    match = re.search(r'animal_questions = \[([\s\S]*?)\n    \]', script)
    if not match:
        print("❌ 未找到动物题库")
        return False
    
    content = match.group(1)
    lines = content.strip().split('\n')
    
    # 解析并去重
    seen = set()
    cleaned = []
    duplicates = []
    
    for line in lines:
        line = line.strip()
        if not line or line == ',':
            continue
        
        # 提取动物名称
        name_match = re.search(r'\("([^"]+)"', line)
        if name_match:
            name = name_match.group(1)
            if name in seen:
                duplicates.append(name)
            else:
                seen.add(name)
                # 修复格式问题
                fixed_line = re.sub(r"\[([^\]]+),\s*\['([^\']+)',\s*'([^\']+)'\]\]", r'[\1, \2, \3]', line)
                fixed_line = re.sub(r",\s*'", ", '", fixed_line)
                cleaned.append(fixed_line)
    
    print(f"🐾 动物题库：{len(lines)} → {len(cleaned)} 题 (删除{len(duplicates)}个重复)")
    if duplicates:
        print(f"   重复：{', '.join(duplicates[:10])}{'...' if len(duplicates) > 10 else ''}")
    
    # 重建题库
    new_content = '\n' + '\n'.join(cleaned) + '\n    '
    new_animal_questions = 'animal_questions = [' + new_content + ']'
    
    old_animal_questions = 'animal_questions = [' + content + '\n    ]'
    script = script.replace(old_animal_questions, new_animal_questions)
    
    with open(ENRICH_SCRIPT, 'w', encoding='utf-8') as f:
        f.write(script)
    
    return True

def clean_idiom_questions():
    """清理成语题库"""
    with open(ENRICH_SCRIPT, 'r', encoding='utf-8') as f:
        script = f.read()
    
    match = re.search(r'idiom_questions = \[([\s\S]*?)\n    \]', script)
    if not match:
        print("❌ 未找到成语题库")
        return False
    
    content = match.group(1)
    lines = content.strip().split('\n')
    
    seen = set()
    cleaned = []
    duplicates = []
    
    for line in lines:
        line = line.strip()
        if not line or line == ',':
            continue
        
        idiom_match = re.search(r'\("([^"]+)"', line)
        if idiom_match:
            idiom = idiom_match.group(1)
            if idiom in seen:
                duplicates.append(idiom)
            else:
                seen.add(idiom)
                cleaned.append(line)
    
    print(f"📜 成语题库：{len(lines)} → {len(cleaned)} 题 (删除{len(duplicates)}个重复)")
    if duplicates:
        print(f"   重复：{', '.join(duplicates)}")
    
    new_content = '\n' + '\n'.join(cleaned) + '\n    '
    new_idiom_questions = 'idiom_questions = [' + new_content + ']'
    
    old_idiom_questions = 'idiom_questions = [' + content + '\n    ]'
    script = script.replace(old_idiom_questions, new_idiom_questions)
    
    with open(ENRICH_SCRIPT, 'w', encoding='utf-8') as f:
        f.write(script)
    
    return True

def main():
    print("🔧 清理题库重复...\n")
    
    clean_animal_questions()
    clean_idiom_questions()
    
    print("\n✅ 题库清理完成！")

if __name__ == "__main__":
    main()
