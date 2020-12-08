window.mostrar = (sismo)=>{
    const molde = document.querySelector(".molde-sismo");
    const contenedor = document.querySelector(".tarjeta-sismo");
    let copia = molde.cloneNode(true);
    copia.querySelector('.nombre-titulo').innerText = sismo.RefGeografica;
    copia.querySelector('.fecha').innerText = "Fecha: "+sismo.Fecha;
    copia.querySelector('.magnitud').innerText = "Magnitud: "+sismo.Magnitud+' "Richter"';
    copia.querySelector('.profundidad').innerText = "Profundidad: "+ sismo.Profundidad+" Klm";
    contenedor.appendChild(copia);
};


window.addEventListener('DOMContentLoaded', async ()=>{
    let response = await axios.get("https://api.gael.cl/general/public/sismos");
    window.mostrar(response.data[0])
    console.log(response.data);

});