document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    initVideo();
});

const initVideo = () => {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        const video = card.querySelector('.video-element');
        const cover = card.querySelector('.video-cover');
        const playButton = card.querySelector('.play');

        if (!video || !playButton) return;

        playButton.addEventListener('click', () => {
            cover.style.display = 'none';
            video.play();
            card.classList.add('playing');
        });

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                card.classList.add('playing');
            } else {
                video.pause();
                card.classList.remove('playing');
            }
        });

        video.addEventListener('ended', () => {
            video.currentTime = 0;
            cover.style.display = 'block';
            card.classList.remove('playing');
        });

        video.addEventListener('pause', () => {
            if (video.currentTime > 0 && !video.ended) {
                card.classList.remove('playing');
            }
        });
    });
};
