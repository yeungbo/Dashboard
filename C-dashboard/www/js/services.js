angular.module('starter.services', [])

.constant('ApiEndpoint',{
//	url: 'http://192.168.1.46:8080/mfp'
	url: 'http://9.186.59.123:8080/resource'
})

.constant('VlanList',{
//	url: 'http://192.168.1.46:8080/mfp'
	sdt: '[{VLAN:1586},{VLAN:827},{VLAN:826},{VLAN:823},{VLAN:828},{VLAN:807},{VLAN:1226},{VLAN:1227},{VLAN:1228},{VLAN:1229}]',
	pdt: '[{VLAN:1586},{VLAN:863},{VLAN:1244},{VLAN:1245},{VLAN:1259},{VLAN:929},{VLAN:1256},{VLAN:825},{VLAN:1171},{VLAN:1468},{VLAN:1439}]'
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

	
//	alert("chats");
  // Some fake testing data
	  var chats = [{
		    id: 0,
		    name: 'Bo',
		    lastText: 'Research Staff Member - DevOps',
		    face: 'img/bo.png'
		  }, {
		    id: 1,
		    name: 'Anca',
		    lastText: 'Tech Lead - AppDev/PaaS Bluemix',
		    face: 'img/anca.png'
		  }, {
		    id: 2,
		    name: 'Yichong',
		    lastText: 'Tech Lead - Operational Dashboard',
		    face: 'img/yichong.png'
		  }, {
		    id: 3,
		    name: 'Shubir',
		    lastText: 'Development Manager - DevOps',
		    face: 'img/shubir.png'
		  }];

	
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('Vlans', function($q, $http, ApiEndpoint, VlanList) {
  // Might use a resource here that returns a JSON array
	
		console.log("running in here:");
	
		 
		 
  return {
    all: function() {
    	var deferred = $q.defer();
    	var promise=deferred.promise;
    	
    	$http.get(ApiEndpoint.url +'/resource/vlanshealth?vlans='+VlanList.pdt).success(function(data,status,headers,config){
            //执行deferred.resolve方法，将返回的data传入作为参数
		   	  $msgdata=angular.toJson(data); 
		   	  console.log("vlans:"+$msgdata);
//		   	  return $msgdata;
		   	  var json = JSON.parse($msgdata); 
		   	    
		   	 var vlans = [];
		     var id =0;
		     for(var key in json){ 
		  	   var jsonobj=json[key];
		  	   console.log("vlan name:"+jsonobj["name"]);
		  	   
		  	 vlans.push({
		        	id: id,
		        	name: 'VLAN - '+jsonobj["VLAN"],
		        	lastText: 'VLAN name: \"'+jsonobj["name"]+ "\"  [ Health: "+jsonobj["healthrate"]+"%  Available IP: "+(jsonobj["capacity"]-jsonobj["usage"]+" ]"),
				    face: (function () {
		                    // generate an array of random data
		                    var signal = 'img/red.png';
		                    var rate = parseFloat(jsonobj["healthrate"]);
		                    if(rate>60)
		                    	signal = 'img/green.png';
		                    	else if(rate>30)
				                    	signal = 'img/yellow.png';
		                    
		                    return signal;
		                }() ) 		                    	
		        });
		  	   
		  	   id+=1;
		  	   
		  	   
		     }
		     
		     console.log("vlansvlans:"+vlans);
            deferred.resolve(vlans);
          })
          
      return promise;
    },
    remove: function(vlan) {
    	
    	var deferred = $q.defer();
    	var promise=deferred.promise;
    	
    	$http.get(ApiEndpoint.url +'/resource/vlanshealth?vlans='+VlanList.pdt).success(function(data,status,headers,config){
            //执行deferred.resolve方法，将返回的data传入作为参数
		   	  $msgdata=angular.toJson(data); 
		   	  console.log("vlans:"+$msgdata);
//		   	  return $msgdata;
		   	  var json = JSON.parse($msgdata); 
		   	    
		   	 var vlans = [];
		     var id =0;
		     for(var key in json){ 
		  	   var jsonobj=json[key];
		  	   console.log("vlan name:"+jsonobj["name"]);
		  	   
		  	 vlans.push({
		        	id: id,
		        	name: jsonobj["VLAN"],
		        	lastText: "VLAN name: "+jsonobj["name"],
				    face: 'img/yellow.png'  		                    	
		        });
		  	   
		  	   id+=1;
		  	   
		  	   
		     }
		     
		     console.log("vlansvlans:"+vlans);
            deferred.resolve(vlans);
          });	
    	
          vlans = promise;
          
      vlans.splice(vlans.indexOf(vlan), 1);
    },
    get: function(vlanId) {
    	
    	
    	var deferred = $q.defer();
    	var promise=deferred.promise;

    	$http.get(ApiEndpoint.url +'/resource/vlanshealth?vlans='+VlanList.pdt).success(function(data,status,headers,config){
            //执行deferred.resolve方法，将返回的data传入作为参数
		   	  $msgdata=angular.toJson(data); 
		   	  console.log("vlans:"+$msgdata);
//		   	  return $msgdata;
		   	  var json = JSON.parse($msgdata); 
		   	    
		   	 var vlans = [];
		     var id =0;
		     for(var key in json){ 
		  	   var jsonobj=json[key];
		  	   console.log("vlan name:"+jsonobj["name"]);
		  	   
		  	 vlans.push({
		        	id: id,
		        	name: 'VLAN - '+jsonobj["VLAN"],
		        	lastText: 'VLAN name: \"'+jsonobj["name"]+ "\"  [ Health: "+jsonobj["healthrate"]+"%  Available IP: "+(jsonobj["capacity"]-jsonobj["usage"]+" ]"),
		        	detailText: 'VLAN capacity: '+jsonobj["capacity"],
				    face: (function () {
		                    // generate an array of random data
		                    var signal = 'img/red.png';
		                    var rate = parseFloat(jsonobj["healthrate"]);
		                    if(rate>60)
		                    	signal = 'img/green.png';
		                    	else if(rate>30)
				                    	signal = 'img/yellow.png';
		                    
		                    return signal;
		                }() ) 		                    	
		        });
		  	   
		  	   id+=1;
		  	   
		  	   
		     }
		     
		     console.log("vlansvlans:"+vlans);
//            deferred.resolve(vlans);
            
            for (var i = 0; i < vlans.length; i++) {
                if (vlans[i].id === parseInt(vlanId)) {
                	
                	 deferred.resolve(vlans[i]);
//                  return vlans[i];
                }
              }
            deferred.resolve(null);
//              return null;
              
          });	
    	
    	return promise;
    	
    }
  };
})



.factory('Accounts', function($http) {
  // Might use a resource here that returns a JSON array
//	alert("accounts");
	
	  return {
		    all: function($http) {
		    	
		    	
		    	var accounts = $http({
			         method: 'GET',
			         url: ApiEndpoint.url +'/resource/report'
			      }).success(function(data) {
			    	  alert("account data:"+data);
			    	  alert(JSON.stringify(data));
				         // removed your return data; it doesn't do anything, and this success is only added to log the result. if you don't need the log other than for debugging, get rid of this success handler too.   
				      });
		       return accounts;
		    },
		    remove: function(chat) {
		    	accounts.splice(accounts.indexOf(chat), 1);
		    },
		    get: function(chatId) {
		      for (var i = 0; i < accounts.length; i++) {
		        if (accounts[i].id === parseInt(chatId)) {
		          return accounts[i];
		        }
		      }
		      return null;
		    }
		  };
		  
})
