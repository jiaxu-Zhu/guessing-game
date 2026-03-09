#!/usr/bin/env python3
"""🐛 猜谜游戏性能监控和 Bug 检测脚本"""

import os
import re
import subprocess
from datetime import datetime

PROJECT_PATH = "/root/.nanobot/workspace/guessing-game"
os.chdir(PROJECT_PATH)

def check_js_errors():
    """检查 JavaScript 语法错误"""
    errors = []
    
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 检查括号匹配
    open_braces = js.count('{')
    close_braces = js.count('}')
    if open_braces != close_braces:
        errors.append(f"括号不匹配: {{ {open_braces} 个, }} {close_braces} 个")
    
    # 检查引号匹配
    single_quotes = js.count("'")
    double_quotes = js.count('"')
    if single_quotes % 2 != 0:
        errors.append("单引号数量为奇数")
    if double_quotes % 2 != 0:
        errors.append("双引号数量为奇数")
    
    # 检查常见错误模式
    if re.search(r'\bvar\s+\b', js):
        errors.append("发现 var 关键字，建议使用 let 或 const")
    
    # 检查未闭合的字符串
    lines = js.split('\n')
    for i, line in enumerate(lines, 1):
        if line.count('"') % 2 != 0 and not line.strip().startswith('//'):
            errors.append(f"第 {i} 行可能有未闭合的字符串")
    
    return errors

def check_css_errors():
    """检查 CSS 语法错误"""
    errors = []
    
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 检查括号匹配
    open_braces = css.count('{')
    close_braces = css.count('}')
    if open_braces != close_braces:
        errors.append(f"CSS 括号不匹配: {{ {open_braces} 个, }} {close_braces} 个")
    
    # 检查分号
    lines = css.split('\n')
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped and not stripped.startswith('/*') and not stripped.endswith('*/'):
            if '{' not in stripped and '}' not in stripped:
                if stripped and not stripped.endswith(';') and not stripped.endswith(','):
                    if ':' in stripped:
                        errors.append(f"第 {i} 行可能缺少分号: {stripped[:30]}...")
    
    return errors

def check_html_errors():
    """检查 HTML 语法错误"""
    errors = []
    
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    # 检查标签匹配（简单检查）
    tags = re.findall(r'<([a-zA-Z][^>\s]*)[^>]*>', html)
    closing_tags = re.findall(r'</([a-zA-Z][^>]*)>', html)
    
    # 检查自闭合标签
    self_closing = ['meta', 'link', 'br', 'hr', 'img', 'input']
    
    for tag in set(tags):
        if tag not in self_closing:
            open_count = tags.count(tag)
            close_count = closing_tags.count(tag)
            if open_count != close_count:
                errors.append(f"<{tag}> 标签不匹配: 开 {open_count}, 闭 {close_count}")
    
    # 检查版本号一致性
    css_version = re.search(r'style\.css\?v=([\d.]+)', html)
    html_version = re.search(r'v([\d.]+)</span>', html)
    
    if css_version and html_version:
        if css_version.group(1) != html_version.group(1):
            errors.append(f"版本号不一致: CSS {css_version.group(1)} vs HTML {html_version.group(1)}")
    
    return errors

def check_performance():
    """检查性能问题"""
    issues = []
    
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 检查大文件
    file_size = os.path.getsize("game.js")
    if file_size > 500000:  # 500KB
        issues.append(f"game.js 文件过大: {file_size/1024:.1f}KB")
    
    # 检查重复代码
    lines = js.split('\n')
    unique_lines = set(lines)
    if len(lines) - len(unique_lines) > 50:
        issues.append(f"发现 {len(lines) - len(unique_lines)} 行重复代码")
    
    # 检查 console.log
    console_logs = len(re.findall(r'console\.log', js))
    if console_logs > 5:
        issues.append(f"发现 {console_logs} 个 console.log，建议清理")
    
    return issues

def main():
    print(f"🐛 Bug 检测与性能监控 - {datetime.now().strftime('%H:%M:%S')}\n")
    
    print("📋 开始检测...")
    
    # JavaScript 检查
    js_errors = check_js_errors()
    if js_errors:
        print(f"  ⚠️ JavaScript 错误: {len(js_errors)} 项")
        for err in js_errors[:3]:
            print(f"    - {err}")
    else:
        print("  ✅ JavaScript 检查通过")
    
    # CSS 检查
    css_errors = check_css_errors()
    if css_errors:
        print(f"  ⚠️ CSS 错误: {len(css_errors)} 项")
        for err in css_errors[:3]:
            print(f"    - {err}")
    else:
        print("  ✅ CSS 检查通过")
    
    # HTML 检查
    html_errors = check_html_errors()
    if html_errors:
        print(f"  ⚠️ HTML 错误: {len(html_errors)} 项")
        for err in html_errors[:3]:
            print(f"    - {err}")
    else:
        print("  ✅ HTML 检查通过")
    
    # 性能检查
    perf_issues = check_performance()
    if perf_issues:
        print(f"  ⚠️ 性能问题: {len(perf_issues)} 项")
        for issue in perf_issues[:3]:
            print(f"    - {issue}")
    else:
        print("  ✅ 性能检查通过")
    
    total_errors = len(js_errors) + len(css_errors) + len(html_errors)
    
    print(f"\n==================================================")
    print(f"📊 检测结果:")
    print(f"  错误总数: {total_errors}")
    print(f"  性能问题: {len(perf_issues)}")
    print(f"  已修复: 0")
    print(f"==================================================")
    
    # 如果有错误，尝试自动修复
    if total_errors > 0:
        print("\n🔧 尝试自动修复...")
        # 这里可以添加自动修复逻辑
        print("  ⚠️ 自动修复功能开发中")
    
    return total_errors == 0

if __name__ == "__main__":
    main()
