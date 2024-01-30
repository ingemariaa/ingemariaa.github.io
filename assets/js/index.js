document.addEventListener('DOMContentLoaded', function() {
    const elements = Array.from(document.querySelectorAll(".image-container img, .image-container video"));
    let currentIndex = 0;
    let lastScrollTime = Date.now();
    let startY = 0;
    let isImageEnlarged = false; // Variable to track the enlarged state
    const scrollThreshold = 1200; // Set the time threshold (in milliseconds)
    const swipeThreshold = 50; // Set the swipe threshold for touch events

    // Shuffle the elements randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(elements);

    function handleWheel(e) {
        const currentTime = Date.now();

        // Check if enough time has passed since the last scroll event
        if (currentTime - lastScrollTime >= scrollThreshold && !isImageEnlarged) {
            lastScrollTime = currentTime;

            if (e.deltaY > 0) {
                // Scrolling down
                if (currentIndex < elements.length - 1) {
                    elements[currentIndex].style.zIndex = 0; // Reset the current element
                    currentIndex++;
                    elements[currentIndex].style.zIndex = 100; // Bring the next element to the front
                    elements[currentIndex].style.display = 'block';
                }
            } else if (e.deltaY < 0) {
                // Scrolling up
                if (currentIndex > 0) {
                    elements[currentIndex].style.zIndex = 0; // Reset the current element
                    currentIndex--;
                    elements[currentIndex].style.zIndex = 100; // Bring the previous element to the front
                }
            }
        }
    }

    document.addEventListener('wheel', handleWheel);

    // Add touch event listeners
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaY) >= swipeThreshold && !isImageEnlarged) {
            // Check if the swipe is upward or downward
            if (deltaY > 0) {
                // Scrolling down
                if (currentIndex > 0) {
                    elements[currentIndex].style.zIndex = 0;
                    currentIndex--;
                    elements[currentIndex].style.zIndex = 100;
                }
            } else {
                // Scrolling up
                if (currentIndex < elements.length - 1) {
                    elements[currentIndex].style.zIndex = 0;
                    currentIndex++;
                    elements[currentIndex].style.zIndex = 100;
                    elements[currentIndex].style.display = 'block';
                }
            }
        }
    });

    function handleClick() {
        const currentElement = elements[currentIndex];

        // Check if the device is a desktop (width greater than a certain threshold)
        const isDesktop = window.innerWidth > 768; // Adjust the threshold as needed

        // Toggle visibility and enlarge only if it's a desktop device
        if (isDesktop) {
            currentElement.classList.toggle('enlarged');
            isImageEnlarged = !isImageEnlarged; // Toggle the state

            // Toggle background information visibility and other toggles
            const backgroundInfo = document.querySelector('.borders');
            backgroundInfo.classList.toggle('hidden');

            const title = document.querySelector('.title');
            title.classList.toggle('hidden');

            const title2 = document.querySelector('.title2');
            title2.classList.toggle('hidden');

            const title3 = document.querySelector('.title3');
            title3.classList.toggle('hidden');
            
            const closeButton = document.querySelector('.close-button');
            closeButton.classList.toggle('hidden');
        }

        // Toggle close button visibility
    
    }

    elements.forEach(element => {
        element.addEventListener('click', handleClick);
    });

    // Add close button event listener
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', handleClick);

    // Click function opening the about page
    document.querySelector('.borders').addEventListener('click', function() {
        document.querySelector('.overlay').style.display = 'block';
        isImageEnlarged = true; // Set the state to true when opening the overlay
    });

    document.querySelector('.return').addEventListener('click', function() {
        document.querySelector('.overlay').style.display = 'none';
        isImageEnlarged = false; // Reset the state when returning from the overlay
    });
});
