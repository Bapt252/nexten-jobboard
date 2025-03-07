/**
 * Composant pour gérer les filtres de recherche
 */
const Filters = (() => {
    // Stocker l'état des filtres
    let activeFilters = {
        keyword: '',
        location: '',
        category: '',
        type: '',
        experience: '',
        salary: ''
    };
    
    // Labels pour les différentes catégories de filtres
    const filterLabels = {
        category: {
            dev: 'Développement',
            design: 'Design',
            marketing: 'Marketing',
            sales: 'Ventes',
            support: 'Support Client'
        },
        type: {
            cdi: 'CDI',
            cdd: 'CDD',
            freelance: 'Freelance',
            stage: 'Stage',
            alternance: 'Alternance'
        },
        experience: {
            junior: 'Débutant (0-2 ans)',
            mid: 'Intermédiaire (2-5 ans)',
            senior: 'Confirmé (5+ ans)'
        },
        salary: {
            '0-30000': 'Moins de 30 000€',
            '30000-50000': '30 000€ - 50 000€',
            '50000-70000': '50 000€ - 70 000€',
            '70000+': 'Plus de 70 000€'
        }
    };
    
    // Initialiser les écouteurs d'événements pour les filtres
    const init = () => {
        // Filtre de recherche par mot-clé
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', debounce(() => {
            activeFilters.keyword = searchInput.value.trim();
            triggerFilterChange();
        }, 500));
        
        // Filtre de recherche par localisation
        const locationInput = document.getElementById('location-input');
        locationInput.addEventListener('input', debounce(() => {
            activeFilters.location = locationInput.value.trim();
            triggerFilterChange();
        }, 500));
        
        // Filtre par catégorie
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.addEventListener('change', () => {
            activeFilters.category = categoryFilter.value;
            updateFilterTags();
            triggerFilterChange();
        });
        
        // Filtre par type de contrat
        const contractFilter = document.getElementById('contract-filter');
        contractFilter.addEventListener('change', () => {
            activeFilters.type = contractFilter.value;
            updateFilterTags();
            triggerFilterChange();
        });
        
        // Filtre par expérience
        const experienceFilter = document.getElementById('experience-filter');
        experienceFilter.addEventListener('change', () => {
            activeFilters.experience = experienceFilter.value;
            updateFilterTags();
            triggerFilterChange();
        });
        
        // Filtre par salaire
        const salaryFilter = document.getElementById('salary-filter');
        salaryFilter.addEventListener('change', () => {
            activeFilters.salary = salaryFilter.value;
            updateFilterTags();
            triggerFilterChange();
        });
        
        // Bouton de recherche principal
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', () => {
            activeFilters.keyword = searchInput.value.trim();
            activeFilters.location = locationInput.value.trim();
            triggerFilterChange();
        });
        
        // Initialiser les tags de filtres
        updateFilterTags();
    };
    
    // Mettre à jour les tags de filtres actifs
    const updateFilterTags = () => {
        const filterTagsContainer = document.getElementById('filter-tags');
        let tagsHtml = '';
        
        // Créer un tag pour chaque filtre actif
        for (const [key, value] of Object.entries(activeFilters)) {
            if (value && value !== '') {
                // Obtenir le label correspondant
                let label = value;
                if (filterLabels[key] && filterLabels[key][value]) {
                    label = filterLabels[key][value];
                }
                
                tagsHtml += `
                    <div class="filter-tag" data-filter="${key}" data-value="${value}">
                        ${label}
                        <i class="fas fa-times"></i>
                    </div>
                `;
            }
        }
        
        // Mettre à jour le HTML et ajouter les écouteurs d'événements
        filterTagsContainer.innerHTML = tagsHtml;
        
        // Ajouter les événements pour supprimer les tags
        const tags = filterTagsContainer.querySelectorAll('.filter-tag');
        tags.forEach(tag => {
            tag.querySelector('i').addEventListener('click', () => {
                const filter = tag.getAttribute('data-filter');
                const value = tag.getAttribute('data-value');
                
                // Réinitialiser le filtre correspondant
                activeFilters[filter] = '';
                
                // Mettre à jour le select correspondant
                const selectElement = document.getElementById(`${filter}-filter`);
                if (selectElement) {
                    selectElement.value = '';
                }
                
                // Mettre à jour les tags et déclencher le changement
                updateFilterTags();
                triggerFilterChange();
            });
        });
    };
    
    // Fonction utilitaire pour debounce (limiter le nombre d'appels)
    const debounce = (func, delay) => {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    };
    
    // Déclencher l'événement de changement de filtre
    const triggerFilterChange = () => {
        document.dispatchEvent(new CustomEvent('filters:changed'));
    };
    
    // Obtenir les filtres actifs
    const getActiveFilters = () => {
        return { ...activeFilters };
    };
    
    // Réinitialiser tous les filtres
    const resetFilters = () => {
        activeFilters = {
            keyword: '',
            location: '',
            category: '',
            type: '',
            experience: '',
            salary: ''
        };
        
        // Réinitialiser les champs de formulaire
        document.getElementById('search-input').value = '';
        document.getElementById('location-input').value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('contract-filter').value = '';
        document.getElementById('experience-filter').value = '';
        document.getElementById('salary-filter').value = '';
        
        // Mettre à jour les tags
        updateFilterTags();
    };
    
    // Interface publique du composant
    return {
        init,
        getActiveFilters,
        resetFilters
    };
})();