<?php
/**
 *
 * #8CQJLC0Q   МЫ - ВЗРОСЛЫЕ
 * #9JJ0QYUV   ЧПОК-ЧПОК-ЧПОК
 *
 *
 *
 * GET /clans                      https://api.clashofclans.com/v1/clans?name=%238CQJLC0Q
 * clan_api
 *
 * GET /clans/{clanTag}            https://api.clashofclans.com/v1/clans/%238CQJLC0Q
 * clan_api + description + members_api
 *
 * GET /players/{playerTag}        https://api.clashofclans.com/v1/players/%2389R8RY0JG
 * members_api + th level + ...
 *
 *
 *
 *
 */



$a_url    = array(  'clan_api'      =>  'https://api.clashofclans.com/v1/clans?name=%23',
                    'clan_members'  =>  'https://api.clashofclans.com/v1/clans/%23',
                    'member'        =>  'https://api.clashofclans.com/v1/players/%23');


$a_clans  = array(  '8CQJLC0Q'      =>  array('name'=>'МЫ - ВЗРОСЛЫЕ'),
                    '9JJ0QYUV'      =>  array('name'=>'ЧПОК-ЧПОК-ЧПОК'));





/**
 *
 * PAGE "login"
 *
 * Prepare les donnees pour page "login"
 * Ajout des members_api pour chaque clans dans array
 *
 * [ tagClan=> [nameClan,    +      ]... ]    <-    [[],[]...]
 * [ tagClan=> [nameClan, members_api[] ]... ]
 *
 * @param $url - link pour api [GET /clans/{clanTag}]
 * @param $a_clans  - arraay(predefini qui contien les tags des clans) ou on va ajouter des members_api
 *
 */
function donnees_login($url, &$a_clans){

    $allKeys = array_keys($a_clans);
    for ($i=0; $i<count($allKeys);$i++){
        // [[],[]...]] == [ [tagMember, nameMembers]... ]
        $members=[];

        // call api - donnees members_api
        $jsonClanMemb = api( $url, $allKeys[$i]);
        $aClanMemb = json_decode($jsonClanMemb);

        // [ [],[], + ]  <-  [tagMember, nameMembers]
        for ($e=0; $e<count($aClanMemb->memberList);$e++){
            $memb=[];
            $memb['tag'] = substr($aClanMemb->memberList[$e]->tag, 1);

            // enlever des guillemets parce que ca cause des problème dans parse json
            $rep_char = array('\'', '"', '\\');
            $memb['name'] = str_replace($rep_char, "", $aClanMemb->memberList[$e]->name);
            $members[] = $memb;
        }

        // [ tagClan=> [nameClan,    +      ]... ]    <-    [[],[]...]
        $a_clans[$allKeys[$i]]['members_api'] = $members;

        // [ tagClan=> [nameClan, members_api[] ]... ]
    }
}





/**
 *  PAGE Home
 *
 *
 */
function donnees_clan($a_url, $tag_clan, &$a_clan, &$a_members){


    // Préparation de données pour a_clan
    // ----------------------------------

    // call api clan_members[tag]
    $json_clan = api($a_url['clan_members'], $tag_clan);
    $a_clan = json_decode($json_clan);



    for ($e=0; $e<count($a_clan->memberList);$e++){
        // enlever des guillemets parce que ca cause des problème dans parse_json
        $a_clan->memberList[$e]->name = str_replace('\'', "", $a_clan->memberList[$e]->name);
        // tag user, enleve "#" de tag
        $a_clan->memberList[$e]->tag = substr($a_clan->memberList[$e]->tag, 1);
    }


    // Préparation de données pour a_members
    // -------------------------------------

    // [ tag->[], ... ]
    for ($i=0; $i<count($a_clan->memberList);$i++){

        // lir tag dans variable
        $tag = $a_clan->memberList[$i]->tag;

        // call api member[tag]
        $json_member = api($a_url['member'], $tag);
        $a_member = json_decode($json_member);

        // enleve des donnes inutile
        unset($a_member->achievements);

        // enlever des guillemets parce que ca cause des problème dans parse_json
        $a_member->name = str_replace('\'', "", $a_member->name);

        // [ tag->[],   +   ]
        $a_members[$tag] = $a_member;

        // [ tag->[], tag->[]  ...    ]

    }
}





/**
 *
 * Call API
 *
 * @param $url
 * @param $tag
 * @return {string}
 *
 */
function api($url, $tag){

    //setup the request, you can also use CURLOPT_URL
    $ch = curl_init($url . $tag);

    // HOME
    // $TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImVjOTBiYmZjLTYyMWQtNDczMC1hYzgxLTFjMDcwMDEyMmQyYyIsImlhdCI6MTUzMTY3NTUyNiwic3ViIjoiZGV2ZWxvcGVyL2FkMGU3YTc4LTgzM2EtNTMxMS05ZWVlLTY0Y2JlOGViZGNiNCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI0LjIwMy4yMDkuMTEyIl0sInR5cGUiOiJjbGllbnQifV19.bfu0XoSJgJu1vhlFrqFwqc6_cnpK7Y54SreU-MWKzJgWkQXcIlbv0-ZbSw5nACtAlFUuhL0a-jN4YX8yQb48FQ';

    // romangarstea.info/coc2/
    $TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMxYTQyZjUwLWE5MTMtNGU0YS1iNmIyLTljMDhlY2QxMzRkZSIsImlhdCI6MTUzMzczMTE1OCwic3ViIjoiZGV2ZWxvcGVyL2FkMGU3YTc4LTgzM2EtNTMxMS05ZWVlLTY0Y2JlOGViZGNiNCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjY2Ljk2LjE4My45MSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.rU3bRs1NZE66IE6ull6CDYQ6C7ZhlT9ShlJ2tfn9CbcXxx62dkby8itrDK-eC7mKXIXMollskc9pZTH88z2lng';

    // Returns the data/output as a string instead of raw data
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //Set your auth headers
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $TOKEN
    ));

    // get stringified data/output. See CURLOPT_RETURNTRANSFER
    $data = curl_exec($ch);

    // get info about the request
    $info = curl_getinfo($ch);

    // close curl resource to free up system resources
    curl_close($ch);

    return $data;
}

