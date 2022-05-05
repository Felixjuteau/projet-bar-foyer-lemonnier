<?php

require('Route.php');
//include('/home/profsir/yanngouville/public_html/MiniProjetFoyer/API_Foyer.php');
include('API.php');

header('Access-Control-Allow-Origin: *');

$user="groupe1";
$mdp="Password1234g1";
$host="localhost";
$base="foyerbdd_g1";
$api=new API_Foyer($user,$mdp,$host,$base);


// ensemble des methodes GET 

Route::add('/hello',function(){
    echo "welcome ";
},'get');

Route::add('/tables',function(){
    global $api;
     echo $api->tables() ;
 },'get');

Route::add('/getAvailableProducts',function(){
    global $api;
     echo $api->getAvailableProducts() ;
 },'get');


 Route::add('/getPendingOrders',function(){
    global $api;
     echo $api->getPendingOrders() ;
 },'get');

 
 Route::add('/getAllProducts',function(){
    global $api;
     echo $api->getAllProducts() ;
 },'get');

 Route::add('/validateOrder',function(){
    global $api;
     echo $api->validateOrder() ;
 },'get');
/*
 Route::add('/isAlreadyPreordered',function(){
    global $api;
     echo $api->isAlreadyPreordered() ;
 },'get');


// ensemble des méthodes POST
*/

Route::add('/ModifStock',function(){
    global $api;
     echo $api->ModifStock() ;
 },'post');
 
Route::add('/authentication',function(){
    global $api;
    header('Content-Type:application/json');
    echo $api->authentication() ;
},'post');
/*
Route::add('/order',function(){
    global $api;
     echo $api->order() ;
 },'post');
*/
 Route::add('/preorder',function(){
    global $api;
     echo $api->preorder() ;
 },'post');
/*
// ensemble des methodes PUT

Route::add('/orderReady',function(){
    global $api;
     echo $api->orderReady() ;
 },'put');

 */
//gestion des messages d'erreur

Route::pathNotFound(function(){
    echo "Ce chemin n'existe pas";
});

Route::methodNotAllowed(function() {
    echo "Cette méthode n'existe pas";
});



//Route::run('/~felixjuteau/miniprojet/API/index.php');

Route::run('/miniProjet/bar-foyer-lemonnier/API/index.php/');

