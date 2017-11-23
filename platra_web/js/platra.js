$( document ).ready(function() {
    $('[data-toggle="datepicker"]').datepicker();

    $("#search-btn").click(function(e){        
        e.preventDefault();
        $.post("http://localhost:3000/api/v1/events", $("#search-form").serialize(), function(data) {
            console.log($("#search-form").serialize());
            console.log(data);
        });
    });
});


