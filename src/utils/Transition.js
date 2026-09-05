import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

/** Image-to-content transition */
export default class Transition {
  constructor({ onClose } = {}) {
    // Called once the gallery is free again
    this.onClose = onClose;

    // Fixed overlay holding the preview image and the content column
    this.content = document.querySelector(".content");

    // Figure the clicked image morphs into
    this.preview = document.querySelector(".content__preview-img");
    this.previewImg = this.preview.querySelector("img");

    // One content group per slide, matched by data-index
    this.groups = gsap.utils.toArray(".content__group");
    this.slides = gsap.utils.toArray(".gallery__slide");

    // Current active slide
    this.activeSlide = null;

    // Transition timeline
    this.tl = null;

    // Transition state = closed | opening | open | closing
    this.state = "closed";

    // The preview's Flip identity
    this.preview.dataset.flipId = "preview";
  }

  /** Animate to preview */
  async open(slide, index) {
    if (this.state !== "closed") return;
    this.state = "opening";
    this.activeSlide = slide;

    await this.fillContent(slide, index);

    // A close() landing while the preview decoded has already reset us
    if (this.state !== "opening") return;

    const { wrapper, caption, others } = this.parts();
    wrapper.dataset.flipId = "preview";

    // Capture the thumbnail's bounds before the layout changes
    const state = Flip.getState(wrapper);

    // Show the detail layout and hide the thumbnail, killing its reveal tween
    gsap.set(this.content, { display: "block" });
    gsap.killTweensOf(wrapper);
    gsap.set(wrapper, { autoAlpha: 0 });

    this.tl = gsap
      .timeline({
        onComplete: () => (this.state = "open"),

        // Fires when a cancelled open finishes rewinding
        onReverseComplete: () => this.reset(),
      })

      // Fade out the other slides and the caption
      .to(others, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 0)
      .to(caption, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 0)

      // Morph the selected image
      .add(
        Flip.from(state, {
          targets: this.preview,
          duration: 1.2,
          ease: "power4.inOut",
          absolute: true,
        }),
        0,
      )
      .to(this.previewImg, { scale: 1, duration: 1.2, ease: "power4.inOut" }, 0);

    // Fade the text in (replaced SplitText logic)
    const textElements = document.querySelectorAll(".content__back, .content__group.active > *");
    gsap.set(textElements, { autoAlpha: 0, y: 20 });
    this.tl.to(
      textElements,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      },
      0.8
    );
  }

  /** Animate the preview back into its slide */
  close() {
    // Close mid-animation
    if (this.state === "opening") {
      this.state = "closing";

      // Still waiting on the decode, so there is no timeline to rewind
      if (!this.tl) {
        this.reset();
        return;
      }

      this.tl.reverse();
      return;
    }

    if (this.state !== "open") return;
    this.state = "closing";

    const { wrapper, caption, others } = this.parts();
    const textElements = document.querySelectorAll(".content__back, .content__group.active > *");

    this.tl = gsap
      .timeline({ onComplete: () => this.reset() })
      // Fade the text out
      .to(textElements, { autoAlpha: 0, y: -10, duration: 0.4, stagger: 0.04, ease: "power1.out" }, 0)

      // Morph the preview back into the thumbnail's bounds
      .add(
        Flip.fit(this.preview, wrapper, {
          duration: 1,
          ease: "power3.inOut",
          absolute: true,
        }),
        0,
      )
      .to(this.previewImg, { scale: 1.2, duration: 1, ease: "power3.inOut" }, 0)

      // Fade the other slides and caption back in
      .to(others, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0.5)
      .to(caption, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0.6);
  }

  /** Copy the clicked image into the preview and activate its content group */
  async fillContent(slide, index) {
    const img = slide.querySelector(".gallery__img");

    // Same src as the thumbnail
    this.previewImg.src = img.src;
    this.previewImg.alt = img.alt;

    this.groups.forEach((group) =>
      group.classList.toggle("active", Number(group.dataset.index) === index),
    );

    // Undecoded, the preview paints blank for the first frames of the morph
    try {
      await this.previewImg.decode();
    } catch {
      // Rejects if the src is swapped mid-flight; the transition still runs
    }
  }

  /** Collect the pieces of the active slide the animations need */
  parts() {
    const slide = this.activeSlide;

    return {
      // Flip target
      wrapper: slide.querySelector(".gallery__img-wrapper"),

      // Title under the image
      caption: slide.querySelector("figcaption"),

      // Other slide items
      others: this.slides.filter((s) => s !== slide),
    };
  }

  /** Restore the DOM */
  reset() {
    const { wrapper } = this.parts();

    // The thumbnail only carries the Flip id while its slide is expanded
    if (wrapper) delete wrapper.dataset.flipId;

    // Hide the overlay and clear style the animations left
    gsap.set(this.content, { display: "none" });
    gsap.set(this.preview, { clearProps: "all" });
    gsap.set(this.previewImg, { clearProps: "all" });
    if (wrapper) gsap.set(wrapper, { clearProps: "all" });

    this.activeSlide = null;
    this.tl = null;
    this.state = "closed";

    this.onClose?.();
  }
}
