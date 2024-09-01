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

                    const price = document.createElement('p');
                    price.className = 'price';
                    price.textContent = `€ ${item.prezzo}`;

                    const description = document.createElement('p');
                    description.textContent = item.descrizione;

                    const tags = document.createElement('div');
                    tags.className = 'tags';

                    if (item.piccante) tags.innerHTML += '<span>🌶</span>';
                    if (item.formaggio) tags.innerHTML += '<span>🧀</span>';
                    if (item.pesce) tags.innerHTML += '<span>🐟</span>';
                    if (item.vegetariana) tags.innerHTML += '<span>🥬</span>';

                    info.appendChild(name);
                    info.appendChild(price);
                    info.appendChild(description);
                    info.appendChild(tags);

                    const img = document.createElement('img');
                    img.src = item.foto;
                    img.alt = item.nome;

                    menuItem.appendChild(info);
                    menuItem.appendChild(img);

                    container.appendChild(menuItem);
                });
            }
        })
        .catch(error => console.error('Errore nel caricamento del menu:', error));
});
