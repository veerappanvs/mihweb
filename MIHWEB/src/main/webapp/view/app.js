angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.select', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.resizeColumns'])
  .controller('MainCtrl', MainCtrl)
  .directive('uiSelectWrap', uiSelectWrap);

MainCtrl.$inject = ['$scope', '$http'];
function MainCtrl($scope, $http) {

  var cellEditable_2 = function($scope){
	    return $scope.row.entity.workflowDetails[0].status == 'APPROVED'
  }	
  var cellEditable_3 = function($scope){
	    return $scope.row.entity.workflowDetails[1].status == 'APPROVED'
  }
  var cellEditable_4 = function($scope){
	    return $scope.row.entity.workflowDetails[2].status == 'APPROVED'
  }
  var resubmission = function($scope){
	   //if( $scope.row.entity.workflowDetails[2].status == 'APPROVED')
	    //	return 'resubmission-row-class';
	
	   return 'resubmission-row-class1';
  }
  
  var rowtpl='<div ng-class="{\'row-class\':true, \'resubmission-row-class\':resubmission }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
  // Access outside scope functions from row template
  $scope.rowFormatter = function( row ) {	 
    return scope.row.entity.appResubmitted == 'N';
  };
	 
  
  $scope.gridOptions = {
    
    cellEditableCondition: function($scope) {
	      return $scope.row.entity.appResubmitted == 'N'; //Resubmitted apps wont be editable
	},
	rowHeight: 38,
	enableColumnResize: true,
	//rowTemplate: rowtpl,
	//rowTemplate: '<div class="ui-grid-row-contents" >{{grid.getRowValue(row)}}</div>', 
    columnDefs: [
        { name: 'uniquePDFAppId',  cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD.uniquePDFAppId }}</div>' },
        { name: 'uniquePDFAppId', enableCellEdit: false, displayName: 'PDF App ID', cellTemplate: 'pdflink.html'  , width: '8%'},
        { name: 'previousPDFAppid', enableCellEdit: false,  cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD.previousPDFAppid }}</div>' },
        { name: 'previousPDFAppid', enableCellEdit: false,  displayName: 'Prev App Id', cellTemplate: 'pdflink.html',  width: '8%' },
        { name: 'organization.orgName',  displayName: 'HealthBoard name',  cellTooltip: function( row, col ) { return row.entity.organization.orgName ; }  ,  width: '25%'},
        { name: 'workflowDetails[0].status', cellClass:  resubmission, width: '7%',  displayName: 'REVIEWER_1' ,   editableCellTemplate: 'uiSelect', editDropdownOptionsArray: ['PENDING','ONHOLD','APPROVED','REJECTED'] },        
        { name: 'workflowDetails[1].status',  width: '7%', displayName: 'REVIEWER_2' ,   editableCellTemplate: 'uiSelect', editDropdownOptionsArray: ['PENDING','ONHOLD','APPROVED','REJECTED'] , cellEditableCondition: cellEditable_2},  
        { name: 'workflowDetails[2].status',  width: '7%', displayName: 'REVIEWER_3',    editableCellTemplate: 'uiSelect', editDropdownOptionsArray: ['PENDING','ONHOLD','APPROVED','REJECTED'] , cellEditableCondition: cellEditable_3}, 
        { name: 'workflowDetails[3].status',  width: '7%', displayName: 'REVIEWER_4',    editableCellTemplate: 'uiSelect', editDropdownOptionsArray: ['PENDING','ONHOLD','APPROVED','REJECTED'] , cellEditableCondition: cellEditable_4 },
        { name: 'reviewerComments[0].comments', enableCellEdit: false, cellTemplate: '<div class="ui-grid-cell-contents">comments</div>' },
        { name: 'reviewerComments[0].comments', enableCellEdit: false, displayName: 'Comments', cellTemplate: 'comments.html' , cellTemplate: '<button id="showButton"  class="btn-small" ng-click="showModal()">VIEW</button> <button id="editBtn" type="button" class="btn-small" >ADD</button>'}
	], 
	exporterMenuPdf: false,
	enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'myFile.csv',    
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };
  $http.get('http://localhost:8181/mihonline/application/')
  //$http.get('http://localhost:8181/mihonline/application/get?appid={1}')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
  
}

uiSelectWrap.$inject = ['$document', 'uiGridEditConstants'];
function uiSelectWrap($document, uiGridEditConstants) {
  return function link($scope, $elm, $attr) {
    $document.on('click', docClick);
    
    function docClick(evt) {
      if ($(evt.target).closest('.ui-select-container').size() === 0) {
        $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
        $document.off('click', docClick);
      }
    }
  };
}

function test(){
	window.alert("You dont have access to approve");
}

function isapproved($scope){
			window.alert("$scope.row.entity. ");
			
			// if($scope.row.entity.uniquePDFAppId===undefined)
			      return false;
			    //return $scope.row.entity.uniquePDFAppId !='20170710032656';	
	      return true;
	    
}

$scope.gridOptions.onRegisterApi = function(gridApi) {
	console.log('********id to be edited');
	window.alert("You dont have access to edited");
    $scope.gridApi = gridApi;

    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {

      //$scope.msg.lastCellEdited = 'ID: ' + rowEntity.id + ', Column: ' + colDef.name + ', New Value: ' + newValue + ', Old Value: ' + oldValue;

      $scope.$apply();

    });

  };

