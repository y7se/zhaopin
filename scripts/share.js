/**
 * Created by lenovo on 2017/8/25.
 */
//引入weixin 的api 文件
document.write("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");
/* 分享 */
var imgUrl = getwebPath() + "images/share.jpg";  //图片LOGO注意必须是绝对路径
var shareTitle = '中移在线招纳互联网英才，寻找敢于突破的力量';  //分享title
var descContent = '中移在线招纳互联网英才，寻找敢于突破的力量'; //非微信分享时的文字简介

var descContentAppMessage = '看你骨骼精奇，一定是个逆袭的绝世人才！'; //分享给微信朋友时的文字简介
var descContentTimeline = '中移在线招纳互联网英才，寻找敢于突破的力量';   //分享给微信朋友圈时的文字简介
var title = '中移在线招纳互联网英才，寻找敢于突破的力量';  //分享title
var targetUrl = window.location.href;

var link = getwebPath() + "index.html"; // 分享跳转链接
function getwebPath() {
    var webName = window.location.protocol;
    webName += "//" + window.location.hostname
    var pathName = document.location.pathname;
    var index = pathName.lastIndexOf("/");
    var result = pathName.substr(0, index + 1);

    return webName + result;
}
//初始化微信对象需要的参数，ajax 异步调用
function initwx() {


    var requestulr = "http://wx.10086.cn";
    var accountId="835c0f29-92e5-4fbd-8fae-47826c17b8c3";
    var appId ="wx43a850f87498127d";

    // var requestulr = "http://wx.10085.cn";
    // var accountId="5109afce-6b8f-4e9f-b706-36e7bf3e2f39";
    // var appId ="wx2e7288fdd5f458b7";

    var url = window.location.href;
    $.ajax({
        cache: false,
        async: true,
        url: requestulr+"/operation/api/out/getJsSignature",
        type: 'GET',
        dataType: "json",
        data: {accountId: accountId,url:url},
        success: function (data) {
            console.info('wx config: jsapiticket:'+data);
            if (data.code = 200) {
                initwxConfig(appId, data.timeStamp, data.nonceStr, data.jsSignature);
            } else if (data.code == 600) {
                window.location.href = "offline.html";
            }
            else {
                console.info('微信签名分享失败！！');
            }
        },
        error: function () {
            console.log("wx config : error");
        }
    });
}

function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0, index + 1);
    return result;
}


function initwxConfig(appId, timestamp, nonceStr, signature) {
    wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    });

    wx.ready(function () {

        //朋友圈分享
        wx.onMenuShareTimeline({
            title: descContentTimeline, 	  // 分享标题
            link: link,				  // 分享链接
            imgUrl: imgUrl, 		  // 分享图标
            success: function () {
                share();			  // 用户确认分享后执行的回调函数
            },
            cancel: function () {	  // 用户取消分享后执行的回调函数

            }
        });
        //分享给木一个朋友
        wx.onMenuShareAppMessage({
            title: shareTitle, 		// 分享标题
            desc: descContentAppMessage, 		// 分享描述
            link: link, 				// 分享链接
            imgUrl: imgUrl,			// 分享图标
            type: '', 					// 分享类型,music、video或link，不填默认为link
            dataUrl: '', 				// 如果type是music或video，则要提供数据链接，默认为空
            success: function () {		// 用户确认分享后执行的回调函数
                share();
            },
            cancel: function () {		// 用户取消分享后执行的回调函数
            }
        });
        //QQ分享
        wx.onMenuShareQQ({
            title: shareTitle, 		// 分享标题
            desc: descContent, 		// 分享描述
            link: link, 				// 分享链接
            imgUrl: imgUrl, 			// 分享图标
            success: function () {		// 用户确认分享后执行的回调函数
                share();
            },
            cancel: function () {		// 用户取消分享后执行的回调函数
            }
        });
        //微博分享
        wx.onMenuShareWeibo({
            title: shareTitle, 		// 分享标题
            desc: descContent, 		// 分享描述
            link: link, 				// 分享链接
            imgUrl: imgUrl, 			// 分享图标
            success: function () {		// 用户确认分享后执行的回调函数
                share();
            },
            cancel: function () {		// 用户取消分享后执行的回调函数
            }
        });
    });

    //微信操作回调
    wx.error(function (res) {
    });
}
