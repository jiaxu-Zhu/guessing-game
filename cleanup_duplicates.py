#!/usr/bin/env python3
"""🧹 清理重复的动物题目"""

import re
import subprocess

def main():
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    print("🔍 检测重复动物题目...")
    
    # 提取所有动物
    animal_pattern = r'{ name: "([^"]+)", hints: \[([^\]]+)\], difficulty: "([^"]+)" }'
    animals = re.findall(animal_pattern, js)
    
    # 统计重复
    seen = {}
    duplicates = []
    for name, hints, diff in animals:
        if name in seen:
            duplicates.append(name)
        else:
            seen[name] = (hints, diff)
    
    print(f"📊 发现 {len(duplicates)} 个重复动物: {', '.join(set(duplicates))}")
    
    if duplicates:
        # 保留第一个，删除后面的
        for dup_name in set(duplicates):
            # 找到所有匹配
            pattern = r'{ name: "' + dup_name + r'", hints: \[[^\]]+\], difficulty: "[^"]+" }\n?'
            matches = list(re.finditer(pattern, js))
            if len(matches) > 1:
                # 删除从第二个开始的所有匹配
                for match in reversed(matches[1:]):
                    js = js[:match.start()] + js[match.end():]
                print(f"  ✅ 已清理重复: {dup_name}")
    
    # 保存
    with open("/root/.nanobot/workspace/guessing-game/game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    # 重新统计
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    word_count = len(re.findall(r'{ word:', js))
    animal_count = len(re.findall(r'{ name:', js))
    idiom_count = len(re.findall(r'{ idiom:', js))
    total = word_count + animal_count + idiom_count
    
    print(f"\n📊 清理后题目数量:")
    print(f"  词语：{word_count} 题")
    print(f"  动物：{animal_count} 题")
    print(f"  成语：{idiom_count} 题")
    print(f"  总计：{total} 题")
    
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
        html = re.sub(r'style\.css\?v=[\d.]+', f'style.css?v={new_version.lstrip("v")}', html)
        with open("/root/.nanobot/workspace/guessing-game/index.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        commit_msg = f"fix: 🧹 清理重复动物题目 - {new_version}\n\n"
        commit_msg += f"📊 清理后总数：{total} 题\n"
        commit_msg += f"• 删除重复动物：{len(set(duplicates))} 个\n"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
        subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
        
        print(f"\n🚀 已提交版本 {new_version}")
        
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Git 操作失败：{e}")

if __name__ == "__main__":
    main()
