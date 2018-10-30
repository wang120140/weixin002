//app.js

App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
        /*************
         * 自己添加的事件第一个版本 
         */
        // var dataObj = require("data/data.js")
        // wx.setStorage({
        //     key: "postList",
        //     data: dataObj.postList,
        //     success: function() {
        //         console.log("success事件发生...")
        //     },
        //     fail: function() {
        //         console.log("fail事件发生....")
        //     },
        //     complete: function() {
        //         console.log("complete事件发生...")
        //     }

        // });
        /*********
         * 第二个版本
         */
        var storageData = wx.getStorageSync("postList")
        if (!storageData) {
            //如果缓存不存在的话
            var dataObj = require("data/data.js");
            wx.clearStorageSync();
            wx.setStorageSync("postList", dataObj.postList);
        }
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        });
    },
    globalData: {
        userInfo: null
    }
})