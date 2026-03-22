/* 🎮 猜谜大师 - 游戏逻辑 */

class GuessingGame {
    // 性能优化：使用事件委托减少事件监听器数量
    constructor() {
    this.modes = {
    hint_quality: true,
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
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "Python", hint: "一种编程语言" },
    { word: "JavaScript", hint: "网页脚本语言" },
    { word: "HTML", hint: "网页标记语言" },
    { word: "CSS", hint: "样式表语言" },
    { word: "Java", hint: "面向对象编程语言" },
    { word: "宇宙", hint: "包含一切物质和能量的无限空间" , difficulty: "easy" },
    { word: "星球", hint: "围绕恒星运行的天体" , difficulty: "easy" },
    { word: "银河", hint: "横跨夜空的星河带" , difficulty: "easy" },
    { word: "黑洞", hint: "引力极强连光都无法逃脱的天体" , difficulty: "easy" },
    { word: "彗星", hint: "拖着长尾巴绕太阳运行的冰体" , difficulty: "easy" },
    { word: "极光", hint: "极地夜空中的彩色光幕" , difficulty: "easy" },
    { word: "日食", hint: "月球遮挡太阳的天文现象" , difficulty: "easy" },
    { word: "月食", hint: "地球遮挡太阳光照射月球" , difficulty: "easy" },
    { word: "潮汐", hint: "海水受月球引力产生的涨落" , difficulty: "easy" },
    { word: "地震", hint: "地壳快速释放能量造成的震动" , difficulty: "easy" },
    { word: "台风", hint: "热带海洋上形成的强风暴" , difficulty: "easy" },
    { word: "飓风", hint: "大西洋地区的强烈热带气旋" , difficulty: "easy" },
    { word: "龙卷风", hint: "旋转极强的柱状气流" , difficulty: "easy" },
    { word: "暴雨", hint: "短时间内大量降水的天气" , difficulty: "easy" },
    { word: "干旱", hint: "长期缺乏降水的气候状况" , difficulty: "easy" },
    { word: "霜冻", hint: "气温低于零度形成的冰晶" , difficulty: "easy" },
    { word: "雾气", hint: "近地面水汽凝结形成的朦胧" , difficulty: "easy" },
    { word: "沙尘", hint: "风力搬运的细小沙粒" , difficulty: "easy" },
    { word: "泥石流", hint: "山区爆发的含泥砂洪流" , difficulty: "easy" },
    { word: "滑坡", hint: "斜坡岩土体沿滑动面下滑" , difficulty: "easy" },
    { word: "崩塌", hint: "陡峭山坡岩石突然坠落" , difficulty: "easy" },
    { word: "海啸", hint: "海底地震引发的巨浪" , difficulty: "easy" },
    { word: "珊瑚礁", hint: "珊瑚虫分泌形成的海洋生态" , difficulty: "easy" },
    { word: "红树林", hint: "海岸潮间带的木本植物群落" , difficulty: "easy" },
    { word: "湿地", hint: "陆地和水域之间的过渡地带" , difficulty: "easy" },
    { word: "草原", hint: "以草本植物为主的开阔地带" , difficulty: "easy" },
    { word: "苔原", hint: "寒冷地区低矮植被覆盖的地带" , difficulty: "easy" },
    { word: "峡谷", hint: "两侧陡峭的深谷地形" , difficulty: "easy" },
    { word: "高原", hint: "海拔较高地势平坦的大片土地" , difficulty: "easy" },
    { word: "盆地", hint: "四周高中间低的盆状地形" , difficulty: "easy" },
    { word: "丘陵", hint: "起伏不大坡度较缓的山地" , difficulty: "easy" },
    { word: "岛屿", hint: "被水包围的小块陆地" , difficulty: "easy" },
    { word: "半岛", hint: "三面环水一面连陆的陆地" , difficulty: "easy" },
    { word: "海峡", hint: "两块陆地之间连接两片海域的通道" , difficulty: "medium" },
    { word: "海湾", hint: "海洋伸入陆地的部分" , difficulty: "easy" },
    { word: "三角洲", hint: "河流入海口形成的扇形平原" , difficulty: "easy" },
    { word: "瀑布", hint: "水流从高处垂直跌落" , difficulty: "easy" },
    { word: "湖泊", hint: "陆地上较大的积水区域" , difficulty: "easy" },
    { word: "河流", hint: "天然水道流向海洋或湖泊" , difficulty: "easy" },
    { word: "泉水", hint: "地下水流出的自然水源" , difficulty: "easy" },
    { word: "温泉", hint: "温度高于环境的地下水" , difficulty: "easy" },
    { word: "彩虹", hint: "雨后天空出现的七彩拱桥" , difficulty: "easy" },
    { word: "沙漠", hint: "干旱少雨，沙子覆盖的广阔地区" , difficulty: "easy" },
    { word: "火山", hint: "会喷发岩浆的山" , difficulty: "easy" },
    { word: "冰川", hint: "巨大的冰块，缓慢移动" , difficulty: "easy" },
    { word: "流星", hint: "划过夜空的发光轨迹" , difficulty: "easy" },
    { word: "云朵", hint: "天空中漂浮的白色棉花糖" , difficulty: "easy" },
    { word: "闪电", hint: "雷雨天先看到的光" , difficulty: "easy" },
    { word: "露珠", hint: "清晨草叶上的小水珠" , difficulty: "easy" },
    { word: "雪花", hint: "冬天飘落的六角形冰晶" , difficulty: "easy" },
    { word: "雾霾", hint: "空气污染形成的灰色笼罩" , difficulty: "easy" },
    { word: "彩虹", hint: "雨后天空出现的七彩拱桥" , difficulty: "easy" },
    { word: "沙漠", hint: "干旱少雨，沙子覆盖的广阔地区" , difficulty: "easy" },
    { word: "火山", hint: "会喷发岩浆的山" , difficulty: "easy" },
    { word: "冰川", hint: "巨大的冰块，缓慢移动" , difficulty: "easy" },
    { word: "流星", hint: "划过夜空的发光轨迹" , difficulty: "easy" },
    { word: "云朵", hint: "天空中漂浮的白色棉花糖" , difficulty: "easy" },
    { word: "闪电", hint: "雷雨天先看到的光" , difficulty: "easy" },
    { word: "露珠", hint: "清晨草叶上的小水珠" , difficulty: "easy" },
    { word: "雪花", hint: "冬天飘落的六角形冰晶" , difficulty: "easy" },
    { word: "雾霾", hint: "空气污染形成的灰色笼罩" , difficulty: "easy" },
    { word: "彩虹", hint: "雨后天空出现的七彩拱桥" , difficulty: "easy" },
    { word: "沙漠", hint: "干旱少雨，沙子覆盖的广阔地区" , difficulty: "easy" },
    { word: "火山", hint: "会喷发岩浆的山" , difficulty: "easy" },
    { word: "冰川", hint: "巨大的冰块，缓慢移动" , difficulty: "easy" },
    { word: "流星", hint: "划过夜空的发光轨迹" , difficulty: "easy" },
    { word: "云朵", hint: "天空中漂浮的白色棉花糖" , difficulty: "easy" },
    { word: "闪电", hint: "雷雨天先看到的光" , difficulty: "easy" },
    { word: "露珠", hint: "清晨草叶上的小水珠" , difficulty: "easy" },
    { word: "雪花", hint: "冬天飘落的六角形冰晶" , difficulty: "easy" },
    { word: "雾霾", hint: "空气污染形成的灰色笼罩" , difficulty: "easy" },
    { word: "太阳", hint: "每天从东方升起，给地球带来光明和温暖" , difficulty: "medium" },
    { word: "月亮", hint: "夜晚出现在天空，有阴晴圆缺的变化" , difficulty: "medium" },
    { word: "海洋", hint: "覆盖地球表面71%的巨大水体，有潮汐现象" , difficulty: "medium" },
    { word: "森林", hint: "由大量树木组成的生态系统，被称为地球的肺" , difficulty: "medium" },
    { word: "梦想", hint: "人们心中渴望实现的目标和愿望" , difficulty: "easy" },
    { word: "时间", hint: "一去不复返，是最公平的资源" , difficulty: "easy" },
    { word: "友谊", hint: "人与人之间真挚的情感和信任" , difficulty: "easy" },
    { word: "知识", hint: "通过学习获得的力量和智慧" , difficulty: "easy" },
    { word: "勇气", hint: "面对困难时不退缩的精神品质" , difficulty: "easy" },
    { word: "希望", hint: "对未来美好的期待和信念" , difficulty: "easy" },
    { word: "自由", hint: "不受约束的状态，人人向往的权利" , difficulty: "medium" },
    { word: "幸福", hint: "内心满足和快乐的感觉" , difficulty: "easy" },
    { word: "成功", hint: "实现目标或达成愿望的结果" , difficulty: "easy" },
    { word: "智慧", hint: "超越常人的理解和判断能力" , difficulty: "easy" },
    { word: "和平", hint: "没有战争和冲突的状态" , difficulty: "easy" },
    { word: "创新", hint: "创造新事物或新方法的过程" , difficulty: "easy" },
    { word: "责任", hint: "应尽的义务和承担的任务" , difficulty: "easy" },
    { word: "信任", hint: "相信对方可靠和诚实的态度" , difficulty: "easy" },
    { word: "感恩", hint: "对他人帮助表示感激的心情" , difficulty: "easy" },
    { word: "坚持", hint: "持之以恒，不轻言放弃的精神" , difficulty: "easy" },
    { word: "宽容", hint: "对他人的过错给予谅解的胸怀" , difficulty: "easy" },
    { word: "谦虚", hint: "不自大，虚心接受他人意见的态度" , difficulty: "medium" },
    { word: "乐观", hint: "对未来充满希望的积极心态" , difficulty: "easy" },
    { word: "善良", hint: "心地纯洁，富有同情心的品质" , difficulty: "easy" },
    { word: "诚实", hint: "言行一致，不说谎的品质" , difficulty: "easy" },
    { word: "勤奋", hint: "努力工作或学习的态度" , difficulty: "easy" },
    { word: "节俭", hint: "节约资源，不浪费的习惯" , difficulty: "easy" },
    { word: "礼貌", hint: "待人接物有教养的表现" , difficulty: "easy" },
    { word: "团结", hint: "众人一心，共同合作的精神" , difficulty: "easy" },
    { word: "奉献", hint: "无私付出，不求回报的品质" , difficulty: "easy" },
    { word: "坚韧", hint: "意志坚定，不屈不挠的精神" , difficulty: "easy" },
    { word: "包容", hint: "接纳不同观点和人群的胸怀" , difficulty: "easy" },
    { word: "自律", hint: "自我约束，遵守规则的习惯" , difficulty: "easy" },
    { word: "进取", hint: "积极向上，不断追求进步的态度" , difficulty: "easy" },
    { word: "正直", hint: "为人光明磊落，坚持原则" , difficulty: "easy" },
    { word: "谦逊", hint: "不自满，虚心学习的态度" , difficulty: "easy" },
    { word: "专注", hint: "集中精力于某一事物的状态" , difficulty: "easy" },
    { word: "耐心", hint: "不急躁，能等待的品质" , difficulty: "easy" },
    { word: "热情", hint: "对事物充满热爱的态度" , difficulty: "easy" },
    { word: "诚信", hint: "诚实守信的品德" , difficulty: "easy" },
    { word: "协作", hint: "与他人合作完成任务" , difficulty: "easy" },
    { word: "探索", hint: "寻求未知事物的行为" , difficulty: "easy" },
    { word: "突破", hint: "打破限制取得进展" , difficulty: "easy" },
    { word: "超越", hint: "超过原有水平或标准" , difficulty: "easy" },
    { word: "成长", hint: "从幼稚到成熟的变化过程" , difficulty: "easy" },
    { word: "力量", hint: "做事的能力和能量" , difficulty: "easy" },
    { word: "平静", hint: "心情安宁，没有波澜的状态" , difficulty: "easy" },
    { word: "温暖", hint: "让人感到舒适和温馨的感觉" , difficulty: "easy" },
    { word: "美好", hint: "令人愉悦的事物或感受" , difficulty: "easy" },
    { word: "公平", hint: "处理事情公正合理，没有偏私" , difficulty: "easy" },
    { word: "正义", hint: "公正的、有利于人民大众的道理" , difficulty: "easy" },
    { word: "勇敢", hint: "不怕危险和困难的精神" , difficulty: "easy" },
    { word: "坚强", hint: "意志坚定，不轻易动摇" , difficulty: "easy" },
    { word: "细心", hint: "考虑问题周密细致" , difficulty: "easy" },
    { word: "机智", hint: "思维敏捷，能迅速应对问题" , difficulty: "easy" },
    { word: "稳重", hint: "处变不惊，做事踏实可靠" , difficulty: "easy" },
    { word: "慷慨", hint: "乐于施舍，不吝啬" , difficulty: "easy" },
    { word: "忠诚", hint: "对人对事坚定不移" , difficulty: "easy" },
    { word: "敬业", hint: "认真负责地对待工作" , difficulty: "easy" },
    { word: "高效", hint: "用最少时间完成最多工作" , difficulty: "easy" },
    { word: "敏锐", hint: "感觉灵敏，观察细致" , difficulty: "easy" },
    { word: "优雅", hint: "举止言谈得体美观" , difficulty: "easy" },
    { word: "从容", hint: "不慌不忙，沉着镇定" , difficulty: "easy" },
    { word: "毅力", hint: "坚强持久的意志" , difficulty: "easy" },
    { word: "独立", hint: "不依赖别人，自己作主" , difficulty: "easy" },
    { word: "反思", hint: "回头思考，总结经验" , difficulty: "easy" },
    { word: "平衡", hint: "保持稳定状态" , difficulty: "easy" },
    { word: "尊重", hint: "重视并认真对待" , difficulty: "easy" },
    { word: "担当", hint: "承担、负责" , difficulty: "easy" },
    { word: "合作", hint: "共同协作完成任务" , difficulty: "easy" },
    { word: "沟通", hint: "交流信息、思想或感情" , difficulty: "easy" },
    { word: "学习", hint: "从阅读、听讲等途径获得知识" , difficulty: "easy" },
    { word: "创造", hint: "首先发明或制造前所未有的事物" , difficulty: "easy" },
    { word: "适应", hint: "适合客观条件或需要" , difficulty: "easy" },
    { word: "改变", hint: "变得和原来不一样" , difficulty: "easy" },
    { word: "效率", hint: "单位时间内的产出量" , difficulty: "easy" },
    { word: "质量", hint: "产品或服务的优劣程度" , difficulty: "easy" },
    { word: "安全", hint: "不受威胁、没有危险" , difficulty: "easy" },
    { word: "健康", hint: "身体、精神和社会适应的完好状态" , difficulty: "medium" },
    { word: "环保", hint: "环境保护、可持续发展" , difficulty: "easy" },
    { word: "节能", hint: "减少能源消耗" , difficulty: "easy" },
    { word: "数字化", hint: "将信息转换为数字形式" , difficulty: "easy" },
    { word: "智能化", hint: "具备人工智能特性" , difficulty: "easy" },
    { word: "可持续", hint: "长期维持、不损害未来" , difficulty: "easy" },
    { word: "全球化", hint: "全球范围的联系与互动" , difficulty: "easy" },
    { word: "多元化", hint: "多种多样、丰富" , difficulty: "easy" },
    { word: "个性化", hint: "符合个人特点或需求" , difficulty: "easy" },
    { word: "便捷", hint: "方便快捷" , difficulty: "easy" },
    { word: "舒适", hint: "舒服、安逸" , difficulty: "easy" },
    { word: "美观", hint: "好看、漂亮" , difficulty: "easy" },
    { word: "实用", hint: "实际使用价值高" , difficulty: "easy" },
    { word: "经济", hint: "成本低、性价比高" , difficulty: "easy" },
    ],
    generate: function() {
    return this.words[Math.floor(Math.random() * this.words.length)];
    },
    validate: function(guess, answer) {
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
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "熊猫", hints: ["国宝", "黑白", "竹子"] },
    { name: "长颈鹿", hints: ["脖子长", "斑点", "很高"] },
    { name: "企鹅", hints: ["南极", "不会飞", "游泳"] },
    { name: "袋鼠", hints: ["澳洲", "育儿袋", "跳跃"] },
    { name: "考拉", hints: ["树袋熊", "桉树叶", "澳洲"] },
    { name: "北极狐", hints: ["白色毛皮", "极地生存", "聪明敏捷"] , difficulty: "medium" },
    { name: "雪鸮", hints: ["白色羽毛", "夜间捕猎", "北极鸟类"] , difficulty: "medium" },
    { name: "驯鹿", hints: ["角很大", "拉雪橇", "寒带动物"] , difficulty: "medium" },
    { name: "驼鹿", hints: ["体型巨大", "角如手掌", "森林之王"] , difficulty: "medium" },
    { name: "猞猁", hints: ["耳尖有簇毛", "独居猎手", "中型猫科"] , difficulty: "medium" },
    { name: "狼獾", hints: ["凶猛无畏", "体型小力量大", "鼬科动物"] , difficulty: "medium" },
    { name: "棕熊", hints: ["体型庞大", "冬眠动物", "杂食性"] , difficulty: "medium" },
    { name: "黑熊", hints: ["善于爬树", "爱吃蜂蜜", "夜行性"] , difficulty: "medium" },
    { name: "浣熊", hints: ["黑眼圈", "爱洗食物", "夜行性"] , difficulty: "medium" },
    { name: "负鼠", hints: ["装死高手", "育儿袋", "北美特产"] , difficulty: "medium" },
    { name: "土拨鼠", hints: ["会站立", "冬眠专家", "草原啮齿"] , difficulty: "medium" },
    { name: "旱獭", hints: ["体型肥大", "洞穴专家", "高山动物"] , difficulty: "medium" },
    { name: "松鼠", hints: ["大尾巴", "储存坚果", "树栖啮齿"] , difficulty: "medium" },
    { name: "花栗鼠", hints: ["背部有条纹", "颊囊储食", "小型啮齿"] , difficulty: "medium" },
    { name: "豪猪", hints: ["浑身是刺", "防御能手", "夜行性"] , difficulty: "medium" },
    { name: "穿山甲", hints: ["全身鳞片", "吃蚂蚁", "濒危动物"] , difficulty: "medium" },
    { name: "树懒", hints: ["行动缓慢", "倒挂树枝", "热带动物"] , difficulty: "medium" },
    { name: "食蚁兽", hints: ["长鼻子", "专吃蚂蚁", "无齿动物"] , difficulty: "medium" },
    { name: "犰狳", hints: ["硬壳保护", "挖洞能手", "美洲特产"] , difficulty: "medium" },
    { name: "鸭嘴兽", hints: ["鸭嘴模样", "卵生哺乳", "澳大利亚特产"] , difficulty: "medium" },
    { name: "针鼹", hints: ["浑身是刺", "吃蚂蚁", "卵生哺乳"] , difficulty: "medium" },
    { name: "袋熊", hints: ["方形便便", "挖洞专家", "澳大利亚"] , difficulty: "medium" },
    { name: "袋貂", hints: ["夜行性", "长尾巴", "树栖有袋"] , difficulty: "medium" },
    { name: "蜜袋鼯", hints: ["滑翔能手", "大眼睛", "可爱萌宠"] , difficulty: "medium" },
    { name: "袋鼠猴", hints: ["前肢灵活", "树栖生活", "南美特产"] , difficulty: "medium" },
    { name: "树袋熊", hints: ["不是熊", "有袋动物", "澳洲特有"] , difficulty: "medium" },
    { name: "短尾猫", hints: ["尾巴很短", "独居猎手", "北美猫科"] , difficulty: "medium" },
    { name: "袋鼠", hints: ["有育儿袋", "澳大利亚特产", "用后腿跳跃"] , difficulty: "medium" },
    { name: "章鱼", hints: ["有八条触手", "海洋生物", "会喷墨汁"] , difficulty: "medium" },
    { name: "蝴蝶", hints: ["色彩斑斓", "从毛毛虫蜕变", "喜欢花朵"] , difficulty: "medium" },
    { name: "海豚", hints: ["聪明友善", "会跳跃", "海洋哺乳动物"] , difficulty: "medium" },
    { name: "孔雀", hints: ["开屏很漂亮", "有长长的尾羽", "鸟类"] , difficulty: "medium" },
    { name: "刺猬", hints: ["身上有刺", "遇到危险会卷成球", "小型哺乳动物"] , difficulty: "medium" },
    { name: "蜗牛", hints: ["背着房子走路", "爬得很慢", "有触角"] , difficulty: "medium" },
    { name: "蝙蝠", hints: ["夜间活动", "会用回声定位", "会飞的哺乳动物"] , difficulty: "medium" },
    { name: "鸳鸯", hints: ["成双成对", "象征爱情", "水鸟"] , difficulty: "medium" },
    { name: "海龟", hints: ["长寿象征", "海洋爬行", "有硬壳保护"] , difficulty: "medium" },
    { name: "袋鼠", hints: ["有育儿袋", "澳大利亚特产", "用后腿跳跃"] , difficulty: "medium" },
    { name: "章鱼", hints: ["有八条触手", "海洋生物", "会喷墨汁"] , difficulty: "medium" },
    { name: "蝴蝶", hints: ["色彩斑斓", "从毛毛虫蜕变", "喜欢花朵"] , difficulty: "medium" },
    { name: "海豚", hints: ["聪明友善", "会跳跃", "海洋哺乳动物"] , difficulty: "medium" },
    { name: "孔雀", hints: ["开屏很漂亮", "有长长的尾羽", "鸟类"] , difficulty: "medium" },
    { name: "刺猬", hints: ["身上有刺", "遇到危险会卷成球", "小型哺乳动物"] , difficulty: "medium" },
    { name: "蜗牛", hints: ["背着房子走路", "爬得很慢", "有触角"] , difficulty: "medium" },
    { name: "蝙蝠", hints: ["夜间活动", "会用回声定位", "会飞的哺乳动物"] , difficulty: "medium" },
    { name: "鸳鸯", hints: ["成双成对", "象征爱情", "水鸟"] , difficulty: "medium" },
    { name: "海龟", hints: ["长寿象征", "海洋爬行", "有硬壳保护"] , difficulty: "medium" },
    { name: "袋鼠", hints: ["有育儿袋", "澳大利亚特产", "用后腿跳跃"] , difficulty: "medium" },
    { name: "章鱼", hints: ["有八条触手", "海洋生物", "会喷墨汁"] , difficulty: "medium" },
    { name: "蝴蝶", hints: ["色彩斑斓", "从毛毛虫蜕变", "喜欢花朵"] , difficulty: "medium" },
    { name: "海豚", hints: ["聪明友善", "会跳跃", "海洋哺乳动物"] , difficulty: "medium" },
    { name: "孔雀", hints: ["开屏很漂亮", "有长长的尾羽", "鸟类"] , difficulty: "medium" },
    { name: "刺猬", hints: ["身上有刺", "遇到危险会卷成球", "小型哺乳动物"] , difficulty: "medium" },
    { name: "蜗牛", hints: ["背着房子走路", "爬得很慢", "有触角"] , difficulty: "medium" },
    { name: "蝙蝠", hints: ["夜间活动", "会用回声定位", "会飞的哺乳动物"] , difficulty: "medium" },
    { name: "鸳鸯", hints: ["成双成对", "象征爱情", "水鸟"] , difficulty: "medium" },
    { name: "海龟", hints: ["长寿象征", "海洋爬行", "有硬壳保护"] , difficulty: "medium" },
    { name: "袋鼠", hints: ["有育儿袋", "澳大利亚特产", "用后腿跳跃"] , difficulty: "medium" },
    { name: "章鱼", hints: ["有八条触手", "海洋生物", "会喷墨汁"] , difficulty: "medium" },
    { name: "蝴蝶", hints: ["色彩斑斓", "从毛毛虫蜕变", "喜欢花朵"] , difficulty: "medium" },
    { name: "海豚", hints: ["聪明友善", "会跳跃", "海洋哺乳动物"] , difficulty: "medium" },
    { name: "孔雀", hints: ["开屏很漂亮", "有长长的尾羽", "鸟类"] , difficulty: "medium" },
    { name: "刺猬", hints: ["身上有刺", "遇到危险会卷成球", "小型哺乳动物"] , difficulty: "medium" },
    { name: "蜗牛", hints: ["背着房子走路", "爬得很慢", "有触角"] , difficulty: "medium" },
    { name: "蝙蝠", hints: ["夜间活动", "会用回声定位", "会飞的哺乳动物"] , difficulty: "medium" },
    { name: "鸳鸯", hints: ["成双成对", "象征爱情", "水鸟"] , difficulty: "medium" },
    { name: "海龟", hints: ["长寿象征", "海洋爬行", "有硬壳保护"] , difficulty: "medium" },
    { name: "狮子", hints: ["草原之王", "有鬃毛", "猫科动物"] , difficulty: "medium" },
    { name: "大象", hints: ["长鼻子", "大耳朵", "陆地上最大的动物"] , difficulty: "medium" },
    { name: "熊猫", hints: ["黑白相间", "爱吃竹子", "中国的国宝"] , difficulty: "medium" },
    { name: "长颈鹿", hints: ["脖子很长", "身上有斑点", "最高的陆地动物"] , difficulty: "medium" },
    { name: "企鹅", hints: ["不会飞", "生活在南极", "走路摇摇摆摆"] , difficulty: "medium" },
    { name: "猴子", hints: ["聪明灵活", "喜欢爬树", "爱吃香蕉"] , difficulty: "medium" },
    { name: "老虎", hints: ["森林之王", "有条纹", "独居动物"] , difficulty: "medium" },
    { name: "海豚", hints: ["聪明友善", "会跳跃", "海洋哺乳动物"] , difficulty: "medium" },
    { name: "孔雀", hints: ["美丽羽毛", "会开屏", "鸟类"] , difficulty: "medium" },
    { name: "兔子", hints: ["长耳朵", "爱吃胡萝卜", "跳得很快"] , difficulty: "medium" },
    { name: "狐狸", hints: ["聪明狡猾", "红棕色毛", "尾巴很大"] , difficulty: "medium" },
    { name: "乌龟", hints: ["背上有壳", "行动缓慢", "寿命很长"] , difficulty: "medium" },
    { name: "蝴蝶", hints: ["有彩色翅膀", "从毛毛虫变来", "喜欢花朵"] , difficulty: "medium" },
    { name: "章鱼", hints: ["有八条触手", "生活在海里", "很聪明"] , difficulty: "medium" },
    { name: "袋鼠", hints: ["有育儿袋", "会跳得很远", "澳大利亚特产"] , difficulty: "medium" },
    { name: "猫头鹰", hints: ["夜间活动", "大眼睛", "聪明的象征"] , difficulty: "medium" },
    { name: "刺猬", hints: ["身上有刺", "吃昆虫", "卷成球保护自己"] , difficulty: "medium" },
    { name: "水母", hints: ["透明身体", "漂浮在海里", "会发光"] , difficulty: "medium" },
    { name: "变色龙", hints: ["能改变颜色", "舌头很长", "爬行动物"] , difficulty: "medium" },
    { name: "考拉", hints: ["生活在树上", "爱吃桉树叶", "澳大利亚特产"] , difficulty: "medium" },
    { name: "河马", hints: ["体型庞大", "喜欢水", "嘴巴很大"] , difficulty: "medium" },
    { name: "斑马", hints: ["身上有条纹", "像马", "非洲草原"] , difficulty: "medium" },
    { name: "犀牛", hints: ["头上有角", "皮肤很厚", "濒危动物"] , difficulty: "medium" },
    { name: "北极熊", hints: ["生活在北极", "白色毛皮", "游泳能手"] , difficulty: "medium" },
    { name: "大猩猩", hints: ["体型巨大", "捶胸顿足", "森林中的王者"] , difficulty: "medium" },
    { name: "鳄鱼", hints: ["冷血动物", "牙齿锋利", "生活在水中"] , difficulty: "medium" },
    { name: "老鹰", hints: ["视力敏锐", "翱翔天空", "猛禽之王"] , difficulty: "medium" },
    { name: "狼", hints: ["群居动物", "嚎叫", "森林猎手"] , difficulty: "medium" },
    { name: "猫", hints: ["喵星人", "夜间视力好", "爱干净"] , difficulty: "medium" },
    { name: "狗", hints: ["人类最忠诚的朋友", "嗅觉灵敏", "看家护院"] , difficulty: "medium" },
    { name: "蛇", hints: ["没有四肢", "舌头分叉", "冷血动物"] , difficulty: "medium" },
    { name: "青蛙", hints: ["两栖动物", "会游泳", "捕虫能手"] , difficulty: "medium" },
    { name: "凤凰", hints: ["百鸟之王", "浴火重生", "吉祥象征"] , difficulty: "medium" },
    { name: "鲸鱼", hints: ["体型巨大", "海洋哺乳动物", "喷水柱"] , difficulty: "medium" },
    { name: "海马", hints: ["形状像马", "雄性育儿", "直立游泳"] , difficulty: "medium" },
    { name: "水獭", hints: ["水中精灵", "爱玩石头", "毛皮光滑"] , difficulty: "medium" },
    { name: "雪豹", hints: ["高山隐士", "行踪神秘", "美丽皮毛"] , difficulty: "medium" },
    { name: "海狮", hints: ["聪明伶俐", "表演明星", "鳍足动物"] , difficulty: "medium" },
    { name: "珊瑚", hints: ["海洋花园", "珊瑚虫分泌", "五彩斑斓"] , difficulty: "medium" },
    { name: "海星", hints: ["星形外观", "五辐射对称", "再生能力强"] , difficulty: "medium" },
    { name: "海胆", hints: ["球形刺猬", "食用海鲜", "海洋生物"] , difficulty: "medium" },
    { name: "海龟", hints: ["长寿象征", "海中慢游", "有硬壳"] , difficulty: "medium" },
    { name: "螃蟹", hints: ["横着走", "八条腿", "美味海鲜"] , difficulty: "medium" },
    { name: "龙虾", hints: ["大型虾类", "美味佳肴", "红色外壳"] , difficulty: "medium" },
    { name: "海鸥", hints: ["海上飞行", "捕鱼高手", "白色羽毛"] , difficulty: "medium" },
    { name: "信天翁", hints: ["长途飞行", "翼展极长", "海洋鸟类"] , difficulty: "medium" },
    { name: "海豹", hints: ["游泳健将", "憨态可掬", "鳍足类"] , difficulty: "medium" },
    { name: "海象", hints: ["长牙巨兽", "北极居民", "鳍足类"] , difficulty: "medium" },
    { name: "海獭", hints: ["可爱萌宠", "使用工具", "海洋哺乳动物"] , difficulty: "medium" },
    { name: "儒艮", hints: ["美人鱼原型", "海草食客", "温和巨兽"] , difficulty: "medium" },
    { name: "蝠鲼", hints: ["魔鬼鱼", "优雅滑翔", "鳐鱼近亲"] , difficulty: "medium" },
    { name: "海牛", hints: ["温和巨兽", "海草食客", "行动缓慢"] , difficulty: "medium" },
    ],
    generate: function() {
    return this.animals[Math.floor(Math.random() * this.animals.length)];
    },
    validate: function(guess, answer) {
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
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "画蛇添足", emoji: "🐍🦶" },
    { idiom: "守株待兔", emoji: "🌳🐇" },
    { idiom: "亡羊补牢", emoji: "🐑🔧" },
    { idiom: "掩耳盗铃", emoji: "👂🔔" },
    { idiom: "杯弓蛇影", emoji: "🍷🐍" },
    { idiom: "一鼓作气", emoji: "1️⃣🥁💨" , difficulty: "easy" },
    { idiom: "一帆风顺", emoji: "1️⃣⛵✅" , difficulty: "easy" },
    { idiom: "一路顺风", emoji: "1️⃣路顺风" , difficulty: "medium" },
    { idiom: "一生一世", emoji: "1️⃣生 1️⃣世" , difficulty: "medium" },
    { idiom: "一心一意", emoji: "1️⃣心 1️⃣意" , difficulty: "medium" },
    { idiom: "一言为定", emoji: "1️⃣言定" , difficulty: "easy" },
    { idiom: "螳螂捕蝉", emoji: "🦗🐦" , difficulty: "easy" },
    { idiom: "金蝉脱壳", emoji: "🐛🪲" , difficulty: "easy" },
    { idiom: "蛛丝马迹", emoji: "🕷️🐎" , difficulty: "easy" },
    { idiom: "蚕食鲸吞", emoji: "🐛🐋" , difficulty: "easy" },
    { idiom: "蜂拥而至", emoji: "🐝🌊" , difficulty: "easy" },
    { idiom: "狼吞虎咽", emoji: "🐺🐯" , difficulty: "easy" },
    { idiom: "鹰击长空", emoji: "🦅☁️" , difficulty: "easy" },
    { idiom: "鱼贯而入", emoji: "🐟🚪" , difficulty: "easy" },
    { idiom: "蛇行鼠窜", emoji: "🐍🐭" , difficulty: "easy" },
    { idiom: "鸡犬不宁", emoji: "🐔🐕😫" , difficulty: "easy" },
    { idiom: "猪突豨勇", emoji: "🐷💪" , difficulty: "easy" },
    { idiom: "牛刀小试", emoji: "🐂🔪" , difficulty: "easy" },
    { idiom: "马不停蹄", emoji: "🐴🏃" , difficulty: "easy" },
    { idiom: "羊落虎口", emoji: "🐑🐯" , difficulty: "easy" },
    { idiom: "猴头猴脑", emoji: "🐒🧠" , difficulty: "easy" },
    { idiom: "龙马精神", emoji: "🐉🐴✨" , difficulty: "easy" },
    { idiom: "蛇蝎美人", emoji: "🐍🦂👸" , difficulty: "easy" },
    { idiom: "鼠窃狗偷", emoji: "🐭🐕🔫" , difficulty: "easy" },
    { idiom: "牛头不对马嘴", emoji: "🐂❌🐴" , difficulty: "easy" },
    { idiom: "虎头蛇尾", emoji: "🐯🐍" , difficulty: "easy" },
    { idiom: "兔死狗烹", emoji: "🐰💀🐕" , difficulty: "easy" },
    { idiom: "一诺千金", emoji: "1️⃣💬💎" , difficulty: "easy" },
    { idiom: "一字千金", emoji: "1️⃣字💎" , difficulty: "easy" },
    { idiom: "一言九鼎", emoji: "1️⃣言9️⃣🔔" , difficulty: "medium" },
    { idiom: "一举两得", emoji: "1️⃣✋2️⃣✅" , difficulty: "medium" },
    { idiom: "一劳永逸", emoji: "1️⃣💪永✨" , difficulty: "medium" },
    { idiom: "一针见血", emoji: "💉🩸" , difficulty: "easy" },
    { idiom: "一步登天", emoji: "1️⃣步☁️" , difficulty: "medium" },
    { idiom: "一窍不通", emoji: "1️⃣❌🔧" , difficulty: "easy" },
    { idiom: "一清二白", emoji: "1️⃣清2️⃣白" , difficulty: "medium" },
    { idiom: "一穷二白", emoji: "1️⃣穷2️⃣白" , difficulty: "medium" },
    { idiom: "一唱一和", emoji: "🎤1️⃣🎤1️⃣" , difficulty: "medium" },
    { idiom: "一五一十", emoji: "1️⃣5️⃣1️⃣0️⃣" , difficulty: "hard" },
    { idiom: "一刀两断", emoji: "🔪1️⃣2️⃣" , difficulty: "medium" },
    { idiom: "二话不说", emoji: "2️⃣❌💬" , difficulty: "easy" },
    { idiom: "三长两短", emoji: "3️⃣➖2️⃣➖" , difficulty: "medium" },
    { idiom: "三番五次", emoji: "3️⃣5️⃣" , difficulty: "medium" },
    { idiom: "三令五申", emoji: "3️⃣5️⃣📢" , difficulty: "medium" },
    { idiom: "三生有幸", emoji: "3️⃣生✨" , difficulty: "easy" },
    { idiom: "三思而行", emoji: "3️⃣🤔行动" , difficulty: "medium" },
    { idiom: "四分五裂", emoji: "4️⃣5️⃣💔" , difficulty: "medium" },
    { idiom: "五花八门", emoji: "5️⃣8️⃣门" , difficulty: "medium" },
    { idiom: "六亲不认", emoji: "6️⃣❌家人" , difficulty: "medium" },
    { idiom: "七零八落", emoji: "7️⃣0️⃣8️⃣落" , difficulty: "hard" },
    { idiom: "八九不离十", emoji: "8️⃣9️⃣1️⃣0️⃣" , difficulty: "hard" },
    { idiom: "一马当先", emoji: "🐴⚡🏃" , difficulty: "easy" },
    { idiom: "两全其美", emoji: "2️⃣✅✨" , difficulty: "easy" },
    { idiom: "三顾茅庐", emoji: "3️⃣🏠👨" , difficulty: "easy" },
    { idiom: "四脚朝天", emoji: "4️⃣🦵☀️" , difficulty: "medium" },
    { idiom: "五光十色", emoji: "5️⃣✨🌈" , difficulty: "easy" },
    { idiom: "六六大顺", emoji: "6️⃣6️⃣✅" , difficulty: "medium" },
    { idiom: "七步之才", emoji: "7️⃣📚💡" , difficulty: "easy" },
    { idiom: "八面玲珑", emoji: "8️⃣💎✨" , difficulty: "easy" },
    { idiom: "九死一生", emoji: "9️⃣💀✅" , difficulty: "easy" },
    { idiom: "十拿九稳", emoji: "1️⃣0️⃣9️⃣✅" , difficulty: "hard" },
    { idiom: "百折不挠", emoji: "1️⃣0️⃣0️⃣💪" , difficulty: "hard" },
    { idiom: "千言万语", emoji: "1️⃣0️⃣0️⃣🗣️" , difficulty: "hard" },
    { idiom: "万众一心", emoji: "1️⃣0️⃣0️⃣0️⃣❤️" , difficulty: "hard" },
    { idiom: "亿兆一心", emoji: "1️⃣🌟0️⃣❤️" , difficulty: "medium" },
    { idiom: "掩耳盗钟", emoji: "👂🔔😂" , difficulty: "easy" },
    { idiom: "拔苗助长", emoji: "🌱✂️⬆️" , difficulty: "easy" },
    { idiom: "牛头马面", emoji: "🐂🐴" , difficulty: "easy" },
    { idiom: "羊入虎口", emoji: "🐑🐯" , difficulty: "easy" },
    { idiom: "蜻蜓点水", emoji: "🦟💧" , difficulty: "easy" },
    { idiom: "蝴蝶恋花", emoji: "🦋🌸" , difficulty: "easy" },
    { idiom: "蜜蜂采蜜", emoji: "🐝🍯" , difficulty: "easy" },
    { idiom: "蚂蚁搬家", emoji: "🐜🏠" , difficulty: "easy" },
    { idiom: "鸡毛蒜皮", emoji: "🐔🪶🧄皮" , difficulty: "easy" },
    { idiom: "羊肠小道", emoji: "🐑腸🛤️" , difficulty: "easy" },
    { idiom: "猴年马月", emoji: "🐒📅🐴" , difficulty: "easy" },
    { idiom: "猪狗不如", emoji: "🐷🐕❌" , difficulty: "easy" },
    { idiom: "牛鬼蛇神", emoji: "🐂👻🐍" , difficulty: "easy" },
    { idiom: "龙腾虎跃", emoji: "🐉🐯💪" , difficulty: "easy" },
    { idiom: "凤毛麟角", emoji: "🐦🪶🦄" , difficulty: "easy" },
    { idiom: "鸦雀无声", emoji: "🦆🐦🔇" , difficulty: "easy" },
    { idiom: "莺歌燕舞", emoji: "🐦🎵🦜💃" , difficulty: "easy" },
    { idiom: "一石二鸟", emoji: "🪨🐦🐦" , difficulty: "easy" },
    { idiom: "画龙点睛", emoji: "🐉👁️✨" , difficulty: "easy" },
    { idiom: "亡羊补牢", emoji: "🐑🔧🏠" , difficulty: "easy" },
    { idiom: "刻舟求剑", emoji: "⛵🔪⚔️" , difficulty: "easy" },
    { idiom: "掩耳盗铃", emoji: "👂🔔😂" , difficulty: "easy" },
    { idiom: "杯弓蛇影", emoji: "🍷🏹🐍" , difficulty: "easy" },
    { idiom: "滥竽充数", emoji: "🎵🔢❌" , difficulty: "easy" },
    { idiom: "买椟还珠", emoji: "📦💎🔄" , difficulty: "easy" },
    { idiom: "南辕北辙", emoji: "🗺️⬆️⬇️" , difficulty: "medium" },
    { idiom: "郑人买履", emoji: "👞📏🤔" , difficulty: "easy" },
    { idiom: "画蛇添足", emoji: "🎨🐍➕🦶" , difficulty: "easy" },
    { idiom: "守株待兔", emoji: "🌳🐇⏳" , difficulty: "easy" },
    { idiom: "井底之蛙", emoji: "⬇️🐸👀🌍" , difficulty: "easy" },
    { idiom: "狐假虎威", emoji: "🦊🐯💪" , difficulty: "easy" },
    { idiom: "对牛弹琴", emoji: "🐮🎹🎶" , difficulty: "easy" },
    { idiom: "一箭双雕", emoji: "🏹🦅🦅" , difficulty: "easy" },
    { idiom: "三心二意", emoji: "💓💓💓🤔" , difficulty: "easy" },
    { idiom: "四面楚歌", emoji: "🌍🎵😰" , difficulty: "easy" },
    { idiom: "五湖四海", emoji: "🔟🌊🗺️" , difficulty: "easy" },
    { idiom: "六神无主", emoji: "😱❄️💭" , difficulty: "easy" },
    { idiom: "七上八下", emoji: "⬆️7️⃣⬇️8️⃣" , difficulty: "hard" },
    { idiom: "八仙过海", emoji: "🧙‍♂️🌊✨" , difficulty: "medium" },
    { idiom: "九牛一毛", emoji: "🐂🐂🐂💨" , difficulty: "easy" },
    { idiom: "十全十美", emoji: "1️⃣0️⃣✨🌟" , difficulty: "medium" },
    { idiom: "百发百中", emoji: "🎯🏹✅" , difficulty: "easy" },
    { idiom: "千钧一发", emoji: "💎😱⚠️" , difficulty: "easy" },
    { idiom: "万无一失", emoji: "1️⃣0️⃣0️⃣%✅" , difficulty: "hard" },
    { idiom: "人山人海", emoji: "👥🏔️👥" , difficulty: "easy" },
    { idiom: "心花怒放", emoji: "❤️🌸😁" , difficulty: "easy" },
    { idiom: "画龙点睛", emoji: "🎨🐉👁️✨" , difficulty: "easy" },
    { idiom: "亡羊补牢", emoji: "🐑❌🔒✅" , difficulty: "easy" },
    { idiom: "掩耳盗铃", emoji: "👂🙈🔔😅" , difficulty: "easy" },
    { idiom: "刻舟求剑", emoji: "⛵🔪🗡️❓" , difficulty: "easy" },
    { idiom: "杯弓蛇影", emoji: "🍷🏹🐍👤" , difficulty: "easy" },
    { idiom: "叶公好龙", emoji: "🍃👨❤️🐉" , difficulty: "easy" },
    { idiom: "自相矛盾", emoji: "🛡️⚔️🤔" , difficulty: "easy" },
    { idiom: "滥竽充数", emoji: "🎵🎶🎭🔢" , difficulty: "easy" },
    { idiom: "买椟还珠", emoji: "💰📦🔙💎" , difficulty: "easy" },
    { idiom: "邯郸学步", emoji: "🏃‍♂️🚶‍♂️🎭❌" , difficulty: "hard" },
    { idiom: "胸有成竹", emoji: "👔🎋🎍✅" , difficulty: "easy" },
    { idiom: "鹤立鸡群", emoji: "🦢🐔👑" , difficulty: "easy" },
    { idiom: "鱼跃龙门", emoji: "🐟🐉🚪✨" , difficulty: "easy" },
    { idiom: "龟兔赛跑", emoji: "🐢🐇🏃‍♂️🏆" , difficulty: "medium" },
    { idiom: "马到成功", emoji: "🐎🏃‍♂️✅🎉" , difficulty: "medium" },
    { idiom: "龙飞凤舞", emoji: "🐉🐦💃✨" , difficulty: "easy" },
    { idiom: "虎视眈眈", emoji: "🐯👀😠" , difficulty: "easy" },
    { idiom: "蛇蝎心肠", emoji: "🐍🦂💔😈" , difficulty: "easy" },
    { idiom: "鸟语花香", emoji: "🐦🌸💐🌺" , difficulty: "easy" },
    { idiom: "鱼水情深", emoji: "🐟💧❤️🥰" , difficulty: "easy" },
    { idiom: "鼠目寸光", emoji: "🐭👀📏❌" , difficulty: "easy" },
    { idiom: "牛郎织女", emoji: "🐂👦✨👩🌟" , difficulty: "easy" },
    { idiom: "猴子捞月", emoji: "🐒🌙💧❌" , difficulty: "easy" },
    { idiom: "狗急跳墙", emoji: "🐕😤🏃‍♂️🧱" , difficulty: "medium" },
    { idiom: "猪八戒", emoji: "🐷😋🍚💤" , difficulty: "easy" },
    { idiom: "杀鸡儆猴", emoji: "🐔🐒⚠️😱" , difficulty: "easy" },
    { idiom: "兔死狐悲", emoji: "🐰💔🦊😢" , difficulty: "easy" },
    { idiom: "龙潭虎穴", emoji: "🐉🐯🕳️😨" , difficulty: "easy" },
    { idiom: "虎口余生", emoji: "🐯👄💀✅" , difficulty: "easy" },
    { idiom: "羊毛出在羊身上", emoji: "🐑🧶🐑💰" , difficulty: "easy" },
    { idiom: "鸡犬升天", emoji: "🐔🐕✨🚀" , difficulty: "easy" },
    { idiom: "龙争虎斗", emoji: "🐉🐯⚔️🔥" , difficulty: "easy" },
    { idiom: "狐朋狗友", emoji: "🦊🐕👥😄" , difficulty: "easy" },
    { idiom: "狼狈为奸", emoji: "🐺🦊🤝😈" , difficulty: "easy" },
    { idiom: "盲人摸象", emoji: "👁️‍🗨️🐘🤔❓" , difficulty: "medium" },
    { idiom: "对酒当歌", emoji: "🍶🎵🕺✨" , difficulty: "easy" },
    { idiom: "望梅止渴", emoji: "👀🍑💦😋" , difficulty: "easy" },
    { idiom: "画饼充饥", emoji: "🎨🥧🤤❌" , difficulty: "easy" },
    { idiom: "守财奴", emoji: "💰👴🔒😠" , difficulty: "easy" },
    ],
    generate: function() {
    return this.idioms[Math.floor(Math.random() * this.idioms.length)];
    },
    validate: function(guess, answer) {
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
    const parsed = JSON.parse(savedStats);
    // 合并默认统计，避免旧数据缺失字段
    this.stats = {
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
    };
    // 确保嵌套对象存在
    if (!this.stats.modeStats) this.stats.modeStats = {};
    if (!this.stats.difficultyStats) this.stats.difficultyStats = {};
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
    // 二次元樱花效果
    const sakuraEmojis = ['🌸', '💮', '🌺', '✨'];
    for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    // 随机位置和动画延迟
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particle.style.animationDuration = `${10 + Math.random() * 15}s`;
    // 设置樱花 emoji
    particle.textContent = sakuraEmojis[Math.floor(Math.random() * sakuraEmojis.length)];
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
    // 设置初始提示 - 显示原始问题/提示
    switch(mode) {
    case 'number':
    this.ui.hintText.innerHTML = `<div class="original-hint">🎯 猜一个 1-100 之间的数字</div>`;
    this.generateQuickNumbers();
    break;
    case 'word':
    this.ui.hintText.innerHTML = `<div class="original-hint">📝 题目：${this.answer.hint}</div><div class="answer-length">💬 答案长度：${this.answer.word.length} 个字</div>`;
    break;
    case 'animal':
    this.ui.hintText.innerHTML = `<div class="original-hint">🐾 提示 1：${this.answer.hints[0]}</div><div class="answer-length">💬 答案长度：${this.answer.name.length} 个字</div>`;
    break;
    case 'emoji':
    this.ui.hintText.innerHTML = `<div class="original-hint">😊 表情：${this.answer.emoji}</div><div class="answer-length">💬 成语长度：${this.answer.idiom.length} 个字</div>`;
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
    if (this.hintsUsed >= this.maxHints) {
    alert('💡 提示已用完！');
    return;
    }
    this.hintsUsed++;
    this.ui.hintsLeft.textContent = this.maxHints - this.hintsUsed;
    
    // 生成额外提示，不覆盖原有内容
    let extraHint = '';
    
    switch(this.currentMode) {
    case 'number':
    // 多级范围提示
    if (this.hintsUsed === 1) {
    const range = 20;
    const min = Math.max(1, this.answer - range);
    const max = Math.min(100, this.answer + range);
    extraHint = `🔍 范围提示：答案在 ${min} 到 ${max} 之间`;
    } else if (this.hintsUsed === 2) {
    const range = 10;
    const min = Math.max(1, this.answer - range);
    const max = Math.min(100, this.answer + range);
    extraHint = `🎯 精确范围：答案在 ${min} 到 ${max} 之间`;
    } else {
    const isOdd = this.answer % 2 === 1;
    extraHint = `💡 最后提示：这是一个${isOdd ? '奇数' : '偶数'}`;
    }
    break;
    
    case 'word':
    // 多级提示：首字母 → 类别 → 相关词
    if (this.hintsUsed === 1) {
    const firstLetter = this.answer.word.charAt(0);
    extraHint = `🔤 首字提示：第一个字是"${firstLetter}"`;
    } else if (this.hintsUsed === 2) {
    const category = this.getWordCategory(this.answer.word);
    extraHint = `📚 类别提示：属于${category}`;
    } else {
    const relatedWord = this.getRelatedWord(this.answer.word);
    extraHint = `🔗 联想提示：想想"${relatedWord}"相关的词`;
    }
    break;
    
    case 'animal':
    // 多级提示：显示更多预设提示
    if (this.hintsUsed < this.answer.hints.length) {
    extraHint = `🐾 提示${this.hintsUsed + 1}：${this.answer.hints[this.hintsUsed]}`;
    } else {
    const category = this.getAnimalCategory(this.answer.name);
    extraHint = `💡 最后提示：这是一种${category}动物`;
    }
    break;
    
    case 'emoji':
    // 多级提示：字数 → 含义 → 首字
    if (this.hintsUsed === 1) {
    const wordCount = this.answer.idiom.length;
    extraHint = `📏 字数提示：这是一个${wordCount}字成语`;
    } else if (this.hintsUsed === 2) {
    const meaning = this.getIdiomMeaning(this.answer.idiom);
    extraHint = `💭 含义提示：${meaning}`;
    } else {
    const firstChar = this.answer.idiom.charAt(0);
    extraHint = `🔤 首字提示：第一个字是"${firstChar}"`;
    }
    break;
    }
    
    // 在原始提示下方追加额外提示，不覆盖原有内容
    const originalHint = this.ui.hintText.innerHTML;
    this.ui.hintText.innerHTML = `${originalHint}<div class="extra-hint">✨ ${extraHint}</div>`;
    
    // 添加动画效果
    const hintCard = document.querySelector('.hint-card');
    hintCard.classList.add('pulse');
    setTimeout(() => hintCard.classList.remove('pulse'), 500);
    }
    
    // 获取词语类别
    getWordCategory(word) {
    const techWords = ['Python', 'JavaScript', 'HTML', 'CSS', 'Java', '编程', '代码', '软件', '网络', '数字'];
    const natureWords = ['宇宙', '星球', '银河', '太阳', '月亮', '海洋', '森林', '彩虹', '沙漠', '火山', '冰川', '流星', '云朵', '闪电', '露珠', '雪花', '雾霾'];
    const emotionWords = ['梦想', '友谊', '勇气', '希望', '幸福', '成功', '智慧', '和平', '感恩', '坚持', '宽容', '乐观', '善良', '诚实', '勤奋'];
    const disasterWords = ['地震', '台风', '飓风', '龙卷风', '暴雨', '干旱', '霜冻', '雾气', '沙尘', '泥石流', '滑坡', '崩塌', '海啸'];
    
    if (techWords.some(w => word.includes(w))) return '科技/计算机类';
    if (natureWords.some(w => word.includes(w))) return '自然/地理类';
    if (emotionWords.some(w => word.includes(w))) return '情感/品质类';
    if (disasterWords.some(w => word.includes(w))) return '灾害/天气类';
    return '其他类';
    }
    
    // 获取相关词
    getRelatedWord(word) {
    const relatedMap = {
    'Python': '编程', 'JavaScript': '网页', 'HTML': '网页', 'CSS': '样式', 'Java': '编程',
    '宇宙': '太空', '星球': '天体', '银河': '星河', '太阳': '光明', '月亮': '夜晚',
    '梦想': '目标', '友谊': '朋友', '勇气': '勇敢', '希望': '期待', '幸福': '快乐',
    '地震': '震动', '台风': '风暴', '彩虹': '七彩', '沙漠': '干旱', '火山': '喷发'
    };
    return relatedMap[word] || '相关事物';
    }
    
    // 获取动物类别
    getAnimalCategory(name) {
    const landAnimals = ['熊猫', '狮子', '老虎', '大象', '长颈鹿', '猴子', '兔子', '狐狸', '袋鼠', '考拉', '狼', '熊'];
    const seaAnimals = ['章鱼', '海豚', '海龟', '鲸鱼', '海星', '海胆', '螃蟹', '龙虾', '海豹', '海象', '海獭', '海牛'];
    const birdAnimals = ['企鹅', '孔雀', '蝴蝶', '鸳鸯', '海鸥', '信天翁', '老鹰', '猫头鹰', '凤凰'];
    const insectAnimals = ['蝴蝶', '蜜蜂', '蚂蚁', '蜻蜓', '蜘蛛', '蚕', '蝉', '萤火虫'];
    
    if (landAnimals.some(a => name.includes(a))) return '陆地';
    if (seaAnimals.some(a => name.includes(a))) return '海洋';
    if (birdAnimals.some(a => name.includes(a))) return '鸟类';
    if (insectAnimals.some(a => name.includes(a))) return '昆虫';
    return '其他';
    }
    
    // 获取成语含义
    getIdiomMeaning(idiom) {
    const meaningMap = {
    '画蛇添足': '比喻做了多余的事，反而不恰当',
    '守株待兔': '比喻死守狭隘经验，不知变通',
    '亡羊补牢': '比喻出了问题以后想办法补救',
    '掩耳盗铃': '比喻自己欺骗自己',
    '杯弓蛇影': '比喻因疑神疑鬼而引起恐惧',
    '滥竽充数': '比喻没有真才实学的人混在行家里面',
    '买椟还珠': '比喻没有眼光，取舍不当',
    '刻舟求剑': '比喻拘泥成例，不知道跟着情势的变化而改变看法或办法',
    '一鼓作气': '比喻趁劲头大的时候鼓起干劲，一口气把工作做完',
    '一帆风顺': '比喻非常顺利，没有任何阻碍',
    '一举两得': '做一件事得到两方面的好处',
    '一石二鸟': '比喻做一件事达到两个目的',
    '画龙点睛': '比喻作文或说话时在关键地方加上精辟的语句',
    '对牛弹琴': '比喻对不懂道理的人讲道理',
    '狐假虎威': '比喻依仗别人的势力来欺压人',
    '井底之蛙': '比喻见识狭窄的人',
    '三心二意': '意志不坚定，犹豫不决',
    '四面楚歌': '比喻陷入四面受敌、孤立无援的境地',
    '五湖四海': '指全国各地，有时也指世界各地',
    '六神无主': '形容惊慌着急，没了主意，不知如何才好',
    '七上八下': '形容心里慌乱不安',
    '九牛一毛': '比喻极大数量中极微小的数量',
    '十全十美': '十分完美，毫无欠缺',
    '人山人海': '人群如山似海，形容人聚集得非常多',
    '心花怒放': '形容内心高兴极了',
    '鸟语花香': '形容春天的美好景象',
    '龙飞凤舞': '形容气势奔放雄壮，也形容书法笔势有力',
    '虎视眈眈': '像老虎那样凶狠地盯着，形容心怀不善',
    '鹤立鸡群': '比喻一个人的仪表或才能在周围一群人里显得很突出'
    };
    return meaningMap[idiom] || '想想这个成语的意思';
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
    // 保存到排行榜
    if (isWin) {
    this.saveToLeaderboard(totalScore, isWin);
    }
    // 设置消息
    if (isWin) {
    this.ui.resultMessage.textContent = `你猜中了答案：${this.getAnswerText()}！`;
    this.createConfetti();
    } else {
    this.ui.resultMessage.textContent = `正确答案是：${this.getAnswerText()}`;
    }
    // 添加分享按钮
    const shareBtn = document.querySelector(".share-btn");
    if (shareBtn) shareBtn.remove();
    document.querySelector(".result-actions").insertAdjacentHTML("beforeend", `
    <button class="btn share-btn" onclick="game.shareResult()">
    📤 分享成绩
    </button>`);
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
    // 二次元可爱风格彩带颜色
    const colors = ['#ff66b2', '#ff3399', '#ff99cc', '#ffcc00', '#66cc66'];
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
