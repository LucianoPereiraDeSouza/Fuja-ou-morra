function showJumpscare() {

    // Cria um elemento div que cobre toda a tela
    var jumpscareDiv = document.createElement('div');
    jumpscareDiv.style.position = 'fixed';
    jumpscareDiv.style.top = '0';
    jumpscareDiv.style.left = '0';
    jumpscareDiv.style.width = '99%';
    jumpscareDiv.style.height = '99%';
    jumpscareDiv.style.zIndex = '1000';
    jumpscareDiv.style.backgroundImage = 'url("jumpscare.png")';
    jumpscareDiv.style.backgroundSize = 'cover';
    jumpscareDiv.style.backgroundPosition = 'center';
    jumpscareDiv.style.backgroundRepeat = 'no-repeat';

    // Adiciona o div ao corpo da página
    document.body.appendChild(jumpscareDiv);

    // Reproduz o áudio de jumpscare
    var audio = new Audio('jumpscare.mp3');
    audio.play();
}
