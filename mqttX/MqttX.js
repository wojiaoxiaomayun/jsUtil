var mqttX = {
	client:null,
	mqttStatus:false,
	options:{},
	onConnect:function(){
		mqttStatus = true;
		if(options && options.success){
			options.success();
		}
	},
	onFailure:function(){
		mqttStatus = false;
		if(options && options.error){
			options.error();
		}
	},
	onConnectionLost:function(responseObject){
		if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:"+responseObject.errorMessage);
            console.log("连接已断开");
            mqttStatus = false;
			if(options && options.connectLost){
				options.connectLost(responseObject.errorMessage);
			}
        }
	},
	onMessageArrived:function(message){
		console.log(message);
		if(options && options.onMessage){
			options.onMessage(message);
		}
	},
	sendMessage:function(topic,obj){
		if(mqttStatus){
			var message = new Paho.MQTT.Message(JSON.stringify(obj));
			message.destinationName = topic;
			if(mqttX.client && mqttStatus){
				mqttX.client.send(message);				
				return true;				
			}
		}
		return false;
	},
	subscribe:function(topic,qos){
		if(mqttX.client && mqttStatus){
			mqttX.client.subscribe(topic,{qos:qos || 0});
			return true;
		}
		return false;
	},
	unsubscribe:function(topic){
		if(mqttX.client && mqttStatus){
			mqttX.client.unsubscribe(topic);//取消订阅主题
			return true;			
		}
		return false;
	},
	reconnect:function(){
		if(mqttX.client && options){
			mqttX.client.connect({
				onSuccess:this.onConnect,
		    	onFailure: this.onFailure,
		        userName: options.userName || 'admin',  
		        password: options.passWord ||'password'
			});
			return true;			
		}
		return false;
	},
	init:function(options1){
		if(options1){
			options = options1;
			mqttX.client = new Paho.MQTT.Client(options.ip || '127.0.0.1', Number(options.port || 61623), options.id || '0');
			mqttX.client.connect({
		    	onSuccess:this.onConnect,
		    	onFailure: this.onFailure,
		        userName: options.userName || 'admin',  
		        password: options.passWord ||'password'
		    });		
		    mqttX.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件
			mqttX.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件
		}
		
	}
};
    
