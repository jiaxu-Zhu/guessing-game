#!/usr/bin/env python3
"""
🐛 猜谜游戏 Bug 检测和自动修复脚本
每 10 分钟运行一次，自动检测并修复代码中的问题
"""

import os
import re
import json
import subprocess
from datetime import datetime
from pathlib import Path

PROJECT_PATH = "/root/.nanobot/workspace/guessing-game"
os.chdir(PROJECT_PATH)

def get_current_version():
    """获取当前版本号"""
    try:
        result = subprocess.run(["git", "tag", "-l"], check=True, capture_output=True, text=True)
        tags = result.stdout.strip().split('\n')
        if tags and tags[-1]:
            return tags[-1]
    except:
        pass
    with open("game.js", "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r'number:\s*"([^"]+)"', content)
    return match.group(1) if match else "v1.0.0"

def increment_version(version):
    """递增版本号"""
    parts = version.lstrip('v').split('.')
    parts[-1] = str(int(parts[-1]) + 1)
    return 'v' + '.'.join(parts)

def check_syntax_errors():
    """检查 JavaScript 语法错误"""
    errors = []
    
    # 读取 JS 文件
    try:
        with open("game.js", "r", encoding="utf-8") as f:
            js_content = f.read()
        
        # 检查未闭合的括号
        open_parens = js_content.count('(')
        close_parens = js_content.count(')')
        if open_parens != close_parens:
            errors.append(f"JS 括号不匹配: ({open_parens} vs {close_parens})")
        
        # 检查未闭合的大括号
        open_braces = js_content.count('{')
        close_braces = js_content.count('}')
        if open_braces != close_braces:
            errors.append(f"JS 大括号不匹配: {{{open_braces} vs {close_braces}}}")
        
        # 检查未闭合的方括号
        open_brackets = js_content.count('[')
        close_brackets = js_content.count(']')
        if open_brackets != close_brackets:
            errors.append(f"JS 方括号不匹配: [{open_brackets} vs {close_brackets}]")
        
        # 检查常见的语法问题
        if 'undefined' in js_content and 'typeof' not in js_content:
            errors.append("可能存在未定义的变量引用")
        
        # 检查空函数体
        if re.search(r'function\s+\w+\s*\(\)\s*\{\s*\}', js_content):
            errors.append("发现空函数体")
        
    except Exception as e:
        errors.append(f"读取 game.js 失败: {str(e)}")
    
    return errors

def check_css_errors():
    """检查 CSS 样式错误"""
    errors = []
    
    try:
        with open("style.css", "r", encoding="utf-8") as f:
            css_content = f.read()
        
        # 检查未闭合的选择器块
        open_braces = css_content.count('{')
        close_braces = css_content.count('}')
        if open_braces != close_braces:
            errors.append(f"CSS 大括号不匹配: {{{open_braces} vs {close_braces}}}")
        
        # 检查缺少分号的声明（在行尾）
        lines = css_content.split('\n')
        for i, line in enumerate(lines):
            line = line.strip()
            if line and not line.endswith('{') and not line.endswith('}') and not line.endswith(';') and not line.startswith('//'):
                if ':' in line and not line.startswith('@'):
                    errors.append(f"CSS 第{i+1}行可能缺少分号: {line[:50]}")
        
        # 检查无效的颜色值
        color_pattern = r'color:\s*#[0-9a-fA-F]{3,6}'
        if not re.search(color_pattern, css_content):
            # 检查是否有颜色定义但没有使用标准格式
            if 'color:' in css_content:
                errors.append("CSS 可能存在非标准的颜色定义")
        
    except Exception as e:
        errors.append(f"读取 style.css 失败: {str(e)}")
    
    return errors

def check_html_errors():
    """检查 HTML 结构错误"""
    errors = []
    
    try:
        with open("index.html", "r", encoding="utf-8") as f:
            html_content = f.read()
        
        # 自闭合标签列表（不需要结束标签）
        self_closing_tags = ['input', 'br', 'hr', 'img', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr']
        
        # 检查非自闭合标签是否匹配
        common_tags = ['div', 'span', 'p', 'button', 'input', 'script', 'style', 'header', 'footer', 'main', 'section', 'article', 'nav', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        for tag in common_tags:
            if tag in self_closing_tags:
                # 对于自闭合标签，只检查开始标签是否存在，不检查结束标签
                open_count = len(re.findall(f'<{tag}(?:\\s[^>]*)?>', html_content, re.IGNORECASE))
                # 自闭合标签应该存在，但不应该有结束标签
                close_count = len(re.findall(f'</{tag}>', html_content, re.IGNORECASE))
                if close_count > 0:
                    errors.append(f"HTML <{tag}> 不应有结束标签，但发现 {close_count} 个")
            else:
                # 对于普通标签，检查开始和结束标签是否匹配
                open_count = len(re.findall(f'<{tag}(?:\\s[^>]*)?>', html_content, re.IGNORECASE))
                close_count = len(re.findall(f'</{tag}>', html_content, re.IGNORECASE))
                if open_count != close_count:
                    errors.append(f"HTML <{tag}> 标签不匹配: {open_count} vs {close_count}")
        
        # 检查缺少 DOCTYPE
        if not html_content.upper().startswith('<!DOCTYPE'):
            errors.append("HTML 缺少 DOCTYPE 声明")
        
        # 检查缺少 meta viewport
        if 'viewport' not in html_content.lower():
            errors.append("HTML 缺少 viewport meta 标签（移动端适配）")
        
    except Exception as e:
        errors.append(f"读取 index.html 失败: {str(e)}")
    
    return errors

def check_performance_issues():
    """检查性能问题"""
    issues = []
    
    try:
        with open("style.css", "r", encoding="utf-8") as f:
            css_size = os.path.getsize("style.css")
        
        if css_size > 50000:  # 50KB
            issues.append(f"CSS 文件过大: {css_size / 1024:.1f}KB (建议 < 50KB)")
        
        with open("game.js", "r", encoding="utf-8") as f:
            js_size = os.path.getsize("game.js")
        
        if js_size > 100000:  # 100KB
            issues.append(f"JS 文件过大: {js_size / 1024:.1f}KB (建议 < 100KB)")
        
    except Exception as e:
        issues.append(f"检查文件大小失败: {str(e)}")
    
    return issues

def auto_fix_js():
    """自动修复 JS 常见问题"""
    fixes = []
    
    try:
        with open("game.js", "r", encoding="utf-8") as f:
            content = f.read()
        
        original = content
        
        # 修复常见的缩进问题
        content = re.sub(r'\n\s{6,}', '\n    ', content)
        
        # 修复多余的空行
        content = re.sub(r'\n{4,}', '\n\n\n', content)
        
        # 确保文件末尾有换行
        if not content.endswith('\n'):
            content += '\n'
        
        if content != original:
            with open("game.js", "w", encoding="utf-8") as f:
                f.write(content)
            fixes.append("修复 JS 格式问题")
        
    except Exception as e:
        fixes.append(f"JS 修复失败: {str(e)}")
    
    return fixes

def auto_fix_css():
    """自动修复 CSS 常见问题"""
    fixes = []
    
    try:
        with open("style.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        original = content
        
        # 修复 CSS 变量定义格式
        content = re.sub(r'--\w+:\s+', lambda m: m.group(0).replace(' ', ''), content)
        
        # 确保文件末尾有换行
        if not content.endswith('\n'):
            content += '\n'
        
        if content != original:
            with open("style.css", "w", encoding="utf-8") as f:
                f.write(content)
            fixes.append("修复 CSS 格式问题")
        
    except Exception as e:
        fixes.append(f"CSS 修复失败: {str(e)}")
    
    return fixes

def commit_fixes(fixes, issues):
    """提交修复"""
    try:
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
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        
        commit_msg = f"fix: Bug 检测与自动修复 - {new_version}\n\n"
        if fixes:
            commit_msg += "🔧 修复内容:\n"
            for fix in fixes:
                commit_msg += f"• {fix}\n"
        if issues:
            commit_msg += "\n⚠️ 发现的问题:\n"
            for issue in issues:
                commit_msg += f"• {issue}\n"
        
        subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
        subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
        
        return f"已提交版本 {new_version}"
    
    except subprocess.CalledProcessError as e:
        return f"Git 操作失败: {str(e)}"
    except Exception as e:
        return f"提交失败: {str(e)}"

def main():
    print(f"🐛 Bug 检测与自动修复 - {datetime.now().strftime('%H:%M:%S')}")
    
    all_errors = []
    all_issues = []
    all_fixes = []
    
    # 检查各类错误
    print("\n📋 开始检测...")
    
    js_errors = check_syntax_errors()
    if js_errors:
        all_errors.extend(js_errors)
        print(f"  ⚠️ JS 错误: {len(js_errors)} 项")
    
    css_errors = check_css_errors()
    if css_errors:
        all_errors.extend(css_errors)
        print(f"  ⚠️ CSS 错误: {len(css_errors)} 项")
    
    html_errors = check_html_errors()
    if html_errors:
        all_errors.extend(html_errors)
        print(f"  ⚠️ HTML 错误: {len(html_errors)} 项")
    
    perf_issues = check_performance_issues()
    if perf_issues:
        all_issues.extend(perf_issues)
        print(f"  📊 性能问题: {len(perf_issues)} 项")
    
    # 如果有错误，尝试自动修复
    if all_errors or all_issues:
        print("\n🔧 开始自动修复...")
        
        js_fixes = auto_fix_js()
        all_fixes.extend(js_fixes)
        
        css_fixes = auto_fix_css()
        all_fixes.extend(css_fixes)
        
        print(f"  ✅ 完成修复: {len(all_fixes)} 项")
        
        # 提交修复
        print("\n📤 提交修复...")
        result = commit_fixes(all_fixes, all_errors + all_issues)
        print(f"  {result}")
    else:
        print("\n✅ 代码健康，未发现明显问题！")
    
    # 总结
    print(f"\n{'='*50}")
    print(f"📊 检测结果:")
    print(f"  错误总数: {len(all_errors)}")
    print(f"  性能问题: {len(all_issues)}")
    print(f"  已修复: {len(all_fixes)}")
    print(f"{'='*50}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"❌ 脚本执行失败: {e}")
        import traceback
        traceback.print_exc()
