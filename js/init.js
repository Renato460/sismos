//Servicio service worker
if(navigator.serviceWorker){
    if(window.location.href.includes("localhost")|| window.location.href.includes("127.0.0.1")){
        navigator.serviceWorker.register("/sw.js");
    }else{
        navigator.serviceWorker.register("/sismos/sw.js");
    }
    
}

window.mostrar = function(respuesta){
    
    const molde = document.querySelector(".molde-sismo");
    const contenedor = document.querySelector(".tarjeta-sismo");
    for(let i = 0; i< respuesta.length;++i){
        let sismo = respuesta[i];
        let copia = molde.cloneNode(true);
        copia.querySelector('.nombre-titulo').innerText = sismo.RefGeografica;
        copia.querySelector('.fecha').innerText = "Fecha: "+sismo.Fecha;
        copia.querySelector('.magnitud').innerText = "Magnitud: "+sismo.Magnitud;
        copia.querySelector('.profundidad').innerText = "Profundidad: "+ sismo.Profundidad+" Klm";
        copia.querySelector('.map').id = "map"+i;
        
        let mapa = copia.querySelector('.map');
        init(mapa,sismo.Latitud, sismo.Longitud);

        contenedor.appendChild(copia);
        copia.querySelector('.ol-zoom-out').classList.add('d-none');
        copia.querySelector('.ol-zoom-in').classList.add('d-none');
       // console.log(mapa,sismo.Latitud,sismo.Longitud);
    }
};

window.init = function(mapa, lat, long){
    
    var map = new ol.Map({
        target: mapa,
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
            
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([long, lat]),
          zoom: 6,
          constrantOnlyCenter: true
        })
      });
      
}


window.addEventListener('DOMContentLoaded', async ()=>{
    let conta = 0;
    let response = await axios.get("https://api.gael.cl/general/public/sismos");
    
    window.mostrar(response.data,conta);


    console.log(response.data);

});


