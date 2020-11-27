import stylesheet from "../scss/style.scss";

(function() {
    if (document.body.classList.contains("site")) {
        const buttonStreamDl = document.querySelector(".button--stream-download");

        buttonStreamDl.addEventListener("click", sectionScroll);

        function sectionScroll(e) {
            e.preventDefault();

            const targetSection = document.getElementById("stream_download");

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"
            });
        }
    }

    if (document.body.classList.contains("extras")) {
        // https://stackoverflow.com/a/15343916/6396604, cleaned.
        const scroller = document.querySelector(".scroller");

        // All browsers but Gecko-based ones.
        scroller.addEventListener("mousewheel", scrollHorizontally, false);
        // Gecko-based browsers.
        scroller.addEventListener("DOMMouseScroll", scrollHorizontally, false);

        function scrollHorizontally(e) {
            e.preventDefault();

            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

            scroller.scrollLeft -= (delta * 100);
        }
    }
}());
