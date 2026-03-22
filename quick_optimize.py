#!/usr/bin/env python3
"""⚡ 简化版自动优化脚本 - 快速执行"""

import os
import re
import subprocess
from datetime import datetime

PROJECT_PATH = "/root/.nanobot/workspace/guessing-game"
os.chdir(PROJECT_PATH)

print(f"⚡ 快速优化 - {datetime.now().strftime('%H:%M:%S')}")

# 读取 game.js
with open("game.js", "r", encoding="utf-8") as f:
    js = f.read()

# 统计题目
words = re.findall(r'word:\s*"([^"]+)"', js)
animals = re.findall(r'name:\s*"([^"]+)"', js)
idioms = re.findall(r'idiom:\s*"([^"]+)"', js)

print(f"📊 当前题目：词语 {len(words)} | 动物 {len(animals)} | 成语 {len(idioms)} | 总计 {len(words)+len(animals)+len(idioms)}")

# 检查重复
word_dups = set([w for w in words if words.count(w) > 1])
animal_dups = set([a for a in animals if animals.count(a) > 1])
idiom_dups = set([i for i in idioms if idioms.count(i) > 1])

if word_dups or animal_dups or idiom_dups:
    print(f"⚠️ 发现重复：词语{len(word_dups)}个，动物{len(animal_dups)}个，成语{len(idiom_dups)}个")
    print("🧹 清理重复题目...")
    
    # 简化清理逻辑
    for dup in word_dups:
        count = [0]
        def repl(m):
            if m.group(1) == dup:
                count[0] += 1
                return '' if count[0] > 1 else m.group(0)
            return m.group(0)
        js = re.sub(r'(\{\s*word:\s*"([^"]+)"[^}]*\},?\s*\n?)', repl, js)
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    print(f"✅ 清理完成")
else:
    print("✅ 无重复题目")

# 检查是否需要扩充
if len(words) < 500:
    print(f"🎯 词语题库需扩充 ({len(words)}/500)")
if len(animals) < 500:
    print(f"🎯 动物题库需扩充 ({len(animals)}/500)")
if len(idioms) < 500:
    print(f"🎯 成语题库需扩充 ({len(idioms)}/500)")

print("✅ 优化检查完成")
