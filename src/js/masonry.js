import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    initMasonry()
})

const initMasonry = () => {
    const grid = document.querySelector('.grid');
    const msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: 16,
        percentPosition: true,
    });

    imagesLoaded(grid).on('progress', function() {
        msnry.layout();
    });
}

