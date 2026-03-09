#!/usr/bin/env python3
"""🎯 为 guessing-game 添加难度分级系统（安全版）"""

import re
import subprocess

def main():
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    print("🔍 分析当前题目库...")
    
    # 统计当前数量
    word_count = len(re.findall(r'{ word:', js))
    animal_count = len(re.findall(r'{ name:', js))
    idiom_count = len(re.findall(r'{ idiom:', js))
    total = word_count + animal_count + idiom_count
    
    print(f"\n📊 当前题目数量:")
    print(f"  词语：{word_count} 题")
    print(f"  动物：{animal_count} 题")
    print(f"  成语：{idiom_count} 题")
    print(f"  总计：{total} 题")
    
    # 检查是否已有 difficulty 字段
    if 'difficulty: "easy"' in js or 'difficulty: "medium"' in js:
        print("\n✅ 难度分级系统已存在，跳过本次优化")
        return
    
    print("\n✨ 开始添加难度分级系统...")
    
    # 为词语添加难度（基于提示长度）
    def add_word_difficulty(match):
        full = match.group(0)
        hint_match = re.search(r'hint: "([^"]+)"', full)
        if hint_match:
            hint_len = len(hint_match.group(1))
            if hint_len < 15:
                diff = "easy"
            elif hint_len < 25:
                diff = "medium"
            else:
                diff = "hard"
            # 在 hint 后添加 difficulty
            return full.rstrip('}') + f', difficulty: "{diff}" }}'
        return full
    
    js = re.sub(r'\{ word: "[^"]+", hint: "[^"]+" \}', add_word_difficulty, js)
    
    # 为动物添加难度（基于提示数量）
    def add_animal_difficulty(match):
        full = match.group(0)
        hints_match = re.search(r'hints: \[([^\]]+)\]', full)
        if hints_match:
            hints_count = len(hints_match.group(1).split(','))
            if hints_count <= 2:
                diff = "easy"
            elif hints_count == 3:
                diff = "medium"
            else:
                diff = "hard"
            return full.rstrip('}') + f', difficulty: "{diff}" }}'
        return full
    
    js = re.sub(r'\{ name: "[^"]+", hints: \[[^\]]+\] \}', add_animal_difficulty, js)
    
    # 为成语添加难度（基于 emoji 复杂度）
    def add_idiom_difficulty(match):
        full = match.group(0)
        emoji_match = re.search(r'emoji: "([^"]+)"', full)
        if emoji_match:
            emoji_len = len(emoji_match.group(1))
            if emoji_len < 6:
                diff = "easy"
            elif emoji_len < 10:
                diff = "medium"
            else:
                diff = "hard"
            return full.rstrip('}') + f', difficulty: "{diff}" }}'
        return full
    
    js = re.sub(r'\{ idiom: "[^"]+", emoji: "[^"]+" \}', add_idiom_difficulty, js)
    
    # 保存文件
    with open("/root/.nanobot/workspace/guessing-game/game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    # 验证
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    easy_count = len(re.findall(r'difficulty: "easy"', js))
    medium_count = len(re.findall(r'difficulty: "medium"', js))
    hard_count = len(re.findall(r'difficulty: "hard"', js))
    
    print(f"\n✅ 难度分级系统添加完成！")
    print(f"📊 难度分布:")
    print(f"  🟢 简单 (easy): {easy_count} 题")
    print(f"  🟡 中等 (medium): {medium_count} 题")
    print(f"  🔴 困难 (hard): {hard_count} 题")
    print(f"  总计：{easy_count + medium_count + hard_count} 题")
    
    # Git 提交
    try:
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        
        result = subprocess.run(["git", "tag", "-l"], check=True, capture_output=True, text=True)
        tags = [t for t in result.stdout.strip().split('\n') if t]
        current_version = tags[-1] if tags else "v1.0.0"
        
        parts = current_version.lstrip('v').split('.')
        parts[-1] = str(int(parts[-1]) + 1)
        new_version = 'v' + '.'.join(parts)
        
        js = re.sub(r'number:\s*"[^"]+"', f'number: "{new_version}"', js)
        with open("/root/.nanobot/workspace/guessing-game/game.js", "w", encoding="utf-8") as f:
            f.write(js)
        
        with open("/root/.nanobot/workspace/guessing-game/index.html", "r", encoding="utf-8") as f:
            html = f.read()
        html = re.sub(r'<span class="version-text">[^<]+</span>', f'<span class="version-text">{new_version}</span>', html)
        with open("/root/.nanobot/workspace/guessing-game/index.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        commit_msg = f"feat: ✨ 添加难度分级系统 - {new_version}\n\n"
        commit_msg += f"📊 难度分布:\n"
        commit_msg += f"• 🟢 简单：{easy_count} 题\n"
        commit_msg += f"• 🟡 中等：{medium_count} 题\n"
        commit_msg += f"• 🔴 困难：{hard_count} 题\n"
        commit_msg += f"\n🎯 总题目数：{easy_count + medium_count + hard_count} 题\n"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
        subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
        
        print(f"\n🚀 已提交版本 {new_version}")
        
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Git 操作失败：{e}")

if __name__ == "__main__":
    main()
