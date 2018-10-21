let submit_to_server = () =>{
    unindexed_array = $('#final_form').serializeArray()
    indexed_array = {}
    
    //merge serialized array
    $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = Number(n['value']);
    });

    //console.log(indexed_array);
    console.log(JSON.stringify(indexed_array, null, 4))

    indexed_array.token = localStorage.getItem("token");

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8082/echo",
        data: JSON.stringify(indexed_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){console.log(data);},
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

let login_form_submit = () =>{
    alert("submit")
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
            localStorage.setItem("token", data.Token)
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}