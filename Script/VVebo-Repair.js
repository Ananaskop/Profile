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

let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);

if (url.includes("users/show")) {
    setValueForKey("uid", getUid(url));
    $done({});
} else if (url.includes("statuses/user_timeline")) {
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
} else {
    $done({});
}
