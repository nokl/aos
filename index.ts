interface AosOptions {
    /**
     * Whether Aos should be initialised automatically when you create an instance.
     * If disabled, then you need to init it manually by calling Aos.init()
     * @default true
     */
    init: boolean;
    /**
     * target selector
     *
     * @default '[data-aos]'
     */
    targetSelector: string;
    /**
     * add class name
     *
     * @default 'is-active'
     */
    addClass: string;
    /**
     * @default [0.25]
     */
    threshold: number | number[];
    /**
     * @default false
     */
    isOnce: boolean;
}

const defaults: AosOptions = {
    init: true,
    targetSelector: '[data-aos]',
    addClass: 'is-active',
    threshold: [0.25],
    isOnce: false,
};

export default class Aos {
    params!: AosOptions;
    targets!: NodeListOf<HTMLElement>;
    constructor(props: AosOptions) {
        this.params = { ...defaults, ...props };

        if (this.params.init) this.init();
    }

    init() {
        this.targets = document.querySelectorAll<HTMLElement>(this.params.targetSelector);
        if (this.targets.length > 0) this.start();
    }
    start() {
        const options: IntersectionObserverInit = {
            threshold: this.params.threshold,
        };
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= this.params.threshold) {
                    entry.target.classList.add(this.params.addClass);
                    if (this.params.isOnce) observer.unobserve(entry.target);
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
