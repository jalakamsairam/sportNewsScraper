$(".scrape-new").on("click",function(){
    $.get("/",function(req,res){
        console.log(response);
    })
})