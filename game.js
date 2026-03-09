/* 🎮 猜谜大师 - 游戏逻辑 */

class GuessingGame {
    constructor() {
        this.modes = {
            number: {
                name: "数字猜猜乐",
                description: "猜一个 1-100 之间的数字",
                hint: "💡 提示：输入数字，系统会告诉你'太大了'或'太小了'",
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
                hint: "💡 提示：仔细阅读描述，联想相关词语",
                difficulty: 3,
                words: [
                    { word: "太阳", hint: "每天从东方升起，给地球带来光明和温暖" },
                    { word: "月亮", hint: "夜晚出现在天空，有阴晴圆缺的变化" },
                    { word: "海洋", hint: "覆盖地球表面71%的巨大水体，有潮汐现象" },
                    { word: "森林", hint: "由大量树木组成的生态系统，被称为地球的肺" },
                    { word: "梦想", hint: "人们心中渴望实现的目标和愿望" },
                    { word: "时间", hint: "一去不复返，是最公平的资源" },
                    { word: "友谊", hint: "人与人之间真挚的情感和信任" },
                    { word: "知识", hint: "通过学习获得的力量和智慧" },
                    { word: "勇气", hint: "面对困难时不退缩的精神品质" },
                    { word: "希望", hint: "对未来美好的期待和信念" },
                    { word: "自由", hint: "不受约束的状态，人人向往的权利" },
                    { word: "幸福", hint: "内心满足和快乐的感觉" },
                    { word: "成功", hint: "实现目标或达成愿望的结果" },
                    { word: "智慧", hint: "超越常人的理解和判断能力" },
                    { word: "和平", hint: "没有战争和冲突的状态" },
                    { word: "创新", hint: "创造新事物或新方法的过程" },
                    { word: "责任", hint: "应尽的义务和承担的任务" },
                    { word: "信任", hint: "相信对方可靠和诚实的态度" },
                    { word: "感恩", hint: "对他人帮助表示感激的心情" },
                    { word: "坚持", hint: "持之以恒，不轻言放弃的精神" },
                    { word: "宽容", hint: "对他人的过错给予谅解的胸怀" },
                    { word: "谦虚", hint: "不自大，虚心接受他人意见的态度" },
                    { word: "乐观", hint: "对未来充满希望的积极心态" },
                    { word: "善良", hint: "心地纯洁，富有同情心的品质" },
                    { word: "诚实", hint: "言行一致，不说谎的品质" },
                    { word: "勤奋", hint: "努力工作或学习的态度" },
                    { word: "节俭", hint: "节约资源，不浪费的习惯" },
                    { word: "礼貌", hint: "待人接物有教养的表现" },
                    { word: "团结", hint: "众人一心，共同合作的精神" },
                    { word: "奉献", hint: "无私付出，不求回报的品质" },
                    { word: "坚韧", hint: "意志坚定，不屈不挠的精神" },
                    { word: "包容", hint: "接纳不同观点和人群的胸怀" },
                    { word: "自律", hint: "自我约束，遵守规则的习惯" },
                    { word: "进取", hint: "积极向上，不断追求进步的态度" },
                    { word: "正直", hint: "为人光明磊落，坚持原则" },
                    { word: "谦逊", hint: "不自满，虚心学习的态度" },
                    { word: "专注", hint: "集中精力于某一事物的状态" },
                    { word: "耐心", hint: "不急躁，能等待的品质" },
                    { word: "热情", hint: "对事物充满热爱的态度" },
                    { word: "诚信", hint: "诚实守信的品德" },
                    { word: "协作", hint: "与他人合作完成任务" },
                    { word: "探索", hint: "寻求未知事物的行为" },
                    { word: "突破", hint: "打破限制取得进展" },
                    { word: "超越", hint: "超过原有水平或标准" },
                    { word: "成长", hint: "从幼稚到成熟的变化过程" },
                    { word: "力量", hint: "做事的能力和能量" },
                    { word: "平静", hint: "心情安宁，没有波澜的状态" },
                    { word: "温暖", hint: "让人感到舒适和温馨的感觉" },
                    { word: "美好", hint: "令人愉悦的事物或感受" },
                    { word: "公平", hint: "处理事情公正合理，没有偏私" },
                    { word: "正义", hint: "公正的、有利于人民大众的道理" },
                    { word: "勇敢", hint: "不怕危险和困难的精神" },
                    { word: "坚强", hint: "意志坚定，不轻易动摇" },
                    { word: "细心", hint: "考虑问题周密细致" },
                    { word: "机智", hint: "思维敏捷，能迅速应对问题" },
                    { word: "稳重", hint: "处变不惊，做事踏实可靠" },
                    { word: "慷慨", hint: "乐于施舍，不吝啬" },
                    { word: "忠诚", hint: "对人对事坚定不移" },
                    { word: "敬业", hint: "认真负责地对待工作" },
                    { word: "高效", hint: "用最少时间完成最多工作" },
                    { word: "敏锐", hint: "感觉灵敏，观察细致" },
                    { word: "优雅", hint: "举止言谈得体美观" },
                    { word: "从容", hint: "不慌不忙，沉着镇定" },
                    { word: "毅力", hint: "坚强持久的意志" },
                    { word: "独立", hint: "不依赖别人，自己作主" },
                    { word: "反思", hint: "回头思考，总结经验" },
                    { word: "平衡", hint: "保持稳定状态" },
                    { word: "尊重", hint: "重视并认真对待" },
                    { word: "担当", hint: "承担、负责" },
                    { word: "合作", hint: "共同协作完成任务" },
                    { word: "沟通", hint: "交流信息、思想或感情" },
                    { word: "学习", hint: "从阅读、听讲等途径获得知识" },
                    { word: "创造", hint: "首先发明或制造前所未有的事物" },
                    { word: "适应", hint: "适合客观条件或需要" },
                    { word: "改变", hint: "变得和原来不一样" },
                    { word: "效率", hint: "单位时间内的产出量" },
                    { word: "质量", hint: "产品或服务的优劣程度" },
                    { word: "安全", hint: "不受威胁、没有危险" },
                    { word: "健康", hint: "身体、精神和社会适应的完好状态" },
                    { word: "环保", hint: "环境保护、可持续发展" },
                    { word: "节能", hint: "减少能源消耗" },
                    { word: "数字化", hint: "将信息转换为数字形式" },
                    { word: "智能化", hint: "具备人工智能特性" },
                    { word: "可持续", hint: "长期维持、不损害未来" },
                    { word: "全球化", hint: "全球范围的联系与互动" },
                    { word: "多元化", hint: "多种多样、丰富" },
                    { word: "个性化", hint: "符合个人特点或需求" },
                    { word: "便捷", hint: "方便快捷" },
                    { word: "舒适", hint: "舒服、安逸" },
                    { word: "美观", hint: "好看、漂亮" },
                    { word: "实用", hint: "实际使用价值高" },
                    { word: "经济", hint: "成本低、性价比高" },
                ]
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
                hint: "💡 提示：根据第一个提示开始猜测",
                difficulty: 3,
                animals: [
                    { name: "狮子", hints: ["草原之王", "有鬃毛", "猫科动物"] },
                    { name: "大象", hints: ["长鼻子", "大耳朵", "陆地上最大的动物"] },
                    { name: "熊猫", hints: ["黑白相间", "爱吃竹子", "中国的国宝"] },
                    { name: "长颈鹿", hints: ["脖子很长", "身上有斑点", "最高的陆地动物"] },
                    { name: "企鹅", hints: ["不会飞", "生活在南极", "走路摇摇摆摆"] },
                    { name: "猴子", hints: ["聪明灵活", "喜欢爬树", "爱吃香蕉"] },
                    { name: "老虎", hints: ["森林之王", "有条纹", "独居动物"] },
                    { name: "海豚", hints: ["聪明友善", "会跳跃", "海洋哺乳动物"] },
                    { name: "孔雀", hints: ["美丽羽毛", "会开屏", "鸟类"] },
                    { name: "兔子", hints: ["长耳朵", "爱吃胡萝卜", "跳得很快"] },
                    { name: "狐狸", hints: ["聪明狡猾", "红棕色毛", "尾巴很大"] },
                    { name: "乌龟", hints: ["背上有壳", "行动缓慢", "寿命很长"] },
                    { name: "蝴蝶", hints: ["有彩色翅膀", "从毛毛虫变来", "喜欢花朵"] },
                    { name: "章鱼", hints: ["有八条触手", "生活在海里", "很聪明"] },
                    { name: "袋鼠", hints: ["有育儿袋", "会跳得很远", "澳大利亚特产"] },
                    { name: "猫头鹰", hints: ["夜间活动", "大眼睛", "聪明的象征"] },
                    { name: "刺猬", hints: ["身上有刺", "吃昆虫", "卷成球保护自己"] },
                    { name: "水母", hints: ["透明身体", "漂浮在海里", "会发光"] },
                    { name: "变色龙", hints: ["能改变颜色", "舌头很长", "爬行动物"] },
                    { name: "考拉", hints: ["生活在树上", "爱吃桉树叶", "澳大利亚特产"] },
                    { name: "河马", hints: ["体型庞大", "喜欢水", "嘴巴很大"] },
                    { name: "斑马", hints: ["身上有条纹", "像马", "非洲草原"] },
                    { name: "犀牛", hints: ["头上有角", "皮肤很厚", "濒危动物"] },
                    { name: "北极熊", hints: ["生活在北极", "白色毛皮", "游泳能手"] },
                    { name: "大猩猩", hints: ["体型巨大", "捶胸顿足", "森林中的王者"] },
                    { name: "鳄鱼", hints: ["冷血动物", "牙齿锋利", "生活在水中"] },
                    { name: "老鹰", hints: ["视力敏锐", "翱翔天空", "猛禽之王"] },
                    { name: "狼", hints: ["群居动物", "嚎叫", "森林猎手"] },
                    { name: "猫", hints: ["喵星人", "夜间视力好", "爱干净"] },
                    { name: "狗", hints: ["人类最忠诚的朋友", "嗅觉灵敏", "看家护院"] },
                    { name: "蛇", hints: ["没有四肢", "舌头分叉", "冷血动物"] },
                    { name: "青蛙", hints: ["两栖动物", "会游泳", "捕虫能手"] },
                    { name: "凤凰", hints: ["百鸟之王", "浴火重生", "吉祥象征"] },
                    { name: "鲸鱼", hints: ["体型巨大", "海洋哺乳动物", "喷水柱"] },
                    { name: "海马", hints: ["形状像马", "雄性育儿", "直立游泳"] },
                    { name: "水獭", hints: ["水中精灵", "爱玩石头", "毛皮光滑"] },
                    { name: "雪豹", hints: ["高山隐士", "行踪神秘", "美丽皮毛"] },
                    { name: "海狮", hints: ["聪明伶俐", "表演明星", "鳍足动物"] },
                    { name: "珊瑚", hints: ["海洋花园", "珊瑚虫分泌", "五彩斑斓"] },
                    { name: "海星", hints: ["星形外观", "五辐射对称", "再生能力强"] },
                    { name: "海胆", hints: ["球形刺猬", "食用海鲜", "海洋生物"] },
                    { name: "海龟", hints: ["长寿象征", "海中慢游", "有硬壳"] },
                    { name: "螃蟹", hints: ["横着走", "八条腿", "美味海鲜"] },
                    { name: "龙虾", hints: ["大型虾类", "美味佳肴", "红色外壳"] },
                    { name: "海鸥", hints: ["海上飞行", "捕鱼高手", "白色羽毛"] },
                    { name: "信天翁", hints: ["长途飞行", "翼展极长", "海洋鸟类"] },
                    { name: "海豹", hints: ["游泳健将", "憨态可掬", "鳍足类"] },
                    { name: "海象", hints: ["长牙巨兽", "北极居民", "鳍足类"] },
                    { name: "海獭", hints: ["可爱萌宠", "使用工具", "海洋哺乳动物"] },
                    { name: "儒艮", hints: ["美人鱼原型", "海草食客", "温和巨兽"] },
                    { name: "蝠鲼", hints: ["魔鬼鱼", "优雅滑翔", "鳐鱼近亲"] },
                    { name: "海牛", hints: ["温和巨兽", "海草食客", "行动缓慢"] },
                ]
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
                hint: "💡 提示：观察表情符号，联想对应的四字成语",
                difficulty: 4,
                idioms: [
                    { idiom: "画蛇添足", emoji: "🎨🐍➕🦶" },
                    { idiom: "守株待兔", emoji: "🌳🐇⏳" },
                    { idiom: "井底之蛙", emoji: "⬇️🐸👀🌍" },
                    { idiom: "狐假虎威", emoji: "🦊🐯💪" },
                    { idiom: "对牛弹琴", emoji: "🐮🎹🎶" },
                    { idiom: "一箭双雕", emoji: "🏹🦅🦅" },
                    { idiom: "三心二意", emoji: "💓💓💓🤔" },
                    { idiom: "四面楚歌", emoji: "🌍🎵😰" },
                    { idiom: "五湖四海", emoji: "🔟🌊🗺️" },
                    { idiom: "六神无主", emoji: "😱❄️💭" },
                    { idiom: "七上八下", emoji: "⬆️7️⃣⬇️8️⃣" },
                    { idiom: "八仙过海", emoji: "🧙‍♂️🌊✨" },
                    { idiom: "九牛一毛", emoji: "🐂🐂🐂💨" },
                    { idiom: "十全十美", emoji: "1️⃣0️⃣✨🌟" },
                    { idiom: "百发百中", emoji: "🎯🏹✅" },
                    { idiom: "千钧一发", emoji: "💎😱⚠️" },
                    { idiom: "万无一失", emoji: "1️⃣0️⃣0️⃣%✅" },
                    { idiom: "人山人海", emoji: "👥🏔️👥" },
                    { idiom: "心花怒放", emoji: "❤️🌸😁" },
                    { idiom: "画龙点睛", emoji: "🎨🐉👁️✨" },
                    { idiom: "亡羊补牢", emoji: "🐑❌🔒✅" },
                    { idiom: "掩耳盗铃", emoji: "👂🙈🔔😅" },
                    { idiom: "刻舟求剑", emoji: "⛵🔪🗡️❓" },
                    { idiom: "杯弓蛇影", emoji: "🍷🏹🐍👤" },
                    { idiom: "叶公好龙", emoji: "🍃👨❤️🐉" },
                    { idiom: "自相矛盾", emoji: "🛡️⚔️🤔" },
                    { idiom: "滥竽充数", emoji: "🎵🎶🎭🔢" },
                    { idiom: "买椟还珠", emoji: "💰📦🔙💎" },
                    { idiom: "邯郸学步", emoji: "🏃‍♂️🚶‍♂️🎭❌" },
                    { idiom: "胸有成竹", emoji: "👔🎋🎍✅" },
                    { idiom: "鹤立鸡群", emoji: "🦢🐔👑" },
                    { idiom: "鱼跃龙门", emoji: "🐟🐉🚪✨" },
                    { idiom: "龟兔赛跑", emoji: "🐢🐇🏃‍♂️🏆" },
                    { idiom: "马到成功", emoji: "🐎🏃‍♂️✅🎉" },
                    { idiom: "龙飞凤舞", emoji: "🐉🐦💃✨" },
                    { idiom: "虎视眈眈", emoji: "🐯👀😠" },
                    { idiom: "蛇蝎心肠", emoji: "🐍🦂💔😈" },
                    { idiom: "鸟语花香", emoji: "🐦🌸💐🌺" },
                    { idiom: "鱼水情深", emoji: "🐟💧❤️🥰" },
                    { idiom: "鼠目寸光", emoji: "🐭👀📏❌" },
                    { idiom: "牛郎织女", emoji: "🐂👦✨👩🌟" },
                    { idiom: "猴子捞月", emoji: "🐒🌙💧❌" },
                    { idiom: "狗急跳墙", emoji: "🐕😤🏃‍♂️🧱" },
                    { idiom: "猪八戒", emoji: "🐷😋🍚💤" },
                    { idiom: "杀鸡儆猴", emoji: "🐔🐒⚠️😱" },
                    { idiom: "兔死狐悲", emoji: "🐰💔🦊😢" },
                    { idiom: "龙潭虎穴", emoji: "🐉🐯🕳️😨" },
                    { idiom: "虎口余生", emoji: "🐯👄💀✅" },
                    { idiom: "羊毛出在羊身上", emoji: "🐑🧶🐑💰" },
                    { idiom: "鸡犬升天", emoji: "🐔🐕✨🚀" },
                    { idiom: "龙争虎斗", emoji: "🐉🐯⚔️🔥" },
                    { idiom: "狐朋狗友", emoji: "🦊🐕👥😄" },
                    { idiom: "狼狈为奸", emoji: "🐺🦊🤝😈" },
                    { idiom: "盲人摸象", emoji: "👁️‍🗨️🐘🤔❓" },
                    { idiom: "对酒当歌", emoji: "🍶🎵🕺✨" },
                    { idiom: "望梅止渴", emoji: "👀🍑💦😋" },
                    { idiom: "画饼充饥", emoji: "🎨🥧🤤❌" },
                    { idiom: "守财奴", emoji: "💰👴🔒😠" },
                ]
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
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机位置和动画延迟
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${10 + Math.random() * 15}s`;
            
            // 随机大小
            const size = 2 + Math.random() * 6;
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
        
        // 添加分享按钮
        const shareBtn = document.querySelector(".share-btn");
        if (shareBtn) shareBtn.remove();
        document.querySelector(".result-actions").insertAdjacentHTML("beforeend", '
        <button class="btn share-btn" onclick="game.shareResult()">
            📤 分享成绩
        </button>');
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
        const modal = document.getElementById('versionModal');
        if (modal) modal.classList.add('active');
    }
    

    shareResult() {
        const score = this.ui.resultScore.textContent;
        const mode = this.modes[this.currentMode].name;
        const time = this.ui.timerDisplay.textContent;
        const attempts = this.attempts;
        
        const text = `🎮 猜谜大师

我在【${mode}】中获得了 ${score} 分！
用时：${time}，尝试次数：${attempts}
来挑战我吧！`;
        
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
    }

    closeVersionInfo() {
        const modal = document.getElementById('versionModal');
        if (modal) modal.classList.remove('active');
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}

// 初始化游戏
window.onload = function() {
    window.game = new GuessingGame();
};
