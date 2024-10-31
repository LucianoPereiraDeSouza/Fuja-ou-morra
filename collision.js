function checkCollision(player, npcs) {
    for (var i = 0; i < npcs.length; i++) {
        if (player.x === npcs[i].x && player.y === npcs[i].y) {
            endGame(player, npcs);
            break;
        }
    }
}

function endGame(player, npcs) {
    for (var i = 0; i < npcs.length; i++) {
        npcs[i].stop();
    }

    window.removeEventListener('keyup', window.keyupHandler);

    showJumpscare();

    player = null;
    npcs = [];
}