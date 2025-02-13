$(document).ready(function () {
    $("#generarRFC").click(function () {
        let nombre = $("#nombre").val().trim().toUpperCase();
        let apellidoPaterno = $("#apellidoPaterno").val().trim().toUpperCase();
        let apellidoMaterno = $("#apellidoMaterno").val().trim().toUpperCase();
        let fechaNacimiento = $("#fechaNacimiento").val();

        if (nombre === "" || apellidoPaterno === "" || fechaNacimiento === "") {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        let rfc = generarRFC(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento);
        $("#resultadoRFC").val(rfc);
    });

    function generarRFC(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento) {
        let primeraLetra = apellidoPaterno.charAt(0);
        let primeraVocal = apellidoPaterno.match(/[AEIOU]/i);
        primeraVocal = primeraVocal ? primeraVocal[0] : "";
        let primeraLetraMaterno = apellidoMaterno ? apellidoMaterno.charAt(0) : "";
        let primeraLetraNombre = nombre.charAt(0);

        let fecha = fechaNacimiento.split("-");
        let anio = fecha[0].substr(2, 2);
        let mes = fecha[1];
        let dia = fecha[2];

        let rfcBase = (primeraLetra + primeraVocal + primeraLetraMaterno + primeraLetraNombre + anio + mes + dia).toUpperCase();
        let homoclave = generarHomoclave(); 

        return rfcBase + homoclave;
    }

    function generarHomoclave() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let homoclave = "";
        for (let i = 0; i < 2; i++) {
            homoclave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return homoclave;
    }

    // Consulta de la API con ID dinámico
    $("#consultarAPI").click(function () {
        let apiId = $("#apiId").val().trim();

        if (apiId === "" || isNaN(apiId)) {
            alert("Por favor, ingrese un ID válido.");
            return;
        }

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/users/${apiId}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                $("#apiNombre").val(data.name);
                $("#apiEmail").val(data.email);
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un problema al consultar la API. Revisa la consola para más detalles.");
            }
        });
    });
});
