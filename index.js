const defaults = {
    /**
     * Whether Aos should be initialised automatically when you create an instance.
     * If disabled, then you need to init it manually by calling Aos.init()
     * @type {boolean}
     * @default true
     */
    init: true,
    /**
     * @type {String} target selector
     * @default '[data-aos]'
     */
    targetSelector: '[data-aos]',
    /**
     * @type {String} add class name
     * @default 'is-active'
     */
    addClass: 'is-active',
    /**
     * @type {number | number[]}
     * @default [0.25]
     */
    threshold: [0.25],
    /**
     * @type {boolean}
     * @default false
     */
    isOnce: false,
    /**
     * @type {function({entry: IntersectionObserverEntry})}
     * @returns void
     * @default null
     */
    callback: null,
};

export class Aos {
    /**
     * @param {defaults} props
     */
    constructor(props) {
        this.params = { ...defaults, ...props };
        if (this.params.init) this.init();
    }
    init() {
        /** @type {HTMLElement[]} */
        this.targets = document.querySelectorAll(this.params.targetSelector);
        if (this.targets.length > 0) this.start();
    }
    start() {
        /** @type {IntersectionObserverInit} */
        const options = {
            threshold: this.params.threshold,
        };
        /**
         * @param {IntersectionObserverEntry[]} entries
         * @param {IntersectionObserver} observer
         */
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= this.params.threshold) {
                    entry.target.classList.add(this.params.addClass);
                    if (this.params.isOnce) observer.unobserve(entry.target);
                    if (this.params.callback) this.params.callback({ entry });
                } else if (!entry.isIntersecting) {
                    entry.target.classList.remove(this.params.addClass);
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        this.targets.forEach((elm) => {
            observer.observe(elm);
        });
    }
}
