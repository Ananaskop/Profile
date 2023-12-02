let url = $request.url;
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);

if (typeof $persistentStore === 'undefined' || typeof $persistentStore.write === 'undefined' || typeof $persistentStore.read === 'undefined') {
  // 使用 $prefs.setValueForKey 代替 $persistentStore.write 和 $persistentStore.read
  let uid = getUid(url) || $prefs.valueForKey("uid");
  $prefs.setValueForKey(uid, "uid");
} else if (url.includes("users/show")) {
  $persistentStore.write(getUid(url), "uid");
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  let uid = getUid(url);
  if (!uid) {
    uid = $persistentStore.read("uid") || $prefs.valueForKey("uid");
  }
  processRequest(uid);
} else if (url.includes("profile/statuses/tab")) {
  let data = JSON.parse($response.body);
  let statuses = data.cards
    .map((card) => (card.card_group ? card.card_group : card))
    .flat()
    .filter((card) => card.card_type === 9)
    .map((card) => card.mblog);
  let sinceId = data.cardlistInfo.since_id;
  $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
} else {
  $done({});
}

function processRequest(uid) {
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
}
