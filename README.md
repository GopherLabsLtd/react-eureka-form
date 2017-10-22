# React PhotoSwipe Component [![npm](https://img.shields.io/npm/v/react-photoswipe-component.svg)](https://www.npmjs.com/package/react-photoswipe-component) [![npm](https://img.shields.io/npm/dw/react-photoswipe-component.svg)](https://www.npmjs.com/package/react-photoswipe-component)
A React component for PhotoSwipe lightbox

## Installation

**NPM**
```sh
npm install --save react-photoswipe-component
```

## How to Use:
**JS:**
```js
import { PhotoSwipeGallery } from 'react-photoswipe-component';

const PHOTO_ITEMS = [
    {
        src: 'http://via.placeholder.com/800x394',
        w: 800,
        h: 394,
        caption: "Test Cap"
    },
    {
        src: 'http://via.placeholder.com/1200x900',
        w: 1200,
        h: 900,
        caption: "Caption 123"
    }
];

class SwipePhotoTest extends React.Component {
  render() {    
    return (
      <div>
        <PhotoSwipeGallery items={PHOTO_ITEMS} />
        
        {/* Or you can try this */}
        
        <PhotoSwipeGallery items={PHOTO_ITEMS}>
            Open Gallery
        </PhotoSwipeGallery>
      </div>
    )
  }
}

export default SwipePhotoTest
```
