$(document).ready(function () {

    $("#loadersave").hide();//by default loader should be hidden 
    $("#addNewShipForm").submit(function (event) {

        /* stop form from submitting normally */
        event.preventDefault();

        console.log($("#shipname").val());

        /* get the action attribute from the <form action=""> element */
        var $form = $(this),
             myurl = $form.attr('action');
        console.log(myurl)

       
        var shipObject = {
            shipname: $('#shipname').val(),
            shipdescription: $('#shipdescription').val(),
            shipcondition: $('#shipcondition').val(),
            shipprice: $('#shipprice').val()
        }

        console.log(JSON.stringify(shipObject));

        $.ajax({
            type: "POST",
            url: myurl,
            data: JSON.stringify(shipObject),
            dataType: "json",
            contentType: "application/json",
            success: function (responseData, textStatus, jqXHR) {
                console.log("data saved")
                console.log(responseData)
              
                afterDataSavedShowAnimation();


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }


        });

    })

})

function afterDataSavedShowAnimation(){
    $("#loadersave").show(); //show the loader animation 
    $("#saveBtnId").prop('disabled', true);//diable the save btn
    $("a").off("click");//disable the anchor tag for navigation present in the header
    setTimeout(function(){
        //after 4 seconds this part of code executes
        //now redirect to listOfShips page
        window.location.replace("http://127.0.0.1:5500/view/ListOfShips.html");
     }, 4000);
  
}