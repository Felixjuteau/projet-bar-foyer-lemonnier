import env from "./env";

window.onload = function () {
  addEventListeners();
  date(); //init fonction date
  heure(); //init fonction heure
  recupererProduits(); //init fonction JSON
  recupererTables();
};

function addEventListeners() {
  //récuperer les events des boutons

  const btnModifierProduits = document.querySelector("#btnModifierProduits");
  btnModifierProduits.addEventListener("click", modifierProduits);

  const btnAjouterProduit = document.querySelector("#btnAjouterProduit");
  btnAjouterProduit.addEventListener("click", ajouterProduit);

  const btnModifierTables = document.querySelector("#btnModifierTables");
  btnModifierTables.addEventListener("click", modifierTables);

  const btnAjouterTable = document.querySelector("#btnAjouterTable");
  btnAjouterTable.addEventListener("click", ajouterTable);
}

function date() {
  var now = new Date();
  var tab_mois = new Array(
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juilconst",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  );
  var annee = now.getFullYear();
  var mois = tab_mois[now.getMonth()];
  var jour = now.getDate();
  var res = jour + " " + mois + " " + annee;
  document.getElementById("date").innerHTML = res;
}

function heure() {
  var now = new Date();
  var heure = now.getHours();
  var minute = now.getMinutes();
  var res = heure + "h" + minute;
  document.getElementById("heure").innerHTML = res;
}

var listProduits = [];
var listTables = [];

function recupererProduits() {
  fetch(env.apiUrl + "getAllProducts")
    .then((res) => res.json())
    .then((data) => {
      listProduits = data.produits;
      gestionStock();
    });
}

function modifierProduits() {
  const nbproduit = listProduits.length;
  const tableau = new Array();
  for (let i = 0; i < nbproduit; i++) {
    const id = listProduits[i]["id_produit"];
    const produit = {
      idProduit: id,
      denomination: document.getElementById("denomination" + id).value,
      prix: document.getElementById("prix" + id).value,
      peremption: document.getElementById("peremption" + id).value,
      quantite: document.getElementById("qt_dispo" + id).value,
    };
    if(produit.denomination===''
        || produit.denomination == null
        || isNaN(produit.quantite)
        || produit.quantite<0
        || produit.quantite===''
        || isNaN(produit.prix)
        || produit.prix<0
        || produit.prix===''
        || produit.peremption==null
        || produit.peremption===''
        ){
            window.alert("Erreur de syntaxe à la ligne " +(i+1));
            return
        }
    tableau.push(produit);
  }

  fetch(env.apiUrl + "modifierProduits ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tableau),
  }).then(() => window.location.reload());
}

function gestionStock() {
  const nbproduit = listProduits.length;
  const table = document.createElement("table");
  document.getElementById("Stock").appendChild(table);
  table.setAttribute("id", "tableStock");

  //Ligne titre stock
  const ligne = document.createElement("tr");
  const titreStock = document.createElement("td");
  titreStock.innerHTML = "Stock";
  ligne.appendChild(titreStock);
  table.appendChild(ligne);
  titreStock.setAttribute("colspan", "5");
  ligne.setAttribute("class", "NumTable");

  //Ligne Nom Produit+Quantite+Prix
  const ligneTitres = document.createElement("tr");

  const colonneTitreNom = document.createElement("th");
  const colonneTitreQuantite = document.createElement("th");
  const colonneTitrePrix = document.createElement("th");
  const colonneTitreDate = document.createElement("th");
  const colonneTitreActions = document.createElement("th");

  colonneTitreNom.innerHTML = "Produit";
  colonneTitreQuantite.innerHTML = "Quantite";
  colonneTitrePrix.innerHTML = "Prix";
  colonneTitreDate.innerHTML = "Date";
  colonneTitreActions.innerHTML = "Actions";

  colonneTitreNom.setAttribute("class", "titre");
  colonneTitreQuantite.setAttribute("class", "titre");
  colonneTitrePrix.setAttribute("class", "titre");
  colonneTitreDate.setAttribute("class", "titre");
  colonneTitreActions.setAttribute("class", "titre");

  ligneTitres.appendChild(colonneTitreNom);
  ligneTitres.appendChild(colonneTitreQuantite);
  ligneTitres.appendChild(colonneTitrePrix);
  ligneTitres.appendChild(colonneTitreDate);
  ligneTitres.appendChild(colonneTitreActions);

  table.appendChild(ligneTitres);

  for (var i = 0; i < nbproduit; i++) {
    const ligneProduit = document.createElement("tr");

    const colonneNomProduit = document.createElement("td");
    colonneNomProduit.innerHTML =
      '<input id="denomination' +
      listProduits[i]["id_produit"] +
      '"type= "text" value="' +
      listProduits[i]["denomination"] +
      '">';
    ligneProduit.appendChild(colonneNomProduit);
    colonneNomProduit.setAttribute("class", "titre");

    const colonneQuantiteProduit = document.createElement("td");
    colonneQuantiteProduit.innerHTML =
      '<input id="qt_dispo' +
      listProduits[i]["id_produit"] +
      '" name="qt_dispo" type= "number" min="0" step="0.1" value="' +
      listProduits[i]["qt_dispo"] +
      '">';
    ligneProduit.appendChild(colonneQuantiteProduit);
    colonneQuantiteProduit.setAttribute("class", "titre");

    const colonnePrixProduit = document.createElement("td");
    colonnePrixProduit.innerHTML =
      '<input  id="prix' +
      listProduits[i]["id_produit"] +
      '"type= "number" min="0" step="0.1" value="' +
      listProduits[i]["prix"] +
      '">';
    ligneProduit.appendChild(colonnePrixProduit);
    colonnePrixProduit.setAttribute("class", "titre");

    const colonneDatePeremptionProduit = document.createElement("td");
    colonneDatePeremptionProduit.innerHTML =
      '<input  id="peremption' +
      listProduits[i]["id_produit"] +
      '"type= "date"  value="' +
      listProduits[i]["peremption"] +
      '">';
    ligneProduit.appendChild(colonneDatePeremptionProduit);
    colonneDatePeremptionProduit.setAttribute("class", "titre");

    const colonneBtnSupprimer = document.createElement("td");
    const btnSupprimer = document.createElement("input");
    btnSupprimer.setAttribute("type", "button");
    btnSupprimer.setAttribute("value", "🗑");
    btnSupprimer.setAttribute("class", "titre");
    btnSupprimer.idProduit = listProduits[i]["id_produit"];
    btnSupprimer.addEventListener("click", supprimerProduit);
    colonneBtnSupprimer.appendChild(btnSupprimer);

    ligneProduit.appendChild(colonneBtnSupprimer);

    table.appendChild(ligneProduit);
  }
}

function supprimerProduit(event) {
  fetch(env.apiUrl + "supprimerProduit ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idProduit: event.currentTarget.idProduit }),
  }).then(() => window.location.reload());
}

function ajouterProduit() {
  const tableProduit = document.getElementById("tableStock");

  const ligneFormProduit = document.createElement("tr");
  ligneFormProduit.setAttribute("id", "ligneFormProduit");

  const colonneNom = document.createElement("td");
  const colonneQuantite = document.createElement("td");
  const colonnePrix = document.createElement("td");
  const colonneDate = document.createElement("td");
  const colonneActions = document.createElement("td");

  colonneNom.innerHTML = '<input type="text" id="formNomProduit" />';
  colonneQuantite.innerHTML =
    '<input type="number" id="formQuantiteProduit" />';
  colonnePrix.innerHTML = '<input type="number" id="formPrixProduit" />';
  colonneDate.innerHTML = '<input type="date" id="formDateProduit" />';

  const btnAjouterProduit = document.createElement("input");
  btnAjouterProduit.setAttribute("type", "button");
  btnAjouterProduit.setAttribute("value", "✅");
  btnAjouterProduit.setAttribute("class", "titre");
  btnAjouterProduit.addEventListener("click", validerAjoutProduit);
  colonneActions.appendChild(btnAjouterProduit);

  const btnAnnulerProduit = document.createElement("input");
  btnAnnulerProduit.setAttribute("type", "button");
  btnAnnulerProduit.setAttribute("value", "🗑");
  btnAnnulerProduit.setAttribute("class", "titre");
  btnAnnulerProduit.addEventListener("click", annulerAjoutProduit);
  colonneActions.appendChild(btnAnnulerProduit);

  colonneNom.setAttribute("class", "titre");
  colonneQuantite.setAttribute("class", "titre");
  colonnePrix.setAttribute("class", "titre");
  colonneDate.setAttribute("class", "titre");
  colonneActions.setAttribute("class", "titre");

  ligneFormProduit.appendChild(colonneNom);
  ligneFormProduit.appendChild(colonneQuantite);
  ligneFormProduit.appendChild(colonnePrix);
  ligneFormProduit.appendChild(colonneDate);
  ligneFormProduit.appendChild(colonneActions);

  tableProduit.appendChild(ligneFormProduit);

  document.getElementById("btnAjouterProduit").setAttribute("disabled", true);
}

function validerAjoutProduit() {
  const produit = {
    denomination: document.getElementById("formNomProduit").value,
    quantite: document.getElementById("formQuantiteProduit").value,
    prix: document.getElementById("formPrixProduit").value,
    peremption: document.getElementById("formDateProduit").value,
    
  };

  if(produit.denomination===''
  || produit.denomination == null
  || isNaN(produit.quantite)
  || produit.quantite<0
  || isNaN(produit.prix)
  || produit.prix<0
  || produit.peremption==null
  || produit.peremption===''
  ){
      window.alert("Erreur de syntaxe dans le formulaire d'ajout de produit ");
      return
  }
  fetch(env.apiUrl + "ajouterProduit ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produit),
  }).then(() => window.location.reload());
  document.getElementById("btnAjouterProduit").removeAttribute("disabled");
}

function annulerAjoutProduit() {
  const ligneFormProduit = document.getElementById("ligneFormProduit");
  ligneFormProduit.remove();
  document.getElementById("btnAjouterProduit").removeAttribute("disabled");
}

//fonction tables

function recupererTables() {
  fetch(env.apiUrl + "tables")
    .then((r) => r.json())
    .then((data) => {
      listTables = data.tables;
      gestionTable();
    });
}

function gestionTable() {
  const nbtable = listTables.length;
  const table = document.createElement("table");
  document.getElementById("Table").appendChild(table);
  table.setAttribute("id", "tableTable");

  //Ligne titre Tables
  const ligne = document.createElement("tr");

  const titreTables = document.createElement("td");
  titreTables.innerHTML = "Table";
  titreTables.setAttribute("colspan", "3");

  ligne.setAttribute("class", "NumTable");
  ligne.appendChild(titreTables);
  table.appendChild(ligne);

  const ligneTitre = document.createElement("tr");
  const colonneTitreNumero = document.createElement("th");
  const colonneTitreQrCode = document.createElement("th");
  const colonneTitreActions = document.createElement("th");

  colonneTitreNumero.innerHTML = "Numéro";
  colonneTitreNumero.setAttribute("class", "titre");
  ligneTitre.appendChild(colonneTitreNumero);

  colonneTitreQrCode.innerHTML = "QrCode";
  colonneTitreQrCode.setAttribute("class", "titre");
  ligneTitre.appendChild(colonneTitreQrCode);

  colonneTitreActions.innerHTML = "Actions";
  colonneTitreActions.setAttribute("class", "titre");
  ligneTitre.appendChild(colonneTitreActions);

  table.appendChild(ligneTitre);

  for (var i = 0; i < nbtable; i++) {
    const ligneTable = document.createElement("tr");

    const colonneNumeroTable = document.createElement("td");
    colonneNumeroTable.innerHTML =
      '<input id="numero' +
      listTables[i]["id_table"] +
      '"  type= "number" min="0" step="0.1" value="' +
      listTables[i]["numero"] +
      '">';
    colonneNumeroTable.setAttribute("class", "titre");
    ligneTable.appendChild(colonneNumeroTable);

    const colonneQRCodeTable = document.createElement("td");
    colonneQRCodeTable.innerHTML =
      '<input id="qrcode' +
      listTables[i]["id_table"] +
      '" type= "text" value="' +
      listTables[i]["lien_QRcode"] +
      '">';
    colonneNumeroTable.setAttribute("class", "titre");
    ligneTable.appendChild(colonneQRCodeTable);

    const colonneBtnSupprimer = document.createElement("td");
    const btnSupprimer = document.createElement("input");
    btnSupprimer.setAttribute("type", "button");
    btnSupprimer.setAttribute("value", "🗑");
    btnSupprimer.setAttribute("class", "titre");
    btnSupprimer.idTable = listTables[i]["id_table"];
    btnSupprimer.addEventListener("click", supprimerTable);
    colonneBtnSupprimer.appendChild(btnSupprimer);

    ligneTable.appendChild(colonneBtnSupprimer);

    table.appendChild(ligneTable);
  }
}

function modifierTables() {
  const nbTables = listTables.length;
  const tableau = new Array();
  for (let i = 0; i < nbTables; i++) {
    const id = listTables[i]["id_table"];
    const table = {
      idTable: id,
      numero: document.getElementById("numero" + id).value,
      qrcode: document.getElementById("qrcode" + id).value,
    };
    if(isNaN(table.numero)
        ||table.numero===''
        ||table.numero<=0
        ||table.qrcode===null
        ||table.qrcode===''
        ){
            window.alert("Erreur de syntaxe à la ligne " +(i+1));
            return
        }
            tableau.push(table);
  }

  fetch(env.apiUrl + "modifierTables ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tableau),
  }).then(() => window.location.reload());
}

function validerAjoutTable() {
  const table = {
    numero: document.getElementById("formNumeroTable").value,
    qrcode: document.getElementById("formQRCodeTable").value,
    
  };
  if(isNaN(table.numero)
  ||table.numero===''
  ||table.numero<=0
  ||table.qrcode===null
  ||table.qrcode===''
  ){
      window.alert("Erreur de syntaxe au formulaire d'ajout de table ");
      return
  }
  document.getElementById("btnAjouterTable").removeAttribute("disabled");
  fetch(env.apiUrl + "ajouterTable ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(table),
  }).then(() => window.location.reload());
}

function annulerAjoutTable() {
  const ligneFormTable = document.getElementById("ligneFormTable");
  ligneFormTable.remove();
  document.getElementById("btnAjouterTable").removeAttribute("disabled");
}

function supprimerTable(event) {
  fetch(env.apiUrl + "supprimerTable ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idTable: event.currentTarget.idTable }),
  }).then(() => window.location.reload());
}

function ajouterTable() {
  const tableTable = document.getElementById("tableTable");

  const ligneFormTable = document.createElement("tr");
  ligneFormTable.setAttribute("id", "ligneFormTable");

  const colonneNumero = document.createElement("td");
  const colonneQRCode = document.createElement("td");

  const colonneActions = document.createElement("td");

  colonneNumero.innerHTML = '<input type="number" id="formNumeroTable" />';
  colonneQRCode.innerHTML = '<input type="text" id="formQRCodeTable" />';

  const btnAjouterTable = document.createElement("input");
  btnAjouterTable.setAttribute("type", "button");
  btnAjouterTable.setAttribute("value", "✅");
  btnAjouterTable.setAttribute("class", "titre");
  btnAjouterTable.addEventListener("click", validerAjoutTable);
  colonneActions.appendChild(btnAjouterTable);

  const btnAnnulerTable = document.createElement("input");
  btnAnnulerTable.setAttribute("type", "button");
  btnAnnulerTable.setAttribute("value", "🗑");
  btnAnnulerTable.setAttribute("class", "titre");
  btnAnnulerTable.addEventListener("click", annulerAjoutTable);
  colonneActions.appendChild(btnAnnulerTable);

  colonneNumero.setAttribute("class", "titre");
  colonneQRCode.setAttribute("class", "titre");
  colonneActions.setAttribute("class", "titre");

  ligneFormTable.appendChild(colonneNumero);
  ligneFormTable.appendChild(colonneQRCode);
  ligneFormTable.appendChild(colonneActions);

  tableTable.appendChild(ligneFormTable);
  document.getElementById("btnAjouterTable").setAttribute("disabled", true);

}
