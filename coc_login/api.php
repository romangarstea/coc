<?php
/**
 * Created by PhpStorm.
 * User: ro200
 * Date: 7/15/2018
 * Time: 1:01 PM
 */



function api($url, $tag){

    //setup the request, you can also use CURLOPT_URL
    $ch = curl_init($url . $tag);
    $TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMxYTQyZjUwLWE5MTMtNGU0YS1iNmIyLTljMDhlY2QxMzRkZSIsImlhdCI6MTUzMzczMTE1OCwic3ViIjoiZGV2ZWxvcGVyL2FkMGU3YTc4LTgzM2EtNTMxMS05ZWVlLTY0Y2JlOGViZGNiNCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjY2Ljk2LjE4My45MSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.rU3bRs1NZE66IE6ull6CDYQ6C7ZhlT9ShlJ2tfn9CbcXxx62dkby8itrDK-eC7mKXIXMollskc9pZTH88z2lng';
    //Set your auth headers


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

$url  = "https://api.clashofclans.com/v1/clans?name=";
$name = urlencode($_GET["name_clan"])  . "&limit=20";

echo api($url, $name);