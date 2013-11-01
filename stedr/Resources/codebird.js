function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}

function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}

function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}

function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}

function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}

function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}

function sha1_vm_test() {
    return "a9993e364706816aba3e25717850c26c9cd0d89d" == hex_sha1("abc");
}

function core_sha1(x, len) {
    x[len >> 5] |= 128 << 24 - len % 32;
    x[(len + 64 >> 9 << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; x.length > i; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; 80 > j; j++) {
            w[j] = 16 > j ? x[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}

function sha1_ft(t, b, c, d) {
    if (20 > t) return b & c | ~b & d;
    if (40 > t) return b ^ c ^ d;
    if (60 > t) return b & c | b & d | c & d;
    return b ^ c ^ d;
}

function sha1_kt(t) {
    return 20 > t ? 1518500249 : 40 > t ? 1859775393 : 60 > t ? -1894007588 : -899497514;
}

function core_hmac_sha1(key, data) {
    var bkey = str2binb(key);
    bkey.length > 16 && (bkey = core_sha1(bkey, key.length * chrsz));
    var ipad = Array(16), opad = Array(16);
    for (var i = 0; 16 > i; i++) {
        ipad[i] = 909522486 ^ bkey[i];
        opad[i] = 1549556828 ^ bkey[i];
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 672);
}

function safe_add(x, y) {
    var lsw = (65535 & x) + (65535 & y);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | 65535 & lsw;
}

function rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}

function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; str.length * chrsz > i; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 24 - i % 32;
    return bin;
}

function binb2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; 32 * bin.length > i; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> 24 - i % 32 & mask);
    return str;
}

function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; 4 * binarray.length > i; i++) str += hex_tab.charAt(15 & binarray[i >> 2] >> 8 * (3 - i % 4) + 4) + hex_tab.charAt(15 & binarray[i >> 2] >> 8 * (3 - i % 4));
    return str;
}

function binb2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; 4 * binarray.length > i; i += 3) {
        var triplet = (255 & binarray[i >> 2] >> 8 * (3 - i % 4)) << 16 | (255 & binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) << 8 | 255 & binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4);
        for (var j = 0; 4 > j; j++) str += 8 * i + 6 * j > 32 * binarray.length ? b64pad : tab.charAt(63 & triplet >> 6 * (3 - j));
    }
    return str;
}

Array.indexOf || (Array.prototype.indexOf = function(obj, start) {
    for (var i = start || 0; this.length > i; i++) if (this[i] == obj) return i;
    return -1;
});

var hexcase = 0;

var b64pad = "";

var chrsz = 8;

var Codebird = function() {
    function parse_str(str, array) {
        var glue1 = "=", glue2 = "&", array2 = String(str).replace(/^&?([\s\S]*?)&?$/, "$1").split(glue2), i, j, chr, tmp, key, value, bracket, keys, evalStr, that = this, fixStr = function(str) {
            return unescape(str).replace(/([\\"'])/g, "\\$1").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
        };
        array || (array = this.window);
        for (i = 0; array2.length > i; i++) {
            tmp = array2[i].split(glue1);
            2 > tmp.length && (tmp = [ tmp, "" ]);
            key = fixStr(tmp[0]);
            value = fixStr(tmp[1]);
            while (" " === key.charAt(0)) key = key.substr(1);
            -1 !== key.indexOf("\0") && (key = key.substr(0, key.indexOf("\0")));
            if (key && "[" !== key.charAt(0)) {
                keys = [];
                bracket = 0;
                for (j = 0; key.length > j; j++) if ("[" !== key.charAt(j) || bracket) {
                    if ("]" === key.charAt(j) && bracket) {
                        keys.length || keys.push(key.substr(0, bracket - 1));
                        keys.push(key.substr(bracket, j - bracket));
                        bracket = 0;
                        if ("[" !== key.charAt(j + 1)) break;
                    }
                } else bracket = j + 1;
                keys.length || (keys = [ key ]);
                for (j = 0; keys[0].length > j; j++) {
                    chr = keys[0].charAt(j);
                    (" " === chr || "." === chr || "[" === chr) && (keys[0] = keys[0].substr(0, j) + "_" + keys[0].substr(j + 1));
                    if ("[" === chr) break;
                }
                evalStr = "array";
                for (j = 0; keys.length > j; j++) {
                    key = keys[j];
                    key = "" !== key && " " !== key || 0 === j ? "'" + key + "'" : eval(evalStr + ".push([]);") - 1;
                    evalStr += "[" + key + "]";
                    j !== keys.length - 1 && "undefined" === eval("typeof " + evalStr) && eval(evalStr + " = [];");
                }
                evalStr += " = '" + value + "';\n";
                eval(evalStr);
            }
        }
    }
    var _oauth_consumer_key = null;
    var _oauth_consumer_secret = null;
    var _oauth_bearer_token = null;
    var _endpoint_base = "https://api.twitter.com/";
    var _endpoint = _endpoint_base + "1.1/";
    var _endpoint_oauth = _endpoint_base;
    var _endpoint_proxy = "https://api.jublo.net/codebird/";
    var _use_jsonp = false;
    var _use_proxy = false;
    var _oauth_token = null;
    var _oauth_token_secret = null;
    var _version = "2.4.0-dev";
    var setConsumerKey = function(key, secret) {
        _oauth_consumer_key = key;
        _oauth_consumer_secret = secret;
    };
    var setBearerToken = function(token) {
        _oauth_bearer_token = token;
    };
    var getVersion = function() {
        return _version;
    };
    var setToken = function(token, secret) {
        _oauth_token = token;
        _oauth_token_secret = secret;
    };
    var setUseProxy = function(use_proxy) {
        _use_proxy = !!use_proxy;
    };
    var __call = function(fn, params, callback, app_only_auth) {
        if ("undefined" == typeof params) var params = {};
        if ("undefined" == typeof app_only_auth) var app_only_auth = false;
        if ("function" != typeof callback && "function" == typeof params) {
            callback = params;
            params = {};
            "bool" == typeof callback && (app_only_auth = callback);
        } else if ("undefined" == typeof callback) var callback = function() {};
        switch (fn) {
          case "oauth_authenticate":
          case "oauth_authorize":
            return this[fn](params, callback);

          case "oauth2_token":
            return this[fn](callback);
        }
        var apiparams = {};
        "object" == typeof params ? apiparams = params : parse_str(params, apiparams);
        var method = "";
        var path = fn.split("_");
        for (var i = 0; path.length > i; i++) {
            i > 0 && (method += "/");
            method += path[i];
        }
        var url_parameters_with_underscore = [ "screen_name" ];
        for (i = 0; url_parameters_with_underscore.length > i; i++) {
            var param = url_parameters_with_underscore[i].toUpperCase();
            var replacement_was = param.split("_").join("/");
            method = method.split(replacement_was).join(param);
        }
        var method_template = method;
        var match = [];
        if (match = method.match(/[A-Z_]{2,}/)) for (var i = 0; match.length > i; i++) {
            var param = match[i];
            var param_l = param.toLowerCase();
            method_template = method_template.split(param).join(":" + param_l);
            if ("undefined" == typeof apiparams[param_l]) {
                for (j = 0; 26 > j; j++) method_template = method_template.split(String.fromCharCode(65 + j)).join("_" + String.fromCharCode(97 + j));
                console.warn('To call the templated method "' + method_template + '", specify the parameter value for "' + param_l + '".');
            }
            method = method.split(param).join(apiparams[param_l]);
            delete apiparams[param_l];
        }
        for (i = 0; 26 > i; i++) {
            method = method.split(String.fromCharCode(65 + i)).join("_" + String.fromCharCode(97 + i));
            method_template = method_template.split(String.fromCharCode(65 + i)).join("_" + String.fromCharCode(97 + i));
        }
        var httpmethod = _detectMethod(method_template, apiparams);
        var multipart = _detectMultipart(method_template);
        return _callApi(httpmethod, method, method_template, apiparams, multipart, app_only_auth, callback);
    };
    var oauth_authenticate = function(params, callback) {
        "undefined" == typeof params.force_login && (params.force_login = null);
        "undefined" == typeof params.screen_name && (params.screen_name = null);
        null == _oauth_token && console.warn("To get the authenticate URL, the OAuth token must be set.");
        var url = _endpoint_oauth + "oauth/authenticate?oauth_token=" + _url(_oauth_token);
        if (true === params.force_login) {
            url += "?force_login=1";
            null !== params.screen_name && (url += "&screen_name=" + params.screen_name);
        }
        callback(url);
        return true;
    };
    var oauth_authorize = function(params, callback) {
        "undefined" == typeof params.force_login && (params.force_login = null);
        "undefined" == typeof params.screen_name && (params.screen_name = null);
        null == _oauth_token && console.warn("To get the authorize URL, the OAuth token must be set.");
        var url = _endpoint_oauth + "oauth/authorize?oauth_token=" + _url(_oauth_token);
        if (true === params.force_login) {
            url += "?force_login=1";
            null !== params.screen_name && (url += "&screen_name=" + params.screen_name);
        }
        callback(url);
        return true;
    };
    var oauth2_token = function(callback) {
        null == _oauth_consumer_key && console.warn("To obtain a bearer token, the consumer key must be set.");
        if ("undefined" == typeof callback) var callback = function() {};
        var post_fields = "grant_type=client_credentials";
        var url = _endpoint_oauth + "oauth2/token";
        _use_proxy && (url = url.replace(_endpoint_base, _endpoint_proxy));
        var xml;
        xml = Ti.Network.createHTTPClient();
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.setRequestHeader((_use_proxy ? "X-" : "") + "Authorization", "Basic " + base64_encode(_oauth_consumer_key + ":" + _oauth_consumer_secret));
        xml.onreadystatechange = function() {
            if (xml.readyState >= 4) {
                var httpstatus = 12027;
                try {
                    httpstatus = xml.status;
                } catch (e) {}
                var reply = _parseApiReply("oauth2/token", xml.responseText);
                reply.httpstatus = httpstatus;
                200 == httpstatus && setBearerToken(reply.access_token);
                callback(reply);
            }
        };
        xml.send(post_fields);
    };
    var _url = function(data) {
        return "array" == typeof data ? array_map([ this, "_url" ], data) : /boolean|number|string/.test(typeof data) ? encodeURIComponent(data).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A") : "";
    };
    var _sha1 = function(data) {
        null == _oauth_consumer_secret && console.warn("To generate a hash, the consumer secret must be set.");
        "function" != typeof b64_hmac_sha1 && console.warn("To generate a hash, the Javascript SHA1.js must be available.");
        b64pad = "=";
        return b64_hmac_sha1(_oauth_consumer_secret + "&" + (null != _oauth_token_secret ? _oauth_token_secret : ""), data);
    };
    var base64_encode = function(data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
        if (!data) return data;
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = 63 & bits >> 18;
            h2 = 63 & bits >> 12;
            h3 = 63 & bits >> 6;
            h4 = 63 & bits;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (data.length > i);
        enc = tmp_arr.join("");
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
    };
    var http_build_query = function(formdata, numeric_prefix, arg_separator) {
        var value, key, tmp = [];
        var _http_build_query_helper = function(key, val, arg_separator) {
            var k, tmp = [];
            true === val ? val = "1" : false === val && (val = "0");
            if (null != val) {
                if ("object" == typeof val) {
                    for (k in val) null != val[k] && tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
                    return tmp.join(arg_separator);
                }
                if ("function" != typeof val) return _url(key) + "=" + _url(val);
                throw new Error("There was an error processing for http_build_query().");
            }
            return "";
        };
        arg_separator || (arg_separator = "&");
        for (key in formdata) {
            value = formdata[key];
            numeric_prefix && !isNaN(key) && (key = String(numeric_prefix) + key);
            var query = _http_build_query_helper(key, value, arg_separator);
            "" != query && tmp.push(query);
        }
        return tmp.join(arg_separator);
    };
    var _nonce = function(length) {
        if ("undefined" == typeof length) var length = 8;
        1 > length && console.warn("Invalid nonce length.");
        var nonce = "";
        for (var i = 0; length > i; i++) {
            var character = Math.floor(61 * Math.random());
            nonce += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(character, character + 1);
        }
        return nonce;
    };
    var _ksort = function(inputArr) {
        var sorter, k, keys = [];
        sorter = function(a, b) {
            var aFloat = parseFloat(a), bFloat = parseFloat(b), aNumeric = aFloat + "" === a, bNumeric = bFloat + "" === b;
            if (aNumeric && bNumeric) return aFloat > bFloat ? 1 : bFloat > aFloat ? -1 : 0;
            if (aNumeric && !bNumeric) return 1;
            if (!aNumeric && bNumeric) return -1;
            return a > b ? 1 : b > a ? -1 : 0;
        };
        for (k in inputArr) inputArr.hasOwnProperty(k) && keys.push(k);
        keys.sort(sorter);
        return keys;
    };
    var _clone = function(obj) {
        var clone = {};
        for (var i in obj) clone[i] = "object" == typeof obj[i] ? clone(obj[i]) : obj[i];
        return clone;
    };
    var _sign = function(httpmethod, method, params, append_to_get) {
        if ("undefined" == typeof params) var params = {};
        if ("undefined" == typeof append_to_get) var append_to_get = false;
        null == _oauth_consumer_key && console.warn("To generate a signature, the consumer key must be set.");
        var sign_params = {
            consumer_key: _oauth_consumer_key,
            version: "1.0",
            timestamp: Math.round(new Date().getTime() / 1e3),
            nonce: _nonce(),
            signature_method: "HMAC-SHA1"
        };
        var sign_base_params = {};
        for (var key in sign_params) {
            var value = sign_params[key];
            sign_base_params["oauth_" + key] = _url(value);
        }
        null != _oauth_token && (sign_base_params["oauth_token"] = _url(_oauth_token));
        oauth_params = _clone(sign_base_params);
        for (var key in params) {
            var value = params[key];
            sign_base_params[key] = _url(value);
        }
        var keys = _ksort(sign_base_params);
        var sign_base_string = "";
        for (var i = 0; keys.length > i; i++) {
            var key = keys[i];
            var value = sign_base_params[key];
            sign_base_string += key + "=" + value + "&";
        }
        sign_base_string = sign_base_string.substring(0, sign_base_string.length - 1);
        var signature = _sha1(httpmethod + "&" + _url(method) + "&" + _url(sign_base_string));
        params = append_to_get ? sign_base_params : oauth_params;
        params["oauth_signature"] = signature;
        if (append_to_get) {
            var authorization = "";
            for (var key in params) {
                var value = params[key];
                authorization += key + "=" + _url(value) + "&";
            }
            return authorization.substring(0, authorization.length - 1);
        }
        var authorization = "OAuth ";
        for (var key in params) {
            var value = params[key];
            authorization += key + '="' + _url(value) + '", ';
        }
        return authorization.substring(0, authorization.length - 2);
    };
    var _detectMethod = function(method, params) {
        switch (method) {
          case "account/settings":
            method = params.length ? method + "__post" : method;
        }
        var httpmethods = {};
        httpmethods["GET"] = [ "statuses/mentions_timeline", "statuses/user_timeline", "statuses/home_timeline", "statuses/retweets_of_me", "statuses/retweets/:id", "statuses/show/:id", "statuses/oembed", "search/tweets", "direct_messages", "direct_messages/sent", "direct_messages/show", "friendships/no_retweets/ids", "friends/ids", "followers/ids", "friendships/lookup", "friendships/incoming", "friendships/outgoing", "friendships/show", "friends/list", "followers/list", "account/settings", "account/verify_credentials", "blocks/list", "blocks/ids", "users/lookup", "users/show", "users/search", "users/contributees", "users/contributors", "users/profile_banner", "users/suggestions/:slug", "users/suggestions", "users/suggestions/:slug/members", "favorites/list", "lists/list", "lists/statuses", "lists/memberships", "lists/subscribers", "lists/subscribers/show", "lists/members/show", "lists/members", "lists/show", "lists/subscriptions", "saved_searches/list", "saved_searches/show/:id", "geo/id/:place_id", "geo/reverse_geocode", "geo/search", "geo/similar_places", "trends/place", "trends/available", "trends/closest", "oauth/authenticate", "oauth/authorize", "help/configuration", "help/languages", "help/privacy", "help/tos", "application/rate_limit_status" ];
        httpmethods["POST"] = [ "statuses/destroy/:id", "statuses/update", "statuses/retweet/:id", "statuses/update_with_media", "direct_messages/destroy", "direct_messages/new", "friendships/create", "friendships/destroy", "friendships/update", "account/settings__post", "account/update_delivery_device", "account/update_profile", "account/update_profile_background_image", "account/update_profile_colors", "account/update_profile_image", "blocks/create", "blocks/destroy", "account/update_profile_banner", "account/remove_profile_banner", "favorites/destroy", "favorites/create", "lists/members/destroy", "lists/subscribers/create", "lists/subscribers/destroy", "lists/members/create_all", "lists/members/create", "lists/destroy", "lists/update", "lists/create", "lists/members/destroy_all", "saved_searches/create", "saved_searches/destroy/:id", "geo/place", "users/report_spam", "oauth/access_token", "oauth/request_token", "oauth2/token", "oauth2/invalidate_token" ];
        for (var httpmethod in httpmethods) if (httpmethods[httpmethod].indexOf(method) > -1) return httpmethod;
        console.warn("Can't find HTTP method to use for \"" + method + '".');
    };
    var _detectMultipart = function(method) {
        var multiparts = [ "statuses/update_with_media", "account/update_profile_background_image", "account/update_profile_image", "account/update_profile_banner" ];
        return multiparts.indexOf(method) > -1;
    };
    var _getEndpoint = function(method) {
        if ("oauth" == method.substring(0, 5)) var url = _endpoint_oauth + method; else var url = _endpoint + method + ".json";
        return url;
    };
    var _callApi = function(httpmethod, method, method_template, params, multipart, app_only_auth, callback) {
        if ("undefined" == typeof params) var params = {};
        if ("undefined" == typeof multipart) var multipart = false;
        if ("undefined" == typeof app_only_auth) var app_only_auth = false;
        if ("function" != typeof callback) var callback = function() {};
        var url = _getEndpoint(method, method_template);
        var authorization = null;
        var xml = Ti.Network.createHTTPClient();
        if ("GET" == httpmethod) {
            var url_with_params = url;
            "{}" != JSON.stringify(params) && (url_with_params += "?" + http_build_query(params));
            authorization = _sign(httpmethod, url, params);
            if (_use_jsonp) {
                url_with_params += "{}" != JSON.stringify(params) ? "&" : "?";
                var callback_name = _nonce();
                window[callback_name] = function(reply) {
                    reply.httpstatus = 200;
                    callback(reply);
                };
                params.callback = callback_name;
                url_with_params = url + "?" + _sign(httpmethod, url, params, true);
                var tag = document.createElement("script");
                tag.type = "text/javascript";
                tag.src = url_with_params;
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(tag);
                return;
            }
            _use_proxy && (url_with_params = url_with_params.replace(_endpoint_base, _endpoint_proxy));
            xml.open(httpmethod, url_with_params, true);
        } else {
            if (_use_jsonp) {
                console.warn("Sending POST requests is not supported for IE7-9.");
                return;
            }
            authorization = _sign(httpmethod, url, {});
            if (!multipart) {
                authorization = _sign(httpmethod, url, params);
                params = http_build_query(params);
            }
            post_fields = params;
            _use_proxy && (url = url.replace(_endpoint_base, _endpoint_proxy));
            xml.open(httpmethod, url, true);
            multipart ? xml.setRequestHeader("Content-Type", "multipart/form-data") : xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        if (app_only_auth) {
            null == _oauth_consumer_key && console.warn("To make an app-only auth API request, the consumer key must be set.");
            if (null == _oauth_bearer_token) return oauth2_token(function() {
                _callApi(httpmethod, method, method_template, params, multipart, app_only_auth, callback);
            });
            authorization = "Bearer " + _oauth_bearer_token;
        }
        null !== authorization && xml.setRequestHeader((_use_proxy ? "X-" : "") + "Authorization", authorization);
        xml.onreadystatechange = function() {
            if (xml.readyState >= 4) {
                var httpstatus = 12027;
                try {
                    httpstatus = xml.status;
                } catch (e) {}
                httpstatus || (httpstatus = 12027);
                var reply = _parseApiReply(method_template, xml.responseText);
                reply || callback(null);
                reply.httpstatus = httpstatus;
                callback(reply);
            }
        };
        xml.send("GET" == httpmethod ? null : post_fields);
        return true;
    };
    var _parseApiReply = function(method, reply) {
        if ("[]" == reply || null == reply) return [];
        var parsed = false;
        try {
            parsed = JSON.parse(reply);
        } catch (e) {
            parsed = {};
            if (0 === reply.indexOf('<?xml version="1.0" encoding="UTF-8"?>')) {
                parsed["request"] = reply.match(/<request>(.*)<\/request>/)[1];
                parsed["error"] = reply.match(/<error>(.*)<\/error>/)[1];
            } else {
                var elements = reply.split("&");
                for (var i = 0; elements.length > i; i++) {
                    var element = elements[i].split("=", 2);
                    parsed[element[0]] = element.length > 1 ? unescape(element[1]) : null;
                }
            }
        }
        return parsed;
    };
    return {
        setConsumerKey: setConsumerKey,
        getVersion: getVersion,
        setToken: setToken,
        setBearerToken: setBearerToken,
        setUseProxy: setUseProxy,
        __call: __call,
        oauth_authenticate: oauth_authenticate,
        oauth_authorize: oauth_authorize,
        oauth2_token: oauth2_token
    };
};

module.exports = Codebird;