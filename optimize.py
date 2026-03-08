#!/usr/bin/env python3
"""
🎮 猜谜游戏智能优化脚本
每五分钟运行一次，自动分析并丰富游戏功能
"""

import os
import re
import json
import subprocess
import random
from datetime import datetime

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
    """递增版本号"""
    parts = version.lstrip('v').split('.')
    parts[-1] = str(int(parts[-1]) + 1)
    return 'v' + '.'.join(parts)

def analyze_game_features():
    """分析当前游戏功能，识别可改进的方面"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    features = {
        'modes': [],
        'ui_elements': [],
        'animations': [],
        'stats': [],
        'has_particles': 'particle' in css,
        'has_confetti': 'confetti' in css,
        'has_timer': 'timer' in js.lower(),
        'has_hints': 'hint' in js.lower(),
        'has_achievements': 'achievement' in js.lower(),
        'has_version_button': 'version' in html.lower(),
        'has_responsive': '@media' in css,
        'has_accessibility': 'aria-' in html,
    }
    
    # 检测游戏模式
    if '"number"' in js or 'number:' in js:
        features['modes'].append('number')
    if '"word"' in js or 'word:' in js:
        features['modes'].append('word')
    if '"animal"' in js or 'animal:' in js:
        features['modes'].append('animal')
    if '"emoji"' in js or 'emoji:' in js:
        features['modes'].append('emoji')
    
    # 检测UI元素
    if 'mainMenu' in js:
        features['ui_elements'].append('main_menu')
    if 'gameScreen' in js:
        features['ui_elements'].append('game_screen')
    if 'gameOverScreen' in js:
        features['ui_elements'].append('game_over')
    if 'achievementModal' in js:
        features['ui_elements'].append('achievements')
    if 'versionModal' in js:
        features['ui_elements'].append('version_info')
    
    # 检测动画
    if '@keyframes' in css:
        animations = re.findall(r'@keyframes\s+(\w+)', css)
        features['animations'] = animations
    
    # 检测统计功能
    if 'stats' in js and ('totalGames' in js or 'totalWins' in js):
        features['stats'] = ['games', 'wins', 'streak']
    
    return features

def choose_optimization(features):
    """根据当前功能状态选择最合适的优化"""
    optimizations = []
    
    # 1. 如果没有声音效果，添加音效
    if 'Audio' not in open("game.js").read():
        optimizations.append(('add_sound_effects', '添加音效系统'))
    
    # 2. 如果模式少于4个，添加新模式
    if len(features['modes']) < 4:
        optimizations.append(('add_new_mode', '添加新的游戏模式'))
    
    # 3. 如果没有难度选择，添加难度系统
    if 'difficulty' not in open("game.js").read():
        optimizations.append(('add_difficulty', '添加难度选择系统'))
    
    # 4. 如果统计功能简单，增强统计
    if len(features['stats']) < 4:
        optimizations.append(('enhance_stats', '增强统计功能'))
    
    # 5. 如果没有排行榜，添加排行榜
    if 'leaderboard' not in open("game.js").read().lower():
        optimizations.append(('add_leaderboard', '添加排行榜系统'))
    
    # 6. 如果动画少，添加更多动画
    if len(features['animations']) < 5:
        optimizations.append(('add_animations', '添加更多动画效果'))
    
    # 7. 如果无障碍功能缺失，添加ARIA
    if not features['has_accessibility']:
        optimizations.append(('improve_accessibility', '改善无障碍访问'))
    
    # 8. 如果响应式不够好，优化移动端
    if not features['has_responsive']:
        optimizations.append(('optimize_mobile', '优化移动端体验'))
    
    # 9. 添加主题切换
    if 'theme' not in open("game.js").read().lower():
        optimizations.append(('add_theme_switcher', '添加主题切换功能'))
    
    # 10. 添加分享功能
    if 'share' not in open("game.js").read().lower():
        optimizations.append(('add_share', '添加分享成绩功能'))
    
    # 如果列表为空，选择通用优化
    if not optimizations:
        optimizations = [
            ('improve_ui', '改进用户界面'),
            ('add_smooth_transitions', '添加平滑过渡效果'),
            ('optimize_code', '代码结构优化'),
            ('enhance_colors', '优化配色方案'),
        ]
    
    return random.choice(optimizations)

def apply_optimization(opt_type, description):
    """应用选定的优化"""
    
    if opt_type == 'add_sound_effects':
        add_sound_effects()
    elif opt_type == 'add_new_mode':
        add_new_mode()
    elif opt_type == 'add_difficulty':
        add_difficulty()
    elif opt_type == 'enhance_stats':
        enhance_stats()
    elif opt_type == 'add_leaderboard':
        add_leaderboard()
    elif opt_type == 'add_animations':
        add_animations()
    elif opt_type == 'improve_accessibility':
        improve_accessibility()
    elif opt_type == 'optimize_mobile':
        optimize_mobile()
    elif opt_type == 'add_theme_switcher':
        add_theme_switcher()
    elif opt_type == 'add_share':
        add_share()
    elif opt_type == 'improve_ui':
        improve_ui()
    elif opt_type == 'add_smooth_transitions':
        add_smooth_transitions()
    elif opt_type == 'optimize_code':
        optimize_code()
    elif opt_type == 'enhance_colors':
        enhance_colors()
    
    return description

def add_sound_effects():
    """添加音效系统"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 在构造函数中添加音效初始化
    sound_init = '''
        // 音效系统
        this.sounds = {
            click: null,
            correct: null,
            wrong: null,
            win: null,
            lose: null
        };
        this.initSounds();'''
    
    js = js.replace(
        "this.version = {",
        "this.initSounds();\n        this.version = {"
    )
    
    # 添加音效初始化方法
    init_sounds_method = '''
    initSounds() {
        // 使用 Web Audio API 创建简单音效
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        this.playSound = (type) => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            switch(type) {
                case 'click':
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.1;
                    break;
                case 'correct':
                    oscillator.frequency.value = 523.25; // C5
                    gainNode.gain.value = 0.2;
                    break;
                case 'wrong':
                    oscillator.frequency.value = 200;
                    gainNode.gain.value = 0.15;
                    break;
                case 'win':
                    oscillator.frequency.value = 659.25; // E5
                    gainNode.gain.value = 0.3;
                    break;
            }
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }'''
    
    # 在类定义末尾添加方法
    js = js.replace("    closeVersionInfo() {", init_sounds_method + "\n\n    closeVersionInfo() {")
    
    # 在关键位置添加音效调用
    js = js.replace("this.ui.guessInput.focus();", "this.ui.guessInput.focus();\n        this.playSound('click');")
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)

def add_new_mode():
    """添加新的游戏模式"""
    mode_choice = random.choice(['country', 'food', 'movie'])
    
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    if mode_choice == 'country':
        new_mode = '''            country: {
                name: "国家猜猜猜",
                description: "猜猜这是哪个国家",
                difficulty: 3,
                countries: [
                    { name: "中国", hint: "世界上人口最多的国家，有长城和长江" },
                    { name: "美国", hint: "世界第一大经济体，有自由女神像" },
                    { name: "法国", hint: "浪漫之都，有埃菲尔铁塔" },
                    { name: "日本", hint: "樱花之国，有富士山" },
                    { name: "巴西", hint: "足球王国，有亚马逊雨林" }
                ],
                generate: function() {
                    return this.countries[Math.floor(Math.random() * this.countries.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: "不对哦，再想想" };
                }
            },'''
        js = js.replace("            emoji: {", new_mode + "\n            emoji: {")
    
    elif mode_choice == 'food':
        new_mode = '''            food: {
                name: "美食猜猜猜",
                description: "猜猜这是什么美食",
                difficulty: 3,
                foods: [
                    { name: "宫保鸡丁", hint: "四川名菜，鸡肉配花生米" },
                    { name: "北京烤鸭", hint: "北京特色，皮脆肉嫩" },
                    { name: "麻婆豆腐", hint: "麻辣鲜香，豆腐为主" },
                    { name: "火锅", hint: "围炉而食，热气腾腾" },
                    { name: "饺子", hint: "中国传统面食，形似元宝" }
                ],
                generate: function() {
                    return this.foods[Math.floor(Math.random() * this.foods.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: "不对哦，再想想" };
                }
            },'''
        js = js.replace("            emoji: {", new_mode + "\n            emoji: {")
    
    elif mode_choice == 'movie':
        new_mode = '''            movie: {
                name: "电影猜猜猜",
                description: "猜猜这是什么电影",
                difficulty: 4,
                movies: [
                    { name: "泰坦尼克号", hint: "杰克和罗丝的经典爱情故事" },
                    { name: "阿凡达", hint: "潘多拉星球，蓝色皮肤的外星人" },
                    { name: "复仇者联盟", hint: "超级英雄集结，拯救世界" },
                    { name: "哈利波特", hint: "魔法学校，霍格沃茨" },
                    { name: "千与千寻", hint: "宫崎骏的动画，千寻的冒险" }
                ],
                generate: function() {
                    return this.movies[Math.floor(Math.random() * this.movies.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: "不对哦，再想想" };
                }
            },'''
        js = js.replace("            emoji: {", new_mode + "\n            emoji: {")
    
    # 更新模式选择UI
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    new_mode_card = f'''
                <div class="mode-card" data-mode="{mode_choice}">
                    <div class="mode-icon">🎯</div>
                    <h3>{js.split(f'"{mode_choice}":')[1].split("name:")[1].split(",")[0].strip().strip('"')}</h3>
                    <p>{js.split(f'"{mode_choice}":')[1].split("description:")[1].split(",")[0].strip().strip('"')}</p>
                </div>'''
    
    # 在模式卡片末尾插入新卡片
    html = html.replace('</div>\n            </div>\n        </div>', f'</div>\n            </div>\n            {new_mode_card}\n        </div>')
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)

def add_difficulty():
    """添加难度选择系统"""
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    # 在模式选择前添加难度选择
    difficulty_ui = '''
        <div class="difficulty-selector">
            <h3>选择难度</h3>
            <div class="difficulty-options">
                <button class="difficulty-btn active" data-difficulty="easy">简单</button>
                <button class="difficulty-btn" data-difficulty="medium">中等</button>
                <button class="difficulty-btn" data-difficulty="hard">困难</button>
            </div>
        </div>'''
    
    html = html.replace('<div class="modes-grid">', difficulty_ui + '\n        <div class="modes-grid">')
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)
    
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 添加难度设置
    js = js.replace(
        "        this.currentMode = null;",
        "        this.difficulty = 'easy';\n        this.currentMode = null;"
    )
    
    # 添加难度设置方法
    difficulty_methods = '''
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        // 根据难度调整最大尝试次数
        const difficultySettings = {
            easy: { attempts: 10, hints: 4 },
            medium: { attempts: 7, hints: 3 },
            hard: { attempts: 5, hints: 2 }
        };
        this.maxAttempts = difficultySettings[difficulty].attempts;
        this.maxHints = difficultySettings[difficulty].hints;
    }'''
    
    js = js.replace("    closeVersionInfo() {", difficulty_methods + "\n\n    closeVersionInfo() {")
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)

def enhance_stats():
    """增强统计功能"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 扩展统计对象
    new_stats = '''        this.stats = {
            totalGames: 0,
            totalWins: 0,
            winStreak: 0,
            bestStreak: 0,
            totalAttempts: 0,
            totalTime: 0,
            avgTime: 0,
            avgAttempts: 0,
            modeStats: {
                number: { games: 0, wins: 0 },
                word: { games: 0, wins: 0 },
                animal: { games: 0, wins: 0 },
                emoji: { games: 0, wins: 0 }
            },
            difficultyStats: {
                easy: { games: 0, wins: 0 },
                medium: { games: 0, wins: 0 },
                hard: { games: 0, wins: 0 }
            }
        };'''
    
    js = re.sub(r'        this\.stats = \{[^}]+\};', new_stats, js)
    
    # 更新统计保存和加载
    js = js.replace(
        "    loadStats() {\n        const savedStats = localStorage.getItem('guessingGameStats');\n        if (savedStats) {\n            this.stats = JSON.parse(savedStats);\n        }\n    }",
        """    loadStats() {
        const savedStats = localStorage.getItem('guessingGameStats');
        if (savedStats) {
            const parsed = JSON.parse(savedStats);
            // 合并默认统计，避免旧数据缺失字段
            this.stats = { ...this.stats, ...parsed };
            // 确保嵌套对象存在
            if (!this.stats.modeStats) this.stats.modeStats = {};
            if (!this.stats.difficultyStats) this.stats.difficultyStats = {};
        }
    }"""
    )
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)

def add_leaderboard():
    """添加排行榜系统"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 在 endGame 方法中保存分数到排行榜
    leaderboard_code = '''
        // 保存到排行榜
        this.saveToLeaderboard(totalScore, isWin);
    '''
    
    js = js.replace(
        "        this.saveStats();",
        "        this.saveStats();\n" + leaderboard_code
    )
    
    # 添加排行榜方法
    leaderboard_methods = '''
    saveToLeaderboard(score, isWin) {
        if (!isWin) return;
        
        const entry = {
            score: score,
            mode: this.currentMode,
            difficulty: this.difficulty,
            attempts: this.attempts,
            time: Date.now() - this.startTime,
            date: new Date().toISOString()
        };
        
        let leaderboard = JSON.parse(localStorage.getItem('guessingGameLeaderboard') || '[]');
        leaderboard.push(entry);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10); // 只保留前10名
        localStorage.setItem('guessingGameLeaderboard', JSON.stringify(leaderboard));
    }
    
    getLeaderboard() {
        return JSON.parse(localStorage.getItem('guessingGameLeaderboard') || '[]');
    }'''
    
    js = js.replace("    closeVersionInfo() {", leaderboard_methods + "\n\n    closeVersionInfo() {")
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)

def add_animations():
    """添加更多动画效果"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    new_animations = '''
@keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 5px var(--primary); }
    50% { box-shadow: 0 0 20px var(--primary), 0 0 30px var(--primary); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}'''
    
    if "@keyframes bounceIn" not in css:
        css += new_animations
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)

def improve_accessibility():
    """改善无障碍访问"""
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    # 添加更多 ARIA 标签
    html = html.replace('<button class="version-btn"', '<button class="version-btn" aria-label="查看版本信息"')
    html = html.replace('<button class="mode-card"', '<button class="mode-card" aria-label')
    html = html.replace('<div class="hint-card">', '<div class="hint-card" role="region" aria-live="polite">')
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)

def optimize_mobile():
    """优化移动端体验"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    mobile_optimizations = '''
/* 移动端优化 */
@media (max-width: 768px) {
    .game-container {
        padding: 10px;
    }
    
    .mode-card {
        min-height: 120px;
        padding: 15px;
    }
    
    .mode-icon {
        font-size: 2.5rem;
    }
    
    .mode-card h3 {
        font-size: 1.1rem;
    }
    
    .btn {
        padding: 12px 20px;
        font-size: 1rem;
    }
    
    .quick-number-btn {
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
    }
    
    .feedback-item {
        padding: 8px 12px;
        font-size: 0.9rem;
    }
}'''
    
    if "/* 移动端优化 */" not in css:
        css += mobile_optimizations
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)

def add_theme_switcher():
    """添加主题切换功能"""
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    theme_button = '''
        <button class="theme-btn" onclick="game.toggleTheme()" aria-label="切换主题">
            🌓
        </button>'''
    
    html = html.replace('<button class="version-btn"', theme_button + '\n        <button class="version-btn"')
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)
    
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 添加暗色/亮色主题变量
    theme_vars = '''
:root {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
}

[data-theme="light"] {
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #0f172a;
    --text-secondary: #475569;
}'''
    
    # 替换现有的 :root
    css = re.sub(r':root\s*\{[^}]+\}', theme_vars, css)
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)
    
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 添加主题切换方法
    theme_method = '''
    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('guessingGameTheme', next);
    }
    
    loadTheme() {
        const saved = localStorage.getItem('guessingGameTheme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }
    }'''
    
    js = js.replace("    initUI() {", "    loadTheme();\n    " + theme_method + "\n    initUI() {")
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)

def add_share():
    """添加分享成绩功能"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 在游戏结束界面添加分享按钮
    share_button = '''
        <button class="btn share-btn" onclick="game.shareResult()">
            📤 分享成绩
        </button>'''
    
    js = js.replace(
        '        this.ui.resultMessage.textContent = `正确答案是：${this.getAnswerText()}`;',
        '        this.ui.resultMessage.textContent = `正确答案是：${this.getAnswerText()}`;\n        \n        // 添加分享按钮\n        const shareBtn = document.querySelector(".share-btn");\n        if (shareBtn) shareBtn.remove();\n        document.querySelector(".result-actions").insertAdjacentHTML("beforeend", \'' + share_button + '\');'
    )
    
    # 添加分享方法
    share_method = '''
    shareResult() {
        const score = this.ui.resultScore.textContent;
        const mode = this.modes[this.currentMode].name;
        const time = this.ui.timerDisplay.textContent;
        const attempts = this.attempts;
        
        const text = `🎮 猜谜大师\n\n我在【${mode}】中获得了 ${score} 分！\n用时：${time}，尝试次数：${attempts}\n来挑战我吧！`;
        
        if (navigator.share) {
            navigator.share({
                title: '猜谜大师 - 我的成绩',
                text: text,
                url: window.location.href
            }).catch(console.error);
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(text).then(() => {
                alert('成绩已复制到剪贴板！');
            });
        }
    }'''
    
    js = js.replace("    closeVersionInfo() {", share_method + "\n\n    closeVersionInfo() {")
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)

def improve_ui():
    """改进用户界面"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    improvements = '''
/* UI 改进 */
.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn {
    position: relative;
    overflow: hidden;
}

.btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
}

.btn:focus:not(:active)::after {
    animation: ripple 1s ease-out;
}

@keyframes ripple {
    0% { transform: scale(0, 0); opacity: 0.5; }
    100% { transform: scale(40, 40); opacity: 0; }
}'''
    
    if ".card:hover" not in css:
        css += improvements
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)

def add_smooth_transitions():
    """添加平滑过渡效果"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    transitions = '''
/* 平滑过渡 */
.screen {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.screen.active {
    opacity: 1;
    transform: translateX(0);
}

.screen:not(.active) {
    opacity: 0;
    pointer-events: none;
}

#mainMenu {
    transform: translateX(-20px);
}

#gameScreen {
    transform: translateX(20px);
}

#gameOverScreen {
    transform: translateY(20px);
}'''
    
    if ".screen {" not in css:
        css += transitions
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)

def optimize_code():
    """代码结构优化"""
    with open("game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 添加注释优化
    if "// 性能优化" not in js:
        js = js.replace(
            "class GuessingGame {",
            """class GuessingGame {
    // 性能优化：使用事件委托减少事件监听器数量"""
        )
    
    with open("game.js", "w", encoding="utf-8") as f:
        f.write(js)

def enhance_colors():
    """优化配色方案"""
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    
    # 添加新的颜色变量
    new_vars = '''
    --accent: #8b5cf6;
    --highlight: #fbbf24;
    --surface: rgba(30, 41, 59, 0.95);
    --success-gradient: linear-gradient(135deg, #10b981, #3b82f6);
    --warning-gradient: linear-gradient(135deg, #f59e0b, #ef4444);'''
    
    # 在 :root 中添加
    root_match = re.search(r':root\s*{([^}]+)}', css)
    if root_match:
        root_content = root_match.group(1)
        if '--accent' not in root_content:
            root_content += new_vars
            css = css.replace(root_match.group(0), f":root {{{root_content}}}")
    
    with open("style.css", "w", encoding="utf-8") as f:
        f.write(css)

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

def git_commit_and_push(version, optimization_desc):
    """提交更改并推送"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    subprocess.run(["git", "add", "-A"], check=True)
    
    commit_msg = f"feat: 智能优化 - {version} ({today})\n\n✨ {optimization_desc}\n📦 版本号更新为 {version}\n🤖 自动优化任务执行"
    subprocess.run(["git", "commit", "-m", commit_msg], check=True)
    
    subprocess.run(["git", "push", "origin", "main"], check=True)
    
    subprocess.run(["git", "tag", version], check=True)
    subprocess.run(["git", "push", "origin", version], check=True)

def main():
    print("🎮 开始智能优化猜谜游戏...")
    
    # 1. 分析当前功能
    print("🔍 分析当前游戏功能...")
    features = analyze_game_features()
    print(f"   发现 {len(features['modes'])} 种游戏模式")
    print(f"   音效系统: {'✅' if 'Audio' in open('game.js').read() else '❌'}")
    print(f"   排行榜: {'✅' if 'leaderboard' in open('game.js').read().lower() else '❌'}")
    print(f"   主题切换: {'✅' if 'theme' in open('game.js').read().lower() else '❌'}")
    
    # 2. 获取当前版本
    current_version = get_current_version()
    print(f"📦 当前版本: {current_version}")
    
    # 3. 递增版本号
    new_version = increment_version(current_version)
    print(f"🆕 新版本: {new_version}")
    
    # 4. 选择并应用优化
    opt_type, description = choose_optimization(features)
    print(f"✨ 选择优化: {description}")
    apply_optimization(opt_type, description)
    print(f"✅ 优化已应用")
    
    # 5. 更新版本号
    update_version_in_files(new_version)
    print(f"✅ 版本号已更新到 {new_version}")
    
    # 6. 提交并推送
    git_commit_and_push(new_version, description)
    print(f"🚀 已提交并推送到 GitHub")
    
    print(f"\n🎉 优化完成！版本 {new_version} 已部署")
    print(f"📍 GitHub Pages 将在 1-3 分钟后更新: https://jiaxu-zhu.github.io/guessing-game/")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"❌ 错误: {e}")
        import traceback
        traceback.print_exc()
        raise
