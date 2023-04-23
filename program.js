display();
function display(){
    $.get("https://64441b93466f7c2b4b61f2d4.mockapi.io/pieces",function(roster){
    $("#m-l-bottom").empty();$("#m-r-bottom").empty();
    for(let i=0;i<roster.length;i++){
        if(roster[i].status===true){
            $("#m-l-bottom").append(`<br><div class="row">
            <div class="apiece1">`+roster[i].name+`</div>
            <div class="apiece2">`+roster[i].movement+`</div>
            <button class="apiece3" onclick="pdemote(`+roster[i].id+`)">Demote</button></div>`)
        }else{
            $("#m-r-bottom").append(`<br><div class="row">
            <button class="upiece1" onclick="ppromote(`+roster[i].id+`)">Promote</button>
            <div class="upiece2" id="n`+roster[i].id+`">`+roster[i].name+`</div>
            <div class="upiece3" id="m`+roster[i].id+`">`+roster[i].movement+`</div>
            <button class="upiece4" onclick="pedit(`+roster[i].id+`)">Edit</button>
            <button class="upiece5" onclick="pdelete(`+roster[i].id+`)">Delete</button></div>`)
        }
    }
})
}
$( "#pinput" ).on( "click", function(e) {
    e.preventDefault()
    $.post("https://64441b93466f7c2b4b61f2d4.mockapi.io/pieces",
    {name: $("#pname").val(),movement: $("#pmove").val(),status: false},
    function(){$("#pform").trigger("reset"),display();});
});
function pdelete(id){
    $.ajax({
        url: `https://64441b93466f7c2b4b61f2d4.mockapi.io/pieces/`+id,
        type: "DELETE",
        success: function(){display();}
    })
};
function pedit(id,name,movement){
    let pnameu = prompt("Name",$("#n"+id).text());
    let pmoveu = prompt("Movement",$("#m"+id).text());
    $.ajax({
        url: `https://64441b93466f7c2b4b61f2d4.mockapi.io/pieces/`+id,
        type: "PUT",
        contentType: `application/json`,
        data: JSON.stringify({name: pnameu,movement: pmoveu}),
        success: function(){display();}
    })
}
function pdemote(id){
    $.ajax({
        url: `https://64441b93466f7c2b4b61f2d4.mockapi.io/pieces/`+id,
        type: "PUT",
        contentType: `application/json`,
        data: JSON.stringify({status: false}),
        success: function(){display();}
    })
}
function ppromote(id){
    $.ajax({
        url: `https://64441b93466f7c2b4b61f2d4.mockapi.io/pieces/`+id,
        type: "PUT",
        contentType: `application/json`,
        data: JSON.stringify({status: true}),
        success: function(){display();}
    })
}