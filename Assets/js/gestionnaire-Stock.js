
import env from './env';

window.onload = function () {
  addEventListeners();
  date() //init fonction date
  heure() //init fonction heure
  JSONproduit()  //init fonction JSON
  JSONtable()


}




function addEventListeners() {

  const buttonEnvoyer = document.querySelector('#envoyer');
  buttonEnvoyer.addEventListener('click', JSONenvoiprod);

}

function date() {
  var now = new Date();
  var tab_mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
  var annee = now.getFullYear();
  var mois = tab_mois[now.getMonth()];
  var jour = now.getDate();
  var res = jour + " " + mois + " " + annee
  document.getElementById("date").innerHTML = res
}

function heure() {
  var now = new Date();
  var heure = now.getHours();
  var minute = now.getMinutes();
  var res = heure + "h" + minute
  document.getElementById("heure").innerHTML = res
}

function JSONproduit() {

  //fetch("http://serveurlinux/~felixjuteau/miniprojet/API/index.php/getAllProducts")
  //fetch("http://serveurlinux/~yanngouville/MiniProjetFoyer/index.php/getAllProducts")

  fetch(env.apiUrl + "/API/index.php/getAllProducts").then(res => res.json()).then(data => gestionstock(data));
}

function JSONenvoiprod() {
  let JsonOrder =
    //fetch("http://serveurlinux/~felixjuteau/miniprojet/API/index.php/getAllProducts")
    //fetch("http://serveurlinux/~yanngouville/MiniProjetFoyer/index.php/getAllProducts")

    fetch(env.apiUrl + "/API/index.php/getAllProducts");
  JsonOrder.then((r) => r.json())
    .then((data) => {
      modifStock(data)

    })
}

function JSONtable() {
  let JsonOrder =
    //fetch("http://serveurlinux/~felixjuteau/miniprojet/API/index.php/tables")
    fetch(env.apiUrl + "/API/index.php/tables")

  //fetch("http://serveurlinux/~yanngouville/MiniProjetFoyer/index.php/tables")
  JsonOrder.then((r) => r.json())
    .then((data) => {
      gestiontable(data)

    })
}

function JSONenvoietable() {
  let JsonOrder =
    //fetch("http://serveurlinux/~felixjuteau/miniprojet/API/index.php/tables")
    fetch(env.apiUrl + "/API/index.php/tables")

  //fetch("http://serveurlinux/~yanngouville/MiniProjetFoyer/index.php/tables")
  JsonOrder.then((r) => r.json())
    .then((data) => {
      return data;

    })
}

function gestionstock(data) {
  const nbproduit = data.produits.length;
  const table = document.createElement('table');
  document.getElementById('Stock').appendChild(table);

  //Ligne titre stock
  const lgn1 = document.createElement("tr");
  const titreStock = document.createElement('td');
  titreStock.innerHTML = "Stock";
  lgn1.appendChild(titreStock);
  table.appendChild(lgn1);
  titreStock.setAttribute("colspan", "4");
  lgn1.setAttribute("class", "NumTable")


  //Ligne Nom Produit+Quantite+Prix
  const lgn1_1 = document.createElement('tr');
  const produit = document.createElement('th');
  produit.innerHTML = "Produit";
  const quantite = document.createElement('th');
  quantite.innerHTML = "Quantite";
  const prix = document.createElement('th');
  prix.innerHTML = "Prix";
  const date = document.createElement('th');
  date.innerHTML = "Date";
  lgn1_1.appendChild(produit)
  produit.setAttribute("class", "titre")
  lgn1_1.appendChild(quantite)
  quantite.setAttribute("class", "titre")
  lgn1_1.appendChild(prix)
  prix.setAttribute("class", "titre")
  lgn1_1.appendChild(date)
  date.setAttribute("class", "titre")
  table.appendChild(lgn1_1)

  for (var i = 0; i < nbproduit; i++) {

    let lgn2 = document.createElement('tr');
    let produit_num = document.createElement('th');
    produit_num.innerHTML = '<input id="denomination' + data.produits[i]["id_produit"] + '"type= "text" value="' + data.produits[i]["denomination"] + '">';
    let quantite_num = document.createElement('th');
    quantite_num.innerHTML = '<input id="qt_dispo' + data.produits[i]["id_produit"] + '" name="qt_dispo" type= "number" min="0" step="0.1" value="' + data.produits[i]["qt_dispo"] + '">';
    let prix_num = document.createElement('th');
    prix_num.innerHTML = '<input  id="prix' + data.produits[i]["id_produit"] + '"type= "number" min="0" step="0.1" value="' + data.produits[i]["prix"] + '">';
    let date_num = document.createElement('th');
    date_num.innerHTML = '<input  id="peremption' + data.produits[i]["id_produit"] + '"type= "date"  value="' + data.produits[i]["peremption"] + '">';
    let supprimer = document.createElement('th');
    supprimer.innerHTML = '<input onclick="Supprimer(data.produits[i]["id_produit"])" type= "submit" ">';
    lgn2.appendChild(produit_num)
    produit_num.setAttribute("class", "titre")
    lgn2.appendChild(quantite_num)
    quantite_num.setAttribute("class", "titre")
    lgn2.appendChild(prix_num)
    prix_num.setAttribute("class", "titre")
    lgn2.appendChild(date_num)
    date_num.setAttribute("class", "titre")
    table.appendChild(lgn2)
  }
}
//fonction tables 

function gestiontable(data) {
  const nbtable = data.tables.length;
  const tables = document.createElement('table');
  document.getElementById('Table').appendChild(tables);

  //Ligne titre Tables
  const lgn2 = document.createElement("tr");
  let titreTables = document.createElement('td');
  titreTables.innerHTML = "Table";
  lgn2.appendChild(titreTables);
  tables.appendChild(lgn2);
  titreTables.setAttribute("colspan", "4");
  lgn2.setAttribute("class", "NumTable")

  let lgn2_1 = document.createElement('tr');
  let numero = document.createElement('th');
  numero.innerHTML = "Numéro";
  let qrcode = document.createElement('th');
  qrcode.innerHTML = "QrCode";
  lgn2_1.appendChild(numero)
  numero.setAttribute("class", "titre")
  lgn2_1.appendChild(qrcode)
  qrcode.setAttribute("class", "titre")
  tables.appendChild(lgn2_1)

  for (var i = 0; i < nbtable; i++) {

    let lgn2_2 = document.createElement('tr');
    let numero_num = document.createElement('th');
    numero_num.innerHTML = '<input type= "number" min="0" step="0.1" value="' + data.tables[i]["numero"] + '">';
    let qrcode_num = document.createElement('th');
    qrcode_num.innerHTML = '<input type= "text" value="' + data.tables[i]["lien_QRcode"] + '">';
    lgn2_2.appendChild(numero_num)
    numero_num.setAttribute("class", "titre")
    lgn2_2.appendChild(qrcode_num)
    qrcode_num.setAttribute("class", "titre")
    tables.appendChild(lgn2_2)
  }
}
function modifStock(data) {

  const nbproduit = data.produits.length;
  const tableau = [];
  for (let i = 0; i < nbproduit; i++) {
    const id = data.produits[i]["id_produit"];
    const produit = {
      id_produit: id,
      denomination: document.getElementById("denomination" + id).value,
      prix: document.getElementById("prix" + id).value,
      peremption: document.getElementById("peremption" + id).value,
      qt_dispo: document.getElementById("qt_dispo" + id).value
    };
    tableau.push(produit);

  }

  fetch(env.apiUrl + "/API/index.php/ModifStock ",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tableau)
    }).then(() => window.location.reload());
}