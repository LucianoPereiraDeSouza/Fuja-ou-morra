var field, player, npcs = [];

class Field{
    constructor(cols, rows, containerId){
        this.cols = cols;
        this.rows = rows;
        this.container = document.querySelector(containerId);
        this.createField();
    }

    createField(){
        var field = [];
        for(var i = 0; i < this.rows; i++){
            field[i] = [];
            for(var j = 0; j < this.cols; j++){
                field[i].push(this.createRock());
            }
        }
        this.field = field;
        this.drawField();
    }

    createRock(){
        return Math.trunc(Math.random() * 5) === 1 ? '@' : '';
    }

    drawField(){
        var template = '';
        for(var i = 0; i < this.rows; i++){
            template += '<tr>';
            for(var j = 0; j < this.cols; j++){
                var cellContent = this.field[i][j];

                // Verifica se o jogador está na posição atual
                if (player && player.x === j && player.y === i) {
                    cellContent += player.face;
                }

                // Verifica se algum NPC está na posição atual
                npcs.forEach(function(npc){
                    if (npc.x === j && npc.y === i) {
                        cellContent += npc.face;
                    }
                });

                template += `<td>${cellContent}</td>`;
            }
            template += '</tr>';
        }
        this.container.innerHTML = template;
    }
}

class Character{
    constructor(field, x, y, face){
        this.face = face;
        this.x = x;
        this.y = y;
        this.table = field;
        if(!this.setPosition(this.x, this.y)){
            throw Error();
        }
    }

    up(){
        if(this.y > 0){
            this.setPosition(this.x, this.y - 1);
        }
    }

    down(){
        if(this.y + 1 < this.table.rows){
            this.setPosition(this.x, this.y + 1);
        }
    }

    left(){
        if(this.x > 0){
            this.setPosition(this.x - 1, this.y);
        }
    }

    right(){
        if(this.x + 1 < this.table.cols){
            this.setPosition(this.x + 1, this.y);
        }
    }

    setPosition(x, y){
        if(this.table.field[y][x] !== '@'){
            this.table.field[this.y][this.x] = '';
            this.x = x;
            this.y = y;
            this.table.field[this.y][this.x] = '';
            this.table.drawField();

            // Verifica colisão após o movimento
            if (typeof checkCollision === 'function' && npcs.length > 0 && player) {
                checkCollision(player, npcs);
            }

            return true;
        }
        return false;
    }
}

class Player extends Character{
    constructor(field){
        super(field, 0, 0, '😱');
    }
}

class Npc extends Character{
    constructor(field){
        var x, y;
        do {
            x = Math.trunc(Math.random() * field.cols);
            y = Math.trunc(Math.random() * field.rows);
        } while (field.field[y][x] === '@');

        super(field, x, y, '👹');
        this.interval = setInterval(this.walk.bind(this), 300);
    }

    walk(){
        var direction = Math.trunc(Math.random() * 4) + 1;
        switch(direction){
            case 1: this.up(); break;
            case 2: this.down(); break;
            case 3: this.left(); break;
            case 4: this.right(); break;
        }
    }

    // Sobrescrevendo o método setPosition para NPCs
    setPosition(x, y){
        if(this.table.field[y][x] !== '@'){
            // Verifica se outro NPC está na célula de destino
            for(var i = 0; i < npcs.length; i++){
                if(npcs[i] !== this && npcs[i].x === x && npcs[i].y === y){
                    // A célula está ocupada por outro NPC
                    return false;
                }
            }
            // Movimento permitido
            this.table.field[this.y][this.x] = '';
            this.x = x;
            this.y = y;
            this.table.field[this.y][this.x] = '';
            this.table.drawField();

            // Verifica colisão após o movimento
            if (typeof checkCollision === 'function' && npcs.length > 0 && player) {
                checkCollision(player, npcs);
            }

            return true;
        }
        return false;
    }

    stop(){
        clearInterval(this.interval);
    }
}

function NpcSpawn(){
    // Cria um novo NPC imediatamente
    npcs.push(new Npc(field));

    // Cria novos NPCs a cada 3 segundos
    setInterval(function(){
        npcs.push(new Npc(field));
    }, 3000);
}

function startField(){
    var cols = document.querySelector('#cols').value || 3,
        rows = document.querySelector('#rows').value || 3,
        audio = new Audio('background.mp3');

    document.querySelector('button').disabled = true;

    field = new Field(cols, rows, '#myTable');
    try{
        player = new Player(field);
        npcs = [];
        NpcSpawn();
        audio.play();
    }catch(e){
        console.log('starting field again!');
        startField();
    }
}

window.keyupHandler = function(event){
    if(player){
        const A = 65,
            S = 83,
            D = 68,
            W = 87;

        switch(event.keyCode){
            case A: player.left(); break;
            case S: player.down(); break;
            case D: player.right(); break;
            case W: player.up(); break;
        }
    }
}

window.addEventListener('keyup', window.keyupHandler);
