const stopVideos = (pswpElement) => {
    var iframes = pswpElement.querySelectorAll("iframe.video");
    for (var i = 0; i < iframes.length; i++) {
        iframes[i].setAttribute("src", iframes[i].getAttribute("src"));
    }
};

module.exports = {
    stopVideos
};