// 引用地址：https://raw.githubusercontent.com/RuCu6/Loon/refs/heads/main/Scripts/12306.js
// 更新时间：2024-10-07 14:16:48
// 2024-02-19 10:45

let body = "";
let obj = JSON.parse($request.body);
const isQuanX = typeof $task !== "undefined";

if (obj.placementNo === "0007") {
  body =
    '{"code":"00","materialsList":[{"billMaterialsId":"255","filePath":"h","creativeType":1}],"advertParam":{"skipTime":1}}';
} else if (obj.placementNo === "G0054") {
  body = '{"code":"00","materialsList":[]}';
} else {
  body = '{"code":"00","message":"无广告返回"}';
}

if (isQuanX) {
  $done({ body });
} else {
  $done({ response: { body } });
}
