angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $q) {

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

	var $obj1;
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
	var msgdata ="abc";
	console.log(msgdata);
	var defer = $q.defer();
//	$http.get('http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report', {
//	    	headers: {"Content-Type": "application/x-www-form-urlencoded",
//	        "Accept": "application/json",
//	        "Access-Control-Allow-Origin": "*",
//	        "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization,   Content-Type, X-Requested-With",
//	        "Access-Control-Allow-Methods": "GET, PUT, POST"} }
//	    ).success(function (data,status,headers,congfig) {
	    	
	 $http({
		         method: 'GET',
		         url: 'http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report'
		      }).success(function(data) {
	    	
	    	
	    	defer.resolve(data);
	    	$obj1 = angular.toJson(data); 
	    	$msgdata=angular.toJson(data); 
	    	
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
	    	defer.reject(data);
	      alert("登录出错" + data + "  " + status);
	    });
	console.log(JSON.stringify(defer.promise));
	
	
	console.log(defer.promise.db2);
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



.controller('ChatsCtrl2', function($scope, $resource) {
		console.log("hello1");
	    var dataService = $resource('http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report');
	    $scope.data = dataService.get();
	    console.log($scope.data);
	  })

.controller('ChatsCtrl3', function($scope, Chats) {
	$scope.login = function() {
		console.log("hello webservice 1111");
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report", true);
		xhr.onreadystatechange = function() {
	    	if (xhr.readyState == 4) {
	      		alert(xhr.responseText);
	    	}
		}
		xhr.send();
	};
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

	
//		console.log("hello webservice 1111");
//		var xhr = new XMLHttpRequest();
//		xhr.open("GET", "http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/report", true);
//		xhr.onreadystatechange = function() {
//	    	if (xhr.readyState == 4) {
//	      		alert(xhr.responseText);
//	    	}
//		}
//		xhr.send();

	  	  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,  $http, Accounts) {
//	alert("AccountCtrl");
	
	var msgdata ="abc";
	console.log(msgdata);
//	var defer = $q.defer();
	 $http({
         method: 'GET',
         url: 'http://cap-sg-prd-4.integration.ibmcloud.com:16763/mfp/api/adapters/javaAdapter/resource/vlanhealth'
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
		for (var k in jsonobj)
			{
			
//			console.log(k);  
//			console.log(jsonobj[k]); 
			subnets = jsonobj["subnets"];
			}
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
	defer.reject(data);
  alert("登录出错" + data + "  " + status);
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
