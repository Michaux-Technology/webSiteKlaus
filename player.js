document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('playPause');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const progressBar = document.querySelector('.progress');
    const volumeControl = document.getElementById('volume');
    const volumeIcon = document.querySelector('.volume-control i');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');

    // Fonction pour formater le temps
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Gestion du bouton play/pause
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        } else {
            audio.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    });

    // Mise à jour de la barre de progression
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    // Mise à jour de la durée totale
    audio.addEventListener('loadedmetadata', function() {
        durationSpan.textContent = formatTime(audio.duration);
    });

    // Gestion du clic sur la barre de progression
    document.querySelector('.progress-bar').addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    // Gestion du volume
    volumeControl.addEventListener('input', function() {
        audio.volume = this.value / 100;
        updateVolumeIcon(this.value);
    });

    // Mise à jour de l'icône du volume
    function updateVolumeIcon(value) {
        volumeIcon.className = 'fas';
        if (value == 0) {
            volumeIcon.classList.add('fa-volume-mute');
        } else if (value < 50) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-up');
        }
    }

    // Gestion du clic sur l'icône du volume
    volumeIcon.addEventListener('click', function() {
        if (audio.volume > 0) {
            audio.volume = 0;
            volumeControl.value = 0;
        } else {
            audio.volume = 1;
            volumeControl.value = 100;
        }
        updateVolumeIcon(volumeControl.value);
    });
}); 