// ==========================================================
// NahdiScript Scroll Reveal
// ==========================================================

const revealElements = document.querySelectorAll(
    ".about-card, .feature-card, .doc-card, .roadmap-card, .download-card, .community-card, .section-title"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach((element) => {

    element.classList.add("hidden");

    observer.observe(element);

});
