var DBPost = function(postId = 1) {
    this.storageKeyName = "postList" //所有文章本地缓存存储建值
    this.postId = postId; //具体的文章
}
DBPost.prototype = {
    //得到全部信息文章
    /*得到全部文章信息*/
    getAllPostData() {
        var res = wx.getStorageSync(this.storageKeyName);
        // if (!res) {
        console.log("缓存")
        res = require('../data/data.js').postList;
        //this.initPostList(res);
        // }
        console.log(res);
        console.log("res...")
        return res;
    },
    //本地缓存 保存/更新
    execSetStorageSync: function(data) {
        wx.setStorageSync(this.storageKeyName, data);
    },
    //获取文章的评论数据
    getCommentData() {
        var itemData = this.getPostItemById().data;
        itemData.comments.sort(this.compareWithTime); //按时间降序
        var len = itemData.comments.length,
            comment;
        for (var i = 0; i < len; i++) {
            // 将comment中的时间戳转换成可阅读格式
            comment = itemData.comments[i];
            comment.create_time = util.getDiffTime(comment.create_time, true);
        }
        return itemData.comments;
    },
    //获取指定的文章数据
    getPostItemById() {
        var postData = this.getAllPostData();

        var len = postData.length;
        for (let i = 0; i < len; i++) {
            if (postData[i].postId == this.postId) {
                return {
                    //文章当前的在数据库数组中的序号
                    index: i,
                    data: postData[i]
                }
            }
        }
    },
    //收藏
    collect() {
        return this.updatePostData('collect');
    },

    //点赞
    up() {
        var data = this.updatePostData('up');
        return data;
    },

    /*发表评论*/
    newComment(newComment) {
        this.updatePostData('comment', newComment);
    },

    //阅读数+1
    addReadingTimes() {
        this.updatePostData('reading');
    },



    //更新本地的点赞、评论信息、收藏、阅读量
    updatePostData(category, newComment) {
        var itemData = this.getPostItemById(),
            postData = itemData.data,
            allPostData = this.getAllPostData();
        switch (category) {
            case 'collect':
                //处理收藏
                if (!postData.collectionStatus) {
                    //如果当前状态是未收藏
                    postData.collectionNum++;
                    postData.collectionStatus = true;
                } else {
                    // 如果当前状态是收藏
                    postData.collectionNum--;
                    postData.collectionStatus = false;
                }
                break;
            case 'up':
                if (!postData.upStatus) {
                    postData.upNum++;
                    postData.upStatus = true;
                } else {
                    postData.upNum--;
                    postData.upStatus = false;
                }
                break;
            case 'comment':
                postData.comments.push(newComment);
                postData.commentNum++;
                break;
            case 'reading':
                postData.readingNum++;
                break;
            default:
                break;
        }
        allPostData[itemData.index] = postData;
        this.execSetStorageSync(allPostData);
        return postData;
    }
};

module.exports = {
    DBPost: DBPost
}