document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelector('.menu-buttons');

    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const categories = [...new Set(data.map(item => item.tipo))];

            categories.forEach(category => {
                // Creiamo un contenitore per ogni categoria
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'category-container';

                // Creiamo il pulsante per la categoria
                const button = document.createElement('button');
                button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                button.className = 'category-button';

                // Creiamo il contenitore per l'elenco della categoria
                const menuContent = document.createElement('div');
                menuContent.className = 'menu-content';
                menuContent.style.display = 'none'; // Nascondiamo l'elenco inizialmente

                // Aggiungiamo l'evento per mostrare/nascondere il menu
                button.addEventListener('click', () => {
                    if (menuContent.style.display === 'none') {
                        menuContent.style.display = 'block';
                        renderMenuItems(menuContent, data.filter(item => item.tipo === category));
                    } else {
                        menuContent.style.display = 'none';
                    }
                });

                // Aggiungiamo il pulsante e il contenitore dell'elenco al contenitore della categoria
                categoryContainer.appendChild(button);
                categoryContainer.appendChild(menuContent);

                // Aggiungiamo il contenitore della categoria al contenitore principale
                menuButtons.appendChild(categoryContainer);
            });

            function renderMenuItems(container, items) {
                container.innerHTML = ''; // Puliamo il contenuto precedente
                items.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';

                    const info = document.createElement('div');
                    info.className = 'info';

                    const name = document.createElement('h3');
                    name.textContent = item.nome;

                    const description = document.createElement('p');
                    description.textContent = item.descrizione;

                    const price1 = document.createElement('p');
                    price1.className = 'price1';
                    price1.textContent = `${item.prezzo1}`;

                    


                    const tags = document.createElement('div');
                    tags.className = 'tags';

                    if (item.piccante) tags.innerHTML += '<span>🌶️</span>';
                    if (item.glutine) tags.innerHTML += '<span>🌾</span>';
                    if (item.latticini) tags.innerHTML += '<span>🧀</span>';
                    if (item.pesce) tags.innerHTML += '<span>🐟</span>';
                    if (item.vegetariana) tags.innerHTML += '<span>🥬</span>';
                    if (item.alcolico) tags.innerHTML += '<span>🍷</span>';

                    info.appendChild(name);
                    info.appendChild(description);
                    info.appendChild(price1);

                    // Verifica se prezzo2 esiste prima di mostrarlo
                    if (item.prezzo2 !== undefined) {
                        const price2 = document.createElement('p');
                        price2.className = 'price2';
                        price2.textContent = `${item.prezzo2}`;
                        info.appendChild(price2);
                    };

                    // Verifica se prezzo3 esiste prima di mostrarlo
                    if (item.prezzo3 !== undefined) {
                        const price3 = document.createElement('p');
                        price3.className = 'price3';
                        price3.textContent = `${item.prezzo3}`;
                        info.appendChild(price3);
                     };


                    info.appendChild(tags);




                    const img = document.createElement('img');
                    const fallbackImg = 'foto/null.png'; // Immagine di fallback

                    // Prova prima con .jpg e poi .png
                    img.src = `foto/${item.nome}.jpg`;
                    
                    img.onerror = () => {
                        // Se .jpg non esiste, prova con .png
                        img.onerror = null; // Rimuove il gestore per evitare loop infiniti
                        img.src = `foto/${item.nome}.png`;
                        
                        // Se .png fallisce, usa il fallback
                        img.onerror = () => {
                            img.src = fallbackImg;
                        };
                    };

                    img.alt = item.nome;

                    menuItem.appendChild(info);
                    menuItem.appendChild(img);

                    container.appendChild(menuItem);
                });
            }
        })
        .catch(error => console.error('Errore nel caricamento del menu:', error));
});
