/**
 * Created by lenovo on 2017/8/25.
 */
var errorpageurl="http://fun.mail.10086.cn/wap/1511/451130/congestion/index.html";
var endpageurl="http://fun.mail.10086.cn/wap/1511/451106/offline/offline.html";

var browser = {
    versions : function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {// 移动终端浏览器版本信息
            trident : u.indexOf('Trident') > -1, // IE内核
            presto : u.indexOf('Presto') > -1, // opera内核
            webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
            mobile : !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
            iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
            iPad : u.indexOf('iPad') > -1, // 是否iPad
            webApp : u.indexOf('Safari') == -1,
            weixin : u.toLowerCase().indexOf('micromessenger')> -1,  //微信
            // 是否web应该程序，没有头部与底部
        };
    }(),
    language : (navigator.browserLanguage || navigator.language).toLowerCase()
}


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function isweixinbrowser(){
    if (browser.versions == null) {
        return true;
    }
    return (browser.versions.weixin);
}

function ismobilebrowser() {
    // alert(browser.versions.mobile);
    if (browser.versions == null) {
        return true;
    }
    return (browser.versions.ios || browser.versions.iPhone
    || browser.versions.iPad || browser.versions.android || browser.versions.mobile||
    browser.versions.weixin);
}

// 验证移动11位手机号数
function isMoblePhoneNumber(phoneNumber) {
    var reg = /^1[0-9]{10}$/;
    if (reg.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }
}

function isInArr(arr,key){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==key){
            return i;
        }
    }
    return -1;
}

function winhide(id) {

    $("#" + id).hide();

}
function winshow(id) {

    $("#" + id).show();

}