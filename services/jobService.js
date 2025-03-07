/**
 * Service pour gérer les opérations liées aux offres d'emploi
 */
const JobService = (() => {
    // Données d'exemple pour le jobboard
    const sampleJobs = [
        {
            id: 1,
            title: "Développeur Frontend React",
            company: "TechSolutions",
            location: "Paris",
            type: "cdi",
            category: "dev",
            experience: "mid",
            salary: 45000,
            date: new Date(2025, 2, 1),
            description: "Nous recherchons un développeur Frontend React pour rejoindre notre équipe et travailler sur des projets innovants dans le domaine de la tech.",
            requirements: ["React", "JavaScript", "HTML", "CSS", "Git"],
            contactEmail: "recrutement@techsolutions.fr"
        },
        {
            id: 2,
            title: "UX/UI Designer",
            company: "DesignStudio",
            location: "Lyon",
            type: "cdi",
            category: "design",
            experience: "senior",
            salary: 50000,
            date: new Date(2025, 2, 3),
            description: "Rejoignez notre studio de design pour créer des expériences utilisateur exceptionnelles pour nos clients dans différents secteurs d'activité.",
            requirements: ["Figma", "Sketch", "Adobe XD", "Prototypage", "User Research"],
            contactEmail: "jobs@designstudio.com"
        },
        {
            id: 3,
            title: "Chef de Projet Marketing Digital",
            company: "MarketingPro",
            location: "Bordeaux",
            type: "cdi",
            category: "marketing",
            experience: "senior",
            salary: 48000,
            date: new Date(2025, 2, 5),
            description: "Gestion de campagnes marketing multi-canal pour nos clients grands comptes. Expérience en SEO/SEA et réseaux sociaux requise.",
            requirements: ["SEO", "SEA", "Réseaux sociaux", "Analytics", "Gestion de projet"],
            contactEmail: "recrutement@marketingpro.fr"
        },
        {
            id: 4,
            title: "Développeur Backend Node.js",
            company: "WebTech",
            location: "Paris",
            type: "cdi",
            category: "dev",
            experience: "mid",
            salary: 47000,
            date: new Date(2025, 2, 2),
            description: "Développement d'APIs performantes et scalables pour nos applications web et mobiles. Expérience avec Node.js et les bases de données NoSQL requise.",
            requirements: ["Node.js", "Express", "MongoDB", "API REST", "Git"],
            contactEmail: "careers@webtech.io"
        },
        {
            id: 5,
            title: "Commercial B2B",
            company: "SalesMaster",
            location: "Lille",
            type: "cdi",
            category: "sales",
            experience: "junior",
            salary: 35000,
            date: new Date(2025, 2, 6),
            description: "Prospection et développement d'un portefeuille clients dans le secteur des services aux entreprises. Débutants acceptés avec formation assurée.",
            requirements: ["Vente B2B", "Prospection", "Négociation", "CRM"],
            contactEmail: "recrutement@salesmaster.fr"
        },
        {
            id: 6,
            title: "Support Client Technique",
            company: "TechHelp",
            location: "Toulouse",
            type: "cdd",
            category: "support",
            experience: "junior",
            salary: 28000,
            date: new Date(2025, 2, 4),
            description: "Assistance technique par téléphone et email pour nos clients utilisant notre suite logicielle. Connaissances techniques et bon relationnel requis.",
            requirements: ["Support technique", "Résolution de problèmes", "Logiciels CRM", "Communication"],
            contactEmail: "jobs@techhelp.com"
        },
        {
            id: 7,
            title: "Product Owner",
            company: "InnovateApp",
            location: "Paris",
            type: "cdi",
            category: "dev",
            experience: "senior",
            salary: 55000,
            date: new Date(2025, 2, 7),
            description: "Définition et gestion du backlog produit pour notre application mobile en forte croissance. Expérience en méthodologie agile nécessaire.",
            requirements: ["Agile", "Scrum", "Backlog", "User Stories", "Priorisation"],
            contactEmail: "recrutement@innovateapp.com"
        },
        {
            id: 8,
            title: "Graphiste",
            company: "CreativeDesigns",
            location: "Marseille",
            type: "freelance",
            category: "design",
            experience: "mid",
            salary: null,
            date: new Date(2025, 2, 8),
            description: "Création d'identités visuelles, supports marketing et contenus pour les réseaux sociaux. Mission freelance de 3 mois renouvelable.",
            requirements: ["Photoshop", "Illustrator", "InDesign", "Direction artistique"],
            contactEmail: "hello@creativedesigns.fr"
        },
        {
            id: 9,
            title: "Développeur Mobile React Native",
            company: "AppFactory",
            location: "Nice",
            type: "cdi",
            category: "dev",
            experience: "senior",
            salary: 52000,
            date: new Date(2025, 2, 8),
            description: "Développement d'applications mobiles cross-platform avec React Native. Expérience significative et portfolio de projets requis.",
            requirements: ["React Native", "JavaScript", "Redux", "API REST", "Mobile UI/UX"],
            contactEmail: "jobs@appfactory.io"
        },
        {
            id: 10,
            title: "Stage Marketing Digital",
            company: "DigitalBoost",
            location: "Paris",
            type: "stage",
            category: "marketing",
            experience: "junior",
            salary: 700,
            date: new Date(2025, 2, 9),
            description: "Stage de 6 mois en marketing digital avec possibilité d'embauche. Missions variées: réseaux sociaux, SEO, création de contenu, analyse de données.",
            requirements: ["Marketing digital", "Réseaux sociaux", "SEO", "Création de contenu"],
            contactEmail: "stages@digitalboost.fr"
        }
    ];

    // Récupérer les jobs depuis le localStorage ou utiliser les exemples
    const getJobs = () => {
        const storedJobs = localStorage.getItem('jobs');
        if (storedJobs) {
            // Parse les dates correctement
            const jobs = JSON.parse(storedJobs);
            return jobs.map(job => ({
                ...job,
                date: new Date(job.date)
            }));
        }
        
        // Si aucun job n'est stocké, initialiser avec les exemples
        localStorage.setItem('jobs', JSON.stringify(sampleJobs));
        return sampleJobs;
    };

    // Sauvegarder les jobs dans le localStorage
    const saveJobs = (jobs) => {
        localStorage.setItem('jobs', JSON.stringify(jobs));
    };

    // Ajouter un nouveau job
    const addJob = (job) => {
        const jobs = getJobs();
        // Générer un ID unique
        const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
        
        // Créer le nouveau job avec la date actuelle
        const newJob = {
            ...job,
            id: newId,
            date: new Date()
        };
        
        // Ajouter le job à la liste et sauvegarder
        const updatedJobs = [...jobs, newJob];
        saveJobs(updatedJobs);
        
        return newJob;
    };

    // Filtrer les jobs selon plusieurs critères
    const filterJobs = (jobs, filters) => {
        return jobs.filter(job => {
            // Filtre par mot-clé (titre, entreprise, description)
            if (filters.keyword && !(
                job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                job.description.toLowerCase().includes(filters.keyword.toLowerCase())
            )) {
                return false;
            }
            
            // Filtre par localisation
            if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }
            
            // Filtre par catégorie
            if (filters.category && filters.category !== '' && job.category !== filters.category) {
                return false;
            }
            
            // Filtre par type de contrat
            if (filters.type && filters.type !== '' && job.type !== filters.type) {
                return false;
            }
            
            // Filtre par expérience
            if (filters.experience && filters.experience !== '' && job.experience !== filters.experience) {
                return false;
            }
            
            // Filtre par salaire
            if (filters.salary && filters.salary !== '') {
                const [min, max] = filters.salary.split('-').map(Number);
                
                // Si le salaire est défini pour le job
                if (job.salary) {
                    // Cas particulier pour "70000+"
                    if (filters.salary === '70000+' && job.salary < 70000) {
                        return false;
                    } 
                    // Cas des tranches
                    else if (min && max && (job.salary < min || job.salary > max)) {
                        return false;
                    }
                    // Cas "< 30000"
                    else if (filters.salary === '0-30000' && job.salary >= 30000) {
                        return false;
                    }
                } else if (filters.salary !== '') {
                    // Si on filtre par salaire mais que le job n'a pas de salaire défini
                    return false;
                }
            }
            
            return true;
        });
    };

    // Obtenir un job par son ID
    const getJobById = (id) => {
        const jobs = getJobs();
        return jobs.find(job => job.id === id);
    };

    // Interface publique du service
    return {
        getJobs,
        addJob,
        filterJobs,
        getJobById
    };
})();