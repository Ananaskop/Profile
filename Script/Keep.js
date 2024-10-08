// 引用地址：https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/Keep.js
// 更新时间：2024-10-08 14:16:28
//   2024-05-24 09.38
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/config/v3/basic")) {
  if (obj.data && obj.data.coursePageConfigs && obj.data.coursePageConfigs.courseTabs) {
    obj.data.coursePageConfigs.courseTabs = obj.data.coursePageConfigs.courseTabs.filter(tab => {
      return tab.name !== "直播" && tab.name !== "会员";
    });
  }

  if (obj.data && obj.data.bottomBarControl && obj.data.bottomBarControl.tabs) {
    obj.data.bottomBarControl.tabs = obj.data.bottomBarControl.tabs.filter(tab => {
      return tab.name !== "商城" && tab.name !== "课程";
    });
  }
}

if (url.includes("/athena/v9/people/my")) {
  delete obj.data.memberInfo;
}

if (obj.data && obj.data.groupTags) {
    obj.data.groupTags = obj.data.groupTags.filter(tagGroup => {
        return !tagGroup.tags.some(tag => {
            const tagsToRemove = ["订单与钱包", "我的团队", "帮助中心"];
            return tagsToRemove.includes(tag.name);
        });
    });
}

$done({ body: JSON.stringify(obj) });
