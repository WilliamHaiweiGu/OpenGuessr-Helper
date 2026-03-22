(function () {
    const BOX_ID = "coords-box";
    if (document.getElementById(BOX_ID)) return;
    const coordsRegex = /location=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/;

    function findCoordsPattern() {
        // check full page HTML
        const htmlMatch = document.documentElement.outerHTML.match(coordsRegex);
        return htmlMatch ? htmlMatch[0] : null;
    }

    function createBox(text) {
        const input = document.createElement("input");
        input.id = BOX_ID;
        input.type = "text";
        input.value = text;
        input.readOnly = true;

        Object.assign(input.style, {
            position: "fixed",
            top: "0px",
            right: "0px",
            zIndex: "999999",
            width: "250px",
            padding: "3px 3px",
            border: "1px solid #888",
            borderRadius: "3px",
            background: "white",
            color: "black",
            fontSize: "14px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
        });

        document.body.appendChild(input);
    }

    function updateOrCreateBox() {
        const matchText = findCoordsPattern();
        const existingBox = document.getElementById(BOX_ID);

        if (matchText) {
            if (existingBox) {
                existingBox.value = matchText;
            } else if (document.body) {
                createBox(matchText);
            }
        } else if (existingBox) {
            existingBox.remove();
        }
    }

    updateOrCreateBox();

    // Optional: keep checking in case the page changes dynamically
    const observer = new MutationObserver(updateOrCreateBox);

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });
})();