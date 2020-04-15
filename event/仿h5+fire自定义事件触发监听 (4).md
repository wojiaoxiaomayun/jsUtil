
# 仿h5+fire自定义事件触发监听

------

**uni-app调用**

[event.js](https://ext.dcloud.net.cn/plugin?id=333)
    
[源码记录](https://github.com/wojiaoxiaomayun/jsUtil/tree/master/event)（点击查看）

    1.js下载地址   

        [event.js](https://ext.dcloud.net.cn/plugin?id=333)     

        [源码记录](https://github.com/wojiaoxiaomayun/jsUtil/tree/master/event)

    2.js文件直接拖入

    3.import event from 'common/event.js'

    4.Vue.prototype.event = event;

接下来就可以使用了

**使用实例**

1.事件监听

```js

//事件监听

//params:page：页面的地址（确报每个页面唯一）

//      type: 事件类型

//      callback: 回调参数

this.event.on('index/index','test',function(args){
      //args为trigger中所有的参数，可自定义数据，除了type和page及success
      console.log('testindex:' + args);
      //返回数据，在trigger中success方法可以收到
      return {
          
      };

});

//结果：testindex:index

```

2.事件触发

```js

//事件触发

//params:obj：{type:'test',page:'index/index'}

//            type：事件类型，对应监听中的type，必须

//            page: 默认all，表示所有页面, 对应监听中的page ,非必须

this.event.trigger({
    type:'test',
    page:'index/index'
    //obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
    obj:{
        
    },
    test:{
        
    },
    success:function(data){
        //data为on中返回的数据
    }
});

```

3.移除事件
```js
this.event.remove('index/index')//移除所有
this.event.remove('index/index','test')//移除单个
```
