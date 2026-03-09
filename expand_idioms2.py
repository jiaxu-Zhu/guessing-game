#!/usr/bin/env python3
"""🎯 继续扩充成语题库（第二批）"""

import re
import subprocess

# 新增成语（继续补充到 150+）
MORE_IDIOMS = [
    ("一石二鸟", "🪨🐦🐦"),
    ("画龙点睛", "🐉👁️✨"),
    ("亡羊补牢", "🐑🔧🏠"),
    ("刻舟求剑", "⛵🔪⚔️"),
    ("掩耳盗铃", "👂🔔😂"),
    ("杯弓蛇影", "🍷🏹🐍"),
    ("滥竽充数", "🎵🔢❌"),
    ("买椟还珠", "📦💎🔄"),
    ("南辕北辙", "🗺️⬆️⬇️"),
    ("郑人买履", "👞📏🤔"),
    ("叶公好龙", "🍃👨❤️🐉"),
    ("自相矛盾", "🛡️⚔️🤔"),
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
    ("画蛇添足", "🎨🐍➕🦶"),
    ("鹤立鸡群", "🦢🐔👑"),
    ("鱼跃龙门", "🐟🐉🚪✨"),
    ("龟兔赛跑", "🐢🐇🏃‍♂️🏆"),
    ("马到成功", "🐎🏃‍♂️✅🎉"),
    ("龙飞凤舞", "🐉🐦💃✨"),
    ("虎视眈眈", "🐯👀😠"),
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
    ("蜻蜓点水", "🦟💧"),
    ("蝴蝶恋花", "🦋🌸"),
    ("蜜蜂采蜜", "🐝🍯"),
    ("蚂蚁搬家", "🐜🏠"),
    ("螳螂捕蝉", "🦗🐦"),
    ("金蝉脱壳", "🐛🪲"),
    ("蛛丝马迹", "🕷️🐎"),
    ("蚕食鲸吞", "🐛🐋"),
    ("蜂拥而至", "🐝🌊"),
    ("狼吞虎咽", "🐺🐯"),
    ("鹰击长空", "🦅☁️"),
    ("鱼贯而入", "🐟🚪"),
    ("蛇行鼠窜", "🐍🐭"),
    ("鸡犬不宁", "🐔🐕😫"),
    ("猪突豨勇", "🐷💪"),
    ("牛刀小试", "🐂🔪"),
    ("马不停蹄", "🐴🏃"),
    ("羊落虎口", "🐑🐯"),
    ("猴头猴脑", "🐒🧠"),
    ("龙马精神", "🐉🐴✨"),
    ("蛇蝎美人", "🐍🦂👸"),
    ("鼠窃狗偷", "🐭🐕🔫"),
    ("牛头不对马嘴", "🐂❌🐴"),
    ("虎头蛇尾", "🐯🐍"),
    ("兔死狗烹", "🐰💀🐕"),
    ("龙争虎斗", "🐉🐯⚔️"),
    ("狐朋狗友", "🦊🐕👥"),
    ("狼狈为奸", "🐺🦊🤝"),
    ("盲人摸象", "👁️‍🗨️🐘"),
    ("对酒当歌", "🍶🎵"),
    ("望梅止渴", "👀🍑💦"),
    ("画饼充饥", "🎨🥧"),
    ("守财奴", "💰👴"),
    ("一诺千金", "1️⃣💬💎"),
    ("一字千金", "1️⃣字💎"),
    ("一言九鼎", "1️⃣言9️⃣🔔"),
    ("一举两得", "1️⃣✋2️⃣✅"),
    ("一劳永逸", "1️⃣💪永✨"),
    ("一针见血", "💉🩸"),
    ("一步登天", "1️⃣步☁️"),
    ("一窍不通", "1️⃣❌🔧"),
    ("一清二白", "1️⃣清2️⃣白"),
    ("一穷二白", "1️⃣穷2️⃣白"),
    ("一唱一和", "🎤1️⃣🎤1️⃣"),
    ("一五一十", "1️⃣5️⃣1️⃣0️⃣"),
    ("一刀两断", "🔪1️⃣2️⃣"),
    ("二话不说", "2️⃣❌💬"),
    ("三长两短", "3️⃣➖2️⃣➖"),
    ("三番五次", "3️⃣5️⃣"),
    ("三令五申", "3️⃣5️⃣📢"),
    ("三生有幸", "3️⃣生✨"),
    ("三思而行", "3️⃣🤔行动"),
    ("四分五裂", "4️⃣5️⃣💔"),
    ("五花八门", "5️⃣8️⃣门"),
    ("六亲不认", "6️⃣❌家人"),
    ("七零八落", "7️⃣0️⃣8️⃣落"),
    ("八九不离十", "8️⃣9️⃣1️⃣0️⃣"),
]

def main():
    with open("/root/.nanobot/workspace/guessing-game/game.js", "r", encoding="utf-8") as f:
        js = f.read()
    
    # 统计当前数量
    idiom_count = len(re.findall(r'{ idiom:', js))
    existing_idioms = set(re.findall(r'{ idiom: "([^"]+)",', js))
    
    print(f"📊 当前成语数量：{idiom_count} / 150")
    
    # 去重
    new_idiom_entries = [(i, e) for i, e in MORE_IDIOMS if i not in existing_idioms]
    
    print(f"🎯 需要添加：{len(new_idiom_entries)} 个新成语")
    
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
    
    idiom_count = len(re.findall(r'{ idiom:', js))
    
    print(f"\n📊 更新后成语数量：{idiom_count} / 150 {'✅' if idiom_count >= 150 else '⏳'}")
    
    # Git 提交
    try:
        subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
        
        # 获取当前版本
        result = subprocess.run(["git", "tag", "-l"], check=True, capture_output=True, text=True)
        tags = [t for t in result.stdout.strip().split('\n') if t]
        current_version = tags[-1] if tags else "v1.0.0"
        
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
        commit_msg = f"feat: 继续扩充成语题库 - {new_version}\n\n"
        commit_msg += f"📚 成语总数：{idiom_count} 题\n"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", "main"], check=True, capture_output=True)
        subprocess.run(["git", "tag", new_version], check=True, capture_output=True)
        subprocess.run(["git", "push", "origin", new_version], check=True, capture_output=True)
        
        print(f"🚀 已提交版本 {new_version}")
        
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Git 操作失败：{e}")

if __name__ == "__main__":
    main()
