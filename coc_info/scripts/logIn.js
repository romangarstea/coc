





window.addEventListener("load", function(){

    console.log(clans);
    createSelectClans('clans', 'Clan');
    select();

    // si le clans est choisi on va cree select box pour user
    // et rampli le input hidden avec le tag_clan
    document.getElementById('clans').addEventListener('click',function () {

        var selectClan = document.getElementsByTagName('select')[0].value;
        if (selectClan!=""){
            createSelectUser('users', 'User', selectClan);
            selectt();

            document.getElementById('tag_clan').value = selectClan;
        }
    });
}, false);


/**
 * Construction du select dans la form
 *
 * @param idTag - id du balise ou va insere le cod
 * @param placeholder - placeholder de form "select"
 * @param aDonnees - donnees pour "option" de balise "select"
 *
 */
function createSelectClans( idTag, placeholder) {

    var allArrayKey = Object.keys(clans);
    var select = '<select><option value="">'+placeholder+'</option>';
    for(i=0; i<(allArrayKey.length); i++){
        select = select + '<option value="' + allArrayKey[i] + '">'+ clans[allArrayKey[i]]['name'] + '</option>'
    }
    select = select + '</select>'
    document.getElementById(idTag).innerHTML = select;
}

function createSelectUser( idTag, placeholder, tagClan) {
    if(tagClan!=""){
        var select = '<select name="tag_user"><option value="">'+placeholder+'</option>';
        for(i=0; i<(clans[tagClan]['members_api'].length); i++){
            select = select + '<option value="' + clans[tagClan]['members_api'][i]['tag'] + '">'+
                clans[tagClan]['members_api'][i]['name'] + '</option>'
        }
        select = select + '</select>'
        document.getElementById(idTag).innerHTML = select;
    }
    else{
        alert ('Select plis clan_api');
    }
}

/**
 * Construction du DIV qui change le select
 */
function select(){
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var i, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
}
function selectt(){

    /**
     *
     *  var:   x selElmnt a b c, s h
     *
     *  for(   x|custom-select   )
     *     selElmnt|select
     *
     *     < a|DIV|custom-select
     *
     *          < s|SELECT|hiden
     *          < a/h|DIV|select-selected
     *              Placeholder/User selected, Arc
     *          < b|DIV|select-items
     *              < scroll|DIV
     *                  < c|DIV > Users </DIV>
     *
     *
     */


    var x, i, j, selElmnt, a, b, c, scroll;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-selectt");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");

        // PLAICHOLDER DIV
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;

        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        scroll = document.createElement("DIV");
        scroll.setAttribute("class", "scroll");



        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");


            // OPTION DIV
            c.setAttribute("class", "flexDiv");
            var nr = '<div class="nr">'+ j +'</div>';
            var name = '<div class="name">'+ selElmnt.options[j].innerHTML +'</div>';
            var tag = '<div class="tag">'+ selElmnt.options[j].value +'</div>';

            //c.innerHTML = selElmnt.options[j].innerHTML;
            c.innerHTML = nr + name + tag;

            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box, and the selected item:*/
                var i, s, h;

                // sSELECT(hiden)
                s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                // hDIV(plaicholder)
                h = this.parentNode.parentNode.previousSibling;

                for (i = 0; i < s.length; i++) {
                    // this == cDIV[ nrDIV, nameDIV, tagDIV]
                    // firstChild == nrDIV
                    // nextElementSibling == nameDIV
                    if (s.options[i].innerHTML == this.firstChild.nextElementSibling.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.firstChild.nextElementSibling.innerHTML;
                        break;
                    }
                }
                h.click();
            });

            scroll.appendChild(c);
        }



        b.appendChild(scroll);
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);



    // scroll
    // nr_sel: je veux utiliser scroll pour deuxiemme select
    var nr_sel = 2;
    // i: top = 0px
    var i=0;
    var add=25;

    var box = document.getElementsByClassName("select-items")[nr_sel-1];
    var scroll = document.getElementsByClassName("scroll")[0];


    box.addEventListener("wheel", function (ev) {

        if(ev.deltaY>0){
            console.log(ev.deltaY);
            console.log("UP");
            if (i>-900){
                i-=add;
                scroll.style.top = i+"px";
            }
        }
        else{
            //console.log(ev.deltaY);
            if(i<0){
                i+=add;
                scroll.style.top = i+"px";
            }
        }
    });
}












