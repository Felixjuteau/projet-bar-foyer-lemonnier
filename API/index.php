<?php

require('Route.php');
//include('/home/profsir/yanngouville/public_html/MiniProjetFoyer/API_Foyer.php');
include('API.php');

header('Access-Control-Allow-Origin: *');

$user="groupe1";
$mdp="Password1234g1";
$host = "localhost";
$port = "3306";
$base = "foyerbdd_g1";

$api = new API_Foyer($user, $mdp, $host, $port, $base);


// ensemble des methodes GET 

Route::add('/hello', function () {
    echo "welcome ";
}, 'get');



Route::add('/getAllProducts', function () {
    global $api;
    echo $api->getAllProducts();
}, 'get');

Route::add('/modifierProduits', function () {
    global $api;
    echo $api->modifierProduits();
}, 'post');

Route::add('/ajouterProduit', function () {
    global $api;
    echo $api->ajouterProduit();
}, 'post');

Route::add('/supprimerProduit', function () {
    global $api;
    echo $api->supprimerProduit();
}, 'post');



Route::add('/tables', function () {
    global $api;
    echo $api->getAllTables();
}, 'get');

Route::add('/modifierTables', function () {
    global $api;
    echo $api->modifierTables();
}, 'post');

Route::add('/ajouterTable', function () {
    global $api;
    echo $api->ajouterTable();
}, 'post');

Route::add('/supprimerTable', function () {
    global $api;
    echo $api->supprimerTable();
}, 'post');

Route::pathNotFound(function () {
    echo "Ce chemin n'existe pas";
});

Route::methodNotAllowed(function () {
    echo "Cette méthode n'existe pas";
});



//Route::run('/~felixjuteau/miniprojet/API/index.php');
//Route::run('/miniProjet/bar-foyer-lemonnier/API/index.php/');

Route::run('/API/index.php/');
