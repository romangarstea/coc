<?php
/**
 *
 *
 *
 *
 */


/**
 *
 * @param $UserName
 * @param $Password
 * @return bool
 */
function autentification($UserName, $Password)
{
    global $connexion;

    $requete = 'SELECT tag, coc_users.Password 
                FROM coc_users_coc
                JOIN coc_users ON coc_users_coc.id_user_ref = coc_users.id_user
                WHERE coc_users_coc.tag = "' . filtre($UserName) .'"';

    $resultat = mysqli_query($connexion, $requete);

    if($row = mysqli_fetch_assoc($resultat))
    {
        if( password_verify(filtre($Password), $row['Password']) && $UserName === $row['tag'])
        {
            return true;
        }
        else {
            return false;
        }
    }
    else
    {
        return false;
    }
}
