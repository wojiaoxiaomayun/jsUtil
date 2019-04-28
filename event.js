var listener = new Map();
var fire_event = {
	on:function(page,type,callBack){
		if(!listener.hasOwnProperty(page)){
			listener[page] = new Map();
		}
		//if(!listener[page].hasOwnProperty(type)){
			listener[page][type] = callBack;
		//}
		return fire_event;
	},	
	trigger:function(obj){
		var myObj = {
			type:obj.type,
			page:obj.page || 'all'
		};
		var params = Array.prototype.slice.apply(arguments);
		params.shift();
		if(myObj.page == 'all'){
			for(var key in listener){
				listener[key][myObj.type].apply(this,params);
			}
		}else{
			if(listener.hasOwnProperty(myObj.page)){
				listener[myObj.page][myObj.type].apply(this,params);
				return;
			}
		}
	}
};


module.exports = fire_event;