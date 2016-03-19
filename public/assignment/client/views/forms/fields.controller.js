(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {
        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.editField = editField;
        $scope.updateField = updateField;
        $scope.modalClose = modalClose;

        $scope.formId = $routeParams.formId;
        $scope.fieldTypes = [
            "Single Line Text Field",
            "Multi Line Text Field",
            "Date Field",
            "Dropdown Field",
            "Checkboxes Field",
            "Radio Buttons Field"
        ];

        // update the fields model on dragging
        $scope.dragStart = function(e, ui) {
            ui.item.data('start', ui.item.index());
        };
        $scope.dragEnd = function(e, ui) {
            var start = ui.item.data('start'),
                end = ui.item.index();
            $scope.fields.splice(end, 0,
                $scope.fields.splice(start, 1)[0]);
            FieldService
                .updateAllFields($scope.formId, $scope.fields)
                .then(
                    function (response) {

                    }
                );
        };
        var sortableEle = null;
        init();

        // Initialize the sortable element and the existing fields for the form
        function init() {
            sortableEle = $('#sortable').sortable({
                start: $scope.dragStart,
                update: $scope.dragEnd
            });
            getFields();
        }

        function getFields() {
            FieldService
                .getFieldsForForm($scope.formId)
                .then(
                    function (response) {
                        $scope.fields = response.data;
                    }
                );
        }
        /* Functions for modals
            EditField  - initializes the model for the modal and shows it.
            modalClose - destroys the model for the modal and hides it.
            updateField - updates the model and then calls modalClose.
         */
        function editField (field) {
            $scope.selectedField = field;
            if (field.placeholder){
                $scope.modalPlaceholder = field.placeholder;
            }
            $scope.modalLabel = field.label;
            switch (field.type){
                case "TEXT":
                    $scope.modalTitle = "Single Line Field";
                    break;
                case "TEXTAREA":
                    $scope.modalTitle = "Multiple lines Field";
                    break;
                case "DATE":
                    $scope.modalTitle = "Date Field";
                    break;
                case "OPTIONS":
                    $scope.modalTitle = "Dropdown Field";
                    break;
                case "EMAIL":
                    $scope.modalTitle = "Email Field";
                    break;
                case "CHECKBOXES":
                    $scope.modalTitle = "Checkbox Field";
                    break;
                case "RADIOS":
                    $scope.modalTitle = "Radio Button Field";
                    break;
            }
            $scope.modalOptions = "";
            for (x in field.options) {
                $scope.modalOptions = $scope.modalOptions + field.options[x].label + ":" + field.options[x].value + "\n";
            }
            $("#mymodal").modal('show');
        }

        function modalClose() {
            $scope.modalPlaceholder = null;
            $scope.modalLabel = null;
            $scope.modalOptions = null;
            $scope.selectedField = null;
            $("#mymodal").modal('hide');
        }

        function updateField() {
            var newOptions = [];
            var options = $scope.modalOptions.split("\n");
            for (option in options) {
                if (options[option].length >1){
                    newOptions.push({
                        label:options[option].split(":")[0],
                        value:options[option].split(":")[1]
                    });
                }
            }
            $scope.selectedField.label = $scope.modalLabel;
            if ($scope.selectedField.placeholder){
                $scope.selectedField.placeholder = $scope.modalPlaceholder;
            }
            if ($scope.selectedField.options) {
                $scope.selectedField.options = newOptions;
            }
            FieldService
                .updateField($scope.formId, $scope.selectedField._id, $scope.selectedField)
                .then(
                    function (response) {
                        getFields();
                        modalClose();
                    }
                );
        }

        // Creates a new field according to the type selected.
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

        // Removes the selected field.
        function removeField (field) {
            FieldService
                .deleteFieldFromForm($scope.formId, field._id)
                .then(
                    function (response) {
                        getFields();
                    }
                );
        }
    }
})();