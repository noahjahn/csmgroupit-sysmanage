var loadDataTable = $("#asset-types-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addAssetTypeUrl = baseUrl + "AssetTypes/add";
    var validateAddNameUrl = baseUrl + "AssetTypes/validate_add_name";
    var editAssetTypeUrl = baseUrl + "AssetTypes/edit";
    var validateEditNameUrl = baseUrl + "AssetTypes/validate_edit_name";
    var deleteAssetTypeUrl = baseUrl + "AssetTypes/delete/";
    var getActiveAssetTypesUrl = baseUrl + "AssetTypes/get_active";
    /* *** **************** *** */

    /* *** Handle add asset type *** */
    addNameField = $("#add-asset-type-form #add-asset-type-name");
    addNameError = $("#add-asset-type-form #add-asset-type-name-error");
    addNameField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateAddNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addNameError.empty();
                    addNameField.removeClass('is-invalid');
                    addNameField.addClass('is-valid');
                } else {
                    addNameField.removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == addNameError.val()) {
                            addNameError.empty(); // empty error messages, if there were any
                            addNameError.append(result["name"]); // display the error messages
                        }
                        if (! addNameField.hasClass('is-invalid')) {
                            addNameField.addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#add-asset-type-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing
        $.ajax({
            type: 'POST',
            url: addAssetTypeUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-asset-type").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#asset_types").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
                } else {
                    if (! result["name"] == "") {
                        if (! result["name"] == addNameError.val()) {
                            addNameError.empty(); // empty error messages, if there were any
                            addNameError.append(result["name"]); // display the error messages
                        }
                        if (! addNameField.hasClass('is-invalid')) {
                            addNameField.addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#add-asset-type').on('hidden.bs.modal', function () {
        addNameError.empty(); // empty the errors when hiding the modal
        addNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        addNameField.removeClass('is-invalid');
        addNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit asset type *** */
    var editNameField = $("#edit-asset-type-form #edit-asset-type-name");
    var editNameError = $("#edit-asset-type-form #edit-asset-type-name-error");

    $(document).on("click", ".edit-asset-type-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');

        editNameField.val(name); // set values for what is currently set
        $("#edit-asset-type-form #modal-submit-edit-asset-type").data('id', id);
    });

    editNameField.blur(function() {
        var id = $("#modal-submit-edit-asset-type").data('id');
        $.ajax({
            type: 'POST',
            url: validateEditNameUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editNameError.empty();
                    editNameField.removeClass('is-invalid');
                    editNameField.addClass('is-valid');
                } else {
                    editNameField.removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == editNameError.val()) {
                            editNameError.empty(); // empty error messages, if there were any
                            editNameError.append(result["name"]); // display the error messages
                        }
                        if (! editNameField.hasClass('is-invalid')) {
                            editNameField.addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#edit-asset-type-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var id = $("#modal-submit-edit-asset-type").data('id');

        $.ajax({
            type: 'POST',
            url: editAssetTypeUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    $("#edit-asset-type").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#asset_types").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
                } else {
                    if (! result["name"] == "") {
                        if (! result["name"] == editNameError.val()) {
                            editNameError.empty(); // empty error messages, if there were any
                            editNameError.append(result["name"]); // display the error messages
                        }
                        if (! editNameField.hasClass('is-invalid')) {
                            editNameField.addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#edit-asset-type').on('hidden.bs.modal', function () {
        editNameError.empty(); // empty the errors when hiding the modal
        editNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        editNameField.removeClass('is-invalid');
        editNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete asset type *** */
    $(document).on("click", ".delete-asset-type-button", function () {
        var id = $(this).data('id');
        $("#modal-submit-delete-asset-type").data('id', id);

    });

    $("#modal-submit-delete-asset-type").on("click", function(e) {
        var id = $("#modal-submit-delete-asset-type").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteAssetTypeUrl + id,
            success: function(result) {
                $("#asset_types").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
    /* *** ********************* *** */

    /* Prepare Asset Types table */
    if (loadDataTable) {
        $('#asset_types').DataTable( {
            ajax: {
                url: getActiveAssetTypesUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon edit-asset-type-button" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-target="#edit-asset-type"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon delete-asset-type-button" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-asset-type"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            responsive:     true,
            scrollY:        212,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { responsivePriority: -1, targets: [2,3] },
                { width: "20px", targets: [2,3] },
                { orderable: false, targets: [2,3] },
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md-3'<'table-title-asset_types'>><'col-md-9 pr-0 pt-0 pb-0'Bf>>" +
    			"<'row'<'col-md'tr>>",
            buttons: [
                {
                    text: "Add Asset Type",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).attr("data-toggle", "modal");
                        $(node).attr("data-target", "#add-asset-type");
                    },
                    className: 'btn-primary'
                }
            ],
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-asset_types").html('<h5 class="pt-3">Asset Types</h5>');
        $("#asset_types_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
