<?php
/**
 *
 *
 *
 *
 *
 */




$connexion = connexionBD();



/**
 * établit le connexion à la base de données
 * @return mysqli {objet}
 */
function connexionBD()
{
    //$c = mysqli_connect("localhost", "root", "", "coc");
    $c = mysqli_connect("ro2000master59896.ipagemysql.com", "ro2000master_", "AhLchenal", "coc2");

    if(!$c)
        trigger_error("Erreur de connexion : " . mysqli_connect_error());

    mysqli_query($c, "SET NAMES 'utf8'");
    return $c;
}



/**
 *
 * Removes all spetial characters and not allow run any script
 *
 * @param $variable
 * @return string
 *
 */
function filtre($variable)
{
    global $connexion;
    //function that not allowing run any scripts
    $varFiltre = mysqli_real_escape_string($connexion, $variable);
    //function to remove any html tags exept b p a i
    $varFiltre = strip_tags($varFiltre);
    return $varFiltre;
}



/**
 * C’utilise pour reçoit le données de la base de données
 * @param $requete {string} - requete
 * @return bool|mysqli_result {bool/objet}
 */
function bd_obj ($requete)
{
    global $connexion;
    $resultat = mysqli_query($connexion, $requete);

    return mysqli_fetch_object($resultat);
}



/**
 * C’utilise pour reçoit le données de la base de données
 * sous form de tableau associativ
 *
 * @param $requete {string} - requete
 * @return array[] associatif
 */
function bd_array ($requete)
{
    global $connexion;
    $resultat = mysqli_query($connexion, $requete);

    $donnees = [];
    while($rangee = mysqli_fetch_assoc($resultat)){
        $donnees[] = $rangee;
    }

    return $donnees;
}