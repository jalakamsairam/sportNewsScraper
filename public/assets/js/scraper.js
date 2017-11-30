$(document).on("click", ".save", function (event) {
    var id = this.id;
    var that = this;
    console.log("i was here")
    $.ajax({
        url: "/" + id,
        method: "PUT",
    }).done(function (response) {
        console.log(that);
        $(that).html("isSaved");
        $(that).attr("class", "btn btn-warning save");
        $(that).prop("disabled", true);
    });
});
$(document).on("click",".classSaved",function(event){
    event.preventDefault();
    var id = this.id
    $("#noteModal").on("submit",function(event) {
        event.preventDefault();
        console.log(id);
        var that = this;
        var title = $("#title").val().trim();
        var note = $("#note").val().trim();
        $.ajax({
            url:"/saved/"+id ,
            method:"POST",
            data:{
                title:title, 
                body:note
            }
        }).done(function(response){
            alert("note has been saved")
            window.location.reload();
        });
    });
});

$(document).on("click",".classSaved",function(event){
    event.preventDefault();
    var id = this.id;
    $.ajax({
        url:"/saved/"+id,
        method:"GET"
    }).done(function(response){
        if(response){
            console.log(response);
            console.log(response.note.title);
            $("#title").text(response.note.title);
            $("#note").text(response.note.body);
            }
        else{
            console.log("you  dont have a note");
        }
    });
});

$(document).on("click",".delete",function(event){
    event.preventDefault();
    var id = this.id;
    console.log(id);
    $.ajax({
        url:"/saved/"+id,
        method:"PUT"
    }).done(function(response){
        window.location.reload();
    })
})// 