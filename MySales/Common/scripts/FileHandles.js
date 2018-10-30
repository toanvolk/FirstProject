//format datetime
function formatStringForHours(strDate) {
    if (strDate == null || strDate == '') {
        return '';
    }
    else {
        var today = new Date(parseInt(strDate.substr(6)));
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var hh = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
        var yyyy = today.getFullYear();
        mm = padLeftString(mm, 2, '0');
        dd = padLeftString(dd, 2, '0');
        hh = padLeftString(hh, 2, '0');
        min = padLeftString(min, 2, '0');
        sec = padLeftString(sec, 2, '0');
        var today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + sec;
        return today;
    }
}
function formatStringForDate(strDate) {
    if (strDate == null || strDate == '') {
        return '';
    }
    else {
        var today = new Date(parseInt(strDate.substr(6)));
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is zero!   
        var yyyy = today.getFullYear();
        mm = padLeftString(mm, 2, '0');
        dd = padLeftString(dd, 2, '0');
        var today = dd + '/' + mm + '/' + yyyy;
        return today;
    }
}
function padLeftString(strData, length, changeLitter) {
    return strData.toString().length < length ? changeLitter + strData : strData;
}
//-------------------------Extension method String
String.prototype.toStringFromJsonToHour = function () {
    if (this == null) return "";
    var today = new Date(parseInt(this.substr(6)));
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var hh = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var yyyy = today.getFullYear();
    mm = padLeftString(mm, 2, '0');
    dd = padLeftString(dd, 2, '0');
    hh = padLeftString(hh, 2, '0');
    min = padLeftString(min, 2, '0');
    sec = padLeftString(sec, 2, '0');
    var today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + sec;
    return today;
}
String.prototype.toStringFromJsonToDate = function () {
    if (this == null) return "";
    var today = new Date(parseInt(this.substr(6)));
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!   
    var yyyy = today.getFullYear();
    mm = padLeftString(mm, 2, '0');
    dd = padLeftString(dd, 2, '0');
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}
String.prototype.JsonToFormatDate = function () {
    if (this == null) return "";
    var today = new Date(parseInt(this.substr(6)));
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!   
    var yyyy = today.getFullYear();
    mm = padLeftString(mm, 2, '0');
    dd = padLeftString(dd, 2, '0');
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}
//-------------------------Extension method Date
Date.prototype.getStringYMD = function () {
    var day = ("0" + this.getDate()).slice(-2);
    var month = ("0" + (this.getMonth() + 1)).slice(-2);
    return this.getFullYear() + "-" + (month) + "-" + (day);
}
//-------------------------Pad string--------------------
function padLeftString(strData, length, changeLitter) {
    return strData.toString().length < length ? changeLitter + strData : strData;
}
function padRightString(strData, length, changeLitter) {
    var strResult = "";
    if (strData.toString().length) {
        strResult = strData;
        for (var i = 0; i < length; i++) {
            strResult += changeLitter
        }
    }
    else
        strResult = strData;
    return strResult.concat("          ");
}
//data table processing
function getSelectorEndClass(selector) {
    var ar = selector.attr('class').split(' ');
    if (ar.length > 0) {
        return ar[ar.length - 1];
    }
    return '';
}
//-----------------------delay

var delay = (function () {
    var sys_cus_timerDelay = 0;
    return function (callback, ms) {
        clearTimeout(sys_cus_timerDelay);
        sys_cus_timerDelay = setTimeout(callback, ms);
    };
})();
//----------------------High Light For List---------------
function HighLightForList(selector, stringReplace) {
    var simpletext = new RegExp("(" + stringReplace + ")", "gi");
    selector.each(function (index) {
        $(this).html($(this).text().replace(simpletext, "<span style='font-weight:600 !important;color: red'>$1</span>"));
    });
}

//---------------------Fill form by json string
function FillFormByJson(jsonString, formWrapperID) {
    for (var key in jsonString) {
        var thisElement = $('#' + formWrapperID + ' [name="' + key + '"]');
        if (thisElement.prop('type') == 'checkbox') {
            thisElement.prop('checked', jsonString[key]);
        }
        else if (thisElement.prop('type') == 'date' && jsonString[key] != null) {
            thisElement.val(jsonString[key].JsonToFormatDate());
        }
        else {
            thisElement.val(jsonString[key]);
        }
    }
}
//---------------------Init Serialize Form to JSON
var serializeFormJSON = function (form) {
    var o = {};
    var a = form.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
var GetDataFromForm = function(selector) {
    $(selector).wrap('<form></form>');
    var tempForm = $(selector).parent();
    var formData = serializeFormJSON(tempForm);
    $(selector).unwrap();
    return formData;
}
var FillDataToForm = function (obj, selector) {
    var arobj = Object.getOwnPropertyNames(obj);
    for (i = 0; i < arobj.length; i++) {
        $(selector + " [name='" + arobj[i] + "']").val(obj[arobj[i]]);
    }
};
//---------------------Disable form
function DisableFormElements(formWrapper) {
    $('#' + formWrapper + ' input').prop('disabled', true);
    $('#' + formWrapper + ' select').prop('disabled', true);
    $('#' + formWrapper + ' textarea').prop('disabled', true);
}
//---------------------Enable form
function EnableFormElements(formWrapper) {
    $('#' + formWrapper + ' input').prop('disabled', false);
    $('#' + formWrapper + ' select').prop('disabled', false);
    $('#' + formWrapper + ' textarea').prop('disabled', false);
}
//---------------------Show modal
function ShowModal(modalID) {
    $("#" + modalID).modal({ backdrop: 'static', keyboard: true });
}
//---------------------Reset modal
function ResetModal(modalID) {
    $('#' + modalID).wrap('<form></form>');
    var tempForm = $('#' + modalID).parent();
    tempForm.trigger('reset');
    $('#' + modalID).unwrap();
}

function ValidateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var isValid = re.test(String(email).toLowerCase());
    return isValid;
}
//----------------------------------
function readURL(input, selector) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(selector).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}