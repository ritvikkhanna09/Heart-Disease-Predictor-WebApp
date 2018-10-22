$(document).ready(function(){

    colorMap = {
        0: "red",
        1: "green"
    }

    colorMap2 = {
        0: "red",
        1: "latest-icon"
    }

    messageMap = {
        0: "danger",
        1: "safe"
    }

    $("#user_detail_name").text(localStorage.getItem("name"));


    $("#option").click(function(){
        window.location = "option.html";
    })

    $("#logout").click(function(){
        localStorage.clear();
        window.location = "title_page.html";
    })

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8082/info",
        data: JSON.stringify({}),
        headers:{
            "X-Hp-Token":localStorage.getItem("token")
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            localStorage.setItem("cache_data", JSON.stringify(data))

            $("#user_count").text("You have completed "+data.length+ " scans so far.");

            data.forEach((element, index) => {
                console.log(element.Username);

                if(index > 0){
                    $("#mainul").append(`
                    <li>
                        <center>
                        <div class="title">Scanned By</div>
                        <div class="head">${element.Username}</div>
                        <div class = "line2">${new Date(element.CreatedAt).toLocaleString()}</div>  
                        <i class="fa fa-heartbeat ${colorMap[element.Result]} fa-4x" aria-hidden="true"></i>
                        <div class="head">${messageMap[element.Result]}</div>
                        </center>
                    </li>`);
                } else {
                    $("#mainul").append(`
                    <li class="latest">
                        <center>
                        <div class="title">Latest Scan</div>
                        <div class="head">${element.Username}</div>
                        <div class = "line2">${new Date(element.CreatedAt).toLocaleString()}</div>  
                        <i class="fa fa-heartbeat ${colorMap2[element.Result]} fa-4x" aria-hidden="true"></i>
                        <div class="head">${messageMap[element.Result]}</div>
                        </center>
                    </li>`);
                }
            });
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
})