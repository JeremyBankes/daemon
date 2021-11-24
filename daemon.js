const timer = {

    Timer: class {

        /**
         * Creates a timer synchronized to the latest hour.
         * @param {number} interval 
         * @param {function} callback 
         */
        constructor(interval = 3600 * 1000, callback) {
            this.interval = interval;
            this.callback = callback;
            this.timerId = null;
        }

        start() {
            if (this.timerId !== null) throw new Error('Timer already running.');
            return this.prepare();
        }

        stop() {
            if (this.timerId !== null) {
                clearTimeout(this.timerId);
            }
            this.timerId = null;
        }

        prepare() {
            const now = new Date();
            const lastHour = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()));
            const elapsedSinceLastHour = now.getTime() - lastHour.getTime();
            const delay = this.interval - elapsedSinceLastHour % this.interval;
            this.timerId = setTimeout(() => {
                this.callback();
                if (this.timerId) this.prepare();
            }, delay);
            return delay;
        }

    }

};

module.exports = timer;