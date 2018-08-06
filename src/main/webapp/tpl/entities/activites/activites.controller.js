(function() {
    'use strict';

    angular
        .module('app')
        .controller('ActivitesController', ActivitesController);

    ActivitesController.$inject = ['$state', 'DataUtils', 'Activites',  'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams','Employe','$filter'];

    function ActivitesController($state, DataUtils, Activites,  ParseLinks, AlertService, paginationConstants, pagingParams,Employe,$filter) {

        var vm = this;

        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.loadAll = loadAll;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.searchActivite = {};
        vm.responsables = Employe.query();

        loadAll();

        vm.search = search;

        function loadAll () {
                Activites.query({
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.activitess = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

         function search()
        {
            // var dateFormat = 'yyyy-MM-dd';
            // var fromDate = $filter('date')(vm.fromDate, dateFormat);
            // var toDate = $filter('date')(vm.toDate, dateFormat);
            var selected_activite = vm.activite == null ? "" : vm.activite.libelle;
            var selected_resp = vm.responsable == null ? "" : vm.responsable.nom;

            if(selected_activite == "" && selected_resp == "") loadAll();
            else{
                 Activites.query({
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                libelle: selected_activite 
                ,responsable: selected_resp
            },  function (data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.activitess = data;
                page : pagingParams.page;
            });
            }
           
           
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
            });
        }

       
        function clear() {
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.transition();
        }

        vm.datePickerOpenStatus.dateFin = false;
        vm.datePickerOpenStatus.dateDebut = false;

        
        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }

        
    }
})();
