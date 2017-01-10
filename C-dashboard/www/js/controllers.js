angular.module('starter.controllers', [])
.constant('ApiEndpoint',{
//	url: 'http://192.168.1.46:8080/mfp'
	url: 'http://9.186.59.123:8080/resource'
})

.controller('DashCtrl', function($scope, $http,  ApiEndpoint) {

	console.log("ApiEndpoint : "+ApiEndpoint)
  //xxxx占比
    // xxxxxxService.getOrderConfCount().then(function(response) {
    //   console.log(response);

    //   var nameAndData = response.contents;
    //   var piedata_arr = []; 

    //   var pre_data = [];
    //   for(var item in nameAndData) {
        
    //     piedata_arr[item] = [];
    //     piedata_arr[item][0] = nameAndData[item].confName;
    //     piedata_arr[item][1] = Number(nameAndData[item].confCount);
    //   }

    //    $scope.chartPieConfig.series  =  [{
    //         name: 'xxxx占比',
    //         data:piedata_arr,
    //         type:"pie",
    //         dataLabels: {enabled: true,format: '<b>{point.name}</b>:<br> {point.percentage:.1f} %'},//默认显示x轴的值
    //         enableMouseTracking: false  //鼠标移动到上面不显示数量
    //     }];
      
    //   }, function(error) {
    //     console.log(error);
    //     $ionicLoading.hide();

    //     // if (error.result == 401) {
    //     var alertPopup = $ionicPopup.alert({
    //       title: "Error",
    //       template: error
    //     });
    //     alertPopup.then(function(res) {
    //       // ignore
    //     });
    //     // }
    //   });

//	var $obj1;
//	console.log("get data 1111");
//	var xhr = new XMLHttpRequest();
//	
//	xhr.open("GET", "http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report", true);
//	xhr.onreadystatechange = function($scope, $obj1) {
//    	if (xhr.readyState == 4) {
//      		alert(xhr.responseText);
//      		var data=xhr.responseText
////    		alert("data=>")
//    		
////  			alert(data);
//      		$scope.obj1 = JSON.parse(data); 
//      		$obj1 = JSON.parse(data); 
//      		
//    		alert($scope.obj1);
//    		alert($scope.obj1.was);
//    		return $scope.obj1;
//    	}
//	}
//	xhr.send();
//	var msgdata ="abc";
//	console.log(msgdata);
//	var defer = $q.defer();
//	$http.get('http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report', {
//	    	headers: {"Content-Type": "application/x-www-form-urlencoded",
//	        "Accept": "application/json",
//	        "Access-Control-Allow-Origin": "*",
//	        "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization,   Content-Type, X-Requested-With",
//	        "Access-Control-Allow-Methods": "GET, PUT, POST"} }
//	    ).success(function (data,status,headers,congfig) {
	    	
	 $http({
		         method: 'GET',
		         url: ApiEndpoint.url + '/resource/report'
		      }).success(function(data) {
	    	
	    	
//	    	defer.resolve(data);
	    	$obj1 = angular.toJson(data); 
	    	$msgdata=angular.toJson(data); 
//	    	console.log("defer"+ JSON.stringify(defer) );
	    	console.log($msgdata);
//	      alert("success"+$msgdata);
//	      alert("success"+data);
//	      alert("success"+data.was);
	      
	      var db2num = parseInt(data.db2);
	      var wasnum = parseInt(data.was);
	      var mongoDBnum = parseInt(data.mongoDB);
	      
	      var totalnum=db2num+wasnum+mongoDBnum;
	      
	      var db2share = (db2num/totalnum)*100;
	      var wasshare = (wasnum/totalnum)*100;
	      var mongodbshare = (mongoDBnum/totalnum)*100;
//	      console.log("db2:"+db2share)
//	      console.log("mongodbshare:"+mongodbshare)
//	      console.log("was:"+wasshare)
	      
	      
//	      alert("defer"+ JSON.stringify(defer) );
	      
	      ///////////////////////////
	      //饼图
	      $scope.chartPieConfig = {

	       chart: {
	                 plotBackgroundColor: null,
	                 plotBorderWidth: null,
	                 plotShadow: false
	             },
	             title: {
	                 text: 'Browser resource usage at a specific environment, 2016'
	             },
	             tooltip: {
	              pointFormat: '{series.name}bb: <b>{point.percentage:2.2f}%</b>'
	             },
	             plotOptions: {
	                 pie: {
	                     allowPointSelect: true,
	                     cursor: 'pointer',
	                     dataLabels: {
	                         enabled: true,
	                         color: '#000000',
	                         connectorColor: '#000000',
	                         format: '<b>{point.name}cc</b>: {point.percentage:1.1f} %'
	                     }
	                 }
	             },
	             series: [{
	                 type: 'pie',
	                 name: 'Resource share',
	                 data: [
	                     ['DB2',   db2share],
	                     ['WAS',       wasshare],
	                     {
	                         name: 'MongoDB',
	                         y: mongodbshare,
	                         sliced: true,
	                         selected: true
	                     }
	                 ]
	             }]
	      };
	      /////////////////////////////
	      
	      return $msgdata;
	    }).error(function(data, status, headers, config){	
//	    	defer.reject(data);
	    	console.log("error:" + data + "  " + status + " :: "+ headers +"  >> "+JSON.stringify(config));
	    });
//	console.log(JSON.stringify(defer.promise));
//	
//	
//	console.log(defer.promise.db2);
//	alert(obj.db2);
	
  //饼图
// $scope.chartPieConfig = {
//
//  chart: {
//            plotBackgroundColor: null,
//            plotBorderWidth: null,
//            plotShadow: false
//        },
//        title: {
//            text: 'Browser resource usage at a specific environment, 2016'
//        },
//        tooltip: {
//         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//        },
//        plotOptions: {
//            pie: {
//                allowPointSelect: true,
//                cursor: 'pointer',
//                dataLabels: {
//                    enabled: true,
//                    color: '#000000',
//                    connectorColor: '#000000',
//                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//                }
//            }
//        },
//        series: [{
//            type: 'pie',
//            name: 'Browser share',
//            data: [
//                ['Firefox',   45.0],
//                ['IE',       26.8],
//                {
//                    name: 'Chrome',
//                    y: 12.8,
//                    sliced: true,
//                    selected: true
//                },
//                ['Safari',    8.5],
//                ['Opera',     6.2],
//                ['Others',   0.7]
//            ]
//        }]
// };

})



.controller('DashCtrl2', function($scope, $resource) {
		console.log("hello1");
	    var dataService = $resource('http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report');
	    $scope.data = dataService.get();
	    console.log($scope.data);
	  })

.controller('DashCtrl3', function($scope) {
	
		console.log("hello webservice 1111");
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report", true);
		xhr.onreadystatechange = function() {
	    	if (xhr.readyState == 4) {
	      		alert(xhr.responseText);
	      		
	      		var data = JSON.parse(xhr.responseText);
		    	
		    	
//		    	defer.resolve(data);
		    	$obj1 = angular.toJson(data); 
		    	$msgdata=angular.toJson(data); 
//		    	console.log("defer"+ JSON.stringify(defer) );
		    	console.log($msgdata);
//		      alert("success"+$msgdata);
//		      alert("success"+data);
//		      alert("success"+data.was);
		      
		      var db2num = parseInt(data.db2);
		      var wasnum = parseInt(data.was);
		      var mongoDBnum = parseInt(data.mongoDB);
		      
		      var totalnum=db2num+wasnum+mongoDBnum;
		      
		      var db2share = (db2num/totalnum)*100;
		      var wasshare = (wasnum/totalnum)*100;
		      var mongodbshare = (mongoDBnum/totalnum)*100;
//		      console.log("db2:"+db2share)
//		      console.log("mongodbshare:"+mongodbshare)
//		      console.log("was:"+wasshare)
		      
		      
//		      alert("defer"+ JSON.stringify(defer) );
		      
		      ///////////////////////////
		      //饼图
		      $scope.chartPieConfig = {

		       chart: {
		                 plotBackgroundColor: null,
		                 plotBorderWidth: null,
		                 plotShadow: false
		             },
		             title: {
		                 text: 'Browser resource usage at a specific environment, 2016'
		             },
		             tooltip: {
		              pointFormat: '{series.name}bb: <b>{point.percentage:2.2f}%</b>'
		             },
		             plotOptions: {
		                 pie: {
		                     allowPointSelect: true,
		                     cursor: 'pointer',
		                     dataLabels: {
		                         enabled: true,
		                         color: '#000000',
		                         connectorColor: '#000000',
		                         format: '<b>{point.name}cc</b>: {point.percentage:1.1f} %'
		                     }
		                 }
		             },
		             series: [{
		                 type: 'pie',
		                 name: 'Resource share',
		                 data: [
		                     ['DB2',   db2share],
		                     ['WAS',       wasshare],
		                     {
		                         name: 'MongoDB',
		                         y: mongodbshare,
		                         sliced: true,
		                         selected: true
		                     }
		                 ]
		             }]
		      };
		      /////////////////////////////
		      
		    
	    	}
		}
		xhr.send();
	
})

.controller('ChatsCtrl', function($scope, Chats) {

	  	  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	console.log("ChatDetailCtrl====>"+$stateParams.chatId);
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('VlansCtrl', function($scope, $http, Vlans, ApiEndpoint) {

	console.log("start to query vlans");
//	 $http({
//        method: 'GET',
////        url: 'http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/vlanhealth'
//        url: ApiEndpoint.url +'/api/adapters/javaAdapter/resource/vlanshealth?vlans=[{VLAN:1586},{VLAN:1449}]'
//     }).success(function(data) {
//   	  $msgdata=angular.toJson(data); 
//   	  console.log("vlans:"+$msgdata);
////   	  return $msgdata;
//   	  var json = JSON.parse($msgdata); 
//   	    
//   	    var subnets = [];
//   	    for(var key in json){  
//   			console.log(key);  
//   			console.log(json[key]); 
//   			var jsonobj=json[key];
//   			for (var k in jsonobj)
//   				{
//   				
////   				console.log(k);  
////   				console.log(jsonobj[k]); 
//   				subnets = jsonobj["subnets"];
//   				}
//   	    } 
//   	    
//   	   
//   	 var data = [];
//     var id =0;
//     for(var key in json){ 
//  	   var jsonobj=json[key];
//  	   console.log("vlan name:"+jsonobj["name"]);
//  	   
//  	   data.push({
//        	id: id,
//        	name: jsonobj["VLAN"],
//        	lastText: "VLAN name: "+jsonobj["name"],
//		    face: 'img/bo.png'  		                    	
//        });
//  	   
//  	   id+=1;
//  	   
//  	   
//     }
//     
//     console.log("dataaaaa:"+data);
//     
//   	 $scope.vlans = data;
//   	 
////   	 function () {
////           // generate an array of random data
////           var data = [];
////           var id =0;
////           for(var key in json){ 
////        	   var jsonobj=json[key];
////        	   console.log("vlan name:"+jsonobj["name"]);
////        	   
////        	   data.push({
////              	id: id,
////              	name: jsonobj["name"],
////              	lastText: jsonobj["VLAN"],
////    		    face: 'img/bo.png'  		                    	
////              });
////        	   
////        	   id+=1;
////        	   
////        	   
////           }
////           
////           console.log("dataaaaa:"+data);
//////           for(var key in json["detail"]){  
//////               data.push({
//////             	name: key,
//////                 y: parseFloat(json["detail"][key]),
//////                 drilldown: null
//////             });
//////           }
////           
////           
////           
//////           data.push({
//////           	name: "PM2.5",
//////           	y: 100,
//////           	drilldown: null		  		                    	
//////           });
//////           data.push({
//////           	name: "PM10",
//////           	y: 100,
//////           	drilldown: null		  		                    	
//////           });
//////           data.push({
//////           	name: "AQI",
//////           	y: 100,
//////           	drilldown: null		  		                    	
//////           });
//////           data.push({
//////           	name: "二氧化硫",
//////           	y: 100,
//////           	drilldown: null		  		                    	
//////           });
//////           data.push({
//////           	name: "一氧化碳",
//////           	y: 100,
//////           	drilldown: null		  		                    	
//////           });
//////           data.push({
//////           	name: "一氧化氮",
//////           	y: 100,
//////           	drilldown: null		  		                    	
//////           });
//////           data.push({
//////           	name: "臭氧",
//////           	y: 100,
//////           	drilldown: null		  		                    	
//////           });
//////           
//////           var $jdata=angular.toJson(data); 
//////           console.log(data);
//////           console.log($jdata);
////           return data;
////       };
////   	 
//   	 
//     }).error(function(data, status, headers, config){	
////     	defer.reject(data);
//       console.log("vlans data error" + data + "  " + status);
//     });
//
//	
//	console.log("vvvvvvvlan");
////  Some fake testing dajta
//	 $scope.vlans = [{
//		    id: 0,
//		    name: 'Bo',
//		    lastText: 'Research Staff Member - DevOps',
//		    face: 'img/bo.png'
//		  }, {
//		    id: 1,
//		    name: 'Anca',
//		    lastText: 'Tech Lead - AppDev/PaaS Bluemix',
//		    face: 'img/anca.png'
//		  }, {
//		    id: 2,
//		    name: 'Yichong',
//		    lastText: 'Tech Lead - Operational Dashboard',
//		    face: 'img/yichong.png'
//		  }, {
//		    id: 3,
//		    name: 'Shubir',
//		    lastText: 'Development Manager - DevOps',
//		    face: 'img/shubir.png'
//		  }];

///////////////////////////////  
	Vlans.all().then(function(result){
		$scope.vlans = result;
	}, function(){
		console.log("service get error");
	})
	
	////////////////////////////
//  $scope.vlans = Vlans.all();
  $scope.remove = function(vlan) {
    Vlans.remove(vlan);
  };
})
.controller('VlanDetailCtrl', function($scope, $stateParams, Vlans) {
	console.log("VlanDetailCtrl====>"+$stateParams.vlanId);
	Vlans.get($stateParams.vlanId).then(function(result){
		$scope.vlan = result;
	}, function(){
		console.log("service vlans.get get error");
	})
	
//  $scope.vlan = Vlans.get($stateParams.vlanId);
})

.controller('AccountCtrl', function($scope,  $http, Accounts, ApiEndpoint) {
//	alert("AccountCtrl");
	
	var msgdata ="abc";
	console.log(msgdata);
	
	var userAgent = navigator.userAgent;
	  console.log(userAgent);
	  var index = userAgent.indexOf("Android");
	  
	  console.log(index);
	  if(index >= 0){
	    var androidVersion = parseFloat(userAgent.slice(index+8)); 
	    console.log('Version'+androidVersion);
	  }
	  
//	var defer = $q.defer();
	 $http({
         method: 'GET',
//         url: 'http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/vlanhealth'
         url: ApiEndpoint.url +'/resource/vlanshealth?vlans=[{VLAN:1586},{VLAN:882}]'
      }).success(function(data) {
	
	
//	defer.resolve(data);
//	$obj1 = angular.toJson(data); 
	$msgdata=angular.toJson(data); 
	
//    console.log("success"+$msgdata);
    
    var json = JSON.parse($msgdata); 
    
    var subnets = [];
    for(var key in json){  
//		console.log(key);  
//		console.log(json[key]); 
		var jsonobj=json[key];
		subnets = jsonobj["subnets"];
//		for (var k in jsonobj)
//			{
//			
////			console.log(k);  
////			console.log(jsonobj[k]); 
//			subnets = jsonobj["subnets"];
//			}
    } 
    
//    for(var s in subnets){ 
////    	console.log(s); 
////    	console.log(subnets[s]); 
//    	
//    	var sn=subnets[s];
//    	console.log(sn["subnet"]); 
//    	console.log(sn["usage"]);
//    	console.log(sn["capacity"]);
//    	
//    }
    
//  alert("success"+data);
//  alert("success"+data.was);
  
  
  
//  alert("defer"+ JSON.stringify(defer) );
  
  ///////////////////////////
    $scope.vlanPieConfig = {  
    		chart: {
                type: 'bar'
            },
            title: {
                text: 'Usage for VLAN 1586'
            },
            subtitle: {
                text: 'Source: <a href="https://en.wikipedia.org">WHC Platform</a>'
            },
            xAxis: {
                categories: (function () {
	                    // generate an array of random data
	                    var data = [];
	                    
	                    for(var s in subnets){ 
	                    	var sn=subnets[s];
		                    data.push(sn["subnet"]);
	                    }
	                    var $jdata=angular.toJson(data); 
	                    console.log(data);
	                    console.log($jdata);
	                    return data;
	                }()),
                	
                	
//                	['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'IP numbers',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' IP'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: (function () {
                // generate an array of random data
                var data = [];
                var cap = [];
                var usa = [];
                for(var s in subnets){ 
                	var sn=subnets[s];
                    cap.push(sn["capacity"]);
                    usa.push(sn["usage"]);
                }
                
                data.push({
                	name: "Capacity",
                	data: cap
                	});
                
                data.push({
                	name: "Usage",
                	data: usa
                	});
                
               
                var $jdata=angular.toJson(data); 
                console.log(data);
                console.log($jdata);
                return data;
            }())
            	
            	
            	
//            	[{
//                name: 'Year 1800',
//                data: [107, 31, 635, 203, 2]
//            }, {
//                name: 'Year 1900',
//                data: [133, 156, 947, 408, 6]
//            }, {
//                name: 'Year 2012',
//                data: [1052, 954, 4250, 740, 38]
//            }]
    	    };
    //////////////////////////////////////
//  //饼图
//  $scope.chartPieConfig = {
//
//   chart: {
//             plotBackgroundColor: null,
//             plotBorderWidth: null,
//             plotShadow: false
//         },
//         title: {
//             text: 'Browser resource usage at a specific environment, 2016'
//         },
//         tooltip: {
//          pointFormat: '{series.name}bb: <b>{point.percentage:2.2f}%</b>'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     color: '#000000',
//                     connectorColor: '#000000',
//                     format: '<b>{point.name}cc</b>: {point.percentage:1.1f} %'
//                 }
//             }
//         },
//         series: [{
//             type: 'pie',
//             name: 'Resource share',
//             data: [
//                 ['DB2',   db2share],
//                 ['WAS',       wasshare],
//                 {
//                     name: 'MongoDB',
//                     y: mongodbshare,
//                     sliced: true,
//                     selected: true
//                 }
//             ]
//         }]
//  };
  /////////////////////////////
  
  return $msgdata;
}).error(function(data, status, headers, config){	
//	defer.reject(data);
  console.log("登录出错" + data + "  " + status);
});
	///////////////////////////
	   
	 
	 
	 ////////////////////
	  //饼图
//	 $scope.vlanPieConfig = {
//	
//	  chart: {
//	            plotBackgroundColor: null,
//	            plotBorderWidth: null,
//	            plotShadow: false
//	        },
//	        title: {
//	            text: 'Browser resource usage at a specific environment, 2016'
//	        },
//	        tooltip: {
//	         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//	        },
//	        plotOptions: {
//	            pie: {
//	                allowPointSelect: true,
//	                cursor: 'pointer',
//	                dataLabels: {
//	                    enabled: true,
//	                    color: '#000000',
//	                    connectorColor: '#000000',
//	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//	                }
//	            }
//	        },
//	        series: [{
//	            type: 'pie',
//	            name: 'Browser share',
//	            data: [
//	                ['Firefox',   45.0],
//	                ['IE',       26.8],
//	                {
//	                    name: 'Chrome',
//	                    y: 12.8,
//	                    sliced: true,
//	                    selected: true
//	                },
//	                ['Safari',    8.5],
//	                ['Opera',     6.2],
//	                ['Others',   0.7]
//	            ]
//	        }]
//	 };
	
	
	
	////////////////////////////////////////////
//	  Accounts.all($http).success(function(data) {
//		  	$scope.accounts = data
//		  	alert("ii:"+$scope.accounts);
//			alert("jj:"+JSON.stringify($scope.accounts));
//		      });
//	  
//	  var accounts = [{
//		    id: 0,
//		    name: 'Bo',
//		    lastText: 'You on your way?',
//		    face: 'img/ben.png'
//		  }, {
//		    id: 1,
//		    name: 'Max Lynx',
//		    lastText: 'Hey, it\'s me',
//		    face: 'img/max.png'
//		  }, {
//		    id: 2,
//		    name: 'Adam Bradleyson',
//		    lastText: 'I should buy a boat',
//		    face: 'img/adam.jpg'
//		  }, {
//		    id: 3,
//		    name: 'Perry Governor',
//		    lastText: 'Look at my mukluks!',
//		    face: 'img/perry.png'
//		  }, {
//		    id: 4,
//		    name: 'Mike Harrington',
//		    lastText: 'This is wicked good ice cream.',
//		    face: 'img/mike.png'
//		  }];
//	  
////	$scope.accounts = Accounts.all($http);
//	  $scope.accounts =  accounts;
//	alert($scope.accounts);
////	alert(JSON.stringify($scope.accounts));
//	  $scope.remove = function(account) {
//		  Accounts.remove(account);
//	  };
//	  
////	  Accounts.all($http).success(function(data) {
////		  	$scope.accounts = data
////		      });
});
