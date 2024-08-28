document.addEventListener('DOMContentLoaded', () => {
  fetch('json/prod_recientes.json')
    .then(response => response.json())
    .then(data => {
      const productsPerPage = 4; // Número de productos por página
      let currentPage = 1; // Página actual
      const totalPages = Math.ceil(data.length / productsPerPage); // Total de páginas
      const container = document.getElementById('products-container'); // Contenedor para los productos
      const paginationControls = document.getElementById('pagination-controls'); // Contenedor para los controles de paginación

      function renderProducts(page) {
        container.innerHTML = ''; // Limpiar contenedor
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, data.length);

        for (let i = startIndex; i < endIndex; i++) {
          const product = data[i];
          const productHTML = `
            <div class="col mb-5">
              <div class="card h-100">
                <!-- Product image-->
                <img class="card-img-top" src="${product.imagen}" alt="${product.nom_prod}" />
                <!-- Product details-->
                <div class="card-body p-4">
                  <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${product.nom_prod}</h5>
                    <!-- Product price-->
                    $${product.precio.toFixed(2)}
                  </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center"><button class="btn btn-outline-dark mt-auto">Ver opciones</button></div>
                </div>
              </div>
            </div>
          `;
          container.insertAdjacentHTML('beforeend', productHTML);
        }
      }

      function renderPagination() {
        paginationControls.innerHTML = ''; // Limpiar contenedor de paginación

        // Botón Previous
        const prevButton = document.createElement('li');
        prevButton.className = 'page-item';
        prevButton.innerHTML = '<button class="page-link" type="button">Previous</button>';
        prevButton.onclick = () => {
          if (currentPage > 1) {
            currentPage--;
            updatePage();
          }
        };
        paginationControls.appendChild(prevButton);

        // Botones de páginas
        const pageNumbersToShow = 3; // Número de botones de páginas a mostrar
        const startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));
        const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
          const pageItem = document.createElement('li');
          pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
          const pageButton = document.createElement('button');
          pageButton.className = 'page-link';
          pageButton.type = 'button';
          pageButton.textContent = i;
          pageButton.onclick = () => {
            currentPage = i;
            updatePage();
          };
          pageItem.appendChild(pageButton);
          paginationControls.appendChild(pageItem);
        }

        // Botón Next
        const nextButton = document.createElement('li');
        nextButton.className = 'page-item';
        nextButton.innerHTML = '<button class="page-link" type="button">Next</button>';
        nextButton.onclick = () => {
          if (currentPage < totalPages) {
            currentPage++;
            updatePage();
          }
        };
        paginationControls.appendChild(nextButton);
      }

      function updatePage() {
        renderProducts(currentPage);
        renderPagination();
      }

      // Inicializar la página
      updatePage();
    })
    .catch(error => console.error('Error loading the products:', error));
});
