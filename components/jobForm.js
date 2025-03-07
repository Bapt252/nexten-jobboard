/**
 * Composant pour gérer le formulaire d'ajout d'offre d'emploi
 */
const JobForm = (() => {
    // Référence au modal
    let modal;
    
    // Initialiser le composant
    const init = () => {
        modal = document.getElementById('job-form-modal');
        const form = document.getElementById('job-form');
        const publishBtn = document.getElementById('publish-btn');
        const closeBtn = modal.querySelector('.close-btn');
        const cancelBtn = document.getElementById('cancel-job-form');
        
        // Ouvrir le modal lors du clic sur le bouton
        publishBtn.addEventListener('click', () => {
            openModal();
        });
        
        // Fermer le modal lors du clic sur le bouton de fermeture
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
        
        // Fermer le modal lors du clic sur le bouton d'annulation
        cancelBtn.addEventListener('click', () => {
            closeModal();
        });
        
        // Gérer la soumission du formulaire
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm();
        });
        
        // Fermer le modal lors du clic en dehors
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    };
    
    // Ouvrir le modal et réinitialiser le formulaire
    const openModal = () => {
        resetForm();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    // Fermer le modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // Réinitialiser le formulaire
    const resetForm = () => {
        document.getElementById('job-form').reset();
    };
    
    // Soumettre le formulaire
    const submitForm = () => {
        // Récupérer les valeurs du formulaire
        const title = document.getElementById('job-title').value;
        const company = document.getElementById('company-name').value;
        const location = document.getElementById('job-location').value;
        const category = document.getElementById('job-category').value;
        const type = document.getElementById('job-type').value;
        const experience = document.getElementById('job-experience').value;
        const salary = document.getElementById('job-salary').value ? parseInt(document.getElementById('job-salary').value) : null;
        const description = document.getElementById('job-description').value;
        const requirements = document.getElementById('job-requirements').value
            .split(',')
            .map(req => req.trim())
            .filter(req => req !== '');
        const contactEmail = document.getElementById('application-email').value;
        
        // Créer l'objet job
        const job = {
            title,
            company,
            location,
            category,
            type,
            experience,
            salary,
            description,
            requirements,
            contactEmail
        };
        
        // Ajouter le job via le service
        JobService.addJob(job);
        
        // Fermer le modal et déclencher une mise à jour
        closeModal();
        document.dispatchEvent(new CustomEvent('jobs:updated'));
        
        // Afficher un message de confirmation
        showNotification('Offre publiée avec succès !', 'success');
    };
    
    // Afficher une notification
    const showNotification = (message, type = 'info') => {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <i class="fas fa-times close-notification"></i>
        `;
        
        // Ajouter au DOM
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-fermeture après 5 secondes
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
        
        // Fermeture manuelle
        notification.querySelector('.close-notification').addEventListener('click', () => {
            closeNotification(notification);
        });
    };
    
    // Fermer une notification
    const closeNotification = (notification) => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    };
    
    // Interface publique du composant
    return {
        init
    };
})();