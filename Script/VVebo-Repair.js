let url = $request.url;

let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);

// 使用 $prefs 或 $persistentStore
let setStorage = (value, key) => {
  if ($persistentStore.write) {
    $persistentStore.write(value, key);
  } else if ($prefs.setValueForKey) {
    $prefs.setValueForKey(value, key);
  }
};

let getStorage = (key, fallbackValue) => {
  if ($persistentStore.read) {
    return $persistentStore.read(key) || fallbackValue;
  } else if ($prefs.valueForKey) {
    return $prefs.valueForKey(key) || fallbackValue;
  }
};

if (url.includes("users/show")) {
  setStorage(getUid(url), "uid");
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  let uid = getUid(url) || getStorage("uid");
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
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
