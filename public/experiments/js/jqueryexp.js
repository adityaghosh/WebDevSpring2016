(function(){
    $("#date").datepicker();
    var $popup= $("#popupdialog");
    $popup.dialog({autoOpen:false});
    $("#Pop").click(popDialog);
    $("#sort").sortable();
})();

function popDialog(){
    $("#popupdialog").dialog("open");
}