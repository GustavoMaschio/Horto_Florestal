$(document).ready(function () {
    // Função para exibir plantas na lista
    function displayPlants(plants) {
        var plantList = $("#plantList");
        plantList.empty(); // Limpar lista antes de exibir as plantas atualizadas

        plants.forEach(function (plant) {
            var plantItem = $("<div class='plant-item mt-2'></div>");
            plantItem.append("<img src='" + plant.image + "' alt='" + plant.name + "' class='plant-image'>");
            plantItem.append("<div class='plant-name'>" + plant.name + "</div>");

            // Botões para atualizar e excluir plantas
            var updateButton = $("<button class='btn btn-info btn-sm mr-2'>Atualizar</button>");
            updateButton.click(function () {
                var newName = prompt("Digite o novo nome para " + plant.name);
                if (newName) {
                    updatePlant(plant.id, newName);
                }
            });

            var deleteButton = $("<button class='btn btn-danger btn-sm'>Excluir</button>");
            deleteButton.click(function () {
                if (confirm("Tem certeza de que deseja excluir " + plant.name + "?")) {
                    deletePlant(plant.id);
                }
            });

            plantItem.append(updateButton);
            plantItem.append(deleteButton);

            plantList.append(plantItem);
        });
    }

    // Função para buscar plantas do servidor
    function fetchPlants() {
        $.ajax({
            type: "GET",
            url: "backend.php",
            data: { action: "getPlants" },
            success: function (plants) {
                displayPlants(plants);
            },
            error: function (error) {
                console.error("Erro ao buscar plantas: " + error);
            }
        });
    }

    // Função para adicionar planta
    function addPlant(plantName, plantImage) {
        var data = {
            name: plantName,
            image: plantImage
        };

        $.ajax({
            type: "POST",
            url: "backend.php",
            data: { action: "addPlant", data: data },
            success: function (response) {
                console.log(response);
                fetchPlants(); // Atualizar a lista de plantas após a adição bem-sucedida
            },
            error: function (error) {
                console.error("Erro ao adicionar planta: " + error);
            }
        });
    }

    // Função para atualizar planta
    function updatePlant(plantId, newName) {
        var data = {
            id: plantId,
            name: newName
        };

        $.ajax({
            type: "POST",
            url: "backend.php",
            data: { action: "updatePlant", data: data },
            success: function (response) {
                console.log(response);
                fetchPlants(); // Atualizar a lista de plantas após a atualização bem-sucedida
            },
            error: function (error) {
                console.error("Erro ao atualizar planta: " + error);
            }
        });
    }

    // Função para excluir planta
    function deletePlant(plantId) {
        $.ajax({
            type: "POST",
            url: "backend.php",
            data: { action: "deletePlant", id: plantId },
            success: function (response) {
                console.log(response);
                fetchPlants(); // Atualizar a lista de plantas após a exclusão bem-sucedida
            },
            error: function (error) {
                console.error("Erro ao excluir planta: " + error);
            }
        });
    }

    // Manipular envio do formulário de adição de planta
    $("#addPlantForm").submit(function (event) {
        event.preventDefault();
        var plantName = $("#plantName").val();
        var plantImage = $("#plantImage").val();
        addPlant(plantName, plantImage);
        $("#addPlantForm")[0].reset();
        $("#addPlantModal").modal("hide");
    });

    // Exibir lista de plantas ao carregar a página
    fetchPlants();
});
