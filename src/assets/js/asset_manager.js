$(document).ready( function () {
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    var deleteAssetUrl = baseUrl + "assetmanager/delete/";
/***************************
Prepare Asset Manager table
***************************/
    var table = $('#asset-manager').DataTable( {
        ajax: {
            url: baseUrl + "assetmanager/get_active",
            dataSrc: ''
        },
        columnDefs: [
            { "className": "asset_manager_id", "targets": 0 },
            { "className": "asset_manager_model", "targets": 1 },
            { "className": "asset_manager_manufacturer", "targets": 2 },
            { "className": "asset_manager_owner", "targets": 3 },
            { "className": "asset_manager_type", "targets": 4 },
            { "className": "asset_manager_asset_tag", "targets": 5 },
            { "className": "asset_manager_team", "targets": 6 },
            { "className": "asset_manager_rate", "targets": 7 },
            { "responsivePriority": -1, "targets": [8,9] },
            { "width": "10px", "targets": [8,9,10,11,12,13,14,15,16] },
            { "orderable": false, "targets": [8,9,10,11,12,13,14,15,16] },
            { "visible": false, "targets": [0,10,11,12,13,14,15,16] }
        ],
        columns: [
            { "data": "id" },
            // { "data": "name" },
            { "data": "model" },
            { "data": "manufacturer" },
            { "data": "owner" },
            { "data": "type" },
            { "data": "asset_tag" },
            // { "data": "purchase_date" },
            { "data": "team" },
            { "data": "rate" },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" id="edit-asset-button" data-toggle="modal" data-target="#edit-asset" data-type="POST" data-tableid="asset-manager" data-id = "' + row.id + '" data-url="AssetManager/edit/' + row.id + '"><img class="mini-icon" id="edit-asset-button" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon delete-asset-button" data-toggle="modal" data-target="#delete-asset" data-type="DELETE" data-tableid="asset-manager" data-id = "' + row.id + '"data-url="AssetManager/delete/' + row.id + '"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button>';
                }
            },
            //Child row fields.
            { "data": "serial_number" },
            { "data": "purchase_price" },
            { "data": "job_number" },
            { "data": "location" },
            { "data": "purchase_date" },
            { "data": "notes" },
            { "data": "last_modified_time" }
        ],
        "order": [[ 1, "asc" ]],
        scrollY:        800,
        paging:         true,
        fixedHeader:    true,
        info:           false,
        dom:
          "<'row'<'col-sm'>fB>" +
          "<'row'<'col-sm'tr>>",
        buttons: [
                    {
                        text: "Add Asset",
                        action: function() {
                            $('#add-asset').modal('show');
                        },
                        init: function (api, node, config) {
                            $(node).removeClass('btn-secondary');
                        },
                        className: 'btn-primary'
                    }
                ],
        language: {
            search: "",
            searchPlaceholder: "Search..."
        },
        createdRow: function (row, data, index) {
          $(row).addClass('parent-row'); //Add class used for dropdown
        }
    });


/********************
Expand Row Details
********************/
    $('#asset-manager').on('click', '.parent-row', function(e) {
      if(e.target.id == 'edit-asset-button') {
        console.log("edit click");
      }

      var model = table.cell(row,1).data();
      var manufacturer = table.cell(row,2).data();
      var owner = table.cell(row,3).data();
      var type = table.cell(row,4).data();
      var asset_tag = table.cell(row,5).data();
      var team = table.cell(row,6).data();
      var rate = table.cell(row,7).data();


      var row = table.row(this);
      if (row.child.isShown() ) {


        $(this).find('.table-icon').css("border-color", "transparent");
        console.log("isshown")
        if(e.target.id == 'edit-asset-button') {
            /**If edit was clicked, save changes**/
          //  var serial_number = table.cell(row,10).data();
            //var serial_number = table.cell(row,10).data();
          //  var serial_number = table.cell(row,10).data();

            $(this).find('.asset_manager_model').html(model);
            $(this).find('.asset_manager_manufacturer').html(manufacturer);
            $(this).find('.asset_manager_owner').html(owner);
            $(this).find('.asset_manager_type').html(type);
            $(this).find('.asset_manager_asset_tag').html(asset_tag);
            $(this).find('.asset_manager_team').html(team);
            $(this).find('.asset_manager_rate').html(rate);
          }
          else {
            return;
          }
      }
      else {
        //Highlight icons
        $(this).find('.table-icon').css("border", "2px solid red");
        console.log("isnotshown")

        /**If edit was clicked, open input fields and ensure details are expanded.**/
        $(this).find('.asset_manager_model').html('<input type="text" class="in-row-edit"></input>');
        $(this).find('.asset_manager_manufacturer').html('<input type="text" class="in-row-edit"></input>');
        $(this).find('.asset_manager_owner').html('<input type="text" class="in-row-edit"></input>');
        $(this).find('.asset_manager_type').html('<input type="text" class="in-row-edit"></input>');
        $(this).find('.asset_manager_asset_tag').html('<input type="text" class="in-row-edit"></input>');
        $(this).find('.asset_manager_team').html('<input type="text" class="in-row-edit"></input>');
        $(this).find('.asset_manager_rate').html('<input type="text" class="in-row-edit"></input>');
      //  row.child().find('.asset_manager_serial_number').html('<input type="text" class="in-row-edit"></input>');
        //table_row.child().find('.asset_manager_purchase_price').html('<input type="text"></input>');
      //  table_row.child().find('.asset_manager_job_number').html('<input type="text"></input>');
      //  table_row.child().find('.asset_manager_location').html('<input type="text"></input>');
        //table_row.child().find('.asset_manager_purchase_date').html('<input type="text"></input>');
        //table_row.child().find('.asset_manager_notes').html('<input type="text">' + notes + '</input>');

        $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
      }
      showDetails(this);
    });
//Function called, also used by Edit
    function showDetails(clickedRow) {
      var tr = $(clickedRow);
      var row = table.row(clickedRow);

      if( row.child.isShown() ) { //If This detail row is already open - close it

        //Remove light-grey focus styled when detail row is closed
        $(tr).css({"background-color":"#303030", "box-shadow":"none"});
        //  $(tr).children().css();
        row.child().find('div').css({"background-color":"#303030", "box-shadow":"none"});
        //Close detail row
        $('div.slider', row.child()).slideUp( 300,function () {
            row.child.hide();
            tr.removeClass('shown');
        } );

      }
      else { //Open the details row


        //**Add check to prevent re-createing child row if it exists.

        //Get child row structure
        row.child( formatRow(row.data()), 'slider' ).show();
        //Fill child row fields
        var serial_number = table.cell(row,10).data();
        var purchase_price = table.cell(row,11).data();
        var job_number = table.cell(row,12).data();
        var location = table.cell(row,13).data();
        var purchase_date = table.cell(row,14).data();
        var notes = table.cell(row,15).data();
        var last_modified_time = table.cell(row,16).data();
        row.child().find("p.asset_manager_serial_number").html(serial_number);
        row.child().find("p.asset_manager_purchase_price").html(purchase_price);
        row.child().find("p.asset_manager_job_number").html(job_number);
        row.child().find("p.asset_manager_location").html(location);
        row.child().find("p.asset_manager_purchase_date").html(purchase_date);
        row.child().find("p.asset_manager_notes").html(notes);
        row.child().find("p.asset_manager_last_modified_time").html(last_modified_time);
        //Slide detail row down
        tr.addClass('shown');
        $('div.slider', row.child()).slideDown(300);
        //Add light-grey focus styling when detail row is opening
        $('div.slider').css({"background-color":"#3B3B3B", "box-shadow":"inset 0px -1px 2px black"});
        $(tr).css("background-color","#3B3B3B");
        $(tr).css("box-shadow","inset 0px 2px 2px black")
      }
    }

/**************
Edit Asset
**************/
    // $('#asset-manager').on('click', '#edit-asset-button', function () {
    //     var id = $(this).data('id');
    //     var parent_row = $(this).closest('tr.parent-row');
    //     var row = parent_row[0]; //Convert jquery object to full HTML object
    //     var table_row = table.row(parent_row);
    //     var notes = table.cell(row,15).data();
    //
    //
    // });

/**************
Delete Asset
**************/
    $('#asset-manager').on("click", "#delete-asset-button", function () {
        var id = $(this).data('id');
        $("#modal-confirm-delete-asset").data('id', id);

    });

    $("#modal-confirm-delete-asset").on("click", function(e) {
        var id = $("#modal-confirm-delete-asset").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteAssetUrl + id,
            success: function(result) {
                $("#asset-manager").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
});


/**************************** Child Row Structure *****************************/
function formatRow() { //Put child row data here.
  return '<div class="slider">' +
  '<table class="edit-table row">' +
  '<tr class="edit-row">' +
  '<td class="edit-col">' +
      '<div>  <label>Serial Number</label> </div>' +
      '<div>  <p class="asset_manager_serial_number">*error* serial number not showing correctly</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Purchase Price</label> </div>' +
      '<div>  <p class="asset_manager_purchase_price">*error* purchase price not showing correctly</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Job Number</label> </div>' +
      '<div>  <p class="asset_manager_job_number">*error* job number not showing correctly</p></div>' +
    '</td>' +
  '<td class="edit-col" rowspan="2">' +
      '<div>  <label>Notes</label> </div>' +
      '<div>  <p class="asset_manager_notes">NOTES! Still need DB field</p></div>' +
    '</td>' +
  '</tr><tr class="edit-row">' +
  '<td class="edit-col">' +
      '<div>  <label>Location</label> </div>'+
      '<div>  <p class="asset_manager_location">*error* location not showing correctly</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Purchase Date</label> </div>' +
      '<div>  <p class="asset_manager_purchase_date">*error* purchase date not showing correctly</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Last Updated</label> </div>' +
      '<div>  <p class="asset_manager_last_modified_time">00:00:00</p></div>' +
    '</td>' +
  '</tr></table>' +
  '</div>';
}

$(window).resize(function () {
  $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
});









//
// '<div class="slider">' +
// '<table class="edit-table row">' +
// '<tr class="edit-row">' +
// '<td class="edit-col">' +
//     '<div>  <label>Serial Number</label> </div>' +
//     '<div>  <input id="asset-manager-edit-serial-number" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Purchase Price</label> </div>' +
//     '<div>  <input id="asset-manager-edit-purchase-price" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Job Number</label> </div>' +
//     '<div>  <input id="asset-manager-edit-job-number" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col" rowspan="2">' +
//     '<div>  <label>Notes</label> </div>' +
//     '<div>  <textarea rows="6" class="asset-manager-edit-notes asset-manager-edit-field"></textarea> </div>' +
//   '</td>' +
// '</tr><tr class="edit-row">' +
// '<td class="edit-col">' +
//     '<div>  <label>Location</label> </div>'+
//     '<div>  <input id="asset-manager-edit-location" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Purchase Date</label> </div>' +
//     '<div>  <input id="asset-manager-edit-purchase-date" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Last Updated</label> </div>' +
//     '<div>  <input id="asset-manager-edit-last-updated" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '</tr></table>' +
// '</div>';


// $(tr).find('.asset_manager_model').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_manufacturer').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_owner').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_type').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_asset_tag').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_team').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_rate').html('<input class="in-row-edit form-control"></input>');


// $(tr).find('.asset_manager_model').html('');
// $(tr).find('.asset_manager_manufacturer').html('');
// $(tr).find('.asset_manager_owner').html('');
// $(tr).find('.asset_manager_type').html('');
// $(tr).find('.asset_manager_asset_tag').html('');
// $(tr).find('.asset_manager_team').html('');
// $(tr).find('.asset_manager_rate').html('');
