document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.close');
    const triggers = document.querySelectorAll('.modal-trigger, .video-thumb');

    // Fermer la modal
    function closeModal() {
        modal.style.display = 'none';
        modalContent.innerHTML = ''; // Vider le contenu pour arrêter la vidéo
    }

    closeBtn.onclick = closeModal;
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };

    // Gérer la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Ouvrir la modal
    triggers.forEach(trigger => {
        trigger.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Si on clique sur le conteneur video-thumb, on cherche l'image à l'intérieur
            let targetElement = this.classList.contains('video-thumb') ? 
                this.querySelector('.modal-trigger') : this;

            const type = targetElement.dataset.type;
            const src = targetElement.dataset.src;
            
            modal.style.display = 'flex';
            
            if (type === 'image') {
                modalContent.innerHTML = `<img src="${src}" alt="Image en plein écran">`;
            } else if (type === 'video') {
                modalContent.innerHTML = `
                    <video controls autoplay style="max-width: 90vw; max-height: 80vh;">
                        <source src="${src}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>`;
                
                // Démarrer la lecture automatiquement
                const video = modalContent.querySelector('video');
                video.play().catch(function(error) {
                    console.log("La lecture automatique a échoué:", error);
                });
            }
        };
    });
}); 