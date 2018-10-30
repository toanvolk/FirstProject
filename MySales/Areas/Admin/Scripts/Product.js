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
        SetEnTryInput();
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
        LoadList();
    });
    $("#btnSave").off('click').on('click', function () {
        SaveData();
        //Hanlde code

    });
    $('#btnImageChoose').change(function () {
        readURL(this, '#imgDisplay');
    });

});
//-----------View List-------------
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
        "bAutoWidth": false,
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
            {
                "data": "STT",
                "width": "35px"
            },
            {
                "data": "KeyWord"
            },
            {
                "data": "Name"
            },
            {
                "data": "Describe"
             },
            {
                "data": "Active"
            },
            {
                "data": "Id", "width": "35px",
                "render": function (data, type, row, meta) {
                    return "<a class='fa fa-edit' data-id='" + data + "' href='#'></a>";

                }
            }
        ]
        
    });
};
//---------------------------------
var objFormValue = {
    Id: $("#idProduct [name='Id']").val(),
};
var FillDataToForm = function (obj) {
    var arobj = Object.getOwnPropertyNames(obj);
    for (i = 0; i < arobj.length; i++) {
        $("#idProduct [name='" + arobj[i] + "']").val(obj[arobj[i]]);
    }
};
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
function SetEnTryInput() {
    $("#idProduct [name='Id']").val(0);
    $("#idProduct [name='Name']").val('');
    $("#idProduct [name='KeyWord']").val('');
    $("#idProduct [name='Describle']").val('');
}
//--------------Readonly-----------
function LoadList() {
    $.ajax({
        url: "/admin/product/LoadListView",
        datatype: "html",
        type: "GET",

        success: function (res) {
            $("#idProduct #modalList .modal-body").html(res);
            $("#idProduct #modalList").modal("show");

            //Set events
            BindDataTable();
            //event click table
            $("#bootstrap-data-table tbody").off('click').on('click','a', function () {
                //alert($(this).data("id"));
                LoadDataById($(this).data("id"));
                $("#idProduct #modalList").modal("hide");
            });
        },
        error: function (res) {
            console.log(res);
        }
    });
}
//---------------------------------
function SaveData() {
    var formData = new FormData();
    formData.append("strData", GenerateFormdataJsonString('idProduct'));
    formData.append("uploadFile", $('#btnImageChoose').get(0).files[0]);

    $.ajax(
        {
            url: "/admin/product/insertdata",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response === 1) {
                    //AttachFiles();
                    alert('Dữ liệu được thêm thành công!');
                    _action = false;
                    SetReadOnly();
                    SetNavigation();
                }
                else {
                    alert('Error!');
                }
            },
            error: function (res) {
                console.log(res);
            }

        });
}
//--------------Load detail--------
function LoadDataById(id) {
    $.ajax({
        url: "/admin/product/LoadDataById",
        data: { id: id },
        datatype: "json",
        type: "GET",

        success: function (res) {
            FillDataToForm(res);
        },
        error: function (res) {

        }
    });
}

