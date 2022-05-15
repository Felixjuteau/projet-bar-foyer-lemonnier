<?php
class API_Foyer
{
    private $Connec;
    function __construct($user, $mdp, $host, $port, $base)
    {
        $SourceName = 'mysql:dbname=' . $base . ';' . 'host=' . $host . ';port=' . $port . ';';
        try {
            $this->Connec = new PDO($SourceName, $user, $mdp);
        } catch (Exception $ex) {
            echo "erreur liee a la BDD :" . utf8_encode($ex->getMessage()) . "<br/>";
        }
    }


    public function getAllProducts()
    {

        $objPDOStatement = $this->Connec->query("SELECT * FROM produits");
        $result = $objPDOStatement->fetchall(PDO::FETCH_ASSOC);
        $produit = array();
        $produit['produits'] = $result;

        return json_encode($produit);
    }

    public function modifierProduits()
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);

        for ($i = 0; $i < count($obj); $i++) {

            $idProduit = $obj[$i]["idProduit"];
            $denomination = $obj[$i]["denomination"];
            $quantite = $obj[$i]["quantite"];
            $prix = $obj[$i]["prix"];
            $peremption = $obj[$i]["peremption"];

            $this->Connec->query("UPDATE produits SET denomination = '$denomination', qt_dispo = '$quantite', prix = '$prix', peremption = '$peremption' WHERE id_produit = '$idProduit';");
        }
    }

    public function ajouterProduit()
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);

        $denomination = $obj["denomination"];
        $quantite = $obj["quantite"];
        $prix = $obj["prix"];
        $peremption = $obj["peremption"];

        $this->Connec->query("INSERT INTO produits (denomination,qt_dispo,prix,peremption) VALUES ('$denomination', '$quantite', '$prix', '$peremption');");
    }


    public function supprimerProduit()
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);


        $idProduit = $obj["idProduit"];


        $this->Connec->query("DELETE FROM detail_commandes WHERE id_produit = '$idProduit';");
        $this->Connec->query("DELETE FROM produits WHERE id_produit = '$idProduit';");
    }

    public function getAllTables()
    {

        $objPDOStatement = $this->Connec->query("SELECT * FROM tables");
        $result = $objPDOStatement->fetchall(PDO::FETCH_ASSOC);
        $tables = array();
        $tables['tables'] = $result;

        return json_encode($tables);
    }

    public function modifierTables()
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);

        for ($i = 0; $i < count($obj); $i++) {

            $idTable = $obj[$i]["idTable"];
            $numero = $obj[$i]["numero"];
            $lienQRCode = $obj[$i]["qrcode"];

            $this->Connec->query("UPDATE tables SET numero = '$numero', lien_QRcode = '$lienQRCode' WHERE id_table = '$idTable';");
        }
    }

    public function ajouterTable()
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);

        $numero = $obj["numero"];
        $lienQRCode = $obj["qrcode"];

        $this->Connec->query("INSERT INTO tables (numero , lien_QRcode ) VALUES ('$numero','$lienQRCode');");
    }


    public function supprimerTable()
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);


        $idTable = $obj["idTable"];


        $this->Connec->query("DELETE FROM detail_commandes WHERE id_commande IN (SELECT id_commande FROM commandes WHERE id_table = '$idTable');");
        $this->Connec->query("DELETE FROM commandes WHERE id_table = '$idTable';");
        $this->Connec->query("DELETE FROM tables WHERE id_table = '$idTable';");
    }
}
?>