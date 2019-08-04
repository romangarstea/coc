


// 01. nr members_api.items[0].clanRank
// 02. font awesome
// 03. league members_api.items[i].league.iconUrls.tiny
// 04. trophies members_api.items[i].trophies
// 05. level members_api.items[i].expLevel

// 06. th members_api.items[i].townHallLevel
// 07. nik members_api.items[i].name

// 08. age -------------
// 09. name ------------
// 10. time ------------
// 11. timeIndex -------
// 12. address ---------

// 13. status members_api.items[i].role
// 14. old -------------
// 15. donations  members_api.items[i].donations
// 15. received members_api.items[i].donationsReceived
// 16. th members_api.items[i].townHallLevel


var clan_api;
var members_api;
var members_bd;


window.addEventListener("load", function(){


    // data Local debogage
    // clan_api    = loadJSON('json/api/clan_api.json');
    // members_api = loadJSON('json/api/members_api.json');
    // members_bd  = loadJSON('json/api/members_db.json');


    // 1. prepare clan_api pour pouvoir trie
    // 1.1. delete "name", cree "nick"
    for (var key in clan_api.memberList){
        clan_api.memberList[key]["nick"]= clan_api.memberList[key].name;
        delete clan_api.memberList[key].name;
    }


    // 1.2 add "townHallLevel" "warStars"
    addData(clan_api, members_api, "townHallLevel");
    addData(clan_api, members_api, "warStars");


    // 1.3. add "name" "country" "city" "age_user" "age_clan" "gmt"
    for (var key1 in members_bd){
        for (var key2 in members_bd[key1]){
            // ne change pas le "tag" en empty string ""
            if ( key2 != "tag"){
                addData(clan_api, members_bd, key2);
            }
        }
    }


    // 1.4. add "time"
    for(var i=0; i<clan_api.memberList.length; i++) {
        var tag = clan_api.memberList[i].tag;
        if ( typeof members_bd[tag] != "undefined" ){
            clan_api.memberList[i]["time"] = calcTime(parseInt(clan_api.memberList[i].gmt));
        }
        else{
            clan_api.memberList[i]["time"] = "";
        }
    }


    // 2. page
    tableTitle(clan_api);
    tableMembers();


    // 3. event
    var a = clan_api.memberList;
    document.getElementById("sortNr"        ).addEventListener("click",function () { sortNr(a)});        //01
    document.getElementById("sortClanRank"  ).addEventListener("click",function () { sortClanRank(a)});  //02
    document.getElementById("sortTrophies"  ).addEventListener("click",function () { sortTrophies(a)});  //04
    document.getElementById("sortLevel"     ).addEventListener("click",function () { sortLevel(a)});     //05
    document.getElementById("sortWarStars"  ).addEventListener("click",function () { sortWarStars(a)});  //06

    document.getElementById("sortTh1"       ).addEventListener("click",function () { sortTh(a)});        //06
    document.getElementById("sortNik"       ).addEventListener("click",function () { sortNik(a)});       //07
    document.getElementById("sortAge"       ).addEventListener("click",function () { sortAge(a)});       //08
    document.getElementById("sortName"      ).addEventListener("click",function () { sortName(a)});      //09
    document.getElementById("sortTime"      ).addEventListener("click",function () { sortTime(a)});      //10
    document.getElementById("sortTimeIndex" ).addEventListener("click",function () { sortTimeIndex(a)}); //11
    document.getElementById("sortCountry"   ).addEventListener("click",function () { sortCountry(a)});   //12
    document.getElementById("sortCity"      ).addEventListener("click",function () { sortCity(a)});      //13


    document.getElementById("sortRole"      ).addEventListener("click",function () { sortRole(a)});      //13
    document.getElementById("sortOld"       ).addEventListener("click",function () { sortOld(a)});       //14
    document.getElementById("sortTroops"    ).addEventListener("click",function () { sortTroops(a)});    //15
    document.getElementById("sortTh2"       ).addEventListener("click",function () { sortTh(a)});        //16


}, false);



/**
 * construction header (parametres de clan_api)
 * @param array - donnees
 */
function tableTitle(ar){

    document.getElementById('badge').innerHTML = '<img src="'+ ar.badgeUrls.small +'"/>';
    document.getElementById('badge_txtNameClan').innerHTML = ar.name;
    document.getElementById('badge_elementsTag').innerHTML = ar.tag;
    document.getElementById('clanPoints').innerHTML = ar.clanPoints;
    document.getElementById('warWins').innerHTML = ar.warWins;
    document.getElementById('members').innerHTML = ar.members;
    document.getElementById('description').innerHTML = ar.description;


    // status de joueurs (col 31)
    var tab = document.querySelectorAll(".a31");
    var row = "";
    var status_h = {"leader":"Leader", "coLeader":"coLeader", "admin":"Elder", "member":"Member"};

    for (key in status_h){

        var a="";
        var b=0;

        for (var i=0; i<clan_api.memberList.length; i++){

            if( clan_api.memberList[i].role == key ){

                b++;
                var c = members_api[clan_api.memberList[i].tag];


                // check heroes
                var heroes={"Barbarian King":0  ,"Archer Queen":0, "Grand Warden":0, "Battle Machine":0};

                if (c.heroes.length != 0){
                    for (var x=0; x<c.heroes.length; x++ ){
                        heroes[c.heroes[x].name] = c.heroes[x].level;
                    }
                }


                // construir le tableau seulement pour "leader" et "coLeader"
                if (key == "leader" || key == "coLeader"){
                    a+= '<div class="a31r">\n' +
                        '\n' +
                        '\n' +
                        '<div class="th_h">'+ clan_api.memberList[i].townHallLevel +'</div>\n' +
                        '<div class="nick_h">'+ clan_api.memberList[i].nick +'<span class="name_h"></span></div>\n' +
                        '\n' +
                        '<div class="ligue_h"><img src="'+ clan_api.memberList[i].league.iconUrls.tiny +'" width="18px"></div>\n' +
                        '<div class="star_h"><img src="image/star.png">'+ c.warStars +'</div>\n' +
                        '\n' +
                        '<div class="heroes_box">\n' +
                        '<div class="heroes_h">K<span class="index_h">'+ heroes["Barbarian King"] +'</span></div>\n' +
                        '<div class="heroes_h">Q<span class="index_h">'+ heroes["Archer Queen"] +'</span></div>\n' +
                        '<div class="heroes_h">W<span class="index_h">'+ heroes["Grand Warden"] +'</span></div>\n' +
                        '</div>\n' +
                        '\n' +
                        '\n' +
                        '</div>'
                }


            }
        }
        row += '<div class="a31r statut_h">'+ status_h[key] +'<span class="colRed">'+ b +'</span></div>';
        row += a;

    }
    tab[0].innerHTML = row;


    // nombre des "Tawn Hall" (col 32)
    var tHall    = document.querySelectorAll(".a32rc2");
    var a_thHall = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i=0; i<clan_api.memberList.length; i++){
        a_thHall[clan_api.memberList[i].townHallLevel] = a_thHall[clan_api.memberList[i].townHallLevel] + 1;
    }

    tHall[0].innerHTML = a_thHall[11];
    tHall[1].innerHTML = a_thHall[10];
    tHall[2].innerHTML = a_thHall[9];
    tHall[3].innerHTML = a_thHall[8];
    tHall[4].innerHTML = a_thHall[7];
    tHall[5].innerHTML = a_thHall[6];
    tHall[6].innerHTML = a_thHall[5] + a_thHall[4] + a_thHall[3] + a_thHall[2] + a_thHall[1];
    tHall[7].innerHTML = clan_api.memberList.length;

 }


/**
 * construction table (parametres des joueurs)
 * @param array - donnees
 */
function tableMembers() {

    var row = "";
    for (var i=0; i<clan_api.memberList.length; i++){

        //data for row-2 Ranc
        var rank = "";
        var icon = "";
        if (clan_api.memberList[i].previousClanRank == 0 || clan_api.memberList[i].clanRank - clan_api.memberList[i].previousClanRank == 0){
            rank = "";
            icon = '';
        }
        else{
            if (clan_api.memberList[i].clanRank - clan_api.memberList[i].previousClanRank > 0){
                rank = '+' + (clan_api.memberList[i].clanRank - clan_api.memberList[i].previousClanRank);
                icon = '<i class="fa fa-angle-up" aria-hidden="true"></i>'
            }
            else{
                // if rank < 0
                rank = clan_api.memberList[i].clanRank - clan_api.memberList[i].previousClanRank;
                icon = '<i class="fa fa-angle-down" aria-hidden="true"></i>';
            }
        }



        // donnees bd
        // 2CLQ0LGRY
        // members_bd['2CLQ0LGRY'].age_user;

        var bd_name     ="";
        var bd_age_user ="";
        var bd_age_clan ="";
        var bd_country  ="";
        var bd_gmt      ="";

        if ( typeof members_bd[clan_api.memberList[i].tag] != "undefined" ){
            // name
            bd_name = members_bd[clan_api.memberList[i].tag].name;

            // age user - years
            var datenow  = new Date();
            var age_user = new Date(members_bd[clan_api.memberList[i].tag].age_user);
            bd_age_user = datenow.getYear() - age_user.getYear();

            // age clan - day
            var age_clan = new Date(members_bd[clan_api.memberList[i].tag].age_clan);
            bd_age_clan  = parseInt((datenow - age_clan)/1000/60/60/24);

            // country
            bd_country = members_bd[clan_api.memberList[i].tag].country;

            // GMT
            bd_gmt = members_bd[clan_api.memberList[i].tag].gmt;

            // time -> clan_api

        }





        row +=
           '<div class="tabMembersRow">'+
           '<div class="nr"><div class="nr_bgr"><div class="nr_text">'+clan_api.memberList[i].clanRank+'</div></div></div>'+
           '<div class="rank"><div class="rank_bgr"><div class="rank_textUp">'+icon+'</div><div class="txtBt textBt_center">'+rank+'</div></div></div>'+
           '<div class="league"><div class="league_img"><img src="'+clan_api.memberList[i].league.iconUrls.tiny+'"/></div></div>'+
           '<div class="trophies"><div class="trophies_bgr"><div class="trophies_text">'+clan_api.memberList[i].trophies+'</div><div class="trophies_img"><img src="image/trophies.png" height="24" width="24"/></div></div></div>'+
           '<div class="level"><div class="level_bgr"><div class="level_text">'+clan_api.memberList[i].expLevel+'</div></div></div>'+
           '<div class="warStars"><div class="warStars_bgr"><div class="warStars_img"><img src="image/warStars.png" height="16" width="16"/></div><div class="warStars_text">'+ clan_api.memberList[i].warStars +'</div></div></div>'+

           '<div class="th"><div class="th_text">'+clan_api.memberList[i].townHallLevel+'</div></div>'+
           '<div class="nik"><div class="nik_bgr"><div class="nik_textUp">'+clan_api.memberList[i].nick+'</div><div class="txtBt">'+roleNik(clan_api.memberList[i].role)+'</div></div></div>' +

           '<div class="age"><div class="age_bgr"><div class="age_textUp">'+ bd_age_user +'</div><div class="txtBt textBt_center">Age</div></div></div>'+
           '<div class="name"><div class="name_bgr"><div class="name_textUp">'+ bd_name +'</div><div class="txtBt">Name</div></div></div>'+
           '<div class="time"><div class="time_bgr"><div class="time_textUp">'+ clan_api.memberList[i].time +'</div><div class="txtBt textBt_center">Time</div></div></div>'+
           '<div class="timeIndex"><div class="timeIndex_text">'+ bd_gmt +'</div></div>'+
           '<div class="country"><div class="country_bgr"><div class="country_textUp">'+ clan_api.memberList[i].country +'</div><div class="txtBt">Country</div></div></div>'+
           '<div class="city"><div class="city_bgr"><div class="city_textUp">'+ clan_api.memberList[i].sity +'</div><div class="txtBt">City</div></div></div>'+

           '<div class="status"><div class="status_bgr"><div class="status_text">'+role(clan_api.memberList[i].role)+'</div></div></div>'+
           '<div class="old"><div class="old_bgr"><div class="old_textUp">'+ bd_age_clan +'</div><div class="txtBt textBt_center">Days</div></div></div>'+
           '<div class="troops"><div class="troops_bgr"><div class="troops_textUp">'+clan_api.memberList[i].donations+'\/'+clan_api.memberList[i].donationsReceived+'</div><div class="txtBt textBt_center">Donated/Received</div></div></div>'+
           '<div class="th"><div class="th_text">'+clan_api.memberList[i].townHallLevel+'</div></div>'+
           '</div>';
    }
    document.getElementById("table").innerHTML = '<div class="tabMembers">'+row+'</div>';
}


/**
 * Sort des tableau
 * @param array
 */
function sortNr        (data){
    if ( data[0].clanRank > data[data.length-1].clanRank)
    {
        data.sort(function(a,b){
            var a = parseInt(a.clanRank);
            var b = parseInt(b.clanRank);
            return a-b;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = parseInt(a.clanRank);
            var b = parseInt(b.clanRank);
            return b-a;
        });
        tableMembers();
    }
}//01
function sortClanRank  (data){

    // for new member previousClanRank == 0
    if ( data[0].clanRank-data[0].previousClanRank > data[data.length-1].clanRank-data[data.length-1].previousClanRank)
    {
        data.sort(function(a,b){
            var aa;
            var bb;

            if (a.previousClanRank == 0)
                aa=0;
            else
                aa = parseInt(a.clanRank-a.previousClanRank);

            if (b.previousClanRank == 0)
                bb=0;
            else
                bb = parseInt(b.clanRank-b.previousClanRank);

            return aa-bb;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var aa;
            var bb;

            if (a.previousClanRank == 0)
                aa=0;
            else
                aa = parseInt(a.clanRank-a.previousClanRank);

            if (b.previousClanRank == 0)
                bb=0;
            else
                bb = parseInt(b.clanRank-b.previousClanRank);

            return bb-aa;
        });
        tableMembers();
    }
}//02
function sortTrophies  (data){
    if ( data[0].trophies > data[data.length-1].trophies)
    {
        data.sort(function(a,b){
            var a = parseInt(a.trophies);
            var b = parseInt(b.trophies);
            return a-b;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = parseInt(a.trophies);
            var b = parseInt(b.trophies);
            return b-a;
        });
        tableMembers();
    }
}//04
function sortLevel     (data){
    if ( data[0].expLevel > data[data.length-1].expLevel)
    {
        data.sort(function(a,b){
            var a = parseInt(a.expLevel);
            var b = parseInt(b.expLevel);
            return a-b;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = parseInt(a.expLevel);
            var b = parseInt(b.expLevel);
            return b-a;
        });
        tableMembers();
    }
}//05
function sortWarStars  (data){
    if ( data[0].warStars > data[data.length-1].warStars)
    {
        data.sort(function(a,b){
            var a = parseInt(a.warStars);
            var b = parseInt(b.warStars);
            return a-b;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = parseInt(a.warStars);
            var b = parseInt(b.warStars);
            return b-a;
        });
        tableMembers();
    }
}//01
function sortTh        (data){
    if ( data[0].townHallLevel > data[data.length-1].townHallLevel)
    {
        data.sort(function(a,b){
            var a = parseInt(a.townHallLevel);
            var b = parseInt(b.townHallLevel);
            return a-b;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = parseInt(a.townHallLevel);
            var b = parseInt(b.townHallLevel);
            return b-a;
        });
        tableMembers();
    }
}//06/16
function sortNik       (data){
    if ( data[0].nick > data[data.length-1].nick)
    {
        data.sort(function(a,b){
            var a = a.nick.toLowerCase();
            var b = b.nick.toLowerCase();
            if (a<b)
                return -1;
            if (a>b)
                return 1;
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.nick.toLowerCase();
            var b = b.nick.toLowerCase();
            if (a<b)
                return 1;
            if (a>b)
                return -1;
            return 0;
        });
        tableMembers();
    }
}//07
function sortAge       (data){

    // pour que l'algoritm marche
    // il feaux trouver le premier et le dernier valeur
    // qui n'est pas vide
    var premierVal="";
    var dernierVal="";
    for(var i=0; i<data.length;i++) {
        if ( data[i].age_user != "" ){
            premierVal = data[i].age_user;
            break;
        }
    }

    for(var i=data.length-1; i>=0;i--) {
        if ( data[i].age_user != "" ){
            dernierVal = data[i].age_user;
            break;
        }
    }


    // triage
    if ( premierVal >= dernierVal)
    {
        data.sort(function(a,b){
            var a = a.age_user;
            var b = b.age_user;

            // algoritm pour affichage
            // en premier le resultat qui ne son pas vide
            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return 1;
                }
            }
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.age_user;
            var b = b.age_user;

            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return 1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return -1;
                }
            }
            return 0;
        });
        tableMembers();
    }
}//08
function sortName      (data){

    // pour que l'algoritm marche
    // il feaux trouver le premier et le dernier valeur
    // qui n'est pas vide
    var premierVal="";
    var dernierVal="";
    for(var i=0; i<data.length;i++) {
        if ( data[i].name != "" ){
            premierVal = data[i].name;
            break;
        }
    }

    for(var i=data.length-1; i>=0;i--) {
        if ( data[i].name != "" ){
            dernierVal = data[i].name;
            break;
        }
    }


    // triage
    if ( premierVal >= dernierVal)
    {
        data.sort(function(a,b){
            var a = a.name;
            var b = b.name;

            // algoritm pour affichage
            // en premier le resultat qui ne son pas vide
            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return 1;
                }
            }
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.name;
            var b = b.name;

            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return 1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return -1;
                }
            }
            return 0;
        });
        tableMembers();
    }
}//09
function sortTime      (data){

    // pour que l'algoritm marche
    // il feaux trouver le premier et le dernier valeur
    // qui n'est pas vide
    var premierVal="";
    var dernierVal="";
    for(var i=0; i<data.length;i++) {
        if ( data[i].time != "" ){
            premierVal = data[i].time;
            break;
        }
    }

    for(var i=data.length-1; i>=0;i--) {
        if ( data[i].time != "" ){
            dernierVal = data[i].time;
            break;
        }
    }


    // triage
    if ( premierVal >= dernierVal)
    {
        data.sort(function(a,b){
            var a = a.time;
            var b = b.time;

            // algoritm pour affichage
            // en premier le resultat qui ne son pas vide
            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return 1;
                }
            }
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.time;
            var b = b.time;

            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return 1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return -1;
                }
            }
            return 0;
        });
        tableMembers();
    }
}//10
function sortTimeIndex (data){

    // pour que l'algoritm marche
    // il feaux trouver le premier et le dernier valeur
    // qui n'est pas vide
    var premierVal="";
    var dernierVal="";
    for(var i=0; i<data.length;i++) {
        if ( data[i].gmt != "" ){
            premierVal = data[i].gmt;
            break;
        }
    }

    for(var i=data.length-1; i>=0;i--) {
        if ( data[i].gmt != "" ){
            dernierVal = data[i].gmt;
            break;
        }
    }


    // triage
    if ( premierVal >= dernierVal)
    {
        data.sort(function(a,b){
            var a = a.gmt;
            var b = b.gmt;

            // algoritm pour affichage
            // en premier le resultat qui ne son pas vide
            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return 1;
                }
            }
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.gmt;
            var b = b.gmt;

            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return 1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return -1;
                }
            }
            return 0;
        });
        tableMembers();
    }
}//11
function sortCountry   (data){

    // pour que l'algoritm marche
    // il feaux trouver le premier et le dernier valeur
    // qui n'est pas vide
    var premierVal="";
    var dernierVal="";
    for(var i=0; i<data.length;i++) {
        if ( data[i].country != "" ){
            premierVal = data[i].country;
            break;
        }
    }

    for(var i=data.length-1; i>=0;i--) {
        if ( data[i].country != "" ){
            dernierVal = data[i].country;
            break;
        }
    }


    // triage
    if ( premierVal >= dernierVal)
    {
        data.sort(function(a,b){
            var a = a.country;
            var b = b.country;

            // algoritm pour affichage
            // en premier le resultat qui ne son pas vide
            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return 1;
                }
            }
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.country;
            var b = b.country;

            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return 1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return -1;
                }
            }
            return 0;
        });
        tableMembers();
    }
}//12
function sortCity      (data){

    // pour que l'algoritm marche
    // il feaux trouver le premier et le dernier valeur
    // qui n'est pas vide
    var premierVal="";
    var dernierVal="";
    for(var i=0; i<data.length;i++) {
        if ( data[i].sity != "" ){
            premierVal = data[i].sity;
            break;
        }
    }

    for(var i=data.length-1; i>=0;i--) {
        if ( data[i].sity != "" ){
            dernierVal = data[i].sity;
            break;
        }
    }


    // triage
    if ( premierVal >= dernierVal)
    {
        data.sort(function(a,b){
            var a = a.sity;
            var b = b.sity;

            // algoritm pour affichage
            // en premier le resultat qui ne son pas vide
            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return 1;
                }
            }
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.sity;
            var b = b.sity;

            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return 1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return -1;
                }
            }
            return 0;
        });
        tableMembers();
    }
}//13


function sortRole      (data){

    var roleTab = {leader:4,coLeader:3,admin:2,member:1};
    if ( roleTab[data[0].role] > roleTab[data[data.length-1].role])
    {
        data.sort(function(a,b){
            var a = parseInt(roleTab[a.role]);
            var b = parseInt(roleTab[b.role]);
            return a-b;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = parseInt(roleTab[a.role]);
            var b = parseInt(roleTab[b.role]);
            return b-a;
        });
        tableMembers();
    }
}//13
function sortOld       (data){

    // pour que l'algoritm marche
    // il feaux trouver le premier et le dernier valeur
    // qui n'est pas vide
    var premierVal="";
    var dernierVal="";
    for(var i=0; i<data.length;i++) {
        if ( data[i].age_clan != "" ){
            premierVal = data[i].age_clan;
            break;
        }
    }

    for(var i=data.length-1; i>=0;i--) {
        if ( data[i].age_clan != "" ){
            dernierVal = data[i].age_clan;
            break;
        }
    }


    // triage
    if ( premierVal >= dernierVal)
    {
        data.sort(function(a,b){
            var a = a.age_clan;
            var b = b.age_clan;

            // algoritm pour affichage
            // en premier le resultat qui ne son pas vide
            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return 1;
                }
            }
            return 0;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = a.age_clan;
            var b = b.age_clan;

            if (a<b){
                if (a == ""){
                    return 1;
                }
                else{
                    return 1;
                }
            }
            if (a>b){
                if (b == ""){
                    return -1;
                }
                else{
                    return -1;
                }
            }
            return 0;
        });
        tableMembers();
    }
}//14
function sortTroops    (data){
    if ( data[0].donations > data[data.length-1].donations)
    {
        data.sort(function(a,b){
            var a = parseInt(a.donations);
            var b = parseInt(b.donations);
            return a-b;
        });
        tableMembers();
    }
    else
    {
        data.sort(function(a,b){
            var a = parseInt(a.donations);
            var b = parseInt(b.donations);
            return b-a;
        });
        tableMembers();
    }
}//15



/**
 *
 * Lire le fichier local
 *
 * @param   string   address
 * @return   []      array
 *
 */
function loadJSON(address) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', address, false);
    xhr.send();

    if (xhr.status != 200) {
        alert('Error ' + xhr.status + ': ' + xhr.statusText);
    } else {
        var data = JSON.parse(xhr.responseText);
        return data;
    }
}



/**
 *
 * Transfer des donnees d'un tableau a l'autre.
 * clan_api.memberList[index][key]  <-  members_api[tag].key
 * clan_api.memberList[index][key]  <-  members_bd [tag].key
 *
 * @param []        clan_api
 * @param []        members_api
 * @param string    key
 *
 */
function addData(clan, members, key) {

    for(var i=0; i<clan.memberList.length; i++){
        var tag = clan.memberList[i].tag;
        if ( typeof members[tag] != "undefined" ){
            clan.memberList[i][key] = members[tag][key];
        }
        else{
            clan.memberList[i][key] ="";
        }
    }
}
function role(a){
    var roleTab = {leader:"L",coLeader:"C",admin:"E",member:"N"};
    return roleTab[a];
}
function roleNik(a){
    var roleTab = {leader:"Leader",coLeader:"Co-leader",admin:"Elder",member:""};
    return roleTab[a];
}



// http://qaru.site/questions/2062/convert-date-to-another-timezone-in-javascript
function calcTime(offset) {

    // getTimezoneOffset()  return gmt
    // getUTCHours()        return time qui a gmt=0

    // create Date object for current location
    var d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));




    var hr = 0;
    var mn = 0;
    if (nd.getHours().toString().length == 1){
        hr = "0" + nd.getHours().toString();
    }
    else{
        hr = nd.getHours().toString();
    }

    if (nd.getMinutes().toString().length == 1){
        mn = "0" + nd.getMinutes().toString();
    }
    else{
        mn = nd.getMinutes().toString();
    }

    // return time as a string
    // return "The local time in " + city + " is " + nd.toLocaleString();
    return hr + ":" + mn;
}



















