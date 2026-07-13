// ===== 工具函数 =====
function getToday() {
    var d = new Date();
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0');
}

function formatDateChinese(dateStr) {
    var parts = dateStr.split('-');
    var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    return parts[0] + '年' + parseInt(parts[1]) + '月' + parseInt(parts[2]) + '日 周' + weekdays[d.getDay()];
}

function daysBetween(d1, d2) {
    return Math.floor((new Date(d2) - new Date(d1)) / (1000 * 60 * 60 * 24));
}

// ===== 名言库 =====
var QUOTES = [
    { text: "身无彩凤双飞翼，心有灵犀一点通。", author: "——李商隐《无题》" },
    { text: "两情若是长久时，又岂在朝朝暮暮。", author: "——秦观《鹊桥仙》" },
    { text: "金风玉露一相逢，便胜却人间无数", author: "—— 秦观《鹊桥仙》" },
    { text: "窈窕淑女，君子好逑", author: "——《诗经·国风·周南》" },
    { text: "天空无日照，我恋始能停。", author: "——《万叶集》" },
    { text: "手枕にほそき腕ををさし入れて", author: "——松尾芭蕉" },
    { text: "愿我如星君如月，夜夜流光相皎洁", author: "—— 范成大《车遥遥篇》" },
    { text: "结发为夫妻，恩爱两不疑", author: "—— 苏武《留别妻》" }
];