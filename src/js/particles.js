/*!
 * Cuberto Particles
 *
 * @version 1.0.0
 * @licence Copyright (c) 2021, Cuberto. All rights reserved.
 */

import gsap from 'gsap';

export default class Particles {
    constructor(options) {
        this.options = Object.assign({}, {
            container: null,
            itemsSelector: "[data-particle-item]",
            observable: true,
            observableTarget: null,
            observableRefresh: true,
            repeats: -1,
            timeScale: 1,
            initialSeek: 1500,
            fadeInDuration: 0.7,
            fadeInEase: "power1.out",
            fadeOutDuration: 0.7,
            fadeOutEase: "power1.out",
            yStart: () => this.container.offsetHeight,
            yEnd: (v, e) => -e.offsetHeight,
            xStart: undefined,
            xEnd: undefined,
            ease: "none",
            duration: () => gsap.utils.random(5, 10),
            offset: () => gsap.utils.random(0, 20),
        }, options);

        this.timeScale = this.options.timeScale;
        this.init();
    }

    /**
     * Init particles.
     */
    init() {
        this.container = typeof (this.options.container) === "string" ?
            document.querySelector(this.options.container) :
            this.options.container;
        this.items = this.container.querySelectorAll(this.options.itemsSelector);
        this.tl = this.createTimeline();

        if (this.options.observable) {
            this.observe();
        } else {
            this.start();
        }

        if (this.options.repeats === -1) this.tl.seek(this.options.initialSeek);
        this.bind();
    }

    /**
     * Bind events.
     */
    bind() {
        window.addEventListener('resize', this.refresh.bind(this));
    }

    /**
     * Remove events.
     */
    unbind() {
        window.removeEventListener('resize', this.refresh.bind(this));
    }

    /**
     * Refresh particles.
     */
    refresh() {
        this.tl.invalidate();
    }

    /**
     * Start movement.
     */
    start() {
        this.tl.play().timeScale(this.timeScale);
    }

    /**
     * Pause movement.
     */
    stop() {
        this.tl.pause();
    }

    /**
     * Start IntersectionObserver to container or `observable`.
     *
     * @param {HTMLElement} [observable] - Optional observable element.
     */
    observe(observable) {
        if (observable) this.options.observableTarget = observable;
        if (this.observer) this.unobserve();

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if(this.options.observableRefresh) this.refresh();
                this.start();
            } else {
                this.stop();
            }
        });

        this.observer.observe(this.options.observableTarget || this.container);
    }

    /**
     * Destroy IntersectionObserver.
     */
    unobserve() {
        if (this.observer) this.unobserve();
        this.observer = null;
    }

    /**
     * Set movement timescale value.
     *
     * @param {number} [scale=1] - timeScale.
     */
    setTimeScale(scale = 1) {
        this.timeScale = scale;
        this.tl.timeScale(scale);
    }

    /**
     * Return current movement direction.
     *
     * @return {boolean} - reversed if true.
     */
    isReversed() {
        return this.timeScale < 0;
    }

    /**
     * Reverse direction of movement.
     *
     * @param {boolean} reverse - is reversed.
     * @return {boolean} - is reversed.
     */
    setReversed(reverse) {
        if (reverse !== this.isReversed()) this.setTimeScale(this.timeScale * -1);
        return this.isReversed();
    }

    /**
     * Return GSAP timeline of movement
     *
     * @return {gsap.core.Timeline} - GSAP timeline.
     */
    getTimeline() {
        return this.tl;
    }

    /**
     * Create movement timeline.
     *
     * @return {gsap.core.Timeline} - GSAP timeline.
     */
    createTimeline() {
        const mtl = new gsap.timeline({paused: true});

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const tl = new gsap.timeline({repeat: this.options.repeats});
            const offset = this.options.offset();

            tl.set(item, {willChange: "transform"});

            if (this.options.fadeInDuration) {
                tl.fromTo(item, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: this.options.fadeInEase,
                    duration: this.options.fadeInDuration,
                    lazy: false
                }, 0);
            }

            tl.fromTo(item, {
                y: this.options.yStart,
                x: this.options.xStart
            }, {
                y: this.options.yEnd,
                x: this.options.xEnd,
                ease: this.options.ease,
                duration: this.options.duration
            }, 0);

            if (this.options.fadeOutDuration) {
                tl.to(item, {
                    opacity: 0,
                    ease: this.options.fadeOutEase,
                    duration: this.options.fadeOutDuration,
                    lazy: false
                }, "-=" + this.options.fadeOutDuration);
            }

            mtl.add(tl, offset);
        }

        return mtl;
    }

    /**
     * Destroy GSAP timeline.
     */
    removeTimeline() {
        if(this.tl) this.tl.kill();
    }

    /**
     * Stop and destroy particles.
     */
    destroy() {
        this.stop();
        this.removeTimeline();
        this.unbind();
        this.unobserve();
    }
}