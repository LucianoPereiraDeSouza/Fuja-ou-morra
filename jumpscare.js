function showJumpscare() {

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

    document.body.appendChild(jumpscareDiv);

    var audio = new Audio('jumpscare.mp3');
    audio.play();
}
