window.onload = function () {
  date()
  heure()
  JSON()

}


function date() {
  var now = new Date();
  var tab_mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
  var annee = now.getFullYear();
  var mois = tab_mois[now.getMonth()];
  var jour = now.getDate();
  res = jour + " " + mois + " " + annee
  document.getElementById("date").innerHTML = res
}

function heure() {
  var now = new Date();
  var heure = now.getHours();
  var minute = now.getMinutes();
  res = heure + "h" + minute
  document.getElementById("heure").innerHTML = res
}

function JSON() {
  let tab;
  let JsonOrder =
    //fetch("http://serveurlinux/~felixjuteau/miniprojet/index.php/getAllProducts")
    fetch("http://serveurlinux/~yanngouville/MiniProjetFoyer/index.php/getAllProducts")
  JsonOrder.then((r) => r.json())
    .then((data) => {
      gestioncommande(data)

    })
}

function gestioncommande(data) {
  nbproduit = Object.keys(data.produitsDispos).length;
  table = document.createElement('table');
  document.getElementById('Commande').appendChild(table);

  //Ligne commande
  lgn1 = document.createElement("tr");
  let titreCommande = document.createElement('td');
  titreCommande.innerHTML = "commande";
  lgn1.appendChild(titreCommande);
  table.appendChild(lgn1);
  titreCommande.setAttribute("colspan", "4");
  lgn1.setAttribute("class", "NumTable")
}
