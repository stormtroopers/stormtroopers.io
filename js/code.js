$(document).ready(function(){
    //Primero tenemos que cargar las tablas con informacion
    //Para ello crearemos funcions para cada tabla, en el momento es facil supones que se puede crear una sola funcion
    //con parametros para poder llenarlas pero YOLO, lo hacemos despues por ahora hayq eu conformarnos con este chile con queso
  alert("Modificar/actualizar ( ⇄ )\n -Single click abre la caja \n -Double click actualiza");
  var eliminar ;
  var fila;
  var div = $('<td><button></button></td>');
  var update = $('<td><button></button></td>');
    var tbodyPel = $();
  /* Arreglos que contienen los nombres de los
     directores e id respectivamente*/
  var list = [];
  var listI = [];

  /* Arreglos que contienen los nombres de los
     actores e id respectivamente*/
  var listA = [];
  var listIA = [];

  /* Arreglos que contienen los nombres de los
     actores e id respectivamente*/
  var listD = [];
  var listID = [];

    //Recuperar todos los registros de los directores
function datosDir(){
    $.ajax({
    url: "https://api-stormtroopers.herokuapp.com/getDirectores", //SOlo es un ejemplo, esto se cambia por la direccion que es :V
      success: function(result,status,xhr){
          list.length=0;
          listI.length=0;
          for(var i = 0;i<result.length;i++){
            list.push(result[i].nombre);
            listI.push(result[i]._id);
            var largo = list.length;
            console.log(result[i].nombre);
            console.log(result[i]._id);
          }

      }

    });

}

    //Recuperar todos los registros de los actores
  function datosAct(){
    $.ajax({
    url: "https://api-stormtroopers.herokuapp.com/getActores", //SOlo es un ejemplo, esto se cambia por la direccion que es :V
      success: function(result,status,xhr){
          listA.length=0;
          listIA.length=0;
          for(var i = 0;i<result.length;i++){
            listA.push(result[i].nombre);
            listIA.push(result[i]._id);
            var largo = listA.length;
            console.log(result[i].nombre);
            console.log(result[i]._id);
          }
      }

    });

}
    //Se llaman las funciones para llenar de datos esos select
    datosDir();
    datosAct();

/*Funcion abrir.- Nos abre un box con elementos de llenado para mi tabla de peliculas*/
  function abrir(){
      //Personalización de la caja para agregar y modificar

          $("#up").fadeIn("slow");
          $("#up").css("visibility","visible");
          $("#up").css("top", "50px");
          $("#up").css("left", "0");
          $("#up").css("right", "0");
          $("#up").css("margin-right", "auto");
          $("#up").css("margin-left",  "auto");
          $("#up").animate({
                marginLeft: "auto",
                fontSize: "14px",
                borderWidth: "10px",
                width: "900px"
          }, 800 );
          $("#box").animate({
                margin: "285px auto"
          }, 800 );

      //Rellenar el select de directores cuando se agrega una pelicula y/o modifica
    var l = list.length;
      console.log("Largo de lista: " + l);
    $('#director').html('<option value=""></option>');
    for(var i = 0;i < l;i++){
        $('#director').append('<option value="' + i + '">' + list[i] + '</option>');
    }
      //Rellenar el select de actores cuando se agrega una pelicula y/o modifica
    var l = listA.length;
      console.log("Largo de lista: " + l);
    $('#actor').html('<option value=""></option>');
    for(var i = 0;i < l;i++){
        $('#actor').append('<option value="' + i + '">' + listA[i] + '</option>');
    }


  }
    //Funcion para solo abrir el box con para modificar/agregar de actores
 function abrirA(){
      //Personalización de la caja para agregar y modificar
          $("#upA").fadeIn("slow");
          $("#upA").css("visibility","visible");
          $("#upA").css("left", "0");
          $("#upA").css("right", "0");
          $("#upA").css("margin-right", "auto");
          $("#upA").css("margin-left",  "auto");
          $("#upA").animate({
                marginLeft: "auto",
                fontSize: "14px",
                borderWidth: "10px",
                width: "900px"
          }, 800 );

          $("#box").animate({
                margin: "200px auto"
          }, 800 );


  }

  function abrirD(){
      //Personalización de la caja para agregar y modificar
          $("#upD").fadeIn("slow");
          $("#upD").css("visibility","visible");
          $("#upD").css("top", "auto");
          $("#upD").css("bottom", "auto");
          $("#upD").css("left", "0");
          $("#upD").css("right", "0");
          $("#upD").css("margin-top", "auto");
          $("#upD").css("margin-right", "auto");
          $("#upD").css("margin-left",  "auto");
          $("#upD").animate({
                marginLeft: "auto",
                fontSize: "14px",
                borderWidth: "10px",
                width: "900px"
          }, 800 );

          $("#box").animate({
                margin: "auto auto 150px auto"
          }, 800 );


  }
//Funciones para cerrar el box correspondiente a cada tabla
function cerrar(){
    $("#box").animate({
    margin: "50px auto"
    }, 800 );
    $("#up").fadeOut( "slow" );

  }
function cerrarA(){
    $("#box").animate({
    margin: "50px auto"
    }, 800 );
    $("#upA").fadeOut( "slow" );

  }

function cerrarD(){
    $("#box").animate({
    margin: "50px auto"
    }, 800 );
    $("#upD").fadeOut( "slow" );

  }

    //Eventos para cuando se requiere abrir el box para ingresar y/o modificar datos
  $("#showP").click(function(){
    abrir();
  });

  $("#cerrar").click(function(){
    cerrar();
  });

  $("#showA").click(function(){
    abrirA();
  });

  $("#cerrarA").click(function(){
    cerrarA();
  });

  $("#showD").click(function(){
    abrirD();
  });

  $("#cerrarD").click(function(){
    cerrarD();
  });


function refrescar(){
  $.ajax({
      url: "https://api-stormtroopers.herokuapp.com/getPeliculas",
      success: function(result,status,xhr){
        $("#pel").empty();
        for (var i = 0; i < result.length; i++) {
            fila = $('<tr></tr>');
            div = $('<td class="eliminar"><i class="fa fa-trash" aria-hidden="true"></i></td>');
            update = $('<td class="modificar"><i class="fa fa-exchange" aria-hidden="true"></i></td>');
            var ban = 0;
            var dirNom = "";
            for (var z = 0; z < listI.length; z++) {
                 if(result[i].director==(listI[z])){

                     dirNom = list[z];

                 }
            }

            var actId = "";

            for (var u = 0; u < listIA.length; u++) {
                 if(result[i].actor==(listIA[u])){

                     actId = listA[u];

                 }
            }

                fila.html('<td>' + result[i]._id + '</td>'+
                          '<td>' + result[i].nombre + '</td>'+
                          '<td>' + result[i].year + '</td>'+
                          '<td>' + result[i].genero + '</td>'+
                          '<td>' + dirNom + '</td>'+
                          '<td>' + actId);
            fila.append(update);
            fila.append(div);
          $('#pel').append(fila);

            $('#anio').keydown(function(e) {
              // Validacion para no ingresar letras, este iria mas bien para el campo donde se ingrese el año
            if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 8 && e.keyCode != 9)

                e.preventDefault();
            });

            //Eliminar registros
            div.click(function(){
              var actualizar =  $(this).prev().prev().prev().prev().prev().prev().prev().text();
              var r = confirm("Estas apunto de eliminar este registro! (" + actualizar + ")");
              if (r == true) {
                  $.ajax({
                  url: "https://api-stormtroopers.herokuapp.com/eliminarPelicula/"+ actualizar + "/", //En esta parte de aqui es donde se envia el ide de la
                                                                     // pelicula a eliminar,no se como se manejen los ides en la api, asi que sorry si esta enpalmado
                  type: 'DELETE',
                  success: function(result) {

                   refrescar();
                    }

                  });
              }
            });


            //Aqui esta la parte que define la actualizacion
             update.dblclick(function(){
                     var actualizar =  $(this).prev().prev().prev().prev().prev().prev().text();
                     var Nombre = $('input[id=nombre]').val();
                     if(Nombre.length === 0){
                       Nombre = $(this).prev().prev().prev().prev().prev().text();
                     }
                     var Anio = $('input[id=anio]').val();
                     if(Anio.length === 0){
                       Anio = $(this).prev().prev().prev().prev().text();
                     }
                     var Genero = $('input[id=genero]').val();
                     if(Genero.length === 0){
                       Genero = $(this).prev().prev().prev().text();
                     }

                     var Director = $('#director option:selected').val();

                     if(Director.length === 0){
                         console.log("hasta aqui procesa");
                       var dirNom = $(this).prev().prev().text();

                       for (var n = 0; n < list.length; n++) {
                         if(dirNom === list[n]){

                           dirNom = listI[n];

                         }
                      }


                     }else{
                         Director = $(this).prev().prev().text();

                       for (var z = 0; z < list.length; z++) {
                         var dirId = $('#director option:selected').val();
                         dirNom = listI[dirId];
                      }
                     }

                     console.log(Director);


                     var ActPrinc = $('#actor option:selected').val();

                     if(ActPrinc.length === 0){
                         console.log("hasta aqui procesa");
                       var dirAct = $(this).prev().text();

                       for (var n = 0; n < listA.length; n++) {
                         if(dirAct === listA[n]){

                           dirAct = listIA[n];

                         }
                      }


                     }else{
                         ActPrinc = $(this).prev().prev().text();

                       for (var z = 0; z < list.length; z++) {
                         var dirAct = $('#actor option:selected').val();
                         dirAct = listIA[dirAct];
                      }
                     }

                     var idDir = listI.indexOf[0];
                        console.log("update" + idDir);
                     var pelicula = {
                       "nombre": Nombre,
                       "year": Anio,
                       "genero": Genero,
                       "director": dirNom,
                       "actor": dirAct,
                     };
                       $.ajax({
                       url: "https://api-stormtroopers.herokuapp.com/modificarPelicula/" + actualizar,
                       type: 'PUT',
                       data: pelicula,
                       success: function(result) {
                       alert("Registro actualizado: " + actualizar);
                       refrescar();
                       }

                     });



             });

            }

          }
      });
    //Para la tabla de actores
    $.ajax({
      url: "https://api-stormtroopers.herokuapp.com/getActores",
      success: function(result,status,xhr){
        $("#act").empty();
        for (var i = 0; i < 300; i++) {
            //Aqui esta toda la contruccion de la tabla con las peliculas :)
            fila = $('<tr></tr>');
            div = $('<td class="eliminar"><i class="fa fa-trash" aria-hidden="true"></i></td>');
            update = $('<td class="modificar"><i class="fa fa-exchange" aria-hidden="true"></i></td>');
            var ban = 0;
            var dirNom = "";
            //var dirId = result[i].director;
            var dirlen = listI.length;
            for (var z = 0; z < listI.length; z++) {
                 if(result[i].director==(listI[z])){

                     dirNom = list[z];

                 }
            }

                fila.html('<td>' + result[i]._id + '</td>'+
                          '<td>' + result[i].nombre + '</td>'+
                          '<td>' + result[i].edad );
            fila.append(update);
            fila.append(div);
          $('#act').append(fila);

            $('#edad').keydown(function(e) {
              // Validacion para no ingresar letras, este iria mas bien para el campo donde se ingrese el año
            if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 8 && e.keyCode != 9)

                e.preventDefault();
            });

            //Eliminar registros
            div.click(function(){
              var actualizar =  $(this).prev().prev().prev().prev().text();
              var r = confirm("Estas apunto de eliminar este registro! ("+ actualizar +")");
              if (r == true) {
                  $.ajax({
                  url: "https://api-stormtroopers.herokuapp.com/eliminarActor/"+ actualizar +"/", //En esta parte de aqui es donde se envia el ide de la
                                                                     // pelicula a eliminar,no se como se manejen los ides en la api, asi que sorry si esta enpalmado
                  type: 'DELETE',
                  success: function(result) {

                   refrescar();
                    }

                  });
              }
            });


            //Aqui esta la parte que define la actualizacion
             update.dblclick(function(){
                     var actualizar =  $(this).prev().prev().prev().text();
                     var Nombre = $('input[id=nombA]').val();
                     if(Nombre.length === 0){
                       Nombre = $(this).prev().prev().text();
                     }
                     var Edad = $('input[id=edad]').val();
                     if(Edad.length === 0){
                       Edad = $(this).prev().text();
                     }


                     var actor = {
                       "nombre": Nombre,
                       "edad": Edad
                     };
                       $.ajax({
                       url: "https://api-stormtroopers.herokuapp.com/modificarActor/" + actualizar +"/",
                       type: 'PUT',
                       data: actor,
                       success: function(result) {
                       alert("Registro actualizado: " + actualizar);
                       refrescar();
                       }

                     });

             });

            }

          }
      });
    //Para la tabla de directores
    $.ajax({
      url: "https://api-stormtroopers.herokuapp.com/getDirectores",
      success: function(result,status,xhr){
        $("#direc").empty();
        for (var i = 0; i < 300; i++) {
            //Aqui esta toda la contruccion de la tabla con las peliculas :)
            fila = $('<tr></tr>');
            div = $('<td class="eliminar"><i class="fa fa-trash" aria-hidden="true"></i></td>');
            update = $('<td class="modificar"><i class="fa fa-exchange" aria-hidden="true"></i></td>');
            var ban = 0;
            var dirNom = "";
            //var dirId = result[i].director;
            var dirlen = listID.length;
            for (var z = 0; z < listID.length; z++) {
                 if(result[i].director==(listID[z])){

                     dirNom = listD[z];

                 }
            }

                fila.html('<td>' + result[i]._id + '</td>'+
                          '<td>' + result[i].nombre + '</td>'+
                          '<td>' + result[i].edad +
                          '<td>' + result[i].nacionalidad );
            fila.append(update);
            fila.append(div);
          $('#direc').append(fila);

            $('#edadD').keydown(function(e) {
              // Validacion para no ingresar letras, este iria mas bien para el campo donde se ingrese el edad
            if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 8 && e.keyCode != 9)

                e.preventDefault();
            });

            //Eliminar registros
            div.click(function(){
              var actualizar =  $(this).prev().prev().prev().prev().prev().text();
              var r = confirm("Estas apunto de eliminar este registro! ("+ actualizar +")");
              if (r == true) {
                  $.ajax({
                  url: "https://api-stormtroopers.herokuapp.com/eliminarDirector/"+ actualizar +"/", //En esta parte de aqui es donde se envia el ide de la
                                                                     // pelicula a eliminar,no se como se manejen los ides en la api, asi que sorry si esta enpalmado
                  type: 'DELETE',
                  success: function(result) {

                   refrescar();
                    }

                  });
              }
            });


            //Aqui esta la parte que define la actualizacion
             update.dblclick(function(){
                     var actualizar =  $(this).prev().prev().prev().prev().text();
                     var Nombre = $('input[id=nombD]').val();
                     if(Nombre.length === 0){
                       Nombre = $(this).prev().prev().prev().text();
                     }
                     var Edad = $('input[id=edadD]').val();
                     if(Edad.length === 0){
                       Edad = $(this).prev().prev().text();
                     }

                     var Nacionalidad = $('input[id=nac]').val();
                     if(Nacionalidad.length === 0){
                       Nacionalidad = $(this).prev().text();
                     }


                     var director = {
                       "nombre": Nombre,
                       "edad": Edad,
                       "nacionalidad": Nacionalidad
                     };

                       $.ajax({
                       url: "https://api-stormtroopers.herokuapp.com/modificarDirector/" + actualizar +"/",
                       type: 'PUT',
                       data: director,
                       success: function(result) {
                       alert("Registro actualizado: " + actualizar);
                       refrescar();
                       }

                     });

             });

            }

          }
      });


}


refrescar(); //Se manda llamar para llenar las tablas cada que se recarga la pagina

$(".limpiar").click(function limpiar(){
    refrescar();

});


$("#agregarP").click(function(){
    var Nombre = $('input[id=nombre]').val();
    var Anio = $('input[id=anio]').val();
    var Genero = $('input[id=genero]').val();
    var Descripcion = $('input[id=descripcion]').val();
    var dirId = $('#director option:selected').val();
    var regId = listI[dirId];
    console.log("id" + regId);
    var ActPrinc = $('#actor option:selected').val();
    console.log("acgtor princ" + ActPrinc);
    var regAc = listIA[ActPrinc];
    console.log("actor 2: " + regAc);
    console.log("id " + listIA[ActPrinc]);
    var ban=0;
    var mensaje="Advetencia\n";


 if((Anio.length === 0)||(Anio.length < 4)||(Anio.length > 4)){
     mensaje = mensaje + "- Indica correctamente el año\n";
     if((Anio.length < 6)||(Matricula.length > 6)){
      mensaje = mensaje + "- El año solo puede tener 4 digitos\n" ;
     }

  }
  if(Nombre.length === 0){
    mensaje = mensaje + "- Falta Nombre\n";
  }
  if(Genero.length === 0){
    mensaje = mensaje + "- Falta Genero\n";
    }
   if(dirId  === $('#director option:first').val()){
     mensaje = mensaje + "- Falta director\n";
        //ban++;
    }
   if(ActPrinc  === $('#director option:first').val()){
     mensaje = mensaje + "- Falta actor principal\n";
        //ban++;
    }

    if(mensaje.length > 12){
        alert(mensaje);
    }

if((Anio.length > 0)&&(Nombre.length > 0)&&(Genero.length > 0)&&(ban === 0)&&(Anio.length === 4)){
      console.log("AAAAA")
      console.log(pelicula);
     var pelicula = {
                       "nombre": Nombre,
                      "descripcion": Descripcion,
                       "year": Anio,
                       "genero": Genero,
                       "director": regId,
                       "actor": regAc,
                     };
                     console.log(pelicula);
     $.ajax({
        url: "https://api-stormtroopers.herokuapp.com/createPeliculas",
        method: "POST",
        data: pelicula,
        success: function(result, status, xhr) {
          alert(status);
          console.log(result);
          console.log(result.errors.descripcion);
          alert("Registrado con exito");
          abrir();
          refrescar();
     }
});
}
});

$("#agregarA").click(function(){
    var Nombre = $('input[id=nombA]').val();
    var Edad = $('input[id=edad]').val();
    var mensaje = "Advertencia!\n";
    var ban=0;

 if((Edad.length === 0)||(Edad.length < 0)||(Edad.length > 120)){
     mensaje = mensaje + "- Indica correctamente la edad\n";
     if((Edad.length < 0)||(Edad.length > 120)){
      mensaje = mensaje + "- La edad no puede ser negativa ni mayor a 120\n" ;
     }

  }
  if(Nombre.length === 0){
    mensaje = mensaje + "- Falta Nombre\n";
  }


  if(mensaje.length > 12){
        alert(mensaje);
   }

if((Edad.length > 0)&&(Nombre.length > 0)){

     var actor = {
                       "nombre": Nombre,
                       "edad": Edad
                     };

     $.ajax({
        url: "https://api-stormtroopers.herokuapp.com/createActores",
        method: "POST",
        data: actor,
        success: function(result, status, xhr) {
          alert("Registrado con exito");
          abrirA();
          refrescar();
     }
});
  }
});

$("#agregarD").click(function(){
    var Nombre = $('input[id=nombD]').val();
    var Edad = $('input[id=edadD]').val();
    var Nacionalidad = $('input[id=nac]').val();
    var mensaje = "Advertencia!\n";
    var ban=0;

 if((Edad.length === 0)||(Edad.length < 0)||(Edad.length > 120)){
     mensaje = mensaje + "- Indica correctamente la edad\n";
     if((Edad.length < 0)||(Edad.length > 120)){
      mensaje = mensaje + "- La edad no puede ser negativa ni mayor a 120\n" ;
     }

  }
  if(Nombre.length === 0){
    mensaje = mensaje + "- Falta Nombre\n";
  }

  if(Nacionalidad.length === 0){
    mensaje = mensaje + "- Falta Nacionalidad\n";
  }


  if(mensaje.length > 15){
        alert(mensaje);
   }

if((Edad.length > 0)&&(Nombre.length > 0)&&(Nacionalidad.length > 0)){

     var director = {
                       "nombre": Nombre,
                       "edad": Edad,
                       "nacionalidad": Nacionalidad
                     };

     $.ajax({
        url: "https://api-stormtroopers.herokuapp.com/createDirectores",
        method: "POST",
        data: director,
        success: function(result, status, xhr) {
          alert("Registrado con exito");
          abrirD();
          refrescar();
     }
});
  }
});

$("#borrar").click(function(){

    $('input[id=anio]').val('');
    $('input[id=nombre]').val('');
    $('input[id=genero]').val('');
});

$("#borrarA").click(function(){

    $('input[id=nombA]').val('');
    $('input[id=edad]').val('');
});


    $('input[id=matricula]').val('');
    $('input[id=nombre]').val('');
    $('input[id=apellido]').val('');
    $('#status option:selected').removeAttr("selected");
    $('#status option:first').attr("selected","selected");
    $('input[id=matricula]').focus();

});
