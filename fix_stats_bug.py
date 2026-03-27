#!/usr/bin/env python3
"""
🔧 修复统计 Bug 和重复题目问题
"""

import re
from pathlib import Path

PROJECT_PATH = "/root/.nanobot/workspace/guessing-game"
GAME_JS = Path(PROJECT_PATH) / "game.js"
ENRICH_SCRIPT = Path(PROJECT_PATH) / "enrich_every_minute.py"

def fix_animal_stats():
    """修复动物统计 Bug - 排除游戏模式名称"""
    
    # 游戏模式名称列表
    game_modes = [
        '数字猜猜乐', '词语猜猜猜', '动物猜猜看', '成语猜猜乐',
        'emoji 猜猜乐', '食物猜猜乐', '电影猜猜乐', '国家猜猜乐'
    ]
    
    with open(ENRICH_SCRIPT, 'r', encoding='utf-8') as f:
        script = f.read()
    
    # 找到动物统计的正则表达式并修复
    # 原代码：animals = re.findall(r'name:\s*"([^"]+)"', js)
    # 新代码：排除游戏模式名称
    
    old_animal_stats = '''animals = re.findall(r'name:\\s*"([^"]+)"', js)'''
    
    new_animal_stats = '''# 排除游戏模式名称
    all_names = re.findall(r'name:\\s*"([^"]+)"', js)
    game_modes = ['数字猜猜乐', '词语猜猜猜', '动物猜猜看', '成语猜猜乐', 'emoji 猜猜乐', '食物猜猜乐', '电影猜猜乐', '国家猜猜乐']
    animals = [name for name in all_names if name not in game_modes]'''
    
    if old_animal_stats in script:
        script = script.replace(old_animal_stats, new_animal_stats)
        print("✅ 修复动物统计 Bug")
    else:
        print("⚠️ 未找到动物统计代码（可能已修复）")
    
    # 同样修复 check_question_quality 函数中的动物统计
    old_animal_stats2 = '''animals = re.findall(r'name:\\s*"([^"]+)"', js)'''
    
    # 只替换第二次出现（在 check_question_quality 函数中）
    count = 0
    def replace_second(match):
        nonlocal count
        count += 1
        if count == 2:
            return '''# 排除游戏模式名称
        all_names = re.findall(r'name:\\s*"([^"]+)"', js)
        game_modes = ['数字猜猜乐', '词语猜猜猜', '动物猜猜看', '成语猜猜乐', 'emoji 猜猜乐', '食物猜猜乐', '电影猜猜乐', '国家猜猜乐']
        animals = [name for name in all_names if name not in game_modes]'''
        return match.group(0)
    
    script = re.sub(r'animals = re\.findall\(r\'name:\\s\*\\"\(\[\^"\]\+\)\\"\', js\)', replace_second, script)
    
    with open(ENRICH_SCRIPT, 'w', encoding='utf-8') as f:
        f.write(script)
    
    return True

def fix_duplicate_expansion():
    """修复题目新增逻辑 - 新增前检查是否已存在"""
    
    with open(ENRICH_SCRIPT, 'r', encoding='utf-8') as f:
        script = f.read()
    
    # 找到 expand_question_bank 函数中的词语新增逻辑
    old_word_expand = '''    if mode_type == 'word':
        match = re.search(r'(words:\\s*\\[)', js)
        if match:
            insert_pos = match.end()
            for word, hint in word_questions[:count]:
                new_entry = '\\n    { word: "' + word + '", hint: "' + hint + '" },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)'''
    
    new_word_expand = '''    if mode_type == 'word':
        # 检查现有题目，避免重复
        existing_words = set(re.findall(r'word:\\s*"([^"]+)"', js))
        match = re.search(r'(words:\\s*\\[)', js)
        if match:
            insert_pos = match.end()
            for word, hint in word_questions[:count]:
                if word not in existing_words:  # 只新增不重复的题目
                    new_entry = '\\n    { word: "' + word + '", hint: "' + hint + '" },'
                    js = js[:insert_pos] + new_entry + js[insert_pos:]
                    insert_pos += len(new_entry)
                    existing_words.add(word)'''
    
    if old_word_expand in script:
        script = script.replace(old_word_expand, new_word_expand)
        print("✅ 修复词语新增逻辑（去重检查）")
    else:
        print("⚠️ 未找到词语新增代码（可能已修复）")
    
    # 修复动物新增逻辑
    old_animal_expand = '''    elif mode_type == 'animal':
        match = re.search(r'(animals:\\s*\\[)', js)
        if match:
            insert_pos = match.end()
            for name, hints in animal_questions[:count]:
                hints_str = ', '.join(['"' + h + '"' for h in hints])
                new_entry = '\\n    { name: "' + name + '", hints: [' + hints_str + '] },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)'''
    
    new_animal_expand = '''    elif mode_type == 'animal':
        # 检查现有题目，避免重复
        existing_animals = set(re.findall(r'name:\\s*"([^"]+)"', js))
        game_modes = ['数字猜猜乐', '词语猜猜猜', '动物猜猜看', '成语猜猜乐']
        existing_animals = existing_animals - set(game_modes)  # 排除游戏模式
        match = re.search(r'(animals:\\s*\\[)', js)
        if match:
            insert_pos = match.end()
            for name, hints in animal_questions[:count]:
                if name not in existing_animals:  # 只新增不重复的题目
                    hints_str = ', '.join(['"' + h + '"' for h in hints])
                    new_entry = '\\n    { name: "' + name + '", hints: [' + hints_str + '] },'
                    js = js[:insert_pos] + new_entry + js[insert_pos:]
                    insert_pos += len(new_entry)
                    existing_animals.add(name)'''
    
    if old_animal_expand in script:
        script = script.replace(old_animal_expand, new_animal_expand)
        print("✅ 修复动物新增逻辑（去重检查）")
    else:
        print("⚠️ 未找到动物新增代码（可能已修复）")
    
    # 修复成语新增逻辑
    old_idiom_expand = '''    elif mode_type == 'idiom':
        match = re.search(r'(idioms:\\s*\\[)', js)
        if match:
            insert_pos = match.end()
            for idiom, emoji in idiom_questions[:count]:
                new_entry = '\\n    { idiom: "' + idiom + '", emoji: "' + emoji + '" },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)'''
    
    new_idiom_expand = '''    elif mode_type == 'idiom':
        # 检查现有题目，避免重复
        existing_idioms = set(re.findall(r'idiom:\\s*"([^"]+)"', js))
        match = re.search(r'(idioms:\\s*\\[)', js)
        if match:
            insert_pos = match.end()
            for idiom, emoji in idiom_questions[:count]:
                if idiom not in existing_idioms:  # 只新增不重复的题目
                    new_entry = '\\n    { idiom: "' + idiom + '", emoji: "' + emoji + '" },'
                    js = js[:insert_pos] + new_entry + js[insert_pos:]
                    insert_pos += len(new_entry)
                    existing_idioms.add(idiom)'''
    
    if old_idiom_expand in script:
        script = script.replace(old_idiom_expand, new_idiom_expand)
        print("✅ 修复成语新增逻辑（去重检查）")
    else:
        print("⚠️ 未找到成语新增代码（可能已修复）")
    
    with open(ENRICH_SCRIPT, 'w', encoding='utf-8') as f:
        f.write(script)
    
    return True

def cleanup_current_duplicates():
    """清理当前 game.js 中的重复题目"""
    
    with open(GAME_JS, 'r', encoding='utf-8') as f:
        js = f.read()
    
    # 清理词语重复
    words = re.findall(r'word:\s*"([^"]+)"', js)
    word_seen = set()
    word_removed = 0
    
    def replace_word_dup(match):
        nonlocal word_removed
        word = match.group(2)
        if word in word_seen:
            word_removed += 1
            return ''
        word_seen.add(word)
        return match.group(0)
    
    js = re.sub(r'(\{\s*word:\s*"([^"]+)"\s*,\s*hint:\s*"[^"]+"\s*(?:,\s*difficulty:\s*"[^"]+")?\s*\},?\s*\n?)', replace_word_dup, js)
    
    # 清理动物重复（排除游戏模式）
    game_modes = ['数字猜猜乐', '词语猜猜猜', '动物猜猜看', '成语猜猜乐']
    animals = re.findall(r'name:\s*"([^"]+)"', js)
    animal_seen = set()
    animal_removed = 0
    
    def replace_animal_dup(match):
        nonlocal animal_removed
        name = match.group(2)
        if name in game_modes:  # 保留游戏模式名称
            return match.group(0)
        if name in animal_seen:
            animal_removed += 1
            return ''
        animal_seen.add(name)
        return match.group(0)
    
    js = re.sub(r'(\{\s*name:\s*"([^"]+)"\s*,\s*hints:\s*\[[^\]]+\]\s*(?:\s*,\s*difficulty:\s*"[^"]+")?\s*\},?\s*\n?)', replace_animal_dup, js)
    
    # 清理成语重复
    idioms = re.findall(r'idiom:\s*"([^"]+)"', js)
    idiom_seen = set()
    idiom_removed = 0
    
    def replace_idiom_dup(match):
        nonlocal idiom_removed
        idiom = match.group(2)
        if idiom in idiom_seen:
            idiom_removed += 1
            return ''
        idiom_seen.add(idiom)
        return match.group(0)
    
    js = re.sub(r'(\{\s*idiom:\s*"([^"]+)"\s*,\s*emoji:\s*"[^"]+"\s*(?:,\s*difficulty:\s*"[^"]+")?\s*\},?\s*\n?)', replace_idiom_dup, js)
    
    with open(GAME_JS, 'w', encoding='utf-8') as f:
        f.write(js)
    
    total_removed = word_removed + animal_removed + idiom_removed
    print(f"🧹 清理完成：共删除 {total_removed} 个重复题目 (词语{word_removed}个，动物{animal_removed}个，成语{idiom_removed}个)")
    
    return total_removed

def main():
    print("🔧 开始修复统计 Bug 和重复题目问题...\n")
    
    # 1. 修复动物统计 Bug
    fix_animal_stats()
    
    # 2. 修复题目新增逻辑
    fix_duplicate_expansion()
    
    # 3. 清理当前重复题目
    cleanup_current_duplicates()
    
    print("\n✅ 修复完成！请运行 enrich_every_minute.py 测试")

if __name__ == "__main__":
    main()
