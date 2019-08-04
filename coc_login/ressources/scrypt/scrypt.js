/**
 *
 *
 *
 *
 */


// var global sont temporar
var word_global     = "";
var xmlhttp_global  = null;
var result          = null;

window.addEventListener("load", function () {

    result = (function () {
        var obj    = {};
        var result = document.querySelector(".result");
        obj.self   = result;

        obj.close     = function () {
            result.style.height = "0px";
        }
        obj.open      = function () {
            result.style.height = "370px";
        }
        obj.blinking  = function () {
            this.close();
            setTimeout(this.open, 200);
        }
        obj.remove    = function () {
            var result_data = result.querySelector(".result_data");
            if (result_data) {
                result.removeChild(result_data);
            }
            this.close();
        }
        obj.create    = function (json) {

            /*
            <div class="result_data">

            <div class="result_r">
                <div class="result_data_rc1">
                    <img src="https://api-assets.clashofclans.com/badges/70/jKgotgFgKzSMa-gjeLqHJ9gZjul1hEcPWM6rcfWRTU4.png">
                </div>
                <div class="result_data_rc2">
                    <div class="result_data_rc2r1">
                        CrazyG
                    </div>
                    <div class="result_data_rc2r2">
                        #C0GYL2LQ
                    </div>
                </div>
            </div>

            </div>
            */
            this.blinking();

            if (json.length == 0) {
                alert("no items");
            }
            else {

                if (result.querySelector(".result_data")) {
                    result.removeChild(result.querySelector(".result_data"));
                }

                var result_data = document.createElement("div");
                result_data.className = "result_data";

                for (var i = 0; i < json.length; i++) {
                    var result_data_r = document.createElement("div");
                    result_data_r.className = "result_data_r";

                    //c1
                    var result_data_rc1 = document.createElement("div");
                    result_data_rc1.className = "result_data_rc1";

                    //c1r1
                    var img_badgeUrls = document.createElement("img");
                    img_badgeUrls.src = json[i].badgeUrls.small;
                    result_data_rc1.appendChild(img_badgeUrls);
                    result_data_r.appendChild(result_data_rc1);

                    // c2
                    var result_data_rc2 = document.createElement("div");
                    result_data_rc2.className = "result_data_rc2";

                    // c2r1
                    var result_data_rc2r1 = document.createElement("div");
                    result_data_rc2r1.className = "result_data_rc2r1";
                    var nameClan = document.createTextNode(json[i].name);
                    result_data_rc2r1.appendChild(nameClan);
                    result_data_rc2.appendChild(result_data_rc2r1);

                    // c2r2
                    var result_data_rc2r2 = document.createElement("div");
                    result_data_rc2r2.className = "result_data_rc2r2";
                    var tagClan = document.createTextNode(json[i].tag);
                    result_data_rc2r2.appendChild(tagClan);
                    result_data_rc2.appendChild(result_data_rc2r2);

                    result_data_r.appendChild(result_data_rc2);
                    result_data.appendChild(result_data_r);
                }
                result.appendChild(result_data);
            }
        }

        return obj;
    }());

    position();

    var el_clan   = document.querySelector("#clan");
    var el_player = document.querySelector("#player");
    var el_search = document.querySelector(".search");
    var el_input  = document.querySelector("input");
    var tumb      = document.querySelector(".result_scrollbarTumb");




    //// ALIGN PAGE
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    window.addEventListener("resize", function () {
        position();
    });

    //// SEARCH INPUT | SWITCH
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    el_clan.addEventListener("click", function () {
        if (!this.classList.contains('active')) {
            el_clan.classList.add('active');
            el_player.classList.remove('active');

            el_input.value = "";
            el_input.placeholder = "Name or Tag";
        }
    });

    el_player.addEventListener("click", function () {
        if (!this.classList.contains('active')) {
            el_clan.classList.remove('active');
            el_player.classList.add('active');

            el_input.value = "";
            el_input.placeholder = "Tag";
        }
        result.self.remove();
    });


    //// SEARCH INPUT | EFFECT
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    el_search.addEventListener("mouseover", function () {
        el_search.classList.add("box_shadow");
        el_input.style.backgroundColor = "#fbfbfb";
    });

    el_search.addEventListener("click", function () {
        el_input.focus();
        if (el_player.classList.contains('active')) {
            el_input.value = "#";
        }
    });

    el_search.addEventListener("mouseleave", function () {
        if (!(document.querySelector("input") == document.activeElement) && result.self.style.height == "0px") {
            el_search.classList.remove("box_shadow");
            el_input.style.backgroundColor = "#f5f5f5";
        }
    });

    el_input.addEventListener("blur", function () {
        // if I click outside then the shadow will remain if the input is not empty
        if (el_input.value == "") {
            el_search.classList.remove("box_shadow");
            el_input.style.backgroundColor = "#f5f5f5";
        }
    });

    //// SEARCH INPUT | AJAX
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    el_input.addEventListener("keyup", function () {

        var word = this.value;

        if (word == "" || word.length < 3) {
            result.self.style.height = "0px";
            return;
        }

        // word != word_global Speed dialing gives the same result multiple times. To exclude the same results
        if (word != word_global) {

            if (xmlhttp_global == null) {
                ajaxReq(word);
            }
            else {
                xmlhttp_global.abort();
                ajaxReq(word);
            }
        }
        word_global = word;
    });

    //// How to disable scrolling page temporarily?
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    result.self.addEventListener("mouseover", function () {
        disableScroll();
    });
    // result.self.addEventListener("touchstart", function () {
    //     disableScroll();
    // });
    result.self.addEventListener("mouseleave", function () {
        enableScroll();
    });
    // result.self.addEventListener("touchend", function () {
    //     enableScroll();
    // });

    // https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
    // left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.scroll;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    };

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    };

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    };

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    };


    //// SEARCH INPUT | SCROLL
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    result.self.addEventListener("wheel", function (ev) {

        // if div is not filled with the data, then exit
        if (!result.self.querySelector(".result_data")) {return}

        var wind        = result.self;
        var wind_coords = getCoords(result.self);
        var data        = wind.querySelector(".result_data");
        var data_coords = getCoords(data);
        var tumb        = wind.querySelector(".result_scrollbarTumb");
        var tumb_coords = getCoords(tumb);

        var step = 50;
        var data_position_initiale = ( data.style.top ? parseInt(data.style.top) : 0 );
        var data_position_finale;
        var data_position_min;
        var data_position_max = (-1) * (data_coords.height - wind.clientHeight);

        var data_distance = (-1) * data_position_max;
        var data_distance_traveled;

        var tumb_margin_top = 30;
        var tumb_margin_bottom = 30;
        var tumb_position_min = tumb_margin_top;
        var tumb_distance = wind.clientHeight - tumb_coords.height - tumb_margin_bottom - tumb_margin_top;
        var tumb_distance_traveled;
        var tumb_position_final;

        //up -top
        if (ev.deltaY > 0) {
            data_position_finale = data_position_initiale - step;
            if (data_position_finale < data_position_max) {
                data_position_finale = data_position_max;
            }
        }
        //down +top
        else {
            data_position_finale = data_position_initiale + step;
            if (data_position_finale > 0) {
                data_position_finale = 0
            }
        }

        data_distance_traveled = (-1) * data_position_finale;
        tumb_distance_traveled = tumb_distance * data_distance_traveled / data_distance;
        tumb_position_final = tumb_distance_traveled + tumb_position_min;

        tumb.classList.add("tumb_anim");
        tumb.style.top = tumb_position_final + "px";
        data.style.top = data_position_finale + "px";

    });


    //// SEARCH INPUT | SCROLL DRAG & DROP
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    tumb.addEventListener("mousedown", function (e) {

        var wind = result.self;
        var wind_coords = getCoords(wind);
        var data = document.querySelector(".result_data");
        var data_coords = (data ? getCoords(data) : "");
        var tumb_coords = getCoords(tumb);

        var tumb_margin_top = 30;
        var tumb_margin_bottom = 30;
        var tumb_position_min = tumb_margin_top;
        var tumb_position_max = result.self.clientHeight - tumb_coords.height - tumb_margin_bottom;
        var tumb_correction = e.pageY - tumb_coords.top;
        var tumb_position_initial = e.pageY - wind_coords.top - tumb_correction;
        var tumb_position_final = 0;
        var tumb_distance = result.self.clientHeight - tumb_coords.height - tumb_margin_bottom - tumb_margin_top;
        var tumb_distance_traveled = 0;
        var tumb_shift = 0;

        var data_distance = data_coords.height - result.self.clientHeight;
        var data_position_finale = 0;

        document.onmousemove = function (e) {

            tumb_shift = e.pageY - wind_coords.top - tumb_position_initial - tumb_correction;
            tumb_position_final = tumb_position_initial + tumb_shift;

            if (tumb_position_final < tumb_position_min) {
                tumb_position_final = tumb_position_min;
            }
            if (tumb_position_final > tumb_position_max) {
                tumb_position_final = tumb_position_max;
            }

            tumb_distance_traveled = tumb_position_final - tumb_position_min;
            data_position_finale = (-1) * (data_distance * tumb_distance_traveled / tumb_distance);

            tumb.classList.remove("tumb_anim");
            tumb.style.top = tumb_position_final + 'px';
            data.style.top = data_position_finale + 'px'
        }

        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };

        return false; // disable selection start (cursor change)
    })

    // result.self.addEventListener("touchstart", function (e) {
    //
    //     console.log("touchstart");
    //
    //     var pageY = e.targetTouches[0].pageY
    //     var wind = result.self;
    //     var wind_coords = getCoords(wind);
    //     var data = document.querySelector(".result_data");
    //     var data_coords = (data ? getCoords(data) : "");
    //     var tumb_coords = getCoords(tumb);
    //
    //     var tumb_margin_top = 30;
    //     var tumb_margin_bottom = 30;
    //     var tumb_position_min = tumb_margin_top;
    //     var tumb_position_max = result.self.clientHeight - tumb_coords.height - tumb_margin_bottom;
    //     var tumb_correction = pageY - tumb_coords.top;
    //     var tumb_position_initial = pageY - wind_coords.top - tumb_correction;
    //     var tumb_position_final = 0;
    //     var tumb_distance = result.self.clientHeight - tumb_coords.height - tumb_margin_bottom - tumb_margin_top;
    //     var tumb_distance_traveled = 0;
    //     var tumb_shift = 0;
    //
    //     var data_distance = data_coords.height - result.self.clientHeight;
    //     var data_position_finale = 0;
    //
    //     document.ontouchmove = function (e) {
    //         var pageY = e.targetTouches[0].pageY
    //         console.log(pageY);
    //
    //         tumb_shift = pageY - wind_coords.top - tumb_position_initial - tumb_correction;
    //         tumb_position_final = tumb_position_initial + tumb_shift;
    //
    //         if (tumb_position_final < tumb_position_min) {
    //             tumb_position_final = tumb_position_min;
    //         }
    //         if (tumb_position_final > tumb_position_max) {
    //             tumb_position_final = tumb_position_max;
    //         }
    //
    //         tumb_distance_traveled = tumb_position_final - tumb_position_min;
    //         data_position_finale = (-1) * (data_distance * tumb_distance_traveled / tumb_distance);
    //
    //         tumb.classList.remove("tumb_anim");
    //         tumb.style.top = tumb_position_final + 'px';
    //         data.style.top = data_position_finale + 'px'
    //     }
    //
    //     document.ontouchend = function () {
    //         document.ontouchmove = document.ontouchend = null;
    //     };
    //
    //     return false; // disable selection start (cursor change)
    // })

    tumb.ondragstart = function () {
        // Disable WebApi Drag&Drop
        return false;
    }

    //// SEARCH INPUT | SCROLL DRAG & DROP | touchscreen
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

})

function position() {

    var height = window.innerHeight;
    var box = document.querySelector(".index_box");
    var boxH = box.offsetHeight;
    var marginTop = 0.35 * height - boxH / 2;

    if (height > boxH && marginTop > 0) {
        box.style.marginTop = marginTop + "px";
    }
    else {
        box.style.marginTop = 0 + "px";
    }
}

function ajaxReq(word) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp_global = xmlhttp;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var data = JSON.parse(this.responseText);
            result.create(data.items);

            xmlhttp_global = null;
        }
    }

    xmlhttp.open("GET", "api.php?name_clan=" + encodeURIComponent(word), true);
    xmlhttp.send();
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        width: box.right - box.left,
        height: box.bottom - box.top
    };
}





















