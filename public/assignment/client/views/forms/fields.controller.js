(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {
        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.editField = editField;
        $scope.formId = $routeParams.formId;
        $scope.fieldTypes = [
            "Single Line Text Field",
            "Multi Line Text Field",
            "Date Field",
            "Dropdown Field",
            "Checkboxes Field",
            "Radio Buttons Field"
        ];

        var sortableEle = null;
        function getFields() {
            FieldService
                .getFieldsForForm($scope.formId)
                .then(
                    function (response) {
                        $scope.fields = response.data;
                    }
                );
        }
        // update the fields model on dragging
        $scope.dragStart = function(e, ui) {
            ui.item.data('start', ui.item.index());
        };
        $scope.dragEnd = function(e, ui) {
            var start = ui.item.data('start'),
                end = ui.item.index();
            $scope.fields.splice(end, 0,
                $scope.fields.splice(start, 1)[0]);

        };

        // Initialize the sortable element
        function init() {
            sortableEle = $('#sortable').sortable({
                start: $scope.dragStart,
                update: $scope.dragEnd
            });
        }

        init();

        function editField (field) {
            console.log("edit");
        }

        function addField(fieldType) {
            var newField = null;
            switch (fieldType) {
                case "Single Line Text Field":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "Multi Line Text Field":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "Date Field":
                    newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "Dropdown Field":
                    newField = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "Checkboxes Field":
                    newField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "Radio Buttons Field":
                    newField = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
                default:
                    newField = null;
            }
            if (newField){
                FieldService
                    .createFieldForForm($scope.formId, newField)
                    .then(
                        function (response) {
                            $scope.fields.push(response.data);
                        }
                    );
            }

        }

        function removeField (field) {
            FieldService
                .deleteFieldFromForm($scope.formId, field._id)
                .then(
                    function (response) {
                        getFields();
                    }
                );
        }

        getFields();
    }
})();