<?php
/**
 *
 *   Elements de page
 *   ----------------
 *      > Bar de navigation
 *      > Description de clan_api
 *      > Table d'utilisateurs
 *      > Footer
 *      > Script > donnees pour JavaScript
 *
 *
 */
?>



<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>MyVzroslye</title>

    <!--adaptiv-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!--style-->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet/less" type="text/css" href="css/tableMembers.less" />

    <!--fonts-->
    <link rel="stylesheet" href="css/font-awesome.min.css">

    <!--scripts-->
    <script src="scripts/clan.js"></script>
    <script src="scripts/less.min.js"></script>

</head>



<body>
<section>

    <!-- Bar de navigation -->
    <header>
        <nav class="simple-nav">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Regulation</a></li>
                <li><a href="#">WAR</a></li>
                <li><a href="#">Rank</a></li>
            </ul>
        </nav>
    </header>


    <!--  Description Clan  -->
    <article>

        <div class="articleRow">
            <!--01 01-->
            <div class="articleCol">
                <div class="a11">
                    <div id="badge"></div>
                    <div class="badge_txt">
                        <div id="badge_txtNameClan"></div>
                        <div class="badge_elements">
                            <div id="badge_elementsTag"></div>
                            <div id="badge_elementsLocationFlag"><img src="image/ru.jpg" height="17" width="24"/></div>
                            <div id="badge_elementsLocationTxt">RUSSIA</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--01 02-->
            <div class="articleCol">
                <div class="a12">
                    <div class="a12_box">
                    <div class="a12_img"><img src="image/trophies_medium.png" height="39" width="37"/></div>
                    <div class="a12_txt">
                        <div class="txtBold" id="clanPoints"></div>
                        <div class="txtBt">Clan Points</div>
                    </div>
                    </div>
                    <div class="a12_box">
                    <div class="a12_img"><img src="image/atack.png" height="33" width="36"/></div>
                    <div class="a12_txt">
                        <div class="txtBold" id="warWins"></div>
                        <div class="txtBt">War Wins</div>
                    </div>
                    </div>
                    <div class="a12_box">
                    <div class="a12_img"><img src="image/members.png" height="35" width="35"/></div>
                    <div class="a12_txt">
                        <div class="txtBold" id="members"></div>
                        <div class="txtBt">Members</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="articleRow">
            <!--02 01-->
            <div class="articleCol">
                <div class="a21">
                    <div id="description"></div>
                </div>
            </div>
            <!--02 02-->
            <div class="articleCol">
                <div class="a22">
                    <div class="a22r">
                        <!--1-->
                        <div class="a22rc1">Средний возраст</div>
                        <div class="a22rc2">32</div>
                    </div>
                    <div class="a22r">
                        <!--2-->
                        <div class="a22rc1">Уровень цензуры</div>
                        <div class="a22rc2">умеренный</div>
                    </div>
                    <div class="a22r">
                        <!--3-->
                        <div class="a22rc1">Мадамы и месьё</div>
                        <div class="a22rc2"><span id="sexF" class="colRed">6</span>/36</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="articleRow">
            <!--03 01-->
            <div class="articleCol">
                <div class="a31">


                <!--    tableau     -->


                </div>
            </div>
            <!--03 02-->
            <div class="articleCol">
                <div class="a32">
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1">TH<span class="index_th">11</span></div>
                        <div class="a32rc2">6</div>
                    </div>
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1">TH<span class="index_th">10</span></div>
                        <div class="a32rc2">8</div>
                    </div>
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1">TH<span class="index_th">9</span></div>
                        <div class="a32rc2">9</div>
                    </div>
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1">TH<span class="index_th">8</span></div>
                        <div class="a32rc2">5</div>
                    </div>
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1">TH<span class="index_th">7</span></div>
                        <div class="a32rc2">16</div>
                    </div>
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1">TH<span class="index_th">6</span></div>
                        <div class="a32rc2">16</div>
                    </div>
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1">TH<span class="index_th">5...</span></div>
                        <div class="a32rc2">16</div>
                    </div>
                    <div class="a32r">
                        <!--1-->
                        <div class="a32rc1"><span class="index_th"></span></div>
                        <div class="a32rc2">16</div>
                    </div>
                </div>
            </div>
        </div>
    </article>






    <!--  Table d'utilisateurs  -->
    <div class="tabMembers">
        <div class="tabMembersRow title">

            <!-- ************************************************************************ -->
            <!-- 01. Nr -->
            <!-- ************************************************************************ -->
            <div class="nr ac" id="sortNr">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 02. Rank  -->
            <!-- ************************************************************************ -->
            <div class="rank ac" id="sortClanRank">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 03. League -->
            <!-- ************************************************************************ -->
            <div class="league">
            </div>


            <!-- ************************************************************************ -->
            <!-- 04. Trophies -->
            <!-- ************************************************************************ -->
            <div class="trophies ac" id="sortTrophies">
                <div style="width: 80px">
                    <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
                </div>
            </div>


            <!-- ************************************************************************ -->
            <!-- 05. Level  -->
            <!-- ************************************************************************ -->
            <div class="level" id="sortLevel">
                <div style="width: 40px; text-align: center">
                    <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
                </div>
            </div>


            <!-- ************************************************************************ -->
            <!-- 06. Star  -->
            <!-- ************************************************************************ -->
            <div class="warStars" id="sortWarStars">
                <div style="width: 40px; text-align: center">
                    <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
                </div>
            </div>


            <!-- ************************************************************************ -->
            <!-- 07. TH  -->
            <!-- ************************************************************************ -->
            <div class="th" id="sortTh1">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 08. Nick  <i class="pl1">  -->
            <!-- ************************************************************************ -->
            <div class="nik" id="sortNik">
                <i class="fa fa-sort-desc sort pl1" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 09. Old  -->
            <!-- ************************************************************************ -->
            <div class="age ac" id="sortAge">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 10. Name  -->
            <!-- ************************************************************************ -->
            <div class="name" id="sortName">
                <i class="fa fa-sort-desc sort pl1" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 11. Time  -->
            <!-- ************************************************************************ -->
            <div class="time ac" id="sortTime">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 12. Time Index  -->
            <!-- ************************************************************************ -->
            <div class="timeIndex" id="sortTimeIndex">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 13. Country  -->
            <!-- ************************************************************************ -->
            <div class="country" id="sortCountry">
                <i class="fa fa-sort-desc sort pl1" aria-hidden="true"></i>
            </div>

            <!-- ************************************************************************ -->
            <!-- 14. City  -->
            <!-- ************************************************************************ -->
            <div class="city" id="sortCity">
                <i class="fa fa-sort-desc sort pl1" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 15. Status  -->
            <!-- ************************************************************************ -->
            <div class="status ac" id="sortRole">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 16. Old  -->
            <!-- ************************************************************************ -->
            <div class="old ac" id="sortOld">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 17. Troops  -->
            <!-- ************************************************************************ -->
            <div class="troops ac" id="sortTroops">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>


            <!-- ************************************************************************ -->
            <!-- 18. TH  -->
            <!-- ************************************************************************ -->
            <div class="th" id="sortTh2">
                <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
            </div>

        </div>
    </div>
    <div id="table"></div>






    <!-- Footer  -->
    <footer>
    </footer>

    <script>
        var clan_api     = JSON.parse('<?php echo ($json_clan_api     ); ?>');
        var members_api  = JSON.parse('<?php echo ($json_members_api  ); ?>');
        var members_bd   = JSON.parse('<?php echo ($json_members_bd   ); ?>');
    </script>

</section>
</body>

</html>

