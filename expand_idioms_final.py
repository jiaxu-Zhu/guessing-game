#!/usr/bin/env python3
"""🎯 完成成语题库扩充（最后几个）"""

import re
import subprocess

# 最后补充的成语
FINAL_IDIOMS = [
    ("一鼓作气", "1️⃣🥁💨"),
    ("一帆风顺", "1️⃣⛵✅"),
    ("一路顺风", "1️⃣路顺风"),
    ("一生一世", "1️⃣生 1️⃣世"),
    ("一心一意", "1️⃣心 1️⃣意"),
    ("一言为定", "1️⃣言定"),
]

def main():
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 统计当前数量
    idiom_count = len(re.findall(r'{ idiom:', js))
    existing_idioms = set(re.findall(r'{ idiom: "([^"]+)",', js))
    
    print(f"📊 当前成语数量：{idiom_count} / 150")
    
    # 去重
    new_idiom_entries = [(i, e) for i, e in FINAL_IDIOMS if i not in existing_idioms]
    
    print(f"🎯 需要添加：{len(new_idiom_entries)} 个新成语")
    
    # 添加成语
    if new_idiom_entries:
        match = re.search(r'(idioms:\s*\[)', js)
        if match:
            insert_pos = match.end()
            for idiom, emoji in new_idiom_entries:
                new_entry = '\n    { idiom: "' + idiom + '", emoji: "' + emoji + '" },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)
            print(f"✅ 已添加 {len(new_idiom_entries)} 个成语")
    
    # 保存文件
    with open("/root/.nanobot/workspace/guessing-game/game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    # 重新统计
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    word_count = len(re.findall(r'{ word:', js))
    animal_count = len(re.findall(r'{ name:', js))
    idiom_count = len(re.findall(r'{ idiom:', js))
    
    print(f"\n📊 最终题目数量:")
    print(f"  词语：{word_count} / 150 {'✅' if word_count >= 150 else '❌'}")
    print(f"  动物：{animal_count} / 100 {'✅' if animal_count >= 100 else '❌'}")
    print(f"  成语：{idiom_count} / 150 {'✅' if idiom_count >= 150 else '❌'}")
    
    total = word_count + animal_count + idiom_count
    print(f"\n🎮 总题目数：{total} 题")
    
    # Git 提交
    try:
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        
        # 获取当前版本
        result = subprocess.run(["git", "tag", "-l"], check=True, capture_output=True, text=True)
        tags = [t for t in result.stdout.strip().split('\n') if t]
        current_version = tags[-1] if tags else "v1.0.0"
        
        # 递增版本
        parts = current_version.lstrip('v').split('.')
        parts[-1] = str(int(parts[-1]) + 1)
        new_version = 'v' + '.'.join(parts)
        
        # 更新版本号
        js = re.sub(r'number:\s*"[^"]+"', f'number: "{new_version}"', js)
        with open("/root/.nanobot/workspace/guessing-game/game.js", "w", encoding="utf-8") as f:
            f.write(js)
        
        # 更新 HTML 版本
        with open("/root/.nanobot/workspace/guessing-game/index.html", "r", encoding="utf-8") as f:
            html = f.read()
        html = re.sub(r'<span class="version-text">[^<]+</span>', f'<span class="version-text">{new_version}</span>', html)
        with open("/root/.nanobot/workspace/guessing-game/index.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        commit_msg = f"feat: 🎯 完成题目库扩充 - {new_version}\n\n"
        commit_msg += f"📚 题目总数：{total} 题\n"
        commit_msg += f"• 词语：{word_count} 题 (目标 150)\n"
        commit_msg += f"• 动物：{animal_count} 题 (目标 100)\n"
        commit_msg += f"• 成语：{idiom_count} 题 (目标 150)\n"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
        subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
        
        print(f"\n🚀 已提交版本 {new_version}")
        print("✨ 题目库扩充任务完成！")
        
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Git 操作失败：{e}")

if __name__ == "__main__":
    main()
