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

        };
    },
    methods: {
        attackPlayer() {
            this.viePlayer -= 20;
        },

        attackAdversaire() {
            this.vieAdversaire -= 15;
            this.attackPlayer();
            this.currentround += 1;
            this.specialReady();
            this.soinReady();
            this.verifyVie();
        },

        specialAttackAdversaire() {
            if(this.readyTour == true) {
                this.vieAdversaire -= 30;
                this.attackPlayer();
                this.currentround += 1;
                this.readyTour = false;
                this.verifyVie();
            }
        },

        specialReady() {
            if (this.currentround %3 == 0) {
                this.readyTour = true;
            }
        },

        soinReady() {
            if (this.viePlayer < 100) {
                this.readySoin = true;
            } else {
                this.readySoin = false;
            }
        },

        soinPlayer() {
            if(this.viePlayer < 100) {
                this.viePlayer += 30;
                this.attackPlayer();
                this.currentround += 1;
                this.specialReady();
                this.soinReady();
            }
        },

        verifyVie() {
            if(this.viePlayer <= 0 && this.vieAdversaire > 0) {
                this.stopGame = true;
                this.viePlayer = 0;
                this.result = 'PERDU..';
            } else if (this.vieAdversaire <= 0 && this.viePlayer > 0) {
                this.stopGame = true;
                this.vieAdversaire = 0;
                this.result = 'VICTOIRE!';
            } else if (this.viePlayer <= 0 && this.vieAdversaire <= 0) {
                this.stopGame = true;
                this.viePlayer = 0;
                this.vieAdversaire = 0;
                this.result = "ÉGALITÉ"
            }
        },

        givingUp() {
            this.stopGame = true;
            this.result = 'ABANDON...'
        }
    }
}).mount('#app');
