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