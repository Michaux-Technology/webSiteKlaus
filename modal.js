document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.modal-trigger').forEach(item => {
        item.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            const src = this.getAttribute('data-src');
            modalContent.innerHTML = '';
            if (type === 'image') {
                const img = document.createElement('img');
                img.src = src;
                img.alt = '';
                modalContent.appendChild(img);
            } else if (type === 'video') {
                const iframe = document.createElement('iframe');
                iframe.src = src + '?autoplay=1';
                iframe.width = '800';
                iframe.height = '450';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                modalContent.appendChild(iframe);
            }
            modal.style.display = 'flex';
        });
    });

    closeBtn.onclick = function () {
        modal.style.display = 'none';
        modalContent.innerHTML = '';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalContent.innerHTML = '';
        }
    };
}); 