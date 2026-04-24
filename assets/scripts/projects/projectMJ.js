export function initProjectMJ() {
    const galleryItems = document.querySelectorAll('#mj-gallery .gallery-item');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');

    // Abre o Dialog ao clicar em alguma imagem da galeria
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            modalImg.src = e.target.src;
            modal.showModal();
            document.body.style.overflow = 'hidden'; // Impede rolagem da página atrás do modal
        });
    });

    // Fecha o Dialog ao clicar no botão
    closeModalBtn.addEventListener('click', () => {
        modal.close();
        document.body.style.overflow = 'auto';
    });

    // Fecha o Dialog ao clicar fora da imagem (no backdrop do dialog)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
            document.body.style.overflow = 'auto';
        }
    });

    console.log("Módulo Mundo do Jeans Carregado.");
}
