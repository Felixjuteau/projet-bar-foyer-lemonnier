window.onload=function(){
  date()
  heure()
  JSON()
}

function date() {
  var now = new Date();
  var tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
  var annee   = now.getFullYear();
  var mois    = tab_mois[now.getMonth()];
  var jour    = now.getDate();
  res = jour+" "+mois+" "+annee
  document.getElementById("date").innerHTML = res
}

function heure() {
  var now = new Date();
  var heure   = now.getHours();
  var minute  = now.getMinutes();
  res = heure+"h"+minute
  document.getElementById("heure").innerHTML = res
}

function JSON() {
  let tab;
  let JsonOrder = 
  //fetch("http://serveurlinux/~felixjuteau/miniprojet/index.php/getPendingOrders")
  fetch("http://serveurlinux/~yanngouville/MiniProjetFoyer/index.php/getPendingOrders")
  JsonOrder.then((r)=>r.json())
  .then((data) => 
  {
    CommandeEnCours(data)

  })
}



function CommandeEnCours(data) {

  /*
  Une Commandes :                 ReadJsonOrder.cmdEnCours[0]
  ID Commande :                   ReadJsonOrder.cmdEnCours[0]["idCommande"]
  Num table :                     ReadJsonOrder.cmdEnCours[0]["numTable"]
  Récuperer un produit            ReadJsonOrder.cmdEnCours[0]["produit"][0]["denomination"]
  Récuperer quantite d'un produit ReadJsonOrder.cmdEnCours[0]["produit"][0]["quantite"]
  Coche oui ou non ?              ReadJsonOrder.cmdEnCours[0]["produit"][0]["cochee"]
  */

  ReadJsonOrder=data
  NbCommande=Object.keys(ReadJsonOrder.cmdEnCours).length;
  document.getElementById("nborder").innerHTML=NbCommande
  var table=new Array()

 
        //Création tableau
        //Boucle Commande
        for (var i = 0; i < NbCommande; i++) {

          table[i] = document.createElement('table');
          document.getElementById('Commande').appendChild(table[i]);
          table[i].setAttribute("class", "tableau"+i);
          
            //Ligne NumTable + IDCommande
            lgn1 = document.createElement("tr");
            let NumTable_num = document.createElement('td');
            NumTable_num.innerHTML = "Num table";
            let NumTable_num2 = document.createElement('td');
            NumTable_num2.innerHTML = ReadJsonOrder.cmdEnCours[i]["numTable"] ;
            lgn1.appendChild(NumTable_num);
            lgn1.appendChild(NumTable_num2);
            table[i].appendChild(lgn1)
            NumTable_num.setAttribute("colspan", "2");
            NumTable_num2.setAttribute("colspan", "2");
            lgn1.setAttribute("class","NumTable")
      
           
            //Ligne Nom Produit+Quantite+Cochee
            let lgn2_1 = document.createElement('tr');
            let produit = document.createElement('th');
            produit.innerHTML = "Produit";
            let quantite = document.createElement('th');
            quantite.innerHTML = "Quantite";
            let cochee = document.createElement('th');
            cochee.innerHTML = "Etat";
            let check = document.createElement('th');
            check.innerHTML = "Check";
            lgn2_1.appendChild(produit)
            produit.setAttribute("class","titre")
            lgn2_1.appendChild(quantite)
            quantite.setAttribute("class","titre")
            lgn2_1.appendChild(cochee)
            cochee.setAttribute("class","titre")
            lgn2_1.appendChild(check)
            check.setAttribute("class","titre")
            table[i].appendChild(lgn2_1)

            NbProduit=Object.keys(ReadJsonOrder.cmdEnCours[i]["produit"]).length;

            for (var j = 0; j < NbProduit; j++) {

                id_check=(i).toString()+(j).toString()

                //Ligne liste Produit+Quantite+Cochee
                let lgn2_2 = document.createElement('tr');
                produit_num=document.createElement('td');
                produit_num.innerHTML = ReadJsonOrder.cmdEnCours[i]["produit"][j]["denomination"];
                quantite_num=document.createElement('td');
                quantite_num.innerHTML = ReadJsonOrder.cmdEnCours[i]["produit"][j]["quantite"];
                cochee_num=document.createElement('td');
                cochee_num.setAttribute("id",id_check+"etat")


                check_up=document.createElement('td');
                check_up.innerHTML = '<input type="checkbox" class="check" id="'+i+j+'" onclick=check(this.id)>'


                lgn2_2.appendChild(produit_num)
                lgn2_2.appendChild(quantite_num)
                lgn2_2.appendChild(cochee_num)
                lgn2_2.appendChild(check_up)
                table[i].appendChild(lgn2_2)

                
                if(ReadJsonOrder.cmdEnCours[i]["produit"][j]["cochee"]==1)
                {cochee_num.innerHTML ="Prêt";
                document.getElementById(id_check).checked = true
                
               } 
                else {cochee_num.innerHTML ="En préparation...";}
          }
        }      
}

function check(id_check){

  if(document.getElementById(id_check).checked == false)
  {
    document.getElementById(id_check+"etat").innerHTML ="En préparation...";
    document.getElementById(id_check).checked = false
  }
  else{
    document.getElementById(id_check+"etat").innerHTML ="Prêt";
    document.getElementById(id_check).checked = true
  
  }
    
}
