#!/usr/bin/env python3
"""
⚡ 猜谜游戏每分钟智能丰富脚本
每1分钟运行一次，自动分析并丰富游戏功能
相比5分钟版本，此脚本更轻量，累积多次优化后提交
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

# 状态文件，记录累积的优化
STATE_FILE = "/root/.nanobot/workspace/guessing-game/.enrich_state.json"

def load_state():
    """加载状态文件"""
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {
        'pending_optimizations': [],
        'last_commit_version': None,
        'consecutive_runs': 0
    }

def save_state(state):
    """保存状态文件"""
    with open(STATE_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

def get_current_version():
    """从 git tag 获取当前版本号"""
    try:
        result = subprocess.run(["git", "tag", "-l"], check=True, capture_output=True, text=True)
        tags = result.stdout.strip().split('\n')
        if tags and tags[0]:
            # 按版本号排序，获取最新的
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
    # 回退：从 game.js 获取
    with open("game.js", "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r'number:\s*"([^"]+)"', content)
    if match:
        return match.group(1)
    return "v1.0.0"

def increment_version(version):
    """递增版本号"""
    parts = version.lstrip('v').split('.')
    parts[-1] = str(int(parts[-1]) + 1)
    return 'v' + '.'.join(parts)

def analyze_game_features():
    """快速分析当前游戏功能"""
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
    }
    
    # 检测游戏模式
    for mode in ['number', 'word', 'animal', 'emoji', 'country', 'food', 'movie']:
        if f'"{mode}"' in js or f'{mode}:' in js:
            features['modes'].append(mode)
    
    return features

def choose_quick_optimization(features):
    """快速选择一个轻量级优化"""
    quick_opts = []
    
    # 读取CSS内容用于检查
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 轻量级优化（不修改核心结构）
    if not features['has_animations']:
        quick_opts.append(('add_quick_animation', '添加快速动画'))
    if not features['has_accessibility']:
        quick_opts.append(('add_aria_labels', '添加ARIA标签'))
    if len(features['modes']) < 5:
        quick_opts.append(('add_mode_hint', '增强模式提示'))
    if '--accent' not in css:
        quick_opts.append(('add_color_var', '添加颜色变量'))
    if 'transition' not in css.lower():
        quick_opts.append(('add_transitions', '添加过渡效果'))
    
    # 如果都有，返回 None 表示本次无需优化
    if not quick_opts:
        return None
    
    return random.choice(quick_opts)

def apply_quick_optimization(opt_type):
    """应用轻量级优化"""
    
    if opt_type == 'add_quick_animation':
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
            return "添加按钮ARIA标签"
    
    elif opt_type == 'add_mode_hint':
        with open("index.html", "r", encoding="utf-8") as f:
            html = f.read()
        
        # 为模式卡片添加更详细的描述
        if 'mode-description' not in html:
            html = html.replace('<p>猜一个1-100的数字</p>', '<p class="mode-description">猜一个1-100的数字，考验你的运气！</p>')
            html = html.replace('<p>根据提示猜词语</p>', '<p class="mode-description">根据提示猜词语，考验你的词汇量！</p>')
            with open("index.html", "w", encoding="utf-8") as f:
                f.write(html)
            return "增强模式描述"
    
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

def main():
    print(f"⚡ 每分钟智能优化 - {datetime.now().strftime('%H:%M:%S')}")
    
    # 加载状态
    state = load_state()
    state['consecutive_runs'] += 1
    
    # 分析当前状态
    features = analyze_game_features()
    
    # 选择优化
    optimization = choose_quick_optimization(features)
    
    if optimization:
        opt_type, description = optimization
        result = apply_quick_optimization(opt_type)
        state['pending_optimizations'].append({
            'type': opt_type,
            'description': result,
            'timestamp': datetime.now().isoformat()
        })
        print(f"✨ 应用优化: {result or description}")
    else:
        print("✅ 游戏已经很完善，本次无需优化")
    
    # 每10次运行或检测到重要更改时提交
    if (state['consecutive_runs'] >= 10 or 
        len(state['pending_optimizations']) >= 3 or
        (optimization and opt_type in ['add_quick_animation', 'add_color_var'])):
        
        current_version = get_current_version()
        new_version = increment_version(current_version)
        
        # 更新版本号
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
        
        # 提交
        try:
            subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
            commit_msg = f"chore: 每分钟累积优化 - {new_version}\n\n"
            for opt in state['pending_optimizations'][-5:]:  # 只显示最近5条
                commit_msg += f"• {opt['description']}\n"
            subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
            subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
            subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
            subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
            
            print(f"🚀 已提交版本 {new_version}")
            
            # 重置状态
            state['pending_optimizations'] = []
            state['consecutive_runs'] = 0
            state['last_commit_version'] = new_version
            
        except subprocess.CalledProcessError as e:
            print(f"⚠️ Git操作失败: {e}")
    
    # 保存状态
    save_state(state)
    print(f"📊 连续运行: {state['consecutive_runs']} 次")
    print(f"📝 待提交优化: {len(state['pending_optimizations'])} 项")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"❌ 错误: {e}")
        import traceback
        traceback.print_exc()
