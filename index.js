const defaults = {
    /** @type {boolean} */
    init: true,
    /** @type {String} target selector */
    targetSelector: '[data-aos]',
    /** @type {String} add class name */
    addClass: 'is-active',
    /** @type {Number[]} */
    threshold: [0.25],
    /** @type {boolean} */
    isOnce: false,
};

export default class ScrollShowElm {
    /**
     * @param {defaults} props
     */
    constructor(props) {
        const options = { ...defaults, ...props };
        this.init = options.init;
        this.targetSelector = options.targetSelector;
        this.addClass = options.addClass;
        this.threshold = options.threshold;
        this.isOnce = options.isOnce;

        if (this.init) this.initialize();
    }
    initialize() {
        /** @type {HTMLElement[]} */
        this.targets = document.querySelectorAll(this.targetSelector);
        if (this.targets.length > 0) {
            this.start();
        }
    }
    start() {
        /** @type {IntersectionObserverInit} */
        const options = {
            threshold: this.threshold,
        };
        /**
         * @param {IntersectionObserverEntry[]} entries
         * @param {IntersectionObserver} observer
         */
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= this.threshold) {
                    entry.target.classList.add(this.addClass);
                    if (this.isOnce) observer.unobserve(entry.target);
                } else if (!entry.isIntersecting) {
                    entry.target.classList.remove(this.addClass);
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        this.targets.forEach((elm) => {
            observer.observe(elm);
        });
    }
}
