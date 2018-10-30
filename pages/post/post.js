// pages/post/post.js
let dataObj = require("../../data/data.js")
var DBPost = require("../../db/DBPos01.js").DBPost;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: " 30 -10 -2018",
        title: "小时候的冰棍儿和雪糕",
        postImg: "/images/post/post-4.jpg",
        avatar: "/images/avatar/avatar-5.png",
        content: "冰棍与雪糕绝对不是同一个东西 。感觉不是一样的你觉得呢？",
        readingNum: 92,
        collectionNum: 108,
        commentNum: 7,
        Num: [0, 1],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("页面被加载...")
            /*********
             * 第一种写法
             */
            // this.setData({
            //     postList: dataObj.postList
            // })
            /*********
             * 第二种写法
             */
        var dbPost = new DBPost();
        this.setData({
            postList: dbPost.getAllPostData()
        })

    },
    /*********
     * 跳转事件
     */
    onTapToDetail(event) {
        console.log(event);
        console.log("事件跳转前的事件...")
        var postId = event.currentTarget.dataset.postId;
        wx.navigateTo({
            url: "post-detail/post-detail?id=" + postId
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log("页面被渲染完成...")
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log("页面显示完成...")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log("页面隐藏...")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        console.log("页面隐藏...")
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        console.log("用户下拉事件发生...")
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        console.log("页面上拉触底事件发生")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        console.log("用户点击右上角分享事件发生...")
    }
})