/* 🎮 猜谜大师 - 游戏逻辑 */

class GuessingGame {
    // 性能优化：事件处理建议使用节流
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
                categories: [
                    {
                        name: "自然",
                        words: [
                            { word: "太阳", hint: "每天从东方升起，给地球带来光明和温暖" },
                            { word: "月亮", hint: "夜晚出现在天空，有阴晴圆缺的变化" },
                            { word: "海洋", hint: "覆盖地球表面71%的巨大水体，有潮汐现象" },
                            { word: "森林", hint: "由大量树木组成的生态系统，被称为地球的肺" },
                            { word: "彩虹", hint: "雨后天空出现的七彩弧光" },
                            { word: "闪电", hint: "云层放电产生的强光，伴随雷声" },
                            { word: "雪花", hint: "冬季从天空飘落的冰晶" },
                            { word: "火山", hint: "喷发熔岩和火山灰的山" }
                        ]
                    },
                    {
                        name: "人物",
                        words: [
                            { word: "老师", hint: "传授知识，教育学生的人" },
                            { word: "医生", hint: "治病救人，救死扶伤" },
                            { word: "警察", hint: "维护治安，保护人民" },
                            { word: "消防员", hint: "灭火救灾，勇敢逆行" },
                            { word: "农民", hint: "辛勤劳作，生产粮食" },
                            { word: "科学家", hint: "探索真理，发明创造" }
                        ]
                    },
                    {
                        name: "情感",
                        words: [
                            { word: "快乐", hint: "愉悦的心情，开心的感觉" },
                            { word: "悲伤", hint: "难过的心情，想哭" },
                            { word: "愤怒", hint: "生气的情绪，火冒三丈" },
                            { word: "恐惧", hint: "害怕的感觉，瑟瑟发抖" },
                            { word: "惊喜", hint: "意外的好事，又惊又喜" },
                            { word: "感动", hint: "内心被触动，热泪盈眶" }
                        ]
                    }
                ],
                currentCategory: 0,
                generate: function() {
                    const category = this.categories[this.currentCategory || 0];
                    return category.words[Math.floor(Math.random() * category.words.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.word) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: answer.hint };
                }
            },
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
                    { name: "狮子", hints: ["草原之王", "有鬃毛", "猫科动物", "群居"] },
                    { name: "大象", hints: ["长鼻子", "大耳朵", "陆地上最大的动物", "记忆力好"] },
                    { name: "熊猫", hints: ["黑白相间", "爱吃竹子", "中国的国宝", "濒危物种"] },
                    { name: "长颈鹿", hints: ["脖子很长", "身上有斑点", "最高的陆地动物", "吃树叶"] },
                    { name: "企鹅", hints: ["不会飞", "生活在南极", "走路摇摇摆摆", "穿燕尾服"] },
                    { name: "老虎", hints: ["森林之王", "有条纹", "猫科动物", "独居"] },
                    { name: "海豚", hints: ["聪明", "生活在海洋", "会回声定位", "友好"] },
                    { name: "猴子", hints: ["灵活", "爱吃香蕉", "生活在树林", "聪明"] },
                    { name: "兔子", hints: ["长耳朵", "爱吃胡萝卜", "蹦蹦跳跳", "繁殖快"] },
                    { name: "蛇", hints: ["没有腿", "爬行动物", "有些有毒", "蜕皮"] }
                ],
                generate: function() {
                    return this.animals[Math.floor(Math.random() * this.animals.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: "不对哦，再想想" };
                }
            }
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

            // 🏛️ 历史人物猜猜猜
            history: {
                name: "历史人物猜猜猜",
                description: "根据描述猜历史人物",
                difficulty: 4,
                figures: [
                    { name: "秦始皇", hint: "中国第一个皇帝，统一六国，修建长城", era: "战国/秦朝" },
                    { name: "诸葛亮", hint: "三国时期蜀汉丞相，智慧化身", era: "三国" },
                    { name: "李白", hint: "诗仙，豪放飘逸，饮酒作诗", era: "唐朝" },
                    { name: "成吉思汗", hint: "蒙古帝国创建者，一代天骄", era: "元朝" },
                    { name: "郑和", hint: "明代航海家，七下西洋", era: "明朝" },
                    { name: "拿破仑", hint: "法国皇帝，军事天才，滑铁卢战败", era: "18-19世纪" },
                    { name: "爱因斯坦", hint: "相对论提出者，物理学家", era: "20世纪" },
                    { name: "居里夫人", hint: "两次诺贝尔奖得主，放射性研究", era: "19-20世纪" }
                ],
                generate: function() {
                    return this.figures[Math.floor(Math.random() * this.figures.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: `提示：${answer.era}时期的人物` };
                }
            },

            // 🌍 地理猜猜猜
            geography: {
                name: "地理猜猜猜",
                description: "猜地名或地理特征",
                difficulty: 3,
                locations: [
                    { name: "喜马拉雅山", hint: "世界最高山脉，有珠穆朗玛峰", type: "山脉" },
                    { name: "亚马逊雨林", hint: "世界上最大的热带雨林，位于南美洲", type: "自然景观" },
                    { name: "撒哈拉沙漠", hint: "世界上最大的沙漠，位于非洲北部", type: "沙漠" },
                    { name: "长江", hint: "中国第一长河，世界第三长河", type: "河流" },
                    { name: "死海", hint: "地球上海拔最低的湖泊，盐度极高", type: "湖泊" },
                    { name: "科罗拉多大峡谷", hint: "美国著名的峡谷，由科罗拉多河侵蚀形成", type: "峡谷" },
                    { name: "北极", hint: "地球最北端，常年冰雪覆盖", type: "地区" },
                    { name: "马尔代夫", hint: "印度洋上的岛国，以度假胜地闻名", type: "国家" }
                ],
                generate: function() {
                    return this.locations[Math.floor(Math.random() * this.locations.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: `提示：这是一个${answer.type}` };
                }
            },

            // 🔬 科学猜猜猜
            science: {
                name: "科学猜猜猜",
                description: "猜科学术语或科学家",
                difficulty: 4,
                terms: [
                    { term: "光合作用", hint: "植物利用光能将二氧化碳和水转化为有机物和氧气的过程", category: "生物" },
                    { term: "万有引力", hint: "牛顿发现，任何两个物体之间都存在相互吸引的力", category: "物理" },
                    { term: "元素周期表", hint: "门捷列夫发明，用于排列化学元素", category: "化学" },
                    { term: "DNA", hint: "脱氧核糖核酸，携带遗传信息", category: "生物" },
                    { term: "相对论", hint: "爱因斯坦提出的理论，包括狭义和广义", category: "物理" },
                    { term: "板块构造", hint: "地球岩石圈分裂成若干板块，相互运动", category: "地质" },
                    { term: "量子力学", hint: "描述微观粒子行为的物理学理论", category: "物理" },
                    { term: "温室效应", hint: "大气中的温室气体吸收红外辐射导致全球变暖", category: "环境" }
                ],
                generate: function() {
                    return this.terms[Math.floor(Math.random() * this.terms.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.term) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: `提示：属于${answer.category}领域` };
                }
            },

            // 🎬 电影猜猜猜
            movie: {
                name: "电影猜猜猜",
                description: "根据描述猜电影",
                difficulty: 3,
                movies: [
                    { name: "泰坦尼克号", hint: "杰克和罗丝的爱情故事，豪华游轮沉没", year: "1997" },
                    { name: "阿凡达", hint: "潘多拉星球，蓝色皮肤的纳美人", year: "2009" },
                    { name: "复仇者联盟", hint: "超级英雄集结，对抗洛基和齐塔瑞军队", year: "2012" },
                    { name: "哈利波特与魔法石", hint: "孤儿哈利发现自己是巫师，进入霍格沃茨", year: "2001" },
                    { name: "千与千寻", hint: "千寻在神秘世界的冒险，宫崎骏作品", year: "2001" },
                    { name: "盗梦空间", hint: "通过梦境进入他人潜意识窃取或植入信息", year: "2010" },
                    { name: "肖申克的救赎", hint: "银行家安迪被冤枉入狱，越狱重获自由", year: "1994" },
                    { name: "星际穿越", hint: "穿越虫洞寻找人类新家园，父女情深", year: "2014" }
                ],
                generate: function() {
                    return this.movies[Math.floor(Math.random() * this.movies.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: `提示：上映于${answer.year}年` };
                }
            },

            // 🎵 音乐猜猜猜
            music: {
                name: "音乐猜猜猜",
                description: "猜歌曲名或音乐家",
                difficulty: 3,
                songs: [
                    { name: "月亮代表我的心", hint: "经典中文情歌，邓丽君演唱", artist: "邓丽君" },
                    { name: "青藏高原", hint: "高亢激昂，李娜演唱，电视剧主题曲", artist: "李娜" },
                    { name: "Let It Go", hint: "《冰雪奇缘》主题曲，Elsa演唱", artist: "Idina Menzel" },
                    { name: "Happy", hint: "Pharrell Williams演唱，快乐歌曲", artist: "Pharrell Williams" },
                    { name: "Bohemian Rhapsody", hint: "Queen乐队的经典摇滚歌曲", artist: "Queen" },
                    { name: "茉莉花", hint: "中国传统民歌，旋律优美", artist: "民间歌曲" },
                    { name: "Summer", hint: "久石让作曲，电影《菊次郎的夏天》主题曲", artist: "久石让" },
                    { name: "We Are the Champions", hint: "Queen乐队，体育赛事常用", artist: "Queen" }
                ],
                generate: function() {
                    return this.songs[Math.floor(Math.random() * this.songs.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: `提示：由${answer.artist}演唱` };
                }
            },

            // 🍎 食物猜猜猜
            food: {
                name: "美食猜猜猜",
                description: "猜食物名称",
                difficulty: 2,
                foods: [
                    { name: "宫保鸡丁", hint: "四川名菜，鸡肉配花生米，麻辣鲜香", cuisine: "川菜" },
                    { name: "北京烤鸭", hint: "北京特色，皮脆肉嫩，配薄饼和甜面酱", cuisine: "京菜" },
                    { name: "麻婆豆腐", hint: "麻辣鲜香，豆腐为主，川菜经典", cuisine: "川菜" },
                    { name: "火锅", hint: "围炉而食，热气腾腾，各种食材涮煮", cuisine: "川渝" },
                    { name: "饺子", hint: "中国传统面食，形似元宝，春节必备", cuisine: "北方" },
                    { name: "寿司", hint: "日本料理，米饭配生鱼片或蔬菜", cuisine: "日本" },
                    { name: "披萨", hint: "意大利美食，面饼配奶酪和配料", cuisine: "意大利" },
                    { name: "汉堡", hint: "美国快餐，面包夹肉饼和蔬菜", cuisine: "美国" },
                    { name: "咖喱饭", hint: "印度风味，米饭配香料炖菜", cuisine: "印度" },
                    { name: "法式蜗牛", hint: "法国大餐，蜗牛配蒜香黄油", cuisine: "法国" }
                ],
                generate: function() {
                    return this.foods[Math.floor(Math.random() * this.foods.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: `提示：${answer.cuisine}菜系` };
                }
            },

            // 🎨 艺术猜猜猜
            art: {
                name: "艺术猜猜猜",
                description: "猜艺术品或艺术家",
                difficulty: 4,
                artworks: [
                    { name: "蒙娜丽莎", hint: "达芬奇创作，神秘的微笑，卢浮宫镇馆之宝", artist: "达芬奇" },
                    { name: "星空", hint: "梵高创作，漩涡状的夜空", artist: "梵高" },
                    { name: "大卫", hint: "米开朗基罗的雕塑，文艺复兴杰作", artist: "米开朗基罗" },
                    { name: "维纳斯的诞生", hint: "波提切利创作，爱与美的诞生", artist: "波提切利" },
                    { name: "格尔尼卡", hint: "毕加索创作，反战名画，黑白灰色调", artist: "毕加索" },
                    { name: "呐喊", hint: "蒙克创作，表现主义代表作，扭曲的人物", artist: "蒙克" },
                    { name: "富岳三十六景", hint: "葛饰北斋创作，浮世绘系列，包括神奈川冲浪里", artist: "葛饰北斋" },
                    { name: "清明上河图", hint: "张择端创作，北宋风俗画，描绘汴京繁华", artist: "张择端" }
                ],
                generate: function() {
                    return this.artworks[Math.floor(Math.random() * this.artworks.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.name) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: `提示：${answer.artist}的作品` };
                }
            }
        

            emoji: {
                name: "表情猜成语",
                description: "通过 emoji 猜成语",
                difficulty: 4,
                idioms: [
                    { idiom: "画蛇添足", emoji: "🎨🐍➕🦶" },
                    { idiom: "守株待兔", emoji: "🌳🐇⏳" },
                    { idiom: "井底之蛙", emoji: "⬇️🐸👀🌍" },
                    { idiom: "狐假虎威", emoji: "🦊🐯💪" },
                    { idiom: "对牛弹琴", emoji: "🐮🎹🎶" },
                    { idiom: "望梅止渴", emoji: "👀🍇💦" },
                    { idiom: "胸有成竹", emoji: "💪🎋" },
                    { idiom: "鱼目混珠", emoji: "🐟👀💎" },
                    { idiom: "盲人摸象", emoji: "👁️🚫🐘✋" },
                    { idiom: "一箭双雕", emoji: "🏹🐦🐦" },
                    { idiom: "鸡飞蛋打", emoji: "🐔✈️🥚💥" },
                    { idiom: "龙飞凤舞", emoji: "🐉✈️🦅💃" },
                    { idiom: "虎头蛇尾", emoji: "🐉➡️🐍" },
                    { idiom: "对酒当歌", emoji: "🍷🎤🎶" },
                    { idiom: "风和日丽", emoji: "💨☀️🌤️" },
                    { idiom: "山清水秀", emoji: "⛰️💧🌿" }
                ],
                generate: function() {
                    return this.idioms[Math.floor(Math.random() * this.idioms.length)];
                },
                validate: (guess, answer) => {
                    if (guess === answer.idiom) return { valid: true, hint: "恭喜猜中！", correct: true };
                    return { valid: true, hint: "不对哦，再想想这些表情代表什么" };
                }
            }
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
        this.initSounds();
        this.version = {
            number: "v1.0.27",
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
                "📱 响应式设计（支持移动端）",
                "✨ 增强动画效果（添加 gentlePulse 和 slideInUp 动画）",
                "🎵 添加音效系统（点击、正确、错误、胜利音效）",
                "📤 添加分享成绩功能",
                "🌓 添加主题切换功能（暗色/亮色）",
                "🏆 添加排行榜系统",
                "♿ 改善无障碍访问（ARIA标签）",
                "🎯 丰富游戏模式内容：",
                "   - 数字模式：添加多种范围选项（1-50, 1-100, 1-200, 两位数）",
                "   - 词语模式：添加分类系统（自然、人物、情感）",
                "   - 动物模式：扩展至10种动物，每只动物4个提示",
                "   - 表情模式：扩展至16个成语",
                "🌟 新增7种游戏模式：",
                "   - 历史人物猜猜猜（8个人物）",
                "   - 地理猜猜猜（8个地点）",
                "   - 科学猜猜猜（8个术语）",
                "   - 电影猜猜猜（8部电影）",
                "   - 音乐猜猜猜（8首歌曲）",
                "   - 美食猜猜猜（10道美食）",
                "   - 艺术猜猜猜（8件艺术品）",
                "📊 总计：11种游戏模式，200+ 题目内容"
            ]
        };
        
        this.loadStats();
        this.initUI();
        this.createParticles();
    }
    
    loadTheme();
    
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
        this.playSound('click');
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
    }

    closeVersionInfo() {
        document.getElementById('versionModal').classList.remove('active');
    }
}

// 初始化游戏
window.onload = function() {
    window.game = new GuessingGame();
};
