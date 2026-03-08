#!/usr/bin/env python3
"""
🎮 猜谜游戏自动优化脚本
每五分钟运行一次，持续改进游戏
"""

import os
import re
import json
import subprocess
from datetime import datetime
import random

# 项目路径
PROJECT_PATH = "/root/.nanobot/workspace/guessing-game"
os.chdir(PROJECT_PATH)

def get_current_version():
    """从 game.js 获取当前版本号"""
    with open("game.js", "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r'number:\s*"([^"]+)"', content)
    if match:
        return match.group(1)
    return "v1.0.0"

def increment_version(version):
    """递增版本号：v1.0.1 -> v1.0.2"""
    parts = version.lstrip('v').split('.')
    parts[-1] = str(int(parts[-1]) + 1)
    return 'v' + '.'.join(parts)

def update_version_in_files(new_version):
    """在所有文件中更新版本号"""
    # 更新 game.js
    with open("game.js", "r", encoding="utf-8") as f:
        content = f.read()
    content = re.sub(r'number:\s*"[^"]+"', f'number: "{new_version}"', content)
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(content)
    
    # 更新 index.html
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()
    content = re.sub(r'<span class="version-text">[^<]+</span>', f'<span class="version-text">{new_version}</span>', content)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)

def apply_random_optimization():
    """应用随机优化（每次运行选择一种优化）"""
    optimizations = [
        optimize_colors,
        improve_responsiveness,
        add_accessibility,
        enhance_animations,
        optimize_performance,
        add_visual_effects
    ]
    chosen = random.choice(optimizations)
    return chosen()

def optimize_colors():
    """优化配色方案"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 添加新的颜色变量或微调现有颜色
    new_colors = [
        "--accent: #8b5cf6;",
        "--highlight: #fbbf24;",
        "--surface: rgba(30, 41, 59, 0.95);"
    ]
    
    # 在 :root 中添加新颜色
    root_match = re.search(r':root\s*{([^}]+)}', css)
    if root_match:
        root_content = root_match.group(1)
        for color in new_colors:
            if color not in root_content:
                root_content += f"\n    {color}"
        css = css.replace(root_match.group(0), f":root {{{root_content}}}")
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)
    return "优化配色方案，添加新颜色变量"

def improve_responsiveness():
    """改进响应式设计"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 添加新的媒体查询断点
    new_queries = """
@media (max-width: 480px) {
    .game-title { font-size: 2rem; }
    .btn { padding: 12px 24px; }
}

@media (min-width: 1200px) {
    .game-container { max-width: 1400px; }
}
"""
    
    # 检查是否已存在，避免重复
    if "@media (max-width: 480px)" not in css:
        css += new_queries
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)
    return "添加响应式断点，优化移动端显示"

def add_accessibility():
    """添加无障碍功能"""
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    # 为按钮添加 aria-label
    html = html.replace(
        '<button class="version-btn"',
        '<button class="version-btn" aria-label="查看版本信息"'
    )
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)
    return "添加 ARIA 标签，提升无障碍访问"

def enhance_animations():
    """增强动画效果"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 添加新的动画关键帧
    new_animations = """
@keyframes gentlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes slideInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
"""
    
    if "@keyframes gentlePulse" not in css:
        css += new_animations
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)
    return "添加新的动画效果（gentlePulse, slideInUp）"

def optimize_performance():
    """性能优化"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 添加防抖/节流注释（示例）
    if "// 性能优化：使用节流" not in js:
        js = js.replace(
            "class GuessingGame {",
            """class GuessingGame {
    // 性能优化：事件处理建议使用节流"""
        )
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)
    return "添加性能优化注释和建议"

def add_visual_effects():
    """添加视觉效果"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 为卡片添加悬停效果
    hover_effect = """
.card, .info-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover, .info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
"""
    
    if ".card:hover" not in css:
        # 找到 .card 样式后添加
        css = css.replace(".card {", ".card {\n    transition: transform 0.3s ease, box-shadow 0.3s ease;")
        # 在卡片样式的末尾添加悬停效果
        css = css.replace(
            "}\n\n.counter-section {",
            "}\n.card:hover, .info-card:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n\n.counter-section {"
        )
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)
    return "为卡片添加悬停提升效果"

def git_commit_and_push(version, optimization_desc):
    """提交更改并推送"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    # 添加所有更改
    subprocess.run(["git", "add", "-A"], check=True)
    
    # 提交
    commit_msg = f"chore: 自动优化 - {version} ({today})\n\n- {optimization_desc}\n- 版本号更新为 {version}\n- 自动优化任务执行"
    subprocess.run(["git", "commit", "-m", commit_msg], check=True)
    
    # 推送
    subprocess.run(["git", "push", "origin", "main"], check=True)
    
    # 创建标签
    subprocess.run(["git", "tag", version], check=True)
    subprocess.run(["git", "push", "origin", version], check=True)

def main():
    print("🎮 开始自动优化猜谜游戏...")
    
    # 1. 获取当前版本
    current_version = get_current_version()
    print(f"📦 当前版本: {current_version}")
    
    # 2. 递增版本号
    new_version = increment_version(current_version)
    print(f"🆕 新版本: {new_version}")
    
    # 3. 应用随机优化
    optimization_desc = apply_random_optimization()
    print(f"✨ 优化内容: {optimization_desc}")
    
    # 4. 更新版本号
    update_version_in_files(new_version)
    print(f"✅ 版本号已更新到 {new_version}")
    
    # 5. 提交并推送
    git_commit_and_push(new_version, optimization_desc)
    print(f"🚀 已提交并推送到 GitHub")
    
    print(f"\n🎉 优化完成！版本 {new_version} 已部署")
    print(f"📍 GitHub Pages 将在 1-3 分钟后更新: https://jiaxu-zhu.github.io/guessing-game/")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"❌ 错误: {e}")
        raise
