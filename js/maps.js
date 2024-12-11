document.addEventListener('DOMContentLoaded', function () {
    // Inicializa el mapa centrado en una ubicación específica
    const map = L.map('map').setView([-11.967601, -77.003884], 13); 

    // Agrega los tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añade un marcador de ejemplo
    L.marker([-11.967601, -77.003884]).addTo(map)
        .bindPopup('Nuesta ubicacion.')
        .openPopup();
});