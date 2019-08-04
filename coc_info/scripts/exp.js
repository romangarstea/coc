

window.addEventListener("load",function () {



    var datenow = new Date();


    // GMT
    var offset      = datenow.getTimezoneOffset();
    var result_gmt  = datenow.setHours(datenow.getHours()+(offset/60));


    // AGE USER
    var age_user        = new Date('1979-04-01');
    var result_ageuser  = datenow.getYear() - age_user.getYear();


    // AGE CLAN
    var age_clan        = new Date('2016-11-09');
    // nr day
    var result_ageclan  = parseInt((datenow - age_clan)/1000/60/60/24);


    // AFFICHAGE
    document.getElementsByClassName("outpout")[0].innerHTML = result_ageclan;


})