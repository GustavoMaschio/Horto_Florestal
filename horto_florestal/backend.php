<?php
$host = "seu_host";
$user = "seu_usuario";
$password = "sua_senha";
$database = "seu_banco_de_dados";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Operação de leitura (Buscar plantas)
    if ($_GET["action"] === "getPlants") {
        $plants = array();
        $result = $conn->query("SELECT * FROM plants");

        while ($row = $result->fetch_assoc()) {
            $plants[] = $row;
        }

        header("Content-Type: application/json");
        echo json_encode($plants);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Operações de escrita (Adicionar, Atualizar, Excluir)
    $action = $_POST["action"];
    $data = $_POST["data"];

    if ($action === "addPlant") {
        // Operação de criação (Adicionar planta)
        $name = $data["name"];
        $image = $data["image"];
        $conn->query("INSERT INTO plants (name, image) VALUES ('$name', '$image')");
        echo "Planta adicionada com sucesso!";
    } elseif ($action === "updatePlant") {
        // Operação de atualização (Atualizar nome da planta)
        $id = $data["id"];
        $name = $data["name"];
        $conn->query("UPDATE plants SET name='$name' WHERE id=$id");
        echo "Planta atualizada com sucesso!";
    } elseif ($action === "deletePlant") {
        // Operação de exclusão (Excluir planta)
        $id = $_POST["id"];
        $conn->query("DELETE FROM plants WHERE id=$id");
        echo "Planta excluída com sucesso!";
    }
}

$conn->close();
?>
