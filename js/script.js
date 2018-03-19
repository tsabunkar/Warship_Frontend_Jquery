var editSelectedRowDialogOpen; //I need to define the function as var bcoz If I  have directly declare the fun
//We get Scoping problem if we dont define the function here



$(document).ready(function () { //invoke this fun only when DOM/document ready 

  
    $("#deleteloader").hide();//initally the delete loader should be hidden

    $.noConflict(); //use this line of code to avoid the conflict between jquery and bootsrtap version of the cdn

    // By default edit and delete button should be diabled
    $('#editbuttonId').prop('disabled', true);
    $('#deletebuttonId').prop('disabled', true);

    //This ajax call is to backend spring boot rest service, In order to fetch the reocrd from MySQL DB
    $.ajax({
        url: 'http://localhost:8082/warship/webapi/shiplist/',
        type: 'GET',
        // contentType: "application/json; charset=utf-8",
        dataType: "json", //return data type of ajax call
        success: function (data) {

            putAllTheValuesInTableDynamically(data);

            //we cannot print JS object into HTML page bcoz we HTML page doestn't understand JS object
            // soo we need to print JS object after converting it (JS object) to txt or String
        },
        error: function (e) {
            console.log('ErrorOccured while fetching the reocrds: ' + e);
        }
    }).done(function (data) {

    });
})

function putAllTheValuesInTableDynamically(arr) {
    // I need to dynamically generate the rows for the table


    //Traditional way of  dynamically generate the rows for the table   
    /* for(i=0;i<arr.length;i++) {
              var markup = '<tr><td>'+arr[i].shipid+'</td><td>'+arr[i].shipname+'</td><td>'+arr[i].shipdescription+'</td><td>'+arr[i].shipcondition+'</td><td>'+arr[i].shipprice+'</td></tr>'
              console.log(markup)
              $(".tbody-attach").append(markup)
          }
          //Another efficient way of dynamically creating the model is written below
          */


    var markup = '';
    var tableBodyTag = '<tbody id="tbodyId">';

    $.each(arr, function (i, ele) {

        markup = '<tr shipid="' + ele.shipid + '"  shipname="' + ele.shipname + '"   shipdescription="' + ele.shipdescription + '"  shipcondition="' + ele.shipcondition + '" shipprice="' + ele.shipprice + '"   >   <td>' + ele.shipid + '</td><td>' + ele.shipname + '</td><td>' + ele.shipdescription + '</td><td>' + ele.shipcondition + '</td><td>' + ele.shipprice + '</td>'
        markup = markup + '</tr>';
        tableBodyTag = tableBodyTag + markup;
        // console.log(tableBodyTag)
    })

    $("#listOfShipsTable").append(tableBodyTag + "</tbody>")


}


var selectedShipId;
var selectedShipName;
var selectedShipDescription;
var selectedShipCondition;
var selectedShipPrice;
var shipObject = { shipid: 0, shipname: "", shipdescription: "", shipcondition: "", shipprice: 0.0 };
$(document).on("click", "#listOfShipsTable tbody tr", function (event) {
    //Identifiying the click of the row inside the table 

    /*     console.log(event)
        console.log($(this)[0]) */

    if (!event.ctrlKey) {
        var selected = $(this).siblings().hasClass('selection-active');
        if (selected) {
            $(this).siblings().removeClass("selection-active");
            $(this).addClass("selection-active");
        } else {

            $(this).addClass("selection-active");
        }
    }
    var status = $('#listOfShipsTable').find('.selection-active').attr('shipid');//find the shipId, by checking 
    //which row is higlighted (ie if row is clicked then only it will be higlighted)

    +status; //convert anything to number
    if (!isNaN(status)) {
        $('#editbuttonId').prop('disabled', false); //When particular valid row is clicked then only, edit and delete button should be enabled
        $('#deletebuttonId').prop('disabled', false);
    } else {
        $('#editbuttonId').prop('disabled', true);
        $('#deletebuttonId').prop('disabled', true);
    }
    /* selectedShipId = $('#listOfShipsTable').find('.selection-active').attr('shipid');
    selectedShipName = $('#listOfShipsTable').find('.selection-active').attr('shipname');
    selectedShipDescription = $('#listOfShipsTable').find('.selection-active').attr('shipdescription');
    selectedShipCondition = $('#listOfShipsTable').find('.selection-active').attr('shipcondition');
    selectedShipPrice = $('#listOfShipsTable').find('.selection-active').attr('shipprice');
*/
    shipObject.shipid = $('#listOfShipsTable').find('.selection-active').attr('shipid');
    shipObject.shipname = $('#listOfShipsTable').find('.selection-active').attr('shipname');
    shipObject.shipdescription = $('#listOfShipsTable').find('.selection-active').attr('shipdescription');
    shipObject.shipcondition = $('#listOfShipsTable').find('.selection-active').attr('shipcondition');
    shipObject.shipprice = $('#listOfShipsTable').find('.selection-active').attr('shipprice');



})




editSelectedRowDialogOpen = function () {
    /*   console.log(selectedShipId);
      console.log(selectedShipName);
      console.log(selectedShipDescription); */

    //  console.log(JSON.stringify(shipObject))
    //  console.log(JSON.stringify(shipObject.shipid))

    if (typeof shipObject.shipid != 'undefined' && shipObject.shipid != 'undefined') { //We can check all the condtion
        //I need to open Model and set the values of shipname,shipdec,shipcond,shipprice as text-box soo that user
        //can edit inside the modal/dialog box

        //  $("#myModal").dialog("open");  This is the code for Jquery UI

        /*  $("#shipIdEdited").val(selectedShipId);
         $("#shipNameEdited").val(selectedShipName);
         $("#descriptionEdited").val(selectedShipDescription);
         $("#condtionEdited").val(selectedShipCondition);
         $("#priceEdited").val(selectedShipPrice); */

        $("#shipIdEdited").val(shipObject.shipid);
        $("#shipNameEdited").val(shipObject.shipname);
        $("#descriptionEdited").val(shipObject.shipdescription);
        $("#condtionEdited").val(shipObject.shipcondition);
        $("#priceEdited").val(shipObject.shipprice);



    }
}

//This the code to handle the Jquery UI (ie jquery modal), which is very diffcult soo I optoed for 
// twitter bootstrap for UI , which doesn't require below code 

/*  by default dialog should be closed , It shouldn't be open
 $("#myModal").dialog({
     autoOpen: false, modal: true, show: "blind", hide: "blind"
 }); */




//shows yellow color background  when cursor is hover upon the rows on the table
$('#listOfShipsTable tr').hover(function () {
    $(this).addClass('hover');
}, function () {
    $(this).removeClass('hover');
});


function saveShipRecordEdited() {
    console.log("saveShipRecordEdited function is invoked ");
    console.log($("#shipIdEdited").val()); //Let em get the value editied from the text box field inside the modal
    console.log(parseInt($("#shipIdEdited").val()))
    console.log(parseFloat($("#priceEdited").val()));
    var editiedShipObject = {
        shipid: parseInt($("#shipIdEdited").val()),
        shipname: $("#shipNameEdited").val(),
        shipdescription: $("#descriptionEdited").val(),
        shipcondition: $("#condtionEdited").val(),
        shipprice: parseFloat($("#priceEdited").val()),

    };

    console.log(JSON.stringify(editiedShipObject));
    $.ajax({
        url: 'http://localhost:8082/warship/webapi/shiplist/' + editiedShipObject.shipid,
        type: 'PUT',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(editiedShipObject),
        success: function (data) {
            console.log("Sucesss")
            console.log(data)
            location.reload(); //reload the page , inorder to reflicate the change of record in the frontend
        },
        error: function (e) {
            console.log("error")
            console.log(e)

        }
    });

}

function deleteSelectedRow() {
   let shipId =  $('#listOfShipsTable').find('.selection-active').attr('shipid');
   let shipIdToBeDeleted =  +shipId;
/*    console.log(typeof(shipIdToBeDeleted))
   console.log(typeof(shipIdToBeDeleted.toString()));
   console.log(shipIdToBeDeleted) */
    $.ajax({
        url: 'http://localhost:8082/warship/webapi/shiplist/' + shipIdToBeDeleted.toString(),
        type: 'DELETE', //return data type
        //  contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data) {
            $("a").off("click");//disable the anchor tag for navigation present in the header
          $("#crossButtonInConfirmationDelete").prop('disabled', true); //diable the cross btn
           $("#deleteConfirmationSubmit").prop('disabled', true);//disable the submit btn
            $("#deleteConfirmationCancel").prop('disabled', true);//disable the cancel btn
           $("#deleteloader").show();//show the loader animation
          

            console.log(data.toString()+" Record is deleted ")
            setTimeout(function(){
                //after 4 seconds this part of code executes
                location.reload(); //reload the page , inorder to reflicate the change of record in the frontend
             }, 4000);
          

            
        },
        error: function (e) {
            console.log("error")
            console.log(e)

        }
    });
}





