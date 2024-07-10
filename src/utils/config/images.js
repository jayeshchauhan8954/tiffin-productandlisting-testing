const config = require("./config");

// Define Your Moduel Root Paths
const iconPrefix = (name) => config.Environment === "local" ? `/assets/icons/${name}` : `/assets/icons/${name}`;
const imagePrefix = (name) => config.Environment === "local" ? `/assets/images/${name}` : `/assets/images/${name}`;
const jsonPrefix = (name) => config.Environment === "local" ? `/assets/json/${name}` : `/assets/json/${name}`;

const _assets = {
    images: {
        "Group 544.svg": iconPrefix("Group 544.svg"),
        "bg.gif": imagePrefix("bg.gif"),
        "bar.png": imagePrefix("bar.gif")
    },
    jsonAnimations: {
        "404": jsonPrefix("404.json"),
        "noRecord": jsonPrefix("noRecord.json"),
        "permissionDeined": jsonPrefix("permissionDenied.json"),
    }
}


export {
    _assets
}