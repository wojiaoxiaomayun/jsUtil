# 仿h5+fire自定义事件触发监听

------

uni-app调用

1.js文件直接拖入

2.import event from 'common/event.js'

3.Vue.prototype.event = event;

接下来就可以使用了

##使用实例
1.事件监听
```js
//事件监听
//params:page：页面的地址（确报每个页面唯一）
//       type: 事件类型
//       callback: 回调参数
this.event.on('index/index','test',function(args){
	console.log('testindex:' + args);
});

//结果：testindex:index
```
2.事件触发
```js
//事件触发
//params:obj：{type:'test',page:'index/index'}
//            type：事件类型，对应监听中的type，必须
//            page: 默认all，表示所有页面, 对应监听中的page ,非必须
//           后面的参数对应callback中参数
this.event.trigger({type:'test',page:'index/index'},'index');
```

目前使用没有问题，不保证有没有bug，毕竟小菜鸟，希望各位大佬借鉴并提出问题


感谢有位老哥提点，提出问题，目前已修改