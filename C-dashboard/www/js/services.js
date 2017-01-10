angular.module('starter.services', [])

.constant('ApiEndpoint',{
//	url: 'http://192.168.1.46:8080/mfp'
	url: 'http://9.186.59.123:8080/resource'
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

//  console.log("hello here222");
//	
//  console.log("hello webservice 123");
//	var xhr = new XMLHttpRequest();
//	xhr.open("GET", "http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report", true);
//	xhr.onreadystatechange = function() {
//  	if (xhr.readyState == 4) {
//    		alert(xhr.responseText);
//  	}
//	}
//	xhr.send();
// 
	
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


.factory('Vlans', function($q, $http, ApiEndpoint) {
  // Might use a resource here that returns a JSON array
	
		console.log("running in here:");
	
		 
		 
  return {
    all: function() {
    	var deferred = $q.defer();
    	var promise=deferred.promise;
    	
    	$http.get(ApiEndpoint.url +'/resource/vlanshealth?vlans=[{VLAN:1586},{VLAN:1449}]').success(function(data,status,headers,config){
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
				    face: 'img/bo.png'  		                    	
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
    	
    	$http.get(ApiEndpoint.url +'/resource/vlanshealth?vlans=[{VLAN:1586},{VLAN:1449}]').success(function(data,status,headers,config){
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
				    face: 'img/bo.png'  		                    	
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
    	
    	$http.get(ApiEndpoint.url +'/resource/vlanshealth?vlans=[{VLAN:1586},{VLAN:1449}]').success(function(data,status,headers,config){
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
				    face: 'img/bo.png'  		                    	
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
    	
//      for (var i = 0; i < vlans.length; i++) {
//        if (vlans[i].id === parseInt(vlanId)) {
//          return vlans[i];
//        }
//      }
//      return null;
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
			         url: 'http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report'
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
		  
//	this.getAccounts  = function() {
//	       var accounts = $http({
//		         method: 'GET',
//		         url: 'http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report'
//		      }).success(function(data) {
//		    	  alert("account data:"+data);
//			         $log.log(data);
//			         // removed your return data; it doesn't do anything, and this success is only added to log the result. if you don't need the log other than for debugging, get rid of this success handler too.   
//			      });
//	       return accounts;
//	};
//	return this.getAccounts;
//	alert("accounts");
//  // Some fake testing data
//  var accounts = [{
//    id: 0,
//    name: 'Bo',
//    lastText: 'You on your way?',
//    face: 'img/ben.png'
//  }, {
//    id: 1,
//    name: 'Max Lynx',
//    lastText: 'Hey, it\'s me',
//    face: 'img/max.png'
//  }, {
//    id: 2,
//    name: 'Adam Bradleyson',
//    lastText: 'I should buy a boat',
//    face: 'img/adam.jpg'
//  }, {
//    id: 3,
//    name: 'Perry Governor',
//    lastText: 'Look at my mukluks!',
//    face: 'img/perry.png'
//  }, {
//    id: 4,
//    name: 'Mike Harrington',
//    lastText: 'This is wicked good ice cream.',
//    face: 'img/mike.png'
//  }];
//
//  console.log("hello account");
//	
//  console.log("hello webservice 123");
//	var xhr = new XMLHttpRequest();
//	xhr.open("GET", "http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report", true);
//	xhr.onreadystatechange = function() {
//  	if (xhr.readyState == 4) {
//  			var data=xhr.responseText
//  			var jdata={"provisions":"453","db2":"94","vm":"888","was":"36","title":"Sol-DT Provision Statistic","mongoDB":"31"};
//    		alert("data=>")
////    		
//  			alert(data);
//    		var obj = JSON.parse(data); 
////    		alert(obj);
////    		alert(obj.was);
////    		alert("jdata=>")
////    		alert(jdata);
//    		var obj2 = eval(jdata);
////    		alert(obj2);
////    		alert(obj2.db2);
//  	}
//	}
//	xhr.send();
//	
//	accounts=xhr.responseText;
//	alert("==>"+accounts);
// 
//	
//  return {
//    all: function() {
//    	alert("response:"+accounts);
//      return accounts;
//    },
//    remove: function(account) {
//    	accounts.splice(accounts.indexOf(account), 1);
//    },
//    get: function(accountId) {
//      for (var i = 0; i < accounts.length; i++) {
//        if (accounts[i].id === parseInt(accountId)) {
//          return accounts[i];
//        }
//      }
//      return null;
//    }
//  };
})
