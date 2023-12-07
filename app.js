Vue.createApp({
    data() {
        return {
            viePlayer: 250,
            vieAdversaire: 250,

            currentround: 0,

            readyTour: false,
            readySoin: false,

            result: '',
            stopGame: false,

            listMsg: ['Début de game'],
            msg: '',

            colorViePlayer: 'chartreuse',
            colorVieAdversaire: 'chartreuse',

            win: 0,

        };
    },
    methods: {
        attackPlayer() {
            let attack = Math.random() * (30 - 20) + 20;
            attack = Math.floor(attack);
            this.viePlayer -= attack;
            this.msg = 'Anubis se prend ' + attack + ' points de dégâts!';
            this.addMsg(); 
        },

        attackAdversaire() {
            let attack2 = Math.random() * (20 - 10) + 10;
            attack2 = Math.floor(attack2);
            this.vieAdversaire -= attack2;
            this.msg = "L'ennemi se prend " + attack2 + " points de dégâts!";
            this.addMsg();
            this.attackPlayer();
            this.currentround += 1;
            this.specialReady();
            this.soinReady();
            this.lifeBar();
            this.verifyVie();
        },

        specialAttackAdversaire() {
            if(this.readyTour == true) {
                let attackSpe = Math.random() * (30 - 20) + 20;
                attackSpe = Math.floor(attackSpe);
                this.vieAdversaire -= attackSpe;
                this.msg = "L'ennemi se prend d'énormes dégâts! Il perd " + attackSpe + "PV!";
                this.addMsg();
                this.attackPlayer();
                this.currentround += 1;
                this.readyTour = false;
                this.lifeBar();
                this.verifyVie();
            }
        },

        specialReady() {
            if (this.currentround %3 == 0) {
                this.readyTour = true;
                this.msg = "L'attaque spéciale est prête!";
                this.addMsg();
            }
        },

        soinReady() {
            if (this.viePlayer < 100) {
                this.readySoin = true;
                this.msg = "Le soin est prêt!";
                this.addMsg();
            } else {
                this.readySoin = false;
            }
        },

        soinPlayer() {
            let health = Math.random() * (40 - 25) + 25;
            if(this.viePlayer < 100) {
                health = Math.floor(health);
                this.viePlayer += health;
                this.msg = "Anubis vient de se soigner! Elle regagne " + health + "PV!";
                this.addMsg();
                this.attackPlayer();
                this.currentround += 1;
                this.specialReady();
                this.soinReady();
                this.lifeBar();
                this.verifyVie();
            }
        },

        verifyVie() {
            if(this.viePlayer <= 0 && this.vieAdversaire > 0) {
                this.stopGame = true;
                this.viePlayer = 0;
                this.result = 'PERDU..';
                this.msg = "Fin de game: Défaite";
                this.addMsg();
            } else if (this.vieAdversaire <= 0 && this.viePlayer > 0) {
                this.stopGame = true;
                this.vieAdversaire = 0;
                this.result = 'VICTOIRE!';
                this.msg = "Fin de game: Victoire";
                this.win += 1;
                this.addMsg();
            } else if (this.viePlayer <= 0 && this.vieAdversaire <= 0) {
                this.stopGame = true;
                this.viePlayer = 0;
                this.vieAdversaire = 0;
                this.result = "ÉGALITÉ"
                this.msg = "Fin de game: Égalité";
                this.win += 0.5;
                this.addMsg();
            }
        },

        givingUp() {
            this.stopGame = true;
            this.result = 'ABANDON...'
            this.msg = "Fin de game: Abandon";
            this.addMsg();
        },

        addMsg() {
            this.listMsg.unshift(this.msg);
        },

        lifeBar() {
            if(this.viePlayer < 100 && this.viePlayer > 25) {
                this.colorViePlayer = 'orange';
            } else if (this.viePlayer < 25) {
                this.colorViePlayer = 'red';
            } else {
                this.colorViePlayer = 'chartreuse';
            }

            if(this.vieAdversaire < 100 && this.vieAdversaire > 25) {
                this.colorVieAdversaire = 'orange';
            } else if (this.vieAdversaire < 25) {
                this.colorVieAdversaire = 'red';
            } else {
                this.colorVieAdversaire = 'chartreuse';
            }
        },

        relancerGame() {
            this.viePlayer = 250;
            this.vieAdversaire = 250;
            this.currentround = 0;
            this.readySoin = false;
            this.readyTour = false;
            this.colorViePlayer = 'chartreuse';
            this.colorVieAdversaire = 'chartreuse';
            this.stopGame = false;
            this.result = '';
            this.listMsg = ['Nouvelle game'];

        }
    }
}).mount('#app');