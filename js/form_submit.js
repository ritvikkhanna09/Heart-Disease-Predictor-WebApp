let submit_to_server = () =>{
    unindexed_array = $('#final_form').serializeArray()
    indexed_array = {}
    
    //merge serialized array
    $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = Number(n['value']);
    });

    //console.log(indexed_array);
    console.log(JSON.stringify(indexed_array, null, 4))

    indexed_array.name = localStorage.getItem("name");
    indexed_array.token = localStorage.getItem("token");
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8082/predict",
        data: JSON.stringify(indexed_array),
        headers:{
            "X-Hp-Token":localStorage.getItem("token")
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            localStorage.setItem("Result", data.Label)
            window.location = "home.html"
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

let login_form_submit = () =>{
    unindexed_array = $('#login_form').serializeArray()
    indexed_array = {}
    
    //merge serialized array
    $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = String(n['value']);
    });

    console.log(JSON.stringify(indexed_array,null,4))

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8082/login",
        data: JSON.stringify(indexed_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        credentials: 'same-origin',
        cache: false,
        success: function(data){
            console.log(data);
            if(data.Token && data.Name){
                localStorage.setItem("token", data.Token)
                localStorage.setItem("name", data.Name)
                window.location = "option.html"
            } else {
                alert(data.Message || "Login Failed")
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

let signup_form_submit = () =>{
    unindexed_array = $('#signup_form').serializeArray()
    indexed_array = {}
    
    //merge serialized array
    $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = String(n['value']);
    });

    console.log(JSON.stringify(indexed_array,null,4))

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8082/signup",
        data: JSON.stringify(indexed_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        credentials: 'same-origin',
        cache: false,
        success: function(data){
            console.log(data);
            alert(data.Message || "Signup Failed")
            if(data.Status == 200)
            window.location = "login.html"
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}