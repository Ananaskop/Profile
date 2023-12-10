/*
来源：https://raw.githubusercontent.com/Nebulosa-Cat/Surge/main/Panel/Network-Info/net-info-panel.js
 */

/**
 * 网络请求封装成 Promise
 * Usage: httpMethod.get(option).then(response => { console.log(data) }).catch(error => { console.log(error) })
 * Usage: httpMethod.post(option).then(response => { console.log(data) }).catch(error => { console.log(error) })
 * response: { status, headers, data }
 */
class httpMethod {
    /**
     * Callback function
     * @param {*} resolve 
     * @param {*} reject 
     * @param {*} error 
     * @param {*} response 
     * @param {*} data 
     */
    static _httpRequestCallback(resolve, reject, error, response, data) {
        if (error) {
            reject(error);
        } else {
            resolve(Object.assign(response, { data }));
        }
    }

    /**
     * HTTP GET
     * @param {Object} option 选项
     * @returns 
     */
    static get(option = {}) {
        return new Promise((resolve, reject) => {
            $httpClient.get(option, (error, response, data) => {
                this._httpRequestCallback(resolve, reject, error, response, data);
            });
        });
    }

    /**
     * HTTP POST
     * @param {Object} option 选项
     * @returns 
     */
    static post(option = {}) {
        return new Promise((resolve, reject) => {
            $httpClient.post(option, (error, response, data) => {
                this._httpRequestCallback(resolve, reject, error, response, data);
            });
        });
    }
}
class loggerUtil {
    constructor() {
        this.id = randomString();
    }

    log(message) {
        message = `[${this.id}] [ LOG ] ${message}`;
        console.log(message);
    }

    error(message) {
        message = `[${this.id}] [ERROR] ${message}`;
        console.log(message);
    }
}

var logger = new loggerUtil();

function randomString(e = 6) {
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}

function getSSID() {
    return  $network.wifi?.ssid;
}

function getIP() {
    const { v4, v6 } = $network;
    let info = [];
    if (!v4 && !v6) {
      info = ['网络可能切换, 请手动重整面板更新 IP'];
    } else {
      if (v4?.primaryAddress) info.push(`本机IPv4：${v4?.primaryAddress}`);
      if (v6?.primaryAddress) info.push(`本机IPv6：${v6?.primaryAddress}`);
      if (v4?.primaryRouter && getSSID()) info.push(`网关IPv4：${v4?.primaryRouter}`);
      if (v6?.primaryRouter && getSSID()) info.push(`网关IPv6：${v6?.primaryRouter}`);
    }
    info = info.join("\n");
    return info + "\n";
  }

/**
 * 获取IP信息
 * @param {*} retryTimes // 重试次数
 * @param {*} retryInterval // 重试间格 ms
 */
function getNetworkInfo(retryTimes = 5, retryInterval = 1000) {
    // send http request
    httpMethod.get('http://ip-api.com/json/?lang=zh-CN').then(response => {
        if (Number(response.status) > 300) {
            throw new Error(`错误信息: ${response.status}\n${response.data}`);
        }
        const info = JSON.parse(response.data);
        const ssid = getSSID();
        $done({
            title: ssid !== null && ssid !== '' ? `无线局域网 | ${ssid}` : '蜂窝数据',
            content:
                `-------------本机IP信息-------------\n` +
                getIP() +
                `-------------节点IP信息-------------\n` +
                `节点地址：${info.query}\n` +
                `节点厂商：${info.asname}\n` +
                `节点位置：${info.country} | ${info.regionName} | ${info.city}`,
            icon: getSSID() ? 'wifi' : 'simcard',
            'icon-color': getSSID() ? '#005CAF' : '#F9BF45',
        });
    }).catch(error => {
        // 网络切换
        if (String(error).startsWith("网络已改变")) {
            if (getSSID()) {
                $network.wifi = undefined;
                $network.v4 = undefined;
                $network.v6 = undefined;
            }
        }
        // 判断是否有重试机会
        if (retryTimes > 0) {
            logger.error(error);
            logger.log(`请${retryInterval}毫秒后重试`);
            // retryInterval 时间后再次执行该函数
            setTimeout(() => getNetworkInfo(--retryTimes, retryInterval), retryInterval);
        } else {
            // 列印日志
            logger.error(error);
            $done({
                title: '发生错误',
                content: '无法获得目前网络信息，请检查网络状态后重试',
                icon: 'wifi.exclamationmark',
                'icon-color': '#CB1B45',
            });
        }
    });
}

/**
* 主要逻辑，程序开始
*/
(() => {
    const retryTimes = 5;
    const retryInterval = 1000;
    // Surge 脚本超时时间设为 30s
    // 提早 500ms 结束进程
    const surgeMaxTimeout = 29500;
    // 脚本超时时间
    // retryTimes * 5000 为每次网络请求超时时间（Surge 网络请求超时为 5s）
    const scriptTimeout = retryTimes * 5000 + retryTimes * retryInterval;
    setTimeout(() => {
        logger.log("脚本超时");
        $done({
            title: "请求超时",
            content: "连线请求超时，请检查网络状态后重试",
            icon: 'wifi.exclamationmark',
            'icon-color': '#CB1B45',
        });
    }, scriptTimeout > surgeMaxTimeout ? surgeMaxTimeout : scriptTimeout);

    // 获取网络信息
    logger.log("脚本开始");
    getNetworkInfo(retryTimes, retryInterval);
})();
