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
        DeleteData();
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
function SetReadOnly() {
    var focus = !_action;
    $("#idProduct [name='Name']").prop("readonly", focus);
    $("#idProduct [name='KeyWord']").prop("readonly", focus);
    $("#idProduct [name='Describle']").prop("readonly", focus);
}
function SetNavigation() {
    $("#idProduct #btnAdd").prop("disabled", _action);
    $("#idProduct #btnList").prop("disabled", _action);
    $("#idProduct #txtFind").prop("disabled", _action);

    $("#idProduct #btnImageChoose").prop("disabled", !_action);
    $("#idProduct #btnCancel").prop("disabled", !_action);
    $("#idProduct #btnSave").prop("disabled", !_action);

    var objDataForm = GetDataFromForm('#idProduct');
    $("#idProduct #btnDelete").prop("disabled", objDataForm.Id == 0);
    $("#idProduct #btnEdit").prop("disabled", objDataForm.Id == 0);

}
function SetEnTryInput() {
    LoadDataById(0);
}
//--------------Readonly-----------
function LoadList() {
    $("#idProduct #modalList").modal("show");

    //Set events
    BindDataTable();
    //event click table
    $("#bootstrap-data-table tbody").off('click').on('click', 'a', function () {
        //alert($(this).data("id"));
        LoadDataById($(this).data("id"));
        $("#idProduct #modalList").modal("hide");
    });
}
//--------------Handel data--------
function SaveData() {
    var formData = new FormData();
    var objDataForm = GetDataFromForm('#idProduct');
    formData.append("strData", JSON.stringify(objDataForm));
    formData.append("uploadFile", $('#btnImageChoose').get(0).files[0]);

    //-----------Url--------------
    var url = "";
    if (objDataForm.Id > 0) {
        url = "/admin/product/updatedata";
    }
    else
        url = "/admin/product/insertdata";
    //----------Caption alert-------------
    var caption = "";
    if (objDataForm.Id > 0) {
        caption = "Cập nhật thành công!";
    }
    else
        caption = "Thêm mới thành công!";
    $.ajax(
        {
            url: url,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response === 1) {
                    //AttachFiles();
                    alert(caption);
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
function DeleteData() {
    var objDataForm = GetDataFromForm('#idProduct');
    if (objDataForm.Id == 0) return 0;
    if(confirm("Chắc chắn xóa dữ liệu này"))
        $.ajax({
            url: "/admin/product/deletedata",
            data: {
                id: objDataForm.Id
            },
            datatype: "Json",
            type: "POST",

            success: function (res) {
                if (res == 1) { alert("Xóa dữ liệu thành công!");  LoadDataById(0)}
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
            FillDataToForm(res, "#idProduct");
            $("#idProduct #btnDelete").prop("disabled", res.Id == 0);
            $("#idProduct #btnEdit").prop("disabled", res.Id == 0);

        },
        error: function (res) {

        }
    });
}

