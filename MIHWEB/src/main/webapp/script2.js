// Code goes here

angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm'])


.controller('MainCtrl', MainCtrl)
.controller('RowEditCtrl', RowEditCtrl)
.service('RowEditor', RowEditor)
.constant('PersonSchema', {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name1' },
    company: { type: 'string', title: 'Company1' },
    phone: { type: 'string', title: 'Phone1' },
    'address.city': { type: 'string', title: 'City1' }
  }
})

;

MainCtrl.$inject = ['$http', 'RowEditor'];
function MainCtrl ($http, RowEditor) {
  var vm = this;
  
  vm.editRow = RowEditor.editRow;
  
  vm.gridOptions = {
    columnDefs: [
      { field: 'id', name: '', cellTemplate: 'edit-button.html', width: 34 },
      { name: 'name' },
      { name: 'company' },
      { name: 'phone' },
      { name: 'City', field: 'address.city' },
    ]
  };
  
  $http.get('http://ui-grid.info/data/500_complex.json')
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
      controller: ['$modalInstance', 'PersonSchema', 'grid', 'row', RowEditCtrl],
      controllerAs: 'vm',
      resolve: {
        grid: function () { return grid; },
        row: function () { return row; }
      }
    });
  }
  
  return service;
}

function RowEditCtrl($modalInstance, PersonSchema, grid, row) {
  var vm = this;
  
  vm.schema = PersonSchema;
  vm.entity = angular.copy(row.entity);
  vm.form = [
    'name',
    'company',
    'phone',
    {
      'key': 'address.city',
      'title': 'City'
    },
  ];
  
  vm.save = save;
  
  function save() {
    // Copy row values over
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
  }
}

