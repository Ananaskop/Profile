<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9bdec0fddd1fa6456f983f4607b760039d298826
let url = $request.url;

// 函数：检查在 $prefs 或 $persistentStore 中是否存在某个键
const getValueForKey = (key) => {
    if ($prefs && $prefs.valueForKey) {
        return $prefs.valueForKey(key);
    } else if ($persistentStore && $persistentStore.read) {
        return $persistentStore.read(key);
    } else {
        return undefined; // $prefs 和 $persistentStore 都不可用
    }
};

// 函数：在 $prefs 或 $persistentStore 中设置键值对
const setValueForKey = (key, value) => {
    if ($prefs && $prefs.setValueForKey) {
        $prefs.setValueForKey(value, key);
    } else if ($persistentStore && $persistentStore.write) {
        $persistentStore.write(value, key);
    }
    // 如果 $prefs 和 $persistentStore 都不可用，则忽略
};

<<<<<<< HEAD
=======
=======
// 引用地址：https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
// 更新时间：2023-12-04 14:13:41
let url = $request.url;
>>>>>>> b1f0aaf33df8189f99640e450af51261bfef4bee
>>>>>>> 9bdec0fddd1fa6456f983f4607b760039d298826
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);

if (url.includes("users/show")) {
    setValueForKey("uid", getUid(url));
    $done({});
} else if (url.includes("statuses/user_timeline")) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9bdec0fddd1fa6456f983f4607b760039d298826
    let uid = getUid(url) || getValueForKey("uid");
    if (uid) {
        url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
        url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
        $done({ url });
    } else {
        // 处理 uid 不可用的情况
        $done({});
    }
} else if (url.includes("profile/statuses/tab")) {
    console.log('修复时间线日志');
<<<<<<< HEAD
=======
=======
  let uid = getUid(url) || $persistentStore.read("uid");
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
>>>>>>> b1f0aaf33df8189f99640e450af51261bfef4bee
>>>>>>> 9bdec0fddd1fa6456f983f4607b760039d298826
} else {
    $done({});
}
