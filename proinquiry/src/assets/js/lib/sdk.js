/**
 * Created by Lian on 17/10/25.
 */
var _openRxthinking = {
    init: function (params) {
        var self = this,
            ifrId = params.id || 'rxthinking',
            ifrName = params.name || params.id || 'rxthinking',
            ifrW =  '600px',
            ifrH =  '678px',
            ifrT = params.top || 0,
            ifrL = params.left || 0,
            styles = params.styles || {},
            token = params.token,
            domain = params.domain || '',
            sendData = params.sendData;

        self.getOrigin();
        var _domain = domain && domain != '' ? domain : window.location.origin;

        var urlC = '';
        if (params.type == 'dev') {
            urlC = "http://192.168.1.251:18080?token=" + params.token;
        } else {
            urlC = "./";
        }

        if (window[ifrName]) {
            document.getElementById(ifrId).style.display = 'block';
            self.sendMessage(ifrName, sendData, urlC);
            return;
        }

        var oIFrame = document.createElement("iframe");
        oIFrame.id = ifrId;
        oIFrame.name = ifrName;

        oIFrame.frameborder = "no";
        oIFrame.border = "0";
        oIFrame.marginwidth = "0";
        oIFrame.marginheight = "0";
        oIFrame.scrolling = "no";
        oIFrame.allowtransparency = "yes";

        if (styles) {
            for (var item in styles) {
                oIFrame.style[item] = styles[item];
            }
        }

        oIFrame.style.border = "0";
        oIFrame.style.width = ifrW;
        oIFrame.style.height = ifrH;
        oIFrame.style.position = 'absolute';
        oIFrame.style.zIndex = '2147483647';
        oIFrame.style.top = ifrT;
        oIFrame.style.left = ifrL;
        oIFrame.style.display = 'block';

        if (oIFrame.attachEvent) {
            oIFrame.attachEvent("onload", function () {
                return self.sendMessage(ifrName, sendData, urlC);
            });
        } else {
            oIFrame.onload = function () {
                return self.sendMessage(ifrName, sendData, urlC);
            };
        }

        if (urlC.indexOf('?') == -1) {
            oIFrame.src = urlC + "?purl=" + encodeURIComponent(_domain);
        } else {
            oIFrame.src = urlC + "&purl=" + encodeURIComponent(_domain);
        }

        document.body.appendChild(oIFrame);
        self.performListen({cb: params.callback, ifrId: ifrId, ifrName: ifrName});

    },

    sendMessage: function (name, data, url) {
        window[name].postMessage(data, url);
    },

    performListen: function (params) {
        var self = this;

        this.bind(window, 'message', function (ev) {
            var e = window.event || arguments[0];
            if (typeof e.data == 'string') {
                // var data = JSON.parse(e.data);
                var data = eval('(' + e.data + ')');
                if (data.source == 'rxthinking') {
                    self.destroyIfr({ifrId: params.ifrId});
                    if (data.type == 'sendData') {
                        typeof params.cb == 'function' && params.cb(data);
                    }
                }
            }
        })
    },

    //销毁
    destroyIfr: function (params) {
        var ifrId = params.id || 'rxthinking',
            ifr = document.getElementById(ifrId);
        if (ifr) {
            // ifr.parentNode.removeChild(ifr);
            ifr.style.display = 'none';
        }
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

    removeBind: function (obj, evname, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(evname, fn, false);
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + evname, function () {
                fn.call(obj);
            });
        }
    },

    getOrigin: function () {
        if (window["context"] == undefined) {
            if (!window.location.origin) {
                window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
            window["context"] = location.origin + "/V6.0";
        }

    }

};
