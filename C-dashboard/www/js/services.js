angular.module('starter.services', [])

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
