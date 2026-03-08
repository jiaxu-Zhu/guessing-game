/* 🎮 猜谜大师 - 游戏逻辑 */

class GuessingGame {
    constructor() {
        this.modes = {
            number: {
                name: "数字猜猜乐",
                description: "猜一个 1-100 之间的数字",
                difficulty: 2,
                generate: () => Math.floor(Math.random() * 100) + 1,
                validate: (guess, answer) => {
                    const numGuess = parseInt(guess);
                    if (isNaN(numGuess)) return { valid: false, hint: "请输入有效的数字" };
                    
                    if (numGuess === answer) return { valid: true, hint: "恭喜猜中！", correct: true };
                    
                    if (numGuess < answer) return { valid: true, hint: "太小了，再试试！" };
                    
                    return { valid: true, hint: "太大了，再试试！" };
                }
            },
            word: {
                name: "词语猜猜猜",
                description: "根据提示猜词语",
                difficulty: 3,
                words: [
                    { word: "太阳", hint: "每天从东方升起，给地球带来光明和温暖" },
                    { word: "月亮", hint: "夜晚出现在天空，有阴晴圆缺的变化" },
                    { word: "海洋", hint: "覆盖地球表面71%的巨大水体，有潮汐现象" },
                    { word: "森林", hint: "由大量树木组成的生态系统，被称为地球的肺" },
                    { word: "梦想", hint: "人们心中渴望实现的目标和愿望" }
                ],
                generate: function() {
                    return this.words[Math.floor(Math.random() * this.words.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.word) return { valid: true, hint: "恭喜猜中！", correct: true };
                    
                    return { valid: true, hint: "不对哦，再想想提示" };
                }
            },
            animal: {
                name: "动物猜猜看",
                description: "猜动物名称",
                difficulty: 3,
                animals: [
                    { name: "狮子", hints: ["草原之王", "有鬃毛", "猫科动物"] },
                    { name: "大象", hints: ["长鼻子", "大耳朵", "陆地上最大的动物"] },
                    { name: "熊猫", hints: ["黑白相间", "爱吃竹子", "中国的国宝"] },
                    { name: "长颈鹿", hints: ["脖子很长", "身上有斑点", "最高的陆地动物"] },
                    { name: "企鹅", hints: ["不会飞", "生活在南极", "走路摇摇摆摆"] }
                ],
                generate: function() {
                    return this.animals[Math.floor(Math.random() * this.animals.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    
                    return { valid: true, hint: "不对哦，再想想" };
                }
            },
            emoji: {
                name: "表情猜成语",
                description: "通过 emoji 猜成语",
                difficulty: 4,
                idioms: [
                    { idiom: "画蛇添足", emoji: "🎨🐍➕🦶" },
                    { idiom: "守株待兔", emoji: "🌳🐇⏳" },
                    { idiom: "井底之蛙", emoji: "⬇️🐸👀🌍" },
                    { idiom: "狐假虎威", emoji: "🦊🐯💪" },
                    { idiom: "对牛弹琴", emoji: "🐮🎹🎶" }
                ],
                generate: function() {
                    return this.idioms[Math.floor(Math.random() * this.idioms.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.idiom) return { valid: true, hint: "恭喜猜中！", correct: true };
                    
                    return { valid: true, hint: "不对哦，再想想这些表情代表什么" };
                }
            }
        };
        
        this.currentMode = null;
        this.answer = null;
        this.attempts = 0;
        this.maxAttempts = 7;
        this.hintsUsed = 0;
        this.maxHints = 3;
        this.startTime = 0;
        this.timerInterval = null;
        this.history = [];
        this.stats = {
            totalGames: 0,
            totalWins: 0,
            winStreak: 0,
            bestStreak: 0
        };
        
        // 版本信息
        this.version = {
            number: "v1.0.4",
            date: "2026-03-08",
            changes: [
                "✨ 初始版本发布",
                "🎮 支持4种游戏模式（数字、词语、动物、表情猜成语）",
                "🏆 成就系统（连胜奖励）",
                "📊 完整统计追踪（游戏次数、胜率、最高连胜）",
                "🎨 精美渐变界面设计",
                "✨ 动态粒子背景动画",
                "🎉 胜利彩带特效",
                "💡 智能提示系统（每局3次提示）",
                "⏱️ 实时计时器",
                "📱 响应式设计（支持移动端）"
            ]
        };
        
        this.loadStats();
        this.initUI();
        this.createParticles();
    }
    
    initUI() {
        // 获取UI元素
        this.ui = {
            mainMenu: document.getElementById('mainMenu'),
            gameScreen: document.getElementById('gameScreen'),
            gameOverScreen: document.getElementById('gameOverScreen'),
            achievementModal: document.getElementById('achievementModal'),
            
            // 主菜单元素
            totalGames: document.getElementById('totalGames'),
            totalWins: document.getElementById('totalWins'),
            winRate: document.getElementById('winRate'),
            bestStreak: document.getElementById('bestStreak'),
            
            // 游戏界面元素
            currentMode: document.getElementById('currentMode'),
            attemptsLeft: document.getElementById('attemptsLeft'),
            timerDisplay: document.getElementById('timerDisplay'),
            hintText: document.getElementById('hintText'),
            hintsLeft: document.getElementById('hintsLeft'),
            guessInput: document.getElementById('guessInput'),
            quickNumbers: document.getElementById('quickNumbers'),
            feedbackHistory: document.getElementById('feedbackHistory'),
            progressFill: document.getElementById('progressFill'),
            progressPercent: document.getElementById('progressPercent'),
            
            // 游戏结束元素
            resultIcon: document.getElementById('resultIcon'),
            resultTitle: document.getElementById('resultTitle'),
            resultTime: document.getElementById('resultTime'),
            resultAttempts: document.getElementById('resultAttempts'),
            resultScore: document.getElementById('resultScore'),
            resultMessage: document.getElementById('resultMessage'),
            
            // 成就弹窗
            achievementTitle: document.getElementById('achievementTitle'),
            achievementDesc: document.getElementById('achievementDesc')
        };
        
        // 设置统计数据
        this.updateStatsUI();
        
        // 绑定事件
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('data-mode');
                this.startGame(mode);
            });
        });
        
        this.ui.guessInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.submitGuess();
            }
        });
    }
    
    loadStats() {
        const savedStats = localStorage.getItem('guessingGameStats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
    }
    
    saveStats() {
        localStorage.setItem('guessingGameStats', JSON.stringify(this.stats));
    }
    
    updateStatsUI() {
        this.ui.totalGames.textContent = this.stats.totalGames;
        this.ui.totalWins.textContent = this.stats.totalWins;
        
        const winRate = this.stats.totalGames > 0 
            ? Math.round((this.stats.totalWins / this.stats.totalGames) * 100) 
            : 0;
        this.ui.winRate.textContent = `${winRate}%`;
        
        this.ui.bestStreak.textContent = this.stats.bestStreak;
    }
    
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机位置和动画延迟
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${10 + Math.random() * 15}s`;
            
            // 随机大小
            const size = 2 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机颜色
            const colors = ['#667eea', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }
    
    startGame(mode) {
        this.currentMode = mode;
        this.answer = this.modes[mode].generate();
        this.attempts = 0;
        this.hintsUsed = 0;
        this.history = [];
        this.startTime = Date.now();
        
        // 更新UI
        this.ui.mainMenu.classList.remove('active');
        this.ui.gameScreen.classList.add('active');
        this.ui.gameOverScreen.classList.remove('active');
        
        this.ui.currentMode.textContent = this.modes[mode].name;
        this.ui.attemptsLeft.textContent = this.maxAttempts;
        this.ui.hintsLeft.textContent = this.maxHints;
        
        // 设置初始提示
        switch(mode) {
            case 'number':
                this.ui.hintText.textContent = "猜一个 1-100 之间的数字";
                this.generateQuickNumbers();
                break;
            case 'word':
                this.ui.hintText.textContent = this.answer.hint;
                break;
            case 'animal':
                this.ui.hintText.textContent = this.answer.hints[0];
                break;
            case 'emoji':
                this.ui.hintText.textContent = this.answer.emoji;
                break;
        }
        
        // 清空历史反馈
        this.ui.feedbackHistory.innerHTML = '';
        
        // 重置进度条
        this.ui.progressFill.style.width = '0%';
        this.ui.progressPercent.textContent = '0%';
        
        // 启动计时器
        this.startTimer();
        
        // 聚焦输入框
        this.ui.guessInput.focus();
    }
    
    startTimer() {
        // 清除现有计时器
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        // 启动新计时器
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.ui.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    generateQuickNumbers() {
        this.ui.quickNumbers.innerHTML = '';
        
        const numbers = [];
        while (numbers.length < 5) {
            const num = Math.floor(Math.random() * 100) + 1;
            if (!numbers.includes(num)) numbers.push(num);
        }
        
        numbers.sort((a, b) => a - b);
        
        numbers.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'quick-number-btn';
            btn.textContent = num;
            btn.addEventListener('click', () => {
                this.ui.guessInput.value = num;
                this.submitGuess();
            });
            this.ui.quickNumbers.appendChild(btn);
        });
    }
    
    useHint() {
        if (this.hintsUsed >= this.maxHints) return;
        
        this.hintsUsed++;
        this.ui.hintsLeft.textContent = this.maxHints - this.hintsUsed;
        
        switch(this.currentMode) {
            case 'number':
                // 提供范围提示
                const range = 10;
                const min = Math.max(1, this.answer - range);
                const max = Math.min(100, this.answer + range);
                this.ui.hintText.textContent = `答案在 ${min} 到 ${max} 之间`;
                break;
            
            case 'animal':
                // 提供额外提示
                if (this.hintsUsed < this.answer.hints.length) {
                    this.ui.hintText.textContent = this.answer.hints[this.hintsUsed];
                } else {
                    this.ui.hintText.textContent = "没有更多提示了";
                }
                break;
                
            case 'word':
                // 提供首字母提示
                const firstLetter = this.answer.word.charAt(0);
                this.ui.hintText.textContent = `第一个字是：${firstLetter}`;
                break;
                
            case 'emoji':
                // 提供字数提示
                const wordCount = this.answer.idiom.length;
                this.ui.hintText.textContent = `这是一个${wordCount}字成语`;
                break;
        }
        
        // 添加动画效果
        const hintCard = document.querySelector('.hint-card');
        hintCard.classList.add('pulse');
        setTimeout(() => hintCard.classList.remove('pulse'), 500);
    }
    
    submitGuess() {
        const guess = this.ui.guessInput.value.trim();
        if (!guess) return;
        
        // 验证猜测
        const result = this.modes[this.currentMode].validate(guess, this.answer);
        if (!result.valid) {
            alert(result.hint);
            return;
        }
        
        this.attempts++;
        this.ui.attemptsLeft.textContent = this.maxAttempts - this.attempts;
        
        // 添加到历史
        this.addToHistory(guess, result.hint, result.correct);
        
        // 清空输入框
        this.ui.guessInput.value = '';
        
        // 更新进度
        const progress = Math.min(100, Math.round(this.attempts / this.maxAttempts * 100));
        this.ui.progressFill.style.width = `${progress}%`;
        this.ui.progressPercent.textContent = `${progress}%`;
        
        // 检查游戏结束
        if (result.correct || this.attempts >= this.maxAttempts) {
            this.endGame(result.correct);
        }
    }
    
    addToHistory(guess, hint, isCorrect) {
        const item = document.createElement('div');
        item.className = `feedback-item ${isCorrect ? 'correct' : 'wrong'}`;
        
        const guessSpan = document.createElement('span');
        guessSpan.className = 'feedback-guess';
        guessSpan.textContent = guess;
        
        const hintSpan = document.createElement('span');
        hintSpan.className = 'feedback-hint';
        hintSpan.textContent = hint;
        
        item.appendChild(guessSpan);
        item.appendChild(hintSpan);
        
        this.ui.feedbackHistory.appendChild(item);
        
        // 滚动到底部
        this.ui.feedbackHistory.scrollTop = this.ui.feedbackHistory.scrollHeight;
    }
    
    endGame(isWin) {
        // 停止计时器
        clearInterval(this.timerInterval);
        
        // 更新统计数据
        this.stats.totalGames++;
        if (isWin) {
            this.stats.totalWins++;
            this.stats.winStreak++;
            
            if (this.stats.winStreak > this.stats.bestStreak) {
                this.stats.bestStreak = this.stats.winStreak;
                this.showAchievement("连胜大师", `你已达成 ${this.stats.bestStreak} 连胜！`);
            }
        } else {
            this.stats.winStreak = 0;
        }
        
        this.saveStats();
        this.updateStatsUI();
        
        // 显示游戏结束界面
        this.ui.gameScreen.classList.remove('active');
        this.ui.gameOverScreen.classList.add('active');
        
        // 设置结果
        this.ui.resultIcon.textContent = isWin ? '🎉' : '😢';
        this.ui.resultTitle.textContent = isWin ? '恭喜获胜！' : '游戏结束！';
        this.ui.resultTime.textContent = this.ui.timerDisplay.textContent;
        this.ui.resultAttempts.textContent = this.attempts;
        
        // 计算得分
        const timeScore = Math.max(0, 100 - Math.floor((Date.now() - this.startTime) / 1000));
        const attemptsScore = Math.max(0, 100 - (this.attempts * 10));
        const hintPenalty = this.hintsUsed * 20;
        const totalScore = Math.max(0, timeScore + attemptsScore - hintPenalty);
        
        this.ui.resultScore.textContent = totalScore;
        
        // 设置消息
        if (isWin) {
            this.ui.resultMessage.textContent = `你猜中了答案：${this.getAnswerText()}！`;
            this.createConfetti();
        } else {
            this.ui.resultMessage.textContent = `正确答案是：${this.getAnswerText()}`;
        }
    }
    
    getAnswerText() {
        switch(this.currentMode) {
            case 'number': return this.answer;
            case 'word': return this.answer.word;
            case 'animal': return this.answer.name;
            case 'emoji': return this.answer.idiom;
        }
    }
    
    createConfetti() {
        const colors = ['#667eea', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // 随机位置
            confetti.style.left = `${Math.random() * 100}%`;
            
            // 随机大小
            const size = 5 + Math.random() * 10;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // 随机颜色
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机旋转
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // 随机动画延迟
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            
            document.body.appendChild(confetti);
            
            // 动画结束后移除
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    showAchievement(title, description) {
        this.ui.achievementTitle.textContent = title;
        this.ui.achievementDesc.textContent = description;
        this.ui.achievementModal.classList.add('active');
        
        setTimeout(() => {
            this.ui.achievementModal.classList.remove('active');
        }, 3000);
    }
    
    restartGame() {
        this.startGame(this.currentMode);
    }
    
    showMainMenu() {
        this.ui.gameScreen.classList.remove('active');
        this.ui.gameOverScreen.classList.remove('active');
        this.ui.mainMenu.classList.add('active');
    }
    
    closeAchievement() {
        this.ui.achievementModal.classList.remove('active');
    }
    
    showVersionInfo() {
        // 填充版本信息
        document.getElementById('versionNumber').textContent = this.version.number;
        document.getElementById('versionDate').textContent = this.version.date;
        
        const changesList = document.getElementById('versionChangesList');
        changesList.innerHTML = '';
        
        this.version.changes.forEach(change => {
            const li = document.createElement('li');
            li.textContent = change;
            changesList.appendChild(li);
        });
        
        // 显示模态框
        document.getElementById('versionModal').classList.add('active');
    }
    
    closeVersionInfo() {
        document.getElementById('versionModal').classList.remove('active');
    }
}

// 初始化游戏
window.onload = function() {
    window.game = new GuessingGame();
};
