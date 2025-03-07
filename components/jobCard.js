/**
 * Composant pour afficher une carte d'offre d'emploi
 */
const JobCard = (() => {
    // Formater la date en format relatif (il y a X jours)
    const formatDate = (date) => {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return "Aujourd'hui";
        } else if (diffDays === 1) {
            return "Hier";
        } else {
            return `Il y a ${diffDays} jours`;
        }
    };

    // Créer le HTML pour une carte d'emploi
    const createJobCard = (job) => {
        // Obtenir l'initiale de l'entreprise pour le logo
        const companyInitial = job.company.charAt(0).toUpperCase();
        
        // Formater le salaire s'il existe
        const formattedSalary = job.salary ? 
            job.salary >= 1000 ? 
                `${(job.salary / 1000).toFixed(0)}K€` : 
                `${job.salary}€` : 
            'Non précisé';
        
        // Mapper les types de contrat pour affichage
        const contractTypes = {
            'cdi': 'CDI',
            'cdd': 'CDD',
            'freelance': 'Freelance',
            'stage': 'Stage',
            'alternance': 'Alternance'
        };
        
        // Mapper les niveaux d'expérience pour affichage
        const experienceLevels = {
            'junior': 'Débutant (0-2 ans)',
            'mid': 'Intermédiaire (2-5 ans)',
            'senior': 'Confirmé (5+ ans)'
        };
        
        // Créer le HTML pour les tags de compétences
        const tagsHtml = job.requirements
            .slice(0, 3) // Limiter à 3 tags pour l'affichage
            .map(tag => `<span class="job-tag">${tag}</span>`)
            .join('');
        
        // HTML de la carte d'emploi
        return `
            <div class="job-card" data-id="${job.id}">
                <div class="job-card-header">
                    <div class="company-logo">${companyInitial}</div>
                    <div class="job-info">
                        <h4>${job.title}</h4>
                        <div class="company-name">${job.company}</div>
                    </div>
                </div>
                <div class="job-meta">
                    <div class="job-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${job.location}</span>
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${contractTypes[job.type] || job.type}</span>
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-user-graduate"></i>
                        <span>${experienceLevels[job.experience] || job.experience}</span>
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-euro-sign"></i>
                        <span>${formattedSalary}</span>
                    </div>
                </div>
                <div class="job-description">${job.description}</div>
                <div class="job-tags">
                    ${tagsHtml}
                    ${job.requirements.length > 3 ? `<span class="job-tag">+${job.requirements.length - 3}</span>` : ''}
                </div>
                <div class="job-footer">
                    <div class="job-date">${formatDate(job.date)}</div>
                    <a href="mailto:${job.contactEmail}?subject=Candidature: ${job.title}" class="job-apply">Postuler <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
    };

    // Afficher une liste de jobs dans un conteneur
    const renderJobs = (jobs, containerId) => {
        const container = document.getElementById(containerId);
        
        // Si aucun job trouvé
        if (jobs.length === 0) {
            container.innerHTML = `
                <div class="no-jobs">
                    <i class="fas fa-search"></i>
                    <p>Aucune offre d'emploi ne correspond à vos critères.</p>
                    <button class="btn btn-outline reset-filters">Réinitialiser les filtres</button>
                </div>
            `;
            return;
        }
        
        // Générer le HTML pour chaque job
        const jobsHtml = jobs.map(job => createJobCard(job)).join('');
        container.innerHTML = jobsHtml;
        
        // Mettre à jour le compteur de résultats
        document.getElementById('jobs-count').textContent = jobs.length;
        
        // Ajouter un événement pour les boutons de réinitialisation des filtres
        const resetBtn = container.querySelector('.reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // Réinitialiser tous les filtres
                document.querySelectorAll('select').forEach(select => {
                    select.value = '';
                });
                document.getElementById('search-input').value = '';
                document.getElementById('location-input').value = '';
                
                // Déclencher une nouvelle recherche
                const event = new CustomEvent('filters:changed');
                document.dispatchEvent(event);
            });
        }
    };

    // Interface publique du composant
    return {
        renderJobs
    };
})();