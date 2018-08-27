(function() {
    'use strict';

    angular
        .module('app')
        .controller('SiteDialogController', SiteDialogController);

    SiteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$uibModal','DataUtils', 'entity', 'Site','Employe'];

    function SiteDialogController ($timeout, $scope, $stateParams, $uibModalInstance,$uibModal, DataUtils, entity, Site ,Employe) {
        var vm = this;

        vm.site = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.responsables = Employe.query();

      

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.site.id !== null) {
                Site.update(vm.site, onSaveSuccess, onSaveError);
            } else {
                Site.save(vm.site, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('tkbrApp:siteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
        
        vm.setMimage = function ($file, fieldName) {
                var ext = $file.name.match(/\.(.+)$/)[1];
        if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png'){
            //alert("Valid File Format");
            if ($file && $file.$error === 'pattern') {
                    return;
                }
                if ($file) {
                    DataUtils.toBase64($file, function (base64Data) {
                        $scope.$apply(function () {
                            vm.site[fieldName] = base64Data;
                            vm.site[fieldName + 'ContentType'] = $file.type;
                        });
                    });
                }
        }  
        else{
            alert("Format invalide!!!");
            return;
        }
    

                
            };
            
            vm.zoomColumn = function (lookupCtrl,lookupTemplate, fieldname, entity) {
                $uibModal.open({
                    templateUrl: 'tpl/entities/'+lookupTemplate+'/'+lookupTemplate+'-dialog.html',
                    controller: lookupCtrl+'DialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return entity;
                        }
                    }
                }).result.then(function(item) {
                        vm.site[fieldname] = item;
                }, function() {
                    
                });
            };

    }
})();
