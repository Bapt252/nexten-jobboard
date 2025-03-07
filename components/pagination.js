/**
 * Composant de pagination pour les résultats
 */
const Pagination = (() => {
    // Nombre d'items par page
    const itemsPerPage = 6;
    
    // Page actuelle (commence à 1)
    let currentPage = 1;
    
    // Diviser les données en pages
    const paginate = (items) => {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        return {
            currentItems: items.slice(start, end),
            totalPages
        };
    };
    
    // Générer les éléments de pagination
    const renderPagination = (totalPages, containerId) => {
        const container = document.getElementById(containerId);
        
        // Si moins de 2 pages, ne pas afficher la pagination
        if (totalPages < 2) {
            container.innerHTML = '';
            return;
        }
        
        let paginationHtml = '';
        
        // Bouton précédent
        const prevDisabled = currentPage === 1 ? 'disabled' : '';
        paginationHtml += `<div class="pagination-item ${prevDisabled}" data-page="prev"><i class="fas fa-chevron-left"></i></div>`;
        
        // Pages numérotées
        for (let i = 1; i <= totalPages; i++) {
            const active = i === currentPage ? 'active' : '';
            paginationHtml += `<div class="pagination-item ${active}" data-page="${i}">${i}</div>`;
        }
        
        // Bouton suivant
        const nextDisabled = currentPage === totalPages ? 'disabled' : '';
        paginationHtml += `<div class="pagination-item ${nextDisabled}" data-page="next"><i class="fas fa-chevron-right"></i></div>`;
        
        container.innerHTML = paginationHtml;
        
        // Ajouter les écouteurs d'événements
        const paginationItems = container.querySelectorAll('.pagination-item');
        paginationItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.currentTarget.getAttribute('data-page');
                
                if (page === 'prev' && currentPage > 1) {
                    changePage(currentPage - 1);
                } else if (page === 'next' && currentPage < totalPages) {
                    changePage(currentPage + 1);
                } else if (page !== 'prev' && page !== 'next') {
                    changePage(parseInt(page));
                }
            });
        });
    };
    
    // Changer de page et déclencher l'événement de changement
    const changePage = (page) => {
        currentPage = page;
        document.dispatchEvent(new CustomEvent('pagination:changed', { detail: { page } }));
    };
    
    // Réinitialiser à la première page
    const resetPage = () => {
        currentPage = 1;
    };
    
    // Interface publique du composant
    return {
        paginate,
        renderPagination,
        resetPage,
        get currentPage() { return currentPage; }
    };
})();