const core = require('../core/core.js');

const timer = {

    Timer: class {

        constructor(interval = 3600 * 1000, callback) {
            this.interval = interval;
            this.callback = callback;
            this.timerId = null;
        }

        start() {
            if (this.timerId !== null) throw new Error('Timer already running.');
            this.prepare();
        }

        stop() {
            if (this.timerId !== null) {
                clearTimeout(this.timerId);
                console.log('Cleared timeout');
            }
            this.timerId = null;
        }

        prepare() {
            const now = new Date();
            const lastHour = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()));
            const elapsedSinceLastHour = now.getTime() - lastHour.getTime();
            const delay = this.interval - elapsedSinceLastHour % this.interval;
            console.log(core.time.toDurationString(delay, true));
            this.timerId = setTimeout(() => {
                this.callback();
                if (this.timerId) this.prepare();
            }, delay);
        }

    }

};

module.exports = timer;