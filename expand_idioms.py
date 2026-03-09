#!/usr/bin/env python3
"""🎯 继续扩充成语题库"""

import re
import subprocess

# 新增成语（继续补充）
MORE_IDIOMS = [
    ("一马当先", "🐴⚡🏃"),
    ("两全其美", "2️⃣✅✨"),
    ("三顾茅庐", "3️⃣🏠👨"),
    ("四脚朝天", "4️⃣🦵☀️"),
    ("五光十色", "5️⃣✨🌈"),
    ("六六大顺", "6️⃣6️⃣✅"),
    ("七步之才", "7️⃣📚💡"),
    ("八面玲珑", "8️⃣💎✨"),
    ("九死一生", "9️⃣💀✅"),
    ("十拿九稳", "1️⃣0️⃣9️⃣✅"),
    ("百折不挠", "1️⃣0️⃣0️⃣💪"),
    ("千言万语", "1️⃣0️⃣0️⃣🗣️"),
    ("万众一心", "1️⃣0️⃣0️⃣0️⃣❤️"),
    ("亿兆一心", "1️⃣🌟0️⃣❤️"),
    ("画饼充饥", "🎨🫓🤤"),
    ("望梅止渴", "👀🍇💦"),
    ("守株待兔", "🌳🐰⏳"),
    ("刻舟求剑", "⛵🔪🗡️"),
    ("掩耳盗钟", "👂🔔😂"),
    ("拔苗助长", "🌱✂️⬆️"),
    ("滥竽充数", "🎵🔢❌"),
    ("买椟还珠", "📦💎🔄"),
    ("郑人买履", "👞📏🤔"),
    ("叶公好龙", "🍃👨🐉"),
    ("自相矛盾", "🛡️⚔️"),
    ("亡羊补牢", "🐑🔧🏠"),
    ("杯弓蛇影", "🍷🏹🐍"),
    ("对牛弹琴", "🐮🎹"),
    ("井底之蛙", "⬇️🐸"),
    ("狐假虎威", "🦊🐯"),
    ("画蛇添足", "🐍➕🦶"),
    ("守财奴", "💰👴"),
    ("杀鸡儆猴", "🐔🐒"),
    ("兔死狐悲", "🐰💔🦊"),
    ("狗急跳墙", "🐕😤🧱"),
    ("猪狗不如", "🐷🐕❌"),
    ("鸡毛蒜皮", "🐔🪶🧄"),
    ("牛头马面", "🐂🐴"),
    ("羊入虎口", "🐑🐯"),
    ("猴年马月", "🐒📅🐴"),
    ("龙飞凤舞", "🐉🐦💃"),
    ("蛇蝎心肠", "🐍🦂💔"),
    ("鼠目寸光", "🐭👀📏"),
    ("鸦雀无声", "🦆🐦🔇"),
    ("莺歌燕舞", "🐦🎵🦜"),
    ("蜻蜓点水", "🦟💧"),
    ("蝴蝶恋花", "🦋🌸"),
    ("蜜蜂采蜜", "🐝🍯"),
    ("蚂蚁搬家", "🐜🏠"),
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
        # 尝试删除冲突的标签
        try:
            subprocess.run(["git", "tag", "-d", "v1.0.100"], capture_output=True)
            print("🗑️ 已删除冲突标签 v1.0.100")
        except:
            pass

if __name__ == "__main__":
    main()
