// Code goes here

angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm'])


.controller('MainCtrl', MainCtrl)
.controller('RowEditCtrl', RowEditCtrl)
.service('RowEditor', RowEditor)

.constant('ApplicationSchema', {
  type: 'object',
  properties: {
	  appId: { type: 'string', title: 'applicationId' },
	  uniquePDFAppId: { type: 'string', title: 'pdfAppId' },
	  previousPDFAppid: { type: 'string', title: 'comments' }
  }
})

;

MainCtrl.$inject = ['$http', 'RowEditor'];
function MainCtrl ($http, RowEditor) {
  var vm = this;
  
  vm.editRow = RowEditor.editRow;
  
  vm.gridOptions = {
    columnDefs: [
      { field: 'reviewerComments[0].id', name: '', cellTemplate: 'edit-button.html', width: 34 },
      { name: 'reviewerComments[0].pdfAppId', displayName: 'Application Id'} ,
      { name: 'reviewerComments[0].createdBy', displayName: 'Created by'} ,
      { name: 'reviewerComments[0].createdTime', displayName: 'Created Time'} ,
      { name: 'reviewerComments[0].comments', displayName: 'Comments', width: '70%'} 
    ]
  };
  
  $http.get('http://localhost:8181/mihonline/application/')
    .success(function (data) {
      vm.gridOptions.data = data;
    });
}

RowEditor.$inject = ['$rootScope', '$modal'];
function RowEditor($rootScope, $modal) {
  var service = {};
  service.editRow = editRow;
  
  function editRow(grid, row) {
    $modal.open({
      templateUrl: 'edit-modal.html',
      controller: ['$modalInstance', 'ApplicationSchema', 'grid', 'row', RowEditCtrl],
      controllerAs: 'vm',
      resolve: {
        grid: function () { return grid; },
        row: function () { return row; }
      }
    });
  }
  
  return service;
}

function RowEditCtrl($modalInstance, ApplicationSchema, grid, row) {
  var vm = this;
  
  vm.schema = ApplicationSchema;
  vm.entity = angular.copy(row.entity);
  vm.form = [
    'reviewerComments[0].applicationId',
    'reviewerComments[0].pdfAppId',
    'reviewerComments[0].comments'
  ];
  
  vm.save = save;
  
  function save() {
    // Copy row values over
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
  }
}

