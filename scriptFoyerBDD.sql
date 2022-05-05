drop DATABASE IF EXISTS foyerbdd_g1;

create DATABASE foyerbdd_g1;

use foyerbdd_g1;

CREATE TABLE produits (
 
  id_produit	    int(11) 	    NOT NULL AUTO_INCREMENT ,
  denomination		varchar(30)	    NOT NULL,
  qt_dispo			int(11)	        NOT NULL,
  prix	            decimal (3,2)   NOT NULL,
  peremption		date,	  
  	                PRIMARY KEY (id_produit)

) Engine = InnoDB character set utf8 collate utf8_unicode_ci;

INSERT INTO produits  
(denomination,qt_dispo,prix,peremption) VALUES
('café expresso',90,.40,"2022-11-01"),
('croissant',12,.80,"2021-12-29"),
('coca-cola 33cl',90,.90,"2022-06-01"),
('orangina 33 cl',70,.90,"2022-05-01"),
('kinder bueno',30,.60,"2022-05-11"),
('chocolat chaud',88,.50,"2023-01-01"),
('ice tea',72,.90,"2022-07-01"),
('snickers',50,.60,"2023-03-01");

CREATE TABLE tables
(
  id_table       int(11) NOT NULL AUTO_INCREMENT,
  numero         int(11) NOT NULL,
  lien_QRcode    varchar(100),
                 PRIMARY KEY (id_table)
) Engine = InnoDB character set utf8 collate utf8_unicode_ci;

INSERT INTO tables(numero) VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12);

CREATE TABLE commandes (

  id_commande      int(11) NOT NULL AUTO_INCREMENT,
  id_table         int(11) NOT NULL,
  email            varchar(50),
  confirmee        boolean NOT NULL,
  preparee         boolean NOT NULL,
  dateCommande     timestamp NOT NULL,
                   PRIMARY KEY (id_commande),
                   FOREIGN KEY (id_table) REFERENCES tables(id_table)
) Engine = InnoDB character set utf8 collate utf8_unicode_ci;

INSERT INTO commandes
(id_table, email,confirmee,preparee,dateCommande) VALUES
(1,"yann.gouville@free.fr",1,1,20220309000000),
(5,"yann.gouville@free.fr",1,0,20220313000001),
(6,"serge.legall@profs.institutlemonnier.fr",1,1,20220312000002),
(1,"serge.legall@profs.institutlemonnier.fr",1,0,20220313000003),
(7,"michel.marie@profs.institutlemonnier.fr",1,0,20220313000004),
(1,"mathis.lecam@eleves.institutlemonnier.fr",1,0,20220313000005);


CREATE TABLE detail_commandes(
  id_detail     int(11) NOT NULL AUTO_INCREMENT,
  id_commande   int(11) NOT NULL,
  id_produit    int(11) NOT NULL,
  qt_commandee  int(11) NOT NULL,
  cochee        boolean NOT NULL,
                PRIMARY KEY (id_detail),
                FOREIGN KEY (id_commande) REFERENCES commandes(id_commande),
                FOREIGN KEY (id_produit) REFERENCES produits(id_produit)

) Engine = InnoDB character set utf8 collate utf8_unicode_ci;

INSERT INTO detail_commandes
(id_commande, id_produit,qt_commandee,cochee) VALUES
(1,8,1,1),
(2,8,1,0),
(2,1,1,0),
(3,1,1,1),
(4,3,1,0),
(4,2,3,1),
(5,1,1,0),
(5,2,2,1),
(6,3,5,0),
(6,5,3,0),
(6,8,2,1),
(6,7,2,0),
(6,2,2,0);


CREATE TABLE users (
 
  id_user			 int(11) 	    NOT NULL AUTO_INCREMENT ,
  _login		     varchar(25)	NOT NULL,
  _password  		 varchar(32)	NOT NULL,
  accessLevel        int(11)        NOT NULL,
 	                 PRIMARY KEY (id_user) 
)Engine = InnoDB character set utf8 collate utf8_unicode_ci;

INSERT INTO users  
(_login,_password,accessLevel ) VALUES
('Gestionnaire','D534B96C9C231037A98126891EC898EB',0),
('Barman','EF749FF9A048BAD0DD80807FC49E1C0D',1);

