<?php
    class API_Foyer{
        private $Connec;
        function __construct($user,$mdp,$host,$base){
            $SourceName='mysql:dbname='.$base.';'.'host='.$host;
            try{
                $this->Connec=new PDO($SourceName,$user,$mdp);
            }
        
            catch(Exception $ex){
                echo "erreur liee a la BDD :".utf8_encode($ex->getMessage())."<br/>";
            }
        }
    
        public function tables(){

            $objPDOStatement = $this->Connec->query("SELECT * FROM tables");
            $result= $objPDOStatement->fetchall(PDO::FETCH_ASSOC);
            $tables=array();
            $tables['tables']=$result;

            return json_encode($tables);
            
        }

        public function getAllProducts(){

            $objPDOStatement = $this->Connec->query("SELECT * FROM produits");
            $result= $objPDOStatement->fetchall(PDO::FETCH_ASSOC);
            $produit=array();
            $produit['produits']=$result;

            return json_encode($produit);

            
        }

        public function ModifStock()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, true);

            
            for($i=0;$i<count($obj);$i++){

                $id_produit = $obj[$i]["id_produit"];
                $denomination = $obj[$i]["denomination"];
                $qt_dispo = $obj[$i]["qt_dispo"];
                $prix = $obj[$i]["prix"];
                $peremption = $obj[$i]["peremption"];

                $this->Connec->query("UPDATE produits SET denomination = '$denomination', qt_dispo = '$qt_dispo', prix = '$prix', peremption = '$peremption' WHERE id_produit = '$id_produit';");

            }   
        }
    }

?>
