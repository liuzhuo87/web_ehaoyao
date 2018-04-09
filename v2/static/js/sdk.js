var _openRxthinking = {
    haveIfr: false,
    bridge: {},
    flag: false,
    lasted: true,
    //创建
    init: function (params) {
        var self = this;
        if (this.haveIfr) {
            return;
        }
        var ifrId = params.id || 'rx_iframe',
            ifrName = params.name || params.id || 'rx_iframe',
            ifrW = params.ifrW || '100%',
            ifrH = params.ifrH || '100%',
            ifrT = params.ifrT || 0,
            ifrL = params.ifrL || 0,
            styles = params.styles || {},
            domain = params.domain || '',
            token = params.token;

        var _domain = domain && domain != '' ? domain : window.location.origin;
        var urlC = "http://assistant.rxthinking.com/v2/?token=" + params.token;
        // var urlC = "http://192.168.100.40:18081?token=" + params.token;
        // var urlC = "http://127.0.0.1:18080?token=" + params.token;

        var oIFrame = document.createElement("iframe");
        oIFrame.id = ifrId;
        oIFrame.name = ifrName;
        oIFrame.frameborder = "no";

        oIFrame.marginwidth = "0";
        oIFrame.marginheight = "0";
        oIFrame.scrolling = "no";
        oIFrame.allowtransparency = "yes";

        oIFrame.style.border = "none";
        oIFrame.style.width = ifrW;
        oIFrame.style.height = ifrH;
        oIFrame.style.position = 'absolute';
        oIFrame.style.zIndex = '2147483647';
        oIFrame.style.top = ifrT;
        oIFrame.style.left = ifrL;

        if (styles && JSON.stringify(styles) != '{}') {
            for (var item in styles) {
                oIFrame.style[item] = styles[item];
            }
        }

        if (urlC.indexOf('?') == -1) {
            oIFrame.src = urlC + "?ifr=" + _domain;
        } else {
            oIFrame.src = urlC + "&ifr=" + _domain;
        }


        document.body.appendChild(oIFrame);
        self.performListen({cb: params.cb});
        self.haveIfr = true;
        self.connectWebViewJavascriptBridge(function (bridge) {
            self.bridge = bridge;
        });
    },

    getCookie: function (objname) {
        var arrstr = document.cookie.split(";");
        for (var i = 0; i < arrstr.length; i++) {
            var temp = arrstr[i].split("=");
            if (temp[0] == objname) {
                return temp[1]
            }
        }
    },

    //销毁
    destroyIfr: function (params) {
        var ifrId = params.id || 'rx_iframe',
            ifr = document.getElementById(ifrId);
        if (ifr) {
            ifr.parentNode.removeChild(ifr);
            this.haveIfr = false;
        }
    },

    performListen: function (params) {
        var self = this;
        this.bind(window, 'message', function (ev) {
            var e = window.event || arguments[0];
            if (typeof e.data == 'string') {
                var data = JSON.parse(e.data);
                // if (data.source == 'rxthinking') {
                if(self.lasted) {
                    if (self.bridge && self.bridge.callHandler) {
                        //桥接、响应
                        self.bridge.callHandler('addListGoodsToCart',
                            {'cartJson': JSON.stringify(data)}, function (response) {
                            console.log("桥接响应13" + response);
                        });
                        // self.bridge.callHandler('addListGoodsToCart',
                        //     {'cartJson': '[{"pharmacyId":"25","listCart":[{"productId":27057,"productNum":1}]}]'}, function(response) {
                        //         console.log(response);
                        //     })
                    }
                }
                else {
                    alert('您好，您当前的App版本不支持整体用药方案功能，请到我的 -> 设置中，点击版本更新到最新版本。');
                }
                typeof params.cb == 'function' && params.cb(data);
                // }
            }
        })
    },

    bind: function (obj, evname, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evname, fn, false);
        } else {
            obj.attachEvent("on" + evname, function () {
                fn.call(obj);
            })
        }
    },
    //好药师购物车接口版本的判断
    connectWebViewJavascriptBridge: function (callback) {
        var self = this;
        var strList = navigator.userAgent.split("haoyaoshi-iOS/");
        if (strList.length == 1) {
            strList = navigator.userAgent.split("haoyaoshi-android/");
        }
        if (strList.length > 1) {
            var version = strList[1].split(".");
            //判断版本是否大于2.8.2
            var discardVer = "2.8.2";
            var discardList = discardVer.split(".");
//                    alert('version' + version);
            for (var i = 0; i < Math.min(version.length, discardList.length); i++) {
                //废弃版本
                var v1 = parseInt(discardList[i]);
                //当前版本
                var v2 = parseInt(version[i]);
                if (v2 > v1) {
                    self.flag = true;
                    break;

                }
                else if (v2 < v1) {
                    self.flag = false;
                    break
                }
            }
            //判断版本是否大于3.2.3
            var discardVer1 = "3.2.3";
            var discardList1 = discardVer1.split(".");
            for (var i = 0; i < Math.min(version.length, discardList1.length); i++) {
                //废弃版本
                var v1 = parseInt(discardList1[i]);
                //当前版本
                var v2 = parseInt(version[i]);
                if (v2 > v1) {
                    self.lasted = true;
                    break;

                }
                else if (v2 < v1) {
                    self.lasted = false;
                    break
                }
            }
        }
        try {
            if (self.flag) {
                if (window.WebViewJavascriptBridge) {
                    return callback(WebViewJavascriptBridge);//这里参数应该加window
                }
                if (window.WVJBCallbacks) {
                    return window.WVJBCallbacks.push(callback);
                }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () {
                    document.documentElement.removeChild(WVJBIframe);
                }, 0);
            } else {
                if (window.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge);//这里参数应该加window
                } else {
                    document.addEventListener('WebViewJavascriptBridgeReady', function () {
                        callback(WebViewJavascriptBridge);//这里参数应该加window
                    }, false);

                }
            }
        } catch (e) {
        }

    }
}