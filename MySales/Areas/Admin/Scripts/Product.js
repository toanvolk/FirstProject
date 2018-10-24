$(document).ready(function () {
    $('#dataTables-example').DataTable({
        responsive: true
    });
});
var oTable;
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