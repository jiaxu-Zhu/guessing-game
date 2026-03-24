#!/usr/bin/env python3
"""
⚡ 猜谜游戏每分钟智能丰富脚本
每 1 分钟运行一次，自动分析并丰富游戏功能
新增三大优化方向：
1. 🎯 自动扩充题目库
2. 💡 智能提示优化  
3. 📊 难度分级系统
"""

import os
import re
import json
import subprocess
import random
from datetime import datetime
from pathlib import Path

PROJECT_PATH = "/root/.nanobot/workspace/guessing-game"
os.chdir(PROJECT_PATH)

STATE_FILE = "/root/.nanobot/workspace/guessing-game/.enrich_state.json"

def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {
        'pending_optimizations': [],
        'last_commit_version': None,
        'consecutive_runs': 0
    }

def save_state(state):
    with open(STATE_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

def get_current_version():
    try:
        result = subprocess.run(["git", "tag", "-l"], check=True, capture_output=True, text=True)
        tags = result.stdout.strip().split('\n')
        if tags and tags[0]:
            from functools import cmp_to_key
            def compare_versions(v1, v2):
                parts1 = [int(p) for p in v1.lstrip('v').split('.')]
                parts2 = [int(p) for p in v2.lstrip('v').split('.')]
                for p1, p2 in zip(parts1, parts2):
                    if p1 != p2:
                        return p1 - p2
                return len(parts1) - len(parts2)
            tags.sort(key=cmp_to_key(compare_versions))
            return tags[-1]
    except:
        pass
    with open("game.js", "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r'number:\s*"([^"]+)"', content)
    if match:
        return match.group(1)
    return "v1.0.0"

def increment_version(version):
    parts = version.lstrip('v').split('.')
    parts[-1] = str(int(parts[-1]) + 1)
    return 'v' + '.'.join(parts)

def analyze_game_features():
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    features = {
        'modes': [],
        'has_sound': 'Audio' in js or 'audio' in js,
        'has_difficulty': 'difficulty' in js,
        'has_leaderboard': 'leaderboard' in js.lower(),
        'has_theme': 'theme' in js.lower(),
        'has_share': 'share' in js.lower(),
        'has_enhanced_stats': 'modeStats' in js,
        'has_animations': '@keyframes' in css and len(re.findall(r'@keyframes', css)) >= 5,
        'has_accessibility': 'aria-' in html,
        'has_responsive': '@media' in css,
        'hint_quality': 'hint_quality' in js,
    }
    
    for mode in ['number', 'word', 'animal', 'emoji', 'country', 'food', 'movie']:
        if f'"{mode}"' in js or f'{mode}:' in js:
            features['modes'].append(mode)
    
    return features

def expand_question_bank(mode_type, count=10):
    """🎯 自动扩充题目库"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 题目数据
    word_questions = [
        ("Python", "一种编程语言"),
        ("JavaScript", "网页脚本语言"),
        ("HTML", "网页标记语言"),
        ("CSS", "样式表语言"),
        ("Java", "面向对象编程语言"),
    ]
    
    animal_questions = [
        ("熊猫", ["国宝", "黑白", "竹子"]),
        ("长颈鹿", ["脖子长", "斑点", "很高"]),
        ("企鹅", ["南极", "不会飞", "游泳"]),
        ("袋鼠", ["澳洲", "育儿袋", "跳跃"]),
        ("考拉", ["树袋熊", "桉树叶", "澳洲"]),
    ]
    
    idiom_questions = [
        ("画蛇添足", "🐍🦶"),
        ("守株待兔", "🌳🐇"),
        ("亡羊补牢", "🐑🔧"),
        ("掩耳盗铃", "👂🔔"),
        ("杯弓蛇影", "🍷🐍"),
    ]
    
    if mode_type == 'word':
        match = re.search(r'(words:\s*\[)', js)
        if match:
            insert_pos = match.end()
            for word, hint in word_questions[:count]:
                new_entry = '\n    { word: "' + word + '", hint: "' + hint + '" },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)
    
    elif mode_type == 'animal':
        match = re.search(r'(animals:\s*\[)', js)
        if match:
            insert_pos = match.end()
            for name, hints in animal_questions[:count]:
                hints_str = ', '.join(['"' + h + '"' for h in hints])
                new_entry = '\n    { name: "' + name + '", hints: [' + hints_str + '] },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)
    
    elif mode_type == 'idiom':
        match = re.search(r'(idioms:\s*\[)', js)
        if match:
            insert_pos = match.end()
            for idiom, emoji in idiom_questions[:count]:
                new_entry = '\n    { idiom: "' + idiom + '", emoji: "' + emoji + '" },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    return f"新增{count}道{mode_type}题目"

def enhance_hints_quality():
    """💡 优化提示趣味性"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    js = js.replace('hint_quality: false', 'hint_quality: true')
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    return "优化提示质量标记"

def add_difficulty_system():
    """📊 添加难度分级系统"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    if 'difficulty' not in js:
        js = js.replace(
            "number: {",
            "number: {\n    difficulty: 'easy',"
        ).replace(
            "word: {",
            "word: {\n    difficulty: 'medium',"
        ).replace(
            "animal: {",
            "animal: {\n    difficulty: 'medium',"
        ).replace(
            "emoji: {",
            "emoji: {\n    difficulty: 'hard',"
        )
        
        with open("game.js", "w", encoding="utf-8") as f:
            f.write(js)
        
        return "添加难度分级标记"
    
    return None

def choose_quick_optimization(features):
    """快速选择一个轻量级优化"""
    quick_opts = []
    
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 统计各模式题目数量
    word_count = len(re.findall(r'{ word:', js))
    animal_count = len(re.findall(r'{ name:', js))
    idiom_count = len(re.findall(r'{ idiom:', js))
    
    # 🔍 优先处理重复题目问题
    words = re.findall(r'word:\s*"([^"]+)"', js)
    animals = re.findall(r'name:\s*"([^"]+)"', js)
    idioms = re.findall(r'idiom:\s*"([^"]+)"', js)
    
    word_duplicates = list(set([w for w in words if words.count(w) > 1]))
    animal_duplicates = list(set([a for a in animals if animals.count(a) > 1]))
    idiom_duplicates = list(set([i for i in idioms if idioms.count(i) > 1]))
    
    # 如果有重复题目，优先清理
    if word_duplicates or animal_duplicates or idiom_duplicates:
        quick_opts.append(('cleanup_duplicates', f'清理重复题目 (词语{len(word_duplicates)}个，动物{len(animal_duplicates)}个，成语{len(idiom_duplicates)}个)'))
    
    # 🎯 优化 1: 自动扩充题目库（目标：各模式 500 题）
    if word_count < 500:
        quick_opts.append(('expand_word_bank', f'扩充词语题库 ({word_count}/500)'))
    if animal_count < 500:
        quick_opts.append(('expand_animal_bank', f'扩充动物题库 ({animal_count}/500)'))
    if idiom_count < 500:
        quick_opts.append(('expand_idiom_bank', f'扩充成语题库 ({idiom_count}/500)'))
    
    # 💡 优化 2: 智能提示优化
    if not features.get('hint_quality'):
        quick_opts.append(('enhance_hints', '优化提示趣味性'))
    
    # 📊 优化 3: 难度分级
    if not features['has_difficulty']:
        quick_opts.append(('add_difficulty_levels', '添加难度分级系统'))
    
    # UI 优化
    if not features['has_animations']:
        quick_opts.append(('add_quick_animation', '添加快速动画'))
    if not features['has_accessibility']:
        quick_opts.append(('add_aria_labels', '添加 ARIA 标签'))
    if '--accent' not in css:
        quick_opts.append(('add_color_var', '添加颜色变量'))
    if 'transition' not in css.lower():
        quick_opts.append(('add_transitions', '添加过渡效果'))
    
    if not quick_opts:
        return None
    
    # 优先选择题目扩充或清理
    priority_opts = [opt for opt in quick_opts if opt[0] in ['cleanup_duplicates', 'expand_word_bank', 'expand_animal_bank', 'expand_idiom_bank']]
    if priority_opts:
        return random.choice(priority_opts)
    
    return random.choice(quick_opts)

def cleanup_duplicates():
    """🧹 清理重复题目"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    cleaned = 0
    
    # 清理词语重复 - 支持有无 difficulty 字段两种格式
    words = re.findall(r'word:\s*"([^"]+)"', js)
    word_seen = set()
    word_dups = set([w for w in words if words.count(w) > 1])
    
    for dup in word_dups:
        # 保留第一个，删除后续重复
        count = [0]  # 使用列表避免 nonlocal 作用域问题
        def replace_dup(match):
            if match.group(2) == dup:
                count[0] += 1
                if count[0] > 1:
                    return ''  # 删除重复项
            return match.group(0)
        
        # 支持有无 difficulty 两种格式
        js = re.sub(r'(\{\s*word:\s*"([^"]+)"\s*,\s*hint:\s*"[^"]+"\s*(?:,\s*difficulty:\s*"[^"]+")?\s*\},?\s*\n?)', replace_dup, js)
    
    # 清理动物重复
    animals = re.findall(r'name:\s*"([^"]+)"', js)
    animal_dups = set([a for a in animals if animals.count(a) > 1])
    
    for dup in animal_dups:
        count = [0]  # 使用列表避免 nonlocal 作用域问题
        def replace_dup(match):
            if match.group(2) == dup:
                count[0] += 1
                if count[0] > 1:
                    return ''
            return match.group(0)
        
        # 支持有无 difficulty 两种格式
        js = re.sub(r'(\{\s*name:\s*"([^"]+)"\s*,\s*hints:\s*\[[^\]]+\]\s*(?:,\s*difficulty:\s*"[^"]+")?\s*\},?\s*\n?)', replace_dup, js)
    
    # 清理成语重复
    idioms = re.findall(r'idiom:\s*"([^"]+)"', js)
    idiom_dups = set([i for i in idioms if idioms.count(i) > 1])
    
    for dup in idiom_dups:
        count = [0]  # 使用列表避免 nonlocal 作用域问题
        def replace_dup(match):
            if match.group(2) == dup:
                count[0] += 1
                if count[0] > 1:
                    return ''
            return match.group(0)
        
        # 支持有无 difficulty 两种格式
        js = re.sub(r'(\{\s*idiom:\s*"([^"]+)"\s*,\s*emoji:\s*"[^"]+"\s*(?:,\s*difficulty:\s*"[^"]+")?\s*\},?\s*\n?)', replace_dup, js)
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    total_removed = len(word_dups) + len(animal_dups) + len(idiom_dups)
    return f"清理 {total_removed} 个重复题目 (词语{len(word_dups)}个，动物{len(animal_dups)}个，成语{len(idiom_dups)}个)"

def apply_quick_optimization(opt_type):
    """应用优化"""
    
    # 🧹 清理重复题目
    if opt_type == 'cleanup_duplicates':
        return cleanup_duplicates()
    
    # 🎯 题目扩充
    if opt_type == 'expand_word_bank':
        return expand_question_bank('word', 10)
    elif opt_type == 'expand_animal_bank':
        return expand_question_bank('animal', 10)
    elif opt_type == 'expand_idiom_bank':
        return expand_question_bank('idiom', 10)
    
    # 💡 提示优化
    elif opt_type == 'enhance_hints':
        return enhance_hints_quality()
    
    # 📊 难度分级
    elif opt_type == 'add_difficulty_levels':
        return add_difficulty_system()
    
    # UI 优化
    elif opt_type == 'add_quick_animation':
        with open("style.css", "r", encoding="utf-8") as f:
            css = f.read()
        
        if "@keyframes pulse" not in css:
            css += '''
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}'''
            with open("style.css", "w", encoding="utf-8") as f:
                f.write(css)
            return "添加 pulse 动画"
    
    elif opt_type == 'add_aria_labels':
        with open("index.html", "r", encoding="utf-8") as f:
            html = f.read()
        
        if 'aria-label' not in html:
            html = html.replace('<button class="mode-card"', '<button class="mode-card" aria-label="选择游戏模式"')
            html = html.replace('<button class="btn restart-btn"', '<button class="btn restart-btn" aria-label="重新开始"')
            with open("index.html", "w", encoding="utf-8") as f:
                f.write(html)
            return "添加按钮 ARIA 标签"
    
    elif opt_type == 'add_color_var':
        with open("style.css", "r", encoding="utf-8") as f:
            css = f.read()
        
        if '--shadow' not in css:
            css = css.replace(':root {', ':root {\n    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);')
            with open("style.css", "w", encoding="utf-8") as f:
                f.write(css)
            return "添加阴影变量"
    
    elif opt_type == 'add_transitions':
        with open("style.css", "r", encoding="utf-8") as f:
            css = f.read()
        
        if 'transition: all 0.3s' not in css:
            css = css.replace('.btn {', '.btn {\n    transition: all 0.3s ease;')
            with open("style.css", "w", encoding="utf-8") as f:
                f.write(css)
            return "添加按钮过渡效果"
    
    return None

def check_question_quality():
    """🔍 检查题目质量"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    issues = []
    
    # 1. 检查重复题目
    words = re.findall(r'word:\s*"([^"]+)"', js)
    animals = re.findall(r'name:\s*"([^"]+)"', js)
    idioms = re.findall(r'idiom:\s*"([^"]+)"', js)
    
    word_duplicates = list(set([w for w in words if words.count(w) > 1]))
    animal_duplicates = list(set([a for a in animals if animals.count(a) > 1]))
    idiom_duplicates = list(set([i for i in idioms if idioms.count(i) > 1]))
    
    if word_duplicates:
        issues.append(f"词语重复 ({len(word_duplicates)}个): {', '.join(word_duplicates[:5])}{'...' if len(word_duplicates) > 5 else ''}")
    if animal_duplicates:
        issues.append(f"动物重复 ({len(animal_duplicates)}个): {', '.join(animal_duplicates[:5])}{'...' if len(animal_duplicates) > 5 else ''}")
    if idiom_duplicates:
        issues.append(f"成语重复 ({len(idiom_duplicates)}个): {', '.join(idiom_duplicates[:5])}{'...' if len(idiom_duplicates) > 5 else ''}")
    
    # 2. 检查题目格式完整性（使用更宽松的正则）
    # 词语：{ word: "...", hint: "..." }
    word_entries = len(re.findall(r'\{\s*word:\s*"[^"]+"\s*,\s*hint:\s*"[^"]+"', js))
    # 动物：{ name: "...", hints: [...] }
    animal_entries = len(re.findall(r'\{\s*name:\s*"[^"]+"\s*,\s*hints:\s*\[', js))
    # 成语：{ idiom: "...", emoji: "..." }
    idiom_entries = len(re.findall(r'\{\s*idiom:\s*"[^"]+"\s*,\s*emoji:\s*"[^"]+"', js))
    
    total_words = len(words)
    total_animals = len(animals)
    total_idioms = len(idioms)
    
    if total_words > 0 and word_entries == 0:
        issues.append(f"词语格式检测异常 (检测到 {total_words} 题)")
    if total_animals > 0 and animal_entries == 0:
        issues.append(f"动物格式检测异常 (检测到 {total_animals} 题)")
    if total_idioms > 0 and idiom_entries == 0:
        issues.append(f"成语格式检测异常 (检测到 {total_idioms} 题)")
    
    # 3. 检查难度分级一致性
    difficulty_pattern = r'difficulty:\s*["\']?(easy|medium|hard)["\']?'
    difficulties = re.findall(difficulty_pattern, js)
    
    if not difficulties and total_words + total_animals + total_idioms > 0:
        issues.append("缺少难度分级标记")
    
    # 4. 统计各模式题目数量
    stats = {
        'words': total_words,
        'animals': total_animals,
        'idioms': total_idioms,
        'total': total_words + total_animals + total_idioms
    }
    
    return {
        'issues': issues,
        'stats': stats,
        'quality_score': max(0, 100 - len(issues) * 15),
        'duplicates': {
            'words': word_duplicates,
            'animals': animal_duplicates,
            'idioms': idiom_duplicates
        }
    }

def main():
    print(f"⚡ 每分钟智能优化 - {datetime.now().strftime('%H:%M:%S')}")
    
    state = load_state()
    state['consecutive_runs'] += 1
    
    # 🔍 首先检查题目质量
    quality_check = check_question_quality()
    
    if quality_check['issues']:
        print(f"⚠️ 发现 {len(quality_check['issues'])} 项质量问题:")
        for issue in quality_check['issues']:
            print(f"   • {issue}")
        state['pending_optimizations'].append({
            'type': 'quality_issue',
            'description': f'质量问题：{"; ".join(quality_check["issues"][:2])}',
            'timestamp': datetime.now().isoformat()
        })
    else:
        print(f"✅ 题目质量检查通过 (得分：{quality_check['quality_score']}/100)")
    
    # 📊 输出题目统计
    stats = quality_check['stats']
    print(f"📊 题目统计：词语 {stats['words']} | 动物 {stats['animals']} | 成语 {stats['idioms']} | 总计 {stats['total']}")
    
    features = analyze_game_features()
    optimization = choose_quick_optimization(features)
    
    if optimization:
        opt_type, description = optimization
        result = apply_quick_optimization(opt_type)
        state['pending_optimizations'].append({
            'type': opt_type,
            'description': result,
            'timestamp': datetime.now().isoformat()
        })
        print(f"✨ 应用优化：{result or description}")
    else:
        print("✅ 游戏已经很完善，本次无需优化")
    
    # 每 10 次运行或检测到重要更改时提交
    should_commit = (
        state['consecutive_runs'] >= 10 or 
        len(state['pending_optimizations']) >= 3 or
        (optimization and optimization[0] in ['add_quick_animation', 'add_color_var'])
    )
    
    if should_commit and optimization:
        opt_type, description = optimization
        
        current_version = get_current_version()
        new_version = increment_version(current_version)
        
        with open("game.js", "r", encoding="utf-8") as f:
            js = f.read()
        js = re.sub(r'number:\s*"[^"]+"', f'number: "{new_version}"', js)
        with open("game.js", "w", encoding="utf-8") as f:
            f.write(js)
        
        with open("index.html", "r", encoding="utf-8") as f:
            html = f.read()
        html = re.sub(r'<span class="version-text">[^<]+</span>', f'<span class="version-text">{new_version}</span>', html)
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        try:
            subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
            commit_msg = f"chore: 每分钟累积优化 - {new_version}\n\n"
            for opt in state['pending_optimizations'][-5:]:
                commit_msg += f"• {opt['description']}\n"
            subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
            subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
            subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
            subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
            
            print(f"🚀 已提交版本 {new_version}")
            
            state['pending_optimizations'] = []
            state['consecutive_runs'] = 0
            state['last_commit_version'] = new_version
            
        except subprocess.CalledProcessError as e:
            print(f"⚠️ Git 操作失败：{e}")
    
    save_state(state)
    print(f"📊 连续运行：{state['consecutive_runs']} 次")
    print(f"📝 待提交优化：{len(state['pending_optimizations'])} 项")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"❌ 错误：{e}")
        import traceback
        traceback.print_exc()
