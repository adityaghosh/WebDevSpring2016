(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var selectedForm = null;

        var user = $rootScope.user;
        FormService
            .findAllFormsForUser(user._id)
            .then(
                function (response) {
                    $scope.forms = response.data;
                }
            );

        function addForm(){
            if ($scope.formName) {
                var newForm = {
                    "title": $scope.formName,
                    "fields":[]
                };
                FormService
                    .createFormForUser(user._id, newForm)
                    .then(
                        function (response) {
                            $scope.forms.push(response.data);
                            $scope.formName = "";
                        }
                    );
            }
            else {
                alert("Form name cannot be empty.");
            }

        }

        function updateForm() {
            if(selectedForm) {
                selectedForm.title = $scope.formName;
                FormService
                    .updateFormById(selectedForm._id, selectedForm)
                    .then(
                        function (response) {
                            $scope.formName = "";
                        }
                    );
            }
        }

        function deleteForm(index) {
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(
                    function (response) {
                        $scope.forms.splice(index,1);
                    }
                );
        }

        function selectForm(index) {
            $scope.formName = $scope.forms[index].title;
            selectedForm = $scope.forms[index];
        }

    }
})();