import React from 'react';

const PhotoSwipe = require("photoswipe");
const PhotoSwipeUI_Default = require("../node_modules/photoswipe/dist/photoswipe-ui-default.js");
import "../node_modules/photoswipe/dist/default-skin/default-skin.css";
import "../node_modules/photoswipe/dist/photoswipe.css";

class PhotoSwipeGallery extends React.Component {
    constructor(props) {
        super(props);
  
        this.groupID = Math.floor(Math.random() * 1e8);
    }
  
    openPhotoSwipe() {
      var pswpElement = this.pswp;
      
      // define options (if needed)
      var options = {
          index: 0, // start at first slide
          galleryUID: this.groupID
      };
      
      // Initializes and opens PhotoSwipe
      this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.props.items, options);
      this.gallery.init();
    }
  
    showGallery(e) {  
      e.preventDefault();
      this.openPhotoSwipe();
    }
    
    render() {
      return (
          <div>
              { /* childrenWithProps */}
  
              <div onClick={this.showGallery.bind(this)}>
                  {this.props.children}
              </div>
  
              <div className="pswp" ref={(pswp) => { this.pswp = pswp; }} tabIndex="-1" role="dialog" aria-hidden="true">
                  <div className="pswp__bg"></div>
  
                  <div className="pswp__scroll-wrap">
                      <div className="pswp__container">
                          <div className="pswp__item"></div>
                          <div className="pswp__item"></div>
                          <div className="pswp__item"></div>
                      </div>
  
                      <div className="pswp__ui pswp__ui--hidden">
                          <div className="pswp__top-bar">
                              <div className="pswp__counter"></div>
  
                              <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
                              <button className="pswp__button pswp__button--share" title="Share"></button>
                              <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                              <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
  
                              <div className="pswp__preloader">
                                  <div className="pswp__preloader__icn">
                                      <div className="pswp__preloader__cut">
                                          <div className="pswp__preloader__donut"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
  
                          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                              <div className="pswp__share-tooltip"></div> 
                          </div>
  
                          <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
  
                          <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
  
                          <div className="pswp__caption">
                              <div className="pswp__caption__center"></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
    }
}

module.exports = { PhotoSwipeGallery };