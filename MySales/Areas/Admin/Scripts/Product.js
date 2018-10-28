$(document).ready(function () {
    //$('#dataTables-example').DataTable({
    //    responsive: true
    //});
    SetReadOnly(true);
    SetNavigation();
    
    //Set events
    $("#btnAdd").off('click').on('click', function () {
        _action = true;
        SetReadOnly();
        SetNavigation();
        //Hanlde code

    });
    $("#btnEdit").off('click').on('click', function () {
        _action = true;
        SetReadOnly();
        SetNavigation();
        //Hanlde code

    });
    $("#btnDelete").off('click').on('click', function () {

    });
    $("#btnCancel").off('click').on('click', function () {
        _action = false;
        SetReadOnly();
        SetNavigation();
        //Hanlde code

    });
    $("#btnList").off('click').on('click', function () {
    
    });
    $("#btnSave").off('click').on('click', function () {
        //Hanlde code


        _action = false;
        SetReadOnly();
        SetNavigation();
    });
    $('#btnImageChoose').change(function () {
        readURL(this, '#imgDisplay');
    });
    
});
//---------------------------------
var oTable;
var _action = false;
//---------------------------------
var BindDataTable = function InitTable() {
    if ($.fn.DataTable.isDataTable("#bootstrap-data-table")) {
        //oTable.draw();
        oTable.destroy();
    }
    oTable = $("#bootstrap-data-table").DataTable({
        lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
        "bServerSide": true,
        "sAjaxSource": "/admin/Product/LoadData",
        "fnServerData": function (sSource, aoData, fnCallback) {
            $.ajax({
                type: "Get",
                data: aoData,
                url: sSource,
                success: fnCallback
            });
        },
        columns: [
            { "data": "STT" },
            { "data": "KeyWord" },
            { "data": "Name" },
            { "data": "Describe" },
            { "data": "Active" }
        ]
    });
};
//---------------------------------
var objFormValue = {
    Id: $("#idProduct [name='Id']").val(),
}
//---------------------------------
function SetReadOnly() {    
    var focus = !_action;
    $("#idProduct [name='Name']").prop("readonly", focus);
    $("#idProduct [name='KeyWord']").prop("readonly", focus);
    $("#idProduct [name='Describle']").prop("readonly", focus);
}
function SetNavigation() {
    $("#idProduct #btnAdd").prop("disabled", _action);
    $("#idProduct #btnEdit").prop("disabled", _action);
    $("#idProduct #btnDelete").prop("disabled", _action);
    $("#idProduct #btnList").prop("disabled", _action);
    $("#idProduct #txtFind").prop("disabled", _action);

    $("#idProduct #btnImageChoose").prop("disabled", !_action);
    $("#idProduct #btnCancel").prop("disabled", !_action);
    $("#idProduct #btnSave").prop("disabled", !_action);
}
//---------------------------------
function InsertData(fromData);
{

}

