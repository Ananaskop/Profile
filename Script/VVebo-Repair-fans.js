// 引用地址：https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-fans.js
// 更新时间：2024-01-31 08:42:53
let url = $request.url;
if (url.includes("selffans")) {
  let data = JSON.parse($response.body);
  let cards = data.cards.filter((card) => card.itemid !== "INTEREST_PEOPLE2");
  $done({ body: JSON.stringify({ ...data, cards }) });
} else {
  $done({});
}
