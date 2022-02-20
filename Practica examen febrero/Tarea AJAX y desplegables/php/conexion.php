<?php
    class Conexion {
        private $_conn = NULL;
        public function __construct() {
        
        }
    
        public function conectar() {
            try {
                $this ->_conn = new PDO("mysql:host=localhost;dbname=spain","root","");
            } catch (PDOException $e){
                echo "Error ".$e->getMessage();
            }
            return $this->_conn;
        }
    }

?>