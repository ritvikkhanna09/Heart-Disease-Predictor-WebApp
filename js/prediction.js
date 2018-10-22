$(document).ready(function(){
    result = localStorage.getItem("Result")
    if(result!=null && result==1){
        $("i").addClass("red");
        localStorage.removeItem("Result")
    } else if(result!=null && result==0){
        $("i").addClass("green");
        localStorage.removeItem("Result")
    } else {
        $(".table-wrapper").text("No predictions to show here")
    }
})