<?php
/**
 * Created by PhpStorm.
 * User: ro200
 * Date: 2/8/2018
 * Time: 3:37 PM
 */






if(!isset($_REQUEST['action'])){
    $_REQUEST['action'] = "clan";
}





switch ($_REQUEST['action']) {

    case 'login':

        require_once('api/api.php');
        donnees_login($a_url['clan_members'], $a_clans);
        $json = json_encode($a_clans, JSON_UNESCAPED_UNICODE);



        require_once("db/db.php");
        require_once("model/login.php");

        if(isset($_POST["tag_user"]) && isset($_POST["password"])){
            if(autentification($_POST["tag_user"], $_POST["password"])){
                header('Location: index.php?action=clan&tag_clan='.$_POST['tag_clan'].'&tag_user='.$_POST["tag_user"]);
            }
            else{
                require_once("login.php");
            }
        }
        else{
            require_once("login.php");
        }
        break;




    case 'clan':

        //TEST
        $_GET['tag_clan'] = '8CQJLC0Q';
        $_GET['tag_user'] = '89R8RY0JG';


        // donnees api
        require_once('api/api.php');
        $a_clan    =[];
        $a_members =[];
        donnees_clan($a_url, $_GET['tag_clan'], $a_clan, $a_members);
        $json_clan_api     = json_encode($a_clan,    JSON_UNESCAPED_UNICODE);
        $json_members_api  = json_encode($a_members, JSON_UNESCAPED_UNICODE);


        // donnees bd
        require_once('db/db.php');
        require_once('model/clan.php');
        $members_bd      = getUserDonneees($a_clan);
        $json_members_bd = json_encode($members_bd,    JSON_UNESCAPED_UNICODE);


        require_once("clan.php");
        break;


    case 'autorisation':

        break;



    default:
        break;
}

