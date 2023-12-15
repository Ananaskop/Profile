// 引用的地址：https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
// 更新时间：2023-12-15 10:42:00
let url = $request.url;
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);
const isQuanX = typeof $task !== "undefined";

let uid; // 将变量声明移到 if 块外部

if (url.includes("users/show")) {
  uid = getUid(url) || (isQuanX ? $prefs.valueForKey("uid") : $persistentStore.read("uid"));
  if (isQuanX) {
    $prefs.setValueForKey(uid, "uid");
  } else {
    $persistentStore.write(uid, "uid");
  }
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  uid = getUid(url) || (isQuanX ? $prefs.valueForKey("uid") : $persistentStore.read("uid"));
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
} else if (url.includes("profile/statuses/tab")) {
  try {
    let data = JSON.parse($response.body);
    let statuses = data.cards
      .map((card) => (card.card_group ? card.card_group : card))
      .flat()
      .filter((card) => card.card_type === 9)
      .map((card) => card.mblog);
    let sinceId = data.cardlistInfo.since_id;
    $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
  } catch (error) {
    console.log("解析JSON时发生错误:", error);
    $done({}); // 优雅地处理错误
  }
} else {
  $done({});
}
