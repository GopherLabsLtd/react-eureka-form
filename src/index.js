import React from 'react';

const PhotoSwipe = require("photoswipe")
const PhotoSwipeUI_Default = require("../node_modules/photoswipe/dist/photoswipe-ui-default.js")
import "../node_modules/photoswipe/dist/default-skin/default-skin.css"
import "../node_modules/photoswipe/dist/photoswipe.css"
import "./style.css"

import { PhotoSwipeGalleryNoChildren } from "./PhotoSwipeGallery_NoChildren"

class PhotoSwipeGallery extends React.Component {
    constructor(props) {
        super(props);
  
        this.groupID = Math.floor(Math.random() * 1e8);
        this.items = props.items;
        this.items.map((item, i) => {
            if (item.type === "video") {
                if (this.props.children === undefined) throw new Error("Can't have no children for the component when some of the items have 'html' attributes");
                if (item.video.source === "youtube") {
                    var itemID = item.video.id;
                    this.items[i] = {
                        html: `<iframe class="video" width="560" height="315" src="https://www.youtube-nocookie.com/embed/${itemID}?rel=0&amp;showinfo=0?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>`
                    };
                }
            }
        });
    }
  
    openPhotoSwipe() {
      var pswpElement = this.pswp;
      
      // define options (if needed)
      var options = {
          index: 0, // start at first slide
          galleryUID: this.groupID
      };
      
      // Initializes and opens PhotoSwipe
      this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
      this.gallery.init();

      this.gallery.listen('close', ()=> {
        var iframes = pswpElement.querySelectorAll("iframe.video");
        for (var i = 0; i < iframes.length; i++) {
            iframes[i].setAttribute("src", iframes[i].getAttribute("src"));
        }
      });
    }
  
    showGallery(e) {  
      e.preventDefault();
      this.openPhotoSwipe();
    }

    render() {
      const pswpElementID = "pswp-element";
      const PswpElement = props =>
        <div className="pswp" ref={(pswp) => { this.pswp = pswp; }} id={pswpElementID} tabIndex="-1" role="dialog" aria-hidden="true">
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
        </div>;

      return (
          <div>
            <PswpElement />
            
            {this.props.children !== undefined &&
                <div onClick={this.showGallery.bind(this)}>
                    {this.props.children}
                </div>
            }

            {this.props.children === undefined &&
                <PhotoSwipeGalleryNoChildren items={this.props.items} elID={pswpElementID} galleryUID={this.groupID} />
            }
          </div>
      )
    }
}

module.exports = { PhotoSwipeGallery };