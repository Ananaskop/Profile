const url = $request.url;

function getUid(url) {
    if (url.includes("uid")) {
        return url.match(/uid=(\d+)/)[1];
    }
    return undefined;
}

let uid; 

if (url.includes("users/show")) {
    uid = getUid(url);
    if (uid) {
        $done({});
    }
} else if (url.includes("statuses/user_timeline")) {
    const storedUid = uid || $persistentStore.read("uid");
    uid = getUid(url) || storedUid;
    const newUrl = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id") + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
    $done({ url: newUrl });
} else if (url.includes("profile/statuses/tab")) {
    const data = JSON.parse($response.body);
    const statuses = data.cards
        .map(card => (card.card_group ? card.card_group : card))
        .flat()
        .filter(card => card.card_type === 9)
        .map(card => card.mblog);
    const sinceId = data.cardlistInfo.since_id;
    $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
} else {
    $done({});
}
