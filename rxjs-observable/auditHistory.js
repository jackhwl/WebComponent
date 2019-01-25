/* global $ */
'use strict';
var app = angular.module('app')
    .component('ovAuditHistory', {
        templateUrl: 'app/components/audit/auditHistory/auditHistory.html',
        controller: OvAuditHistoryController,
        bindings: {
            user: '<'
        }
    });

OvAuditHistoryController.$inject = ['auditHistoryFactory', 'ngDialog','$http', '$q', '$scope', '$timeout'];

function OvAuditHistoryController(auditHistoryFactory, ngDialog, $http, $q, $scope, $timeout) {
    var vm = this;
    vm.sortParams = "";
    vm.searchedOnce = false;
    var cancelListeners = [
        $scope.$on('header_action:save', function () {
            vm.download();
        })
    ];
    vm.auditSrc = {
        requireReload: false,
        isDynamicData: true,
        showItemCount: true,
        defaultPageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
        cols: [
            {
                field: "UserName",
                title: "user ID",
                sortable: "UserName",
                show: true,
                getTableCellContent: readonlyInputValue
            },{
                field: "TimeStamp",
                title: "TimeStamp",
                sortable: "TimeStamp",
                show: true,
                getTableCellContent: readonlyInputValue
            }, {
                field: "Template",
                title: "Template",
                sortable: "Template",
                show: true,
                getTableCellContent: readonlyInputValue
            }, {
                field: "Key",
                title: "Description Key",
                sortable: "Key",
                show: true,
                getTableCellContent: readonlyInputValue,
                getClickEvent: descriptionClickEvent,
                columnTooltip: "Click to expand"
            }, {
                field: "Type",
                title: "Type",
                sortable: "Type",
                show: true,
                getTableCellContent: readonlyInputValue
            }, {
                field: "SubType",
                title: "Sub Type",
                sortable: "SubType",
                show: true,
                getTableCellContent: readonlyInputValue
            }, {
                field: "Value",
                title: "Value",
                sortable: "Value",
                show: true,
                getTableCellContent: readonlyInputValue
            }
        ]
    };

    vm.getTableData = function (params) {    
        var page = params._params.page;
        var pagesize = params._params.count;
        vm.sortParams = vm.convertSorting(params._params.sorting);
        var queryFilters = vm.convertFilters();
        return $q(function (resolve, reject) {
            $http({
                    method: 'GET',
                    url: 'Audit/GetAudits',
                    params: {
                        page: page,
                        pagesize: pagesize,
                        sort: vm.sortParams,
                        filter: queryFilters
                    }
                })
                .success(function (data) {
                    params.total(data.total); // set total items in the table
                    resolve(data.logs);
                })
                .error(function (data, status) {
                    reject('Error', status, data);
                });
        });
    }

    function readonlyInputValue($scope, row) {
        var value = row[this.field];
        var html = "<input readonly value='" + value + "' />";
        return html;
    }
    function descriptionClickEvent($scope, row) {
        //If it is just a number, or it isn't a comma separated list don't bother
        if (!isNaN(row[this.field]) || row[this.field].indexOf(",")===-1)
            return;

        var descriptionPairs = row[this.field].split(",");
        for (var j = 0; j < descriptionPairs.length; j++) {
            descriptionPairs[j] = descriptionPairs[j].split(":");
        }
        
        var data = {
            type: "infoTable",
            title: "Description: ",
            headers: ["Key", "Value"],
            rows: descriptionPairs
        }
        return ngDialog.openConfirm({
            template: "<ov-dialog data='data' confirm='confirm()' close-this-dialog='closeThisDialog()'></ov-dialog>",
            controller: ["$scope", function($scope) {
                $scope.data = data;
            }],
            plain:true
        });
    }
    vm.convertFilters =function() {
        var result = [];
        for (var i = 0; i < vm.filters.length; i++) {
            result.push({
                field: vm.filters[i].field,
                operator: "contains",
                value: vm.escapeChar(vm.filters[i].value)
            });
        }
        result.push(vm.dateRangeParams.timeRange);
        return { logic: "and", filters: result };
    }
    vm.display = {
        UserName: "User ID",
        TimeStamp: "TimeStamp",
        Template: "Template",
        Key: "Description Key",
        Type: "Type",
        SubType: "Sub Type",
        Value: "Value"
    };

    //Because we can't resize the ov-table, we use jQuery to force the table to have a specific max-height. 
    var forceTableSize = function () {
        
            $(".ov-table-container").css("max-height",
                $(window).height() - $("header").height() - $("#filterArea").height()*2 -110);
        
    }
    vm.initialize = function () {
        vm.field = 'UserName';
        vm.filterValue = '';
        //After the current digest cycle, change the size.
        $timeout(forceTableSize);
    };
    //if the window's shape is changed, then resize the table.
    $(window).resize(forceTableSize);

    vm.filters = [];
    vm.intermediates = [];
    var timeRange = { field: 'TimeStamp' };
    
    vm.reloadTable = function () {
        if (vm.filters.length > 0 || vm.dateRangeParams.timeRange !== { field: 'TimeStamp' }) {
            vm.auditSrc.requireReload = true;
        }
    };

    vm.dateRangeParams = { timeRange: timeRange, updateTimeRange:vm.reloadTable };

    vm.auditSearch = function () {
        for (var i = 0; i < vm.intermediates.length; i++) {
            vm.filters.push(vm.intermediates[i]);
        }
        vm.intermediates = [];
        vm.searchedOnce = true;
        vm.reloadTable();
    }

    vm.addIntermediate = function() {
        if ($scope.auditSearchForm.$valid) {
            var newFilterItem = { field: vm.field, value: vm.filterValue };
            vm.intermediates.push(newFilterItem);
        }
        vm.filterValue = '';
        $scope.auditSearchForm.$setPristine();
    }
    
    vm.deleteFilter = function (index) {
        vm.filters.splice(index, 1);
        vm.reloadTable();
    };
    vm.deleteIntermediate = function(index) {
        vm.intermediates.splice(index, 1);
    }
     
    vm.convertSorting = function (ngTableSort) {
        var convertedSort = '';
        for (var ngSort in ngTableSort) {
            convertedSort += '[{"field":"';
            convertedSort += ngSort;
            convertedSort += '","dir":"';
            convertedSort += ngTableSort[ngSort];
            convertedSort += '"}]';
        }
        return convertedSort;
    };

    vm.escapeChar = function(str) {
        return str.replace(/\[|\]/g, function (char) {
            return '\\' + char;
        });
    };

    vm.download = function () {
        var link = "Audit/DownloadAudit?sort=" + vm.sortParams.toString() + "&filter=" + JSON.stringify(vm.convertFilters());
        window.open(link, '_blank');
    }

    vm.$onDestroy = function () {
        angular.forEach(cancelListeners, function (cancelListener) {
            cancelListener();
        });
    };

    vm.initialize();

    // autocomplete suggestions
    var jQueryAuditSearchBox = $("#auditSearchBox");
    var auditSearchBox = jQueryAuditSearchBox[0];
    var searchParam = Object.assign({}, auditHistoryFactory.searchParam, {element: auditSearchBox});

    function getSearchParam() {
        searchParam.field = vm.field;
        searchParam.value = auditSearchBox.value;
        return searchParam;
    }

    vm.updateAutocompleteSource = function (suggestions){
        jQueryAuditSearchBox.autocomplete({
            source: suggestions
        });
    };

    auditHistoryFactory.getSuggestions(getSearchParam).subscribe(vm.updateAutocompleteSource);
}

app.resolveCustomDrivers = {
    user: user /*global user: true*/
}