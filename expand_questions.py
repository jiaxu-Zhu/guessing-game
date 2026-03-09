#!/usr/bin/env python3
"""🎯 扩充 guessing-game 题目库到目标数量"""

import re

# 目标数量
TARGET_WORDS = 150
TARGET_ANIMALS = 100
TARGET_IDIOMS = 150

# 新增词语（自然地理类）
NEW_WORDS = [
    ("宇宙", "包含一切物质和能量的无限空间"),
    ("星球", "围绕恒星运行的天体"),
    ("银河", "横跨夜空的星河带"),
    ("黑洞", "引力极强连光都无法逃脱的天体"),
    ("彗星", "拖着长尾巴绕太阳运行的冰体"),
    ("极光", "极地夜空中的彩色光幕"),
    ("日食", "月球遮挡太阳的天文现象"),
    ("月食", "地球遮挡太阳光照射月球"),
    ("潮汐", "海水受月球引力产生的涨落"),
    ("地震", "地壳快速释放能量造成的震动"),
    ("台风", "热带海洋上形成的强风暴"),
    ("飓风", "大西洋地区的强烈热带气旋"),
    ("龙卷风", "旋转极强的柱状气流"),
    ("暴雨", "短时间内大量降水的天气"),
    ("干旱", "长期缺乏降水的气候状况"),
    ("霜冻", "气温低于零度形成的冰晶"),
    ("雾气", "近地面水汽凝结形成的朦胧"),
    ("沙尘", "风力搬运的细小沙粒"),
    ("泥石流", "山区爆发的含泥砂洪流"),
    ("滑坡", "斜坡岩土体沿滑动面下滑"),
    ("崩塌", "陡峭山坡岩石突然坠落"),
    ("海啸", "海底地震引发的巨浪"),
    ("珊瑚礁", "珊瑚虫分泌形成的海洋生态"),
    ("红树林", "海岸潮间带的木本植物群落"),
    ("湿地", "陆地和水域之间的过渡地带"),
    ("草原", "以草本植物为主的开阔地带"),
    ("苔原", "寒冷地区低矮植被覆盖的地带"),
    ("峡谷", "两侧陡峭的深谷地形"),
    ("高原", "海拔较高地势平坦的大片土地"),
    ("盆地", "四周高中间低的盆状地形"),
    ("丘陵", "起伏不大坡度较缓的山地"),
    ("岛屿", "被水包围的小块陆地"),
    ("半岛", "三面环水一面连陆的陆地"),
    ("海峡", "两块陆地之间连接两片海域的通道"),
    ("海湾", "海洋伸入陆地的部分"),
    ("三角洲", "河流入海口形成的扇形平原"),
    ("瀑布", "水流从高处垂直跌落"),
    ("湖泊", "陆地上较大的积水区域"),
    ("河流", "天然水道流向海洋或湖泊"),
    ("泉水", "地下水流出的自然水源"),
    ("温泉", "温度高于环境的地下水"),
]

# 新增动物
NEW_ANIMALS = [
    ("企鹅", ["不会飞", "生活在南极", "走路摇摇摆摆"]),
    ("北极狐", ["白色毛皮", "极地生存", "聪明敏捷"]),
    ("雪鸮", ["白色羽毛", "夜间捕猎", "北极鸟类"]),
    ("海象", ["长牙巨兽", "北极居民", "鳍足类"]),
    ("驯鹿", ["角很大", "拉雪橇", "寒带动物"]),
    ("驼鹿", ["体型巨大", "角如手掌", "森林之王"]),
    ("猞猁", ["耳尖有簇毛", "独居猎手", "中型猫科"]),
    ("狼獾", ["凶猛无畏", "体型小力量大", "鼬科动物"]),
    ("棕熊", ["体型庞大", "冬眠动物", "杂食性"]),
    ("黑熊", ["善于爬树", "爱吃蜂蜜", "夜行性"]),
    ("浣熊", ["黑眼圈", "爱洗食物", "夜行性"]),
    ("负鼠", ["装死高手", "育儿袋", "北美特产"]),
    ("土拨鼠", ["会站立", "冬眠专家", "草原啮齿"]),
    ("旱獭", ["体型肥大", "洞穴专家", "高山动物"]),
    ("松鼠", ["大尾巴", "储存坚果", "树栖啮齿"]),
    ("花栗鼠", ["背部有条纹", "颊囊储食", "小型啮齿"]),
    ("豪猪", ["浑身是刺", "防御能手", "夜行性"]),
    ("穿山甲", ["全身鳞片", "吃蚂蚁", "濒危动物"]),
    ("树懒", ["行动缓慢", "倒挂树枝", "热带动物"]),
    ("食蚁兽", ["长鼻子", "专吃蚂蚁", "无齿动物"]),
    ("犰狳", ["硬壳保护", "挖洞能手", "美洲特产"]),
    ("鸭嘴兽", ["鸭嘴模样", "卵生哺乳", "澳大利亚特产"]),
    ("针鼹", ["浑身是刺", "吃蚂蚁", "卵生哺乳"]),
    ("考拉", ["抱树睡觉", "爱吃桉树叶", "澳洲国宝"]),
    ("袋熊", ["方形便便", "挖洞专家", "澳大利亚"]),
    ("袋貂", ["夜行性", "长尾巴", "树栖有袋"]),
    ("蜜袋鼯", ["滑翔能手", "大眼睛", "可爱萌宠"]),
    ("袋鼠猴", ["前肢灵活", "树栖生活", "南美特产"]),
    ("树袋熊", ["不是熊", "有袋动物", "澳洲特有"]),
    ("短尾猫", ["尾巴很短", "独居猎手", "北美猫科"]),
]

# 新增成语
NEW_IDIOMS = [
    ("画蛇添足", "🎨🐍➕🦶"),
    ("守株待兔", "🌳🐇⏳"),
    ("井底之蛙", "⬇️🐸👀🌍"),
    ("狐假虎威", "🦊🐯💪"),
    ("对牛弹琴", "🐮🎹🎶"),
    ("一箭双雕", "🏹🦅🦅"),
    ("三心二意", "💓💓💓🤔"),
    ("四面楚歌", "🌍🎵😰"),
    ("五湖四海", "🔟🌊🗺️"),
    ("六神无主", "😱❄️💭"),
    ("七上八下", "⬆️7️⃣⬇️8️⃣"),
    ("八仙过海", "🧙‍♂️🌊✨"),
    ("九牛一毛", "🐂🐂🐂💨"),
    ("十全十美", "1️⃣0️⃣✨🌟"),
    ("百发百中", "🎯🏹✅"),
    ("千钧一发", "💎😱⚠️"),
    ("万无一失", "1️⃣0️⃣0️⃣%✅"),
    ("人山人海", "👥🏔️👥"),
    ("心花怒放", "❤️🌸😁"),
    ("叶公好龙", "🍃👨❤️🐉"),
    ("自相矛盾", "🛡️⚔️🤔"),
    ("邯郸学步", "🏃‍♂️🚶‍♂️🎭❌"),
    ("胸有成竹", "👔🎋🎍✅"),
    ("鹤立鸡群", "🦢🐔👑"),
    ("鱼跃龙门", "🐟🐉🚪✨"),
    ("龟兔赛跑", "🐢🐇🏃‍♂️🏆"),
    ("马到成功", "🐎🏃‍♂️✅🎉"),
    ("龙飞凤舞", "🐉🐦💃✨"),
    ("虎视眈眈", "🐯👀😠"),
    ("蛇蝎心肠", "🐍🦂💔😈"),
    ("鸟语花香", "🐦🌸💐🌺"),
    ("鱼水情深", "🐟💧❤️🥰"),
    ("鼠目寸光", "🐭👀📏❌"),
    ("牛郎织女", "🐂👦✨👩🌟"),
    ("猴子捞月", "🐒🌙💧❌"),
    ("狗急跳墙", "🐕😤🏃‍♂️🧱"),
    ("杀鸡儆猴", "🐔🐒⚠️😱"),
    ("兔死狐悲", "🐰💔🦊😢"),
    ("龙潭虎穴", "🐉🐯🕳️😨"),
    ("虎口余生", "🐯👄💀✅"),
    ("鸡毛蒜皮", "🐔🪶🧄皮"),
    ("羊肠小道", "🐑腸🛤️"),
    ("猴年马月", "🐒📅🐴"),
    ("猪狗不如", "🐷🐕❌"),
    ("牛鬼蛇神", "🐂👻🐍"),
    ("龙腾虎跃", "🐉🐯💪"),
    ("凤毛麟角", "🐦🪶🦄"),
    ("鸦雀无声", "🦆🐦🔇"),
    ("莺歌燕舞", "🐦🎵🦜💃"),
]

def main():
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 统计当前数量
    word_count = len(re.findall(r'{ word:', js))
    animal_count = len(re.findall(r'{ name:', js))
    idiom_count = len(re.findall(r'{ idiom:', js))
    
    print(f"📊 当前题目数量:")
    print(f"  词语：{word_count} / {TARGET_WORDS}")
    print(f"  动物：{animal_count} / {TARGET_ANIMALS}")
    print(f"  成语：{idiom_count} / {TARGET_IDIOMS}")
    
    # 去重并计算需要添加的数量
    existing_words = set(re.findall(r'{ word: "([^"]+)"', js))
    existing_animals = set(re.findall(r'{ name: "([^"]+)",', js))
    existing_idioms = set(re.findall(r'{ idiom: "([^"]+)",', js))
    
    new_word_entries = [(w, h) for w, h in NEW_WORDS if w not in existing_words]
    new_animal_entries = [(a, h) for a, h in NEW_ANIMALS if a not in existing_animals]
    new_idiom_entries = [(i, e) for i, e in NEW_IDIOMS if i not in existing_idioms]
    
    print(f"\n🎯 需要添加:")
    print(f"  词语：{len(new_word_entries)} 个新词")
    print(f"  动物：{len(new_animal_entries)} 个新动物")
    print(f"  成语：{len(new_idiom_entries)} 个新成语")
    
    # 添加词语
    if new_word_entries:
        match = re.search(r'(words:\s*\[)', js)
        if match:
            insert_pos = match.end()
            for word, hint in new_word_entries:
                new_entry = '\n    { word: "' + word + '", hint: "' + hint + '" },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)
            print(f"✅ 已添加 {len(new_word_entries)} 个词语")
    
    # 添加动物
    if new_animal_entries:
        match = re.search(r'(animals:\s*\[)', js)
        if match:
            insert_pos = match.end()
            for name, hints in new_animal_entries:
                hints_str = ', '.join(['"' + h + '"' for h in hints])
                new_entry = '\n    { name: "' + name + '", hints: [' + hints_str + '] },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)
            print(f"✅ 已添加 {len(new_animal_entries)} 个动物")
    
    # 添加成语
    if new_idiom_entries:
        match = re.search(r'(idioms:\s*\[)', js)
        if match:
            insert_pos = match.end()
            for idiom, emoji in new_idiom_entries:
                new_entry = '\n    { idiom: "' + idiom + '", emoji: "' + emoji + '" },'
                js = js[:insert_pos] + new_entry + js[insert_pos:]
                insert_pos += len(new_entry)
            print(f"✅ 已添加 {len(new_idiom_entries)} 个成语")
    
    # 保存文件
    with open("/root/.nanobot/workspace/guessing-game/game.js", "w", encoding="utf-8") as f:
        f.write(js)
    
    # 重新统计
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    word_count = len(re.findall(r'{ word:', js))
    animal_count = len(re.findall(r'{ name:', js))
    idiom_count = len(re.findall(r'{ idiom:', js))
    
    print(f"\n📊 更新后题目数量:")
    print(f"  词语：{word_count} / {TARGET_WORDS} {'✅' if word_count >= TARGET_WORDS else '⏳'}")
    print(f"  动物：{animal_count} / {TARGET_ANIMALS} {'✅' if animal_count >= TARGET_ANIMALS else '⏳'}")
    print(f"  成语：{idiom_count} / {TARGET_IDIOMS} {'✅' if idiom_count >= TARGET_IDIOMS else '⏳'}")
    
    # Git 提交
    import subprocess
    from datetime import datetime
    
    try:
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        
        # 获取当前版本
        result = subprocess.run(["git", "tag", "-l"], check=True, capture_output=True, text=True)
        tags = result.stdout.strip().split('\n')
        current_version = tags[-1] if tags and tags[-1] else "v1.0.0"
        
        # 递增版本
        parts = current_version.lstrip('v').split('.')
        parts[-1] = str(int(parts[-1]) + 1)
        new_version = 'v' + '.'.join(parts)
        
        # 更新版本号
        js = re.sub(r'number:\s*"[^"]+"', f'number: "{new_version}"', js)
        with open("/root/.nanobot/workspace/guessing-game/game.js", "w", encoding="utf-8") as f:
            f.write(js)
        
        # 更新 HTML 版本
        with open("/root/.nanobot/workspace/guessing-game/index.html", "r", encoding="utf-8") as f:
            html = f.read()
        html = re.sub(r'<span class="version-text">[^<]+</span>', f'<span class="version-text">{new_version}</span>', html)
        with open("/root/.nanobot/workspace/guessing-game/index.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        commit_msg = f"feat: 扩充题目库 - {new_version}\n\n"
        commit_msg += f"🎯 题目数量更新:\n"
        commit_msg += f"• 词语：{word_count} 题\n"
        commit_msg += f"• 动物：{animal_count} 题\n"
        commit_msg += f"• 成语：{idiom_count} 题\n"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
        subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
        
        print(f"\n🚀 已提交版本 {new_version}")
        
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Git 操作失败：{e}")

if __name__ == "__main__":
    main()
