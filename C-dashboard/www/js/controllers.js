angular.module('starter.controllers', [])
.constant('ApiEndpoint',{
	url: 'http://192.168.1.46:8080/resource'
//	url: 'http://9.186.59.123:8080/resource'
})

.constant('DbEndpoint',{
	url: 'http://192.168.1.46:8080/db'
//	url: 'http://9.186.59.123:8080/db'
})


.controller('DashCtrl', function($scope, $http,  ApiEndpoint, DbEndpoint) {

	console.log("ApiEndpoint : "+ApiEndpoint);
	
	var date = new Date();
	
	var timestamp = ""+date.getTime()
	
	var userAgent = navigator.userAgent;
	  console.log(userAgent);
	  var index = userAgent.indexOf("Android");
	  
	  console.log(index);
//	  if(index >= 0){
//	    var androidVersion = parseFloat(userAgent.slice(index+8)); 
//	    console.log('Version'+androidVersion);
//	  }
	  
	 $http.post(DbEndpoint.url, {"_id" : timestamp, "date": date, "client": userAgent}).then(function (res){
         console.log("===============<response:"+ JSON.stringify(res.data));
     });	
	 
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
	                 text: 'Browser resource usage of environment, 2017'
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


.controller('VlansCtrl', function($scope, $http, Vlans) {

	console.log("start to query vlans");

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
         url: ApiEndpoint.url +'/resource/vlanshealth?vlans=[{VLAN:1586},{VLAN:827},{VLAN:826},{VLAN:823},{VLAN:828},{VLAN:807},{VLAN:1226},{VLAN:1227},{VLAN:1228},{VLAN:1229}]'
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
            	
            	
            	
    	    };
    //////////////////////////////////////
  /////////////////////////////
  
  return $msgdata;
}).error(function(data, status, headers, config){	
//	defer.reject(data);
  console.log("登录出错" + data + "  " + status);
});
	///////////////////////////
	   
	 
	 
});
