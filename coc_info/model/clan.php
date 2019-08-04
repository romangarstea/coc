<?php
/**
 *
 *
 *
 *
 */








function getUserDonneees($a_clan)
{

    global $connexion;
    $bd_users=[];
    for ($e=0; $e<count($a_clan->memberList);$e++){

        $tag = $a_clan->memberList[$e]->tag;
        $requete = 'SELECT tag, name, country, sity, age_clan, age_user, gmt 
                    FROM coc_users 
                    JOIN coc_users_coc ON id_user = id_user_ref 
                    WHERE tag = "'.$tag.'"';
        $resultat = mysqli_query($connexion, $requete);

        while($row = mysqli_fetch_assoc($resultat)){
            $bd_users[$row['tag']] = $row;
        }
    }

    // [ tag->[], ...]
    //        [tag, name, country, sity, age_clan, age_user, gmt]
    return $bd_users;
}





