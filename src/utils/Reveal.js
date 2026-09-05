import { gsap } from "gsap";

/** Reveal each slide (image + caption) as it enters the viewport */
export default class Reveal {
  constructor() {
    // Reveal targets per slide
    this.items = new Map();

    gsap.utils.toArray(".gallery__slide").forEach((slide) => {
      const wrapper = slide.querySelector(".gallery__img-wrapper");
      const caption = slide.querySelector("figcaption");

      // Resting state: image and caption invisible
      gsap.set(wrapper, { autoAlpha: 0 });
      gsap.set(caption, { autoAlpha: 0 });

      this.items.set(slide, { wrapper, caption });
    });
  }

  /** Show slides that entered, top to bottom, reset the ones that left */
  toggle(changes, immediate = false) {
    changes
      .filter((change) => change.visible)
      .sort((a, b) => a.top - b.top)
      .forEach((change, i) => this.show(change.el, i * 0.12, immediate));

    changes.filter((change) => !change.visible).forEach((change) => this.hide(change.el));
  }

  /** Fade the image in, then fade the caption in */
  show(slide, delay, immediate = false) {
    const { wrapper, caption } = this.items.get(slide);

    // The viewport moved around the slide, so there is no entrance to play
    if (immediate) {
      gsap.set([wrapper, caption], { autoAlpha: 1, overwrite: true });
      return;
    }

    gsap.to(wrapper, {
      autoAlpha: 1,
      duration: 1,
      ease: "power2.out",
      delay,
      overwrite: true,
    });

    gsap.to(caption, {
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: delay + 0.2,
      overwrite: true,
    });
  }

  /** Reset instantly so the reveal replays on the next entry */
  hide(slide) {
    const { wrapper, caption } = this.items.get(slide);

    gsap.set(wrapper, { autoAlpha: 0, overwrite: true });
    gsap.set(caption, { autoAlpha: 0, overwrite: true });
  }
}
