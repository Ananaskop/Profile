// 引用地址：https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
// 更新时间：2023-12-04 12:03:41
let url = $request.url;

// Function to check if a key exists in either $prefs or $persistentStore
const getValueForKey = (key) => {
    if ($prefs && $prefs.valueForKey) {
        return $prefs.valueForKey(key);
    } else if ($persistentStore && $persistentStore.read) {
        return $persistentStore.read(key);
    } else {
        return undefined; // Both $prefs and $persistentStore are not available
    }
};

// Function to set a key-value pair in either $prefs or $persistentStore
const setValueForKey = (key, value) => {
    if ($prefs && $prefs.setValueForKey) {
        $prefs.setValueForKey(value, key);
    } else if ($persistentStore && $persistentStore.write) {
        $persistentStore.write(value, key);
    }
    // Ignore if both $prefs and $persistentStore are not available
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
        // Handle the case when uid is not available
        $done({});
    }
} else if (url.includes("profile/statuses/tab")) {
    console.log('ss');
} else {
    $done({});
}

