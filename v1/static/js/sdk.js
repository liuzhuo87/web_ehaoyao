var rxThinking = {
    haveIfr: false,
    //创建
    createIfr: function (params) {
        var self = this;
        if (this.haveIfr) {
            return;
        }
        var ifrId = params.id || 'rx_iframe',
            ifrName = params.name || params.id || 'rx_iframe',
            ifrW = params.ifrW || 0,
            ifrH = params.ifrH || 0,
            ifrT = params.ifrT || 0,
            ifrL = params.ifrL || 0,
            styles = params.styles || {},
            domain = params.domain || '',
            token = params.token;

        var _domain = domain && domain != '' ? domain : window.location.origin;
        var urlC = "https://assistant.rxthinking.com?token=" + params.token;
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
        this.bind(window, 'message', function (ev) {
            var e = window.event || arguments[0];
            if (typeof e.data == 'string') {
                var data = JSON.parse(e.data);
                if (data.source == 'rxthinking') {
                    typeof params.cb == 'function' && params.cb(data);
                }
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
    }
}