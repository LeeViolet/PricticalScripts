async function main() {
    // 获取 appid
    const appidElement = document.querySelector("[data-appid]");
    if (!appidElement) return;
    const appid = appidElement.dataset.appid;
    if (!appid) return;

    // 获取合集内容列表
    const wrap = document.querySelector(".collectionChildren");
    if (!wrap) return;
    const list = wrap.querySelectorAll(".collectionItem");
    if (list.length === 0) return;
    const cmds = [];
    for (const item of list) {
        const a = item.querySelector(".workshopItem a");
        if (!a) continue;
        const id = a.href.split("=").pop();
        const cmd = `workshop_download_item ${appid} ${id}`;
        cmds.push(cmd);
    }

    // 创建按钮，点击复制
    const btn = document.createElement("button");
    btn.textContent = "复制命令";
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.left = "10px";
    btn.style.zIndex = "9999";
    let i = 0;
    btn.innerText = `${i}/${cmds.length}`;
    btn.addEventListener("click", async () => {
        const cmd = cmds[i];
        try {
            await navigator.clipboard.writeText(cmd);
            btn.innerText = `${++i}/${cmds.length}`;
            console.log(`已复制命令：${cmd}`);
            if (i >= cmds.length) {
                btn.innerText = "复制完成";
                document.body.removeChild(btn);
            }
        } catch (err) {
            console.error("复制命令失败", err);
        }
    });
    document.body.appendChild(btn);
}

main();
