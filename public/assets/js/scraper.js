$(document).on("click", ".save", function (event) {
    var id = this.id;
    var that = this;
    console.log("i was here")
    $.ajax({
        url: "/" + id,
        method: "PUT",
    }).done(function (response) {
        console.log(that);
        debugger;
        $(that).html("isSaved");
        $(that).attr("class", "btn btn-warning save");
        $(that).prop("disabled", true);
    });
});

$(document).on("click",".saveNote",function(event) {
    event.preventDefault();
    var id  = this.id;
    var that = this;
    var title = $("#title").val().trim();
    var note = $("#note").val().trim();
    $.ajax({
        url:"/saved" +id,
        method:"POST",
        data:{
            title:title, 
            note:note
        }
    }).done(function(response){
        console.log("article has been saved")
    })
})