/**
 * Script principal pour la page d'accueil du jobboard
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les composants de l'application
    Filters.init();
    JobForm.init();
    
    // Charger les jobs initiaux et les afficher
    loadAndDisplayJobs();
    
    // Écouter les événements de changement de filtres
    document.addEventListener('filters:changed', () => {
        // Réinitialiser la pagination et recharger les jobs
        Pagination.resetPage();
        loadAndDisplayJobs();
    });
    
    // Écouter les événements de changement de pagination
    document.addEventListener('pagination:changed', () => {
        loadAndDisplayJobs();
    });
    
    // Écouter les événements de mise à jour des jobs (après ajout)
    document.addEventListener('jobs:updated', () => {
        loadAndDisplayJobs();
    });
    
    // Ajouter du style dynamique pour les notifications
    addNotificationStyles();
});

/**
 * Charger les jobs et les afficher en tenant compte des filtres et pagination
 */
function loadAndDisplayJobs() {
    // Récupérer tous les jobs via le service
    let jobs = JobService.getJobs();
    
    // Trier par date (plus récent en premier)
    jobs = jobs.sort((a, b) => b.date - a.date);
    
    // Appliquer les filtres
    const filters = Filters.getActiveFilters();
    const filteredJobs = JobService.filterJobs(jobs, filters);
    
    // Appliquer la pagination
    const { currentItems, totalPages } = Pagination.paginate(filteredJobs);
    
    // Afficher les jobs et la pagination
    JobCard.renderJobs(currentItems, 'jobs-list');
    Pagination.renderPagination(totalPages, 'pagination');
}

/**
 * Ajouter des styles CSS pour les notifications
 */
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification i {
            font-size: 1.25rem;
        }
        
        .notification.success i {
            color: var(--success-color);
        }
        
        .notification.info i {
            color: var(--primary-color);
        }
        
        .close-notification {
            cursor: pointer;
            color: var(--text-light);
        }
        
        .close-notification:hover {
            color: var(--danger-color);
        }
        
        .no-jobs {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            background-color: var(--bg-white);
            border-radius: var(--border-radius);
            grid-column: 1 / -1;
            text-align: center;
        }
        
        .no-jobs i {
            font-size: 3rem;
            color: var(--text-light);
            margin-bottom: 1rem;
        }
        
        .no-jobs p {
            margin-bottom: 1.5rem;
            color: var(--text-light);
        }
    `;
    
    document.head.appendChild(style);
}