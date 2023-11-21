/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
*/
// 2023-11-14 07:25

const url = $request.url;
const isResponse = typeof $response !== "undefined";
let body = $response.body;

switch (isResponse) {
  // 京东-个人主页
  case /^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=personinfoBusiness/.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.floors?.length > 0) {
        let newFloors = [];
        for (let floor of obj.floors) {
          // orderIdFloor我的订单 keyToolsFloor浏览记录 newWalletIdFloor我的钱包 iconToolFloor底部工具栏
          const items = [
            "bigSaleFloor", // 双十一
            "buyOften", // 常买常逛
            "newAttentionCard", // 关注的频道
            "newBigSaleFloor", // 双十一
            "noticeFloor", // 顶部横幅
            "recommendfloor" // 我的推荐
          ];
          if (items?.includes(floor?.mId)) {
            continue;
          } else {
            if (floor?.mId === "basefloorinfo") {
              // 弹窗
              if (floor?.data?.commonPopup) {
                delete floor.data.commonPopup;
              }
              // 弹窗
              if (floor?.data?.commonPopup_dynamic) {
                delete floor.data.commonPopup_dynamic;
              }
              // 底部会员续费横幅
              if (floor?.data?.commonTips?.length > 0) {
                floor.data.commonTips = [];
              }
              // 弹窗
              if (floor?.data?.commonWindows?.length > 0) {
                floor.data.commonWindows = [];
              }
              // 右下角动图
              if (floor?.data?.floatLayer) {
                delete floor.data.floatLayer;
              }
            } else if (floor?.mId === "iconToolFloor") {
              // 底部工具栏
              if (floor?.data?.nodes?.length > 0) {
                const newNodes = [
                  [{jumpInfo:{needLogin:1,jumpUrl:"https://pro.m.jd.com/mall/active/Md9FMi1pJXg2q7qc8CmE9FNYDS4/index.html?commontitle=no&transparent=1&has_native=0&copSource=miaosha&babelChannel=ttt8",jumpType:1},expoJsonParam:'{"functionid":"lingjindouxin","surveyId":"-100","biinfo":"-100","page":1,"position":2,"type":1,"surverType":"-100","content":"签到领豆","shortCode":"-100"}',contentType:"0",title:{color:"#232326",value:"签到领豆"},clickMta:{eventParam:"moreActivity-lingjingdouxin",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",jsonParam:'{"functionid":"lingjindouxin","surveyId":"-100","biinfo":"-100","page":1,"position":2,"type":1,"surverType":"-100","content":"签到领豆","shortCode":"-100"}'},functionId:"lingjindouxin",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdg/jfs/t1/5252/10/20605/3267/6513abcbF84230560/e5517948d1b46e68.png"},{jumpInfo:{needLogin:1,jumpUrl:"https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html?babelChannel=ttt7",jumpType:1},expoJsonParam:'{"functionid":"dongdongnongchangxin","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":1,"type":1,"surverType":"-100","content":"东东农场","shortCode":"-100"}',contentType:"0",title:{color:"#232326",value:"东东农场"},clickMta:{eventParam:"moreActivity-dongdongnongchangxin",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",jsonParam:'{"functionid":"dongdongnongchangxin","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":1,"type":1,"surverType":"-100","content":"东东农场","shortCode":"-100"}'},functionId:"dongdongnongchangxin",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdg/jfs/t1/234687/33/541/2674/653676d2Fef70b44f/998a2cefe7cf3187.png"},{jumpInfo:{needLogin:1,jumpUrl:"https://plantearth.m.jd.com/plantBean/index?source=wojinghd",jumpType:1},expoJsonParam:'{"functionid":"guafenjingdou","surveyId":"-100","biinfo":"1#13#100033-woJingBaiBao-909127#909127","popContent":"-100","page":1,"position":5,"type":2,"surverType":"-100","content":"瓜分京豆","shortCode":"-100"}',contentType:"0",title:{color:"#232326",value:"瓜分京豆"},clickMta:{jsonParam:'{"functionid":"guafenjingdou","surveyId":"-100","biinfo":"1#13#100033-woJingBaiBao-909127#909127","popContent":"-100","page":1,"position":5,"type":2,"surverType":"-100","content":"瓜分京豆","shortCode":"-100"}',eventParam:"moreActivity-guafenjingdou",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:""},functionId:"guafenjingdou",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdg/jfs/t1/209755/9/20068/5532/62580283E4b8da5b4/e9b72e0055eb7b42.png"},{jumpInfo:{needLogin:1,jumpUrl:"https://huiyuan.m.jd.com?source=wj",jumpType:1},expoJsonParam:'{"functionid":"jingdonghuiyuan","surveyId":"-100","biinfo":"1#13#100033-woJingBaiBao-909127#909127","popContent":"-100","page":1,"position":15,"type":2,"surverType":"-100","content":"京东会员","shortCode":"-100"}',contentType:"0",title:{color:"#2e2e2e",value:"京东会员"},clickMta:{jsonParam:'{"functionid":"jingdonghuiyuan","surveyId":"-100","biinfo":"1#13#100033-woJingBaiBao-909127#909127","popContent":"-100","page":1,"position":15,"type":2,"surverType":"-100","content":"京东会员","shortCode":"-100"}',eventParam:"moreActivity-jingdonghuiyuan",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:""},functionId:"jingdonghuiyuan",playTimes:"0",showRedDot:0,safeImage:"https://img30.360buyimg.com/jdmonitor/jfs/t1/190506/5/4400/1866/60a791aaEe2b19e6b/3f4fbd8d9df20cc3.png",lottieContent:"",updateRedDotTime:0},{jumpInfo:{needLogin:1,jumpUrl:"https://ihelp.jd.com",jumpType:1},bubbleImg:"https://img30.360buyimg.com/jdg/jfs/t1/232054/16/1193/2701/653f4250Fc25254c8/6e41c957bba3773f.png",expoJsonParam:'{"functionid":"kehufuwu","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":6,"type":1,"surverType":"-100","content":"客户服务","shortCode":"-100"}',contentType:"0",title:{color:"#2e2e2e",value:"客户服务"},clickMta:{jsonParam:'{"functionid":"kehufuwu","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":6,"type":1,"surverType":"-100","content":"客户服务","shortCode":"-100"}',eventParam:"",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:""},functionId:"kehufuwu",showRedDot:6,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdmonitor/jfs/t1/174394/36/11496/1465/60ad055fE12c75431/5b9da81b87bb3145.png"},{jumpInfo:{needLogin:1,jumpUrl:"https://logistics-mrd.jd.com/express/index.html?source=appPostService#/",jumpType:1},expoJsonParam:'{"functionid":"jijianfuwu","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":7,"type":1,"surverType":"-100","content":"寄件服务","shortCode":"-100"}',contentType:"0",title:{color:"#2e2e2e",value:"寄件服务"},clickMta:{jsonParam:'{"functionid":"jijianfuwu","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":7,"type":1,"surverType":"-100","content":"寄件服务","shortCode":"-100"}',eventParam:"",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:""},functionId:"jijianfuwu",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdmonitor/jfs/t1/194618/23/4904/2371/60ad051fEfbb5b467/4c16e99db3c68a23.png"}],[{jumpInfo:{needLogin:1,jumpUrl:"https://comprd.m.jd.com/my/presell/index.html?t=1&c=1",jumpType:1},expoJsonParam:'{"functionid":"wodeyuyue","surveyId":"-100","biinfo":"1#13#100033-woJingBaiBao-909127#909127","popContent":"-100","page":1,"position":12,"type":2,"surverType":"-100","content":"我的预约","shortCode":"-100"}',contentType:"0",title:{color:"#2e2e2e",value:"我的预约"},clickMta:{jsonParam:'{"functionid":"wodeyuyue","surveyId":"-100","biinfo":"1#13#100033-woJingBaiBao-909127#909127","popContent":"-100","page":1,"position":12,"type":2,"surverType":"-100","content":"我的预约","shortCode":"-100"}',eventParam:"moreActivity-wodeyuyue",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:"3"},functionId:"wodeyuyue",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdmonitor/jfs/t1/173696/2/10903/2107/60a77dfcE3a4d1265/d8150bc3ad641070.png"},{jumpInfo:{needLogin:1,jumpUrl:"https://m.healthjd.com/s/home?hy_entry=MyJD_AskDoc",jumpType:1},expoJsonParam:'{"functionid":"wenyisheng","surveyId":"-100","biinfo":"-100","page":1,"position":8,"type":1,"surverType":"-100","content":"问医生","shortCode":"-100"}',contentType:"0",title:{color:"#2e2e2e",value:"问医生"},clickMta:{jsonParam:'{"functionid":"wenyisheng","surveyId":"-100","biinfo":"-100","page":1,"position":8,"type":1,"surverType":"-100","content":"问医生","shortCode":"-100"}',eventParam:"moreActivity-wenyisheng",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:""},functionId:"wenyisheng",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdg/jfs/t1/99473/14/30644/2660/6305ccbeE83145dbf/f94e80b919890847.png"}],[{jumpInfo:{needLogin:1,jumpUrl:"router://JDMyJdModule/showMyToolsPage",jumpType:4},expoJsonParam:'{"functionid":"gengduoyouxi","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":13,"type":1,"surverType":"-100","content":"更多游戏","shortCode":"-100"}',contentType:"0",title:{color:"#2e2e2e",value:"更多游戏"},clickMta:{jsonParam:'{"functionid":"gengduoyouxi","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":13,"type":1,"surverType":"-100","content":"更多游戏","shortCode":"-100"}',eventParam:"",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:""},functionId:"gengduoyouxi",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdg/jfs/t1/180652/32/32412/3378/64479d37F0b798916/8c79f62a402de34f.png"},{jumpInfo:{needLogin:1,jumpUrl:"router://JDMyJdModule/showMyToolsPage?anchorFloor=essentialTools",jumpType:4},expoJsonParam:'{"functionid":"gengduo","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":16,"type":1,"surverType":"-100","content":"更多工具","shortCode":"-100"}',contentType:"0",title:{color:"#2e2e2e",value:"更多工具"},clickMta:{jsonParam:'{"functionid":"gengduo","surveyId":"-100","biinfo":"-100","popContent":"-100","page":1,"position":16,"type":1,"surverType":"-100","content":"更多工具","shortCode":"-100"}',eventParam:"",eventId:"MyJD_Commonfunction",pageId:"MyJD_Main",pageLevel:""},functionId:"gengduo",showRedDot:0,updateRedDotTime:0,safeImage:"https://img30.360buyimg.com/jdmonitor/jfs/t1/175845/37/11426/1635/60ad0617Ed7cb4cd4/ec39dc38949dc202.png"}]
                ];
                floor.data.nodes = newNodes;
              }
            } else if (floor?.mId === "orderIdFloor") {
              if (floor?.data?.commentRemindInfo?.infos?.length > 0) {
                // 发布评价的提醒
                floor.data.commentRemindInfo.infos = [];
              }
            } else if (floor?.mId === "userinfo") {
              // 个人页 顶部背景图
              if (floor?.data?.bgImgInfo?.bgImg) {
                delete floor.data.bgImgInfo.bgImg;
              }
              // 开通plus会员卡片
              if (floor?.data?.newPlusBlackCard) {
                delete floor.data.newPlusBlackCard;
              }
            }
            newFloors.push(floor);
          }
        }
        obj.floors = newFloors;
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`京东-个人主页, 出现异常: ` + error);
    }
    break;
  // 京东-开屏广告
  case /^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=start/.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.images?.length > 0) {
        obj.images = [];
      }
      if (obj?.showTimesDaily) {
        obj.showTimesDaily = 0;
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`京东-开屏广告, 出现异常: ` + error);
    }
    break;
  case /^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=welcomeHome/.test(url):
    // 京东-首页配置
    try {
      let obj = JSON.parse(body);
      // 首页 图层列表
      if (obj?.floorList?.length > 0) {
        // float推广浮层 recommend为你推荐 ruleFloat资质与规则 searchIcon右上角消费券 topRotate左上角logo
        obj.floorList = obj.floorList.filter(
          (i) => !["float", "ruleFloat", "searchIcon", "topRotate"]?.includes(i?.type)
        );
      }
      // 首页 顶部背景图
      if (obj?.topBgImgBig) {
        delete obj.topBgImgBig;
      }
      // 首页 下拉二楼
      if (obj?.webViewFloorList?.length > 0) {
        obj.webViewFloorList = [];
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`京东-首页配置, 出现异常: ` + error);
    }
    break;
  default:
    $done({});
}

$done({ body });
