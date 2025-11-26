document.addEventListener('DOMContentLoaded', () => {
    const movieLists = {
        'trending-movies': [
            {
                title: 'Squid Game',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Squid+Game',
                description: 'A mysterious invitation to join the game is sent to people at risk who are in dire need of money.',
            },
            {
                title: 'Money Heist',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Money+Heist',
                description: 'A criminal mastermind manipulates the police, hostages and the public using the Royal Mint of Spain.',
            },
            {
                title: 'Wednesday',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Wednesday',
                description: 'A coming-of-age supernatural mystery series starring Jenna Ortega as Wednesday Addams.',
            },
            {
                title: 'The Crown',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=The+Crown',
                description: 'The political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
            },
            {
                title: 'Ozark',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Ozark',
                description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
            }
        ],
        'netflix-originals': [
            {
                title: 'The Queen\'s Gambit',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Queens+Gambit',
                description: 'The life of an orphaned chess prodigy, Elizabeth Harmon, during her quest to become the world\'s greatest player.',
            },
            {
                title: 'Stranger Things',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Stranger+Things',
                description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
            },
            {
                title: 'Orange Is the New Black',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=OITNB',
                description: 'A privileged New Yorker ends up in a women\'s prison when a past crime catches up with her.',
            },
            {
                title: 'House of Cards',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=House+of+Cards',
                description: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.',
            }
        ],
        'action-movies': [
            {
                title: 'Extraction',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Extraction',
                description: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.',
            },
            {
                title: 'The Old Guard',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=The+Old+Guard',
                description: 'A covert team of immortal mercenaries are suddenly exposed and must now fight to keep their identity a secret.',
            },
            {
                title: '6 Underground',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=6+Underground',
                description: 'Six individuals from all around the globe, each the very best at what they do, have been chosen for their unique skills.',
            },
            {
                title: 'Triple Frontier',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Triple+Frontier',
                description: 'Struggling to make ends meet, former military operatives reunite to plan a heist in a sparsely populated multi-border zone.',
            }
        ],
        'comedy-movies': [
            {
                title: 'The Good Place',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=The+Good+Place',
                description: 'A woman finds herself in the afterlife\'s The Good Place, where she quickly realizes she doesn\'t belong.',
            },
            {
                title: 'Space Force',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Space+Force',
                description: 'A decorated pilot with dreams of running the Air Force is tasked with leading the newly formed sixth branch of the US Armed Forces.',
            },
            {
                title: 'Dead to Me',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Dead+to+Me',
                description: 'A series about a powerful friendship that blossoms between a tightly wound widow and a free spirit.',
            },
            {
                title: 'Russian Doll',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Russian+Doll',
                description: 'A young software developer finds herself stuck in a time loop that forces her to relive the night of her death.',
            }
        ],
        'horror-movies': [
            {
                title: 'Bird Box',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Bird+Box',
                description: 'A woman and a pair of children are blindfolded and make their way through a dystopian setting.',
            },
            {
                title: 'The Haunting of Hill House',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Hill+House',
                description: 'Flashing between past and present, a fractured family confronts haunting memories of their old home.',
            },
            {
                title: 'Midnight Mass',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Midnight+Mass',
                description: 'An isolated island community experiences miraculous events - and frightening omens - after the arrival of a charismatic priest.',
            },
            {
                title: 'The Midnight Club',
                thumbnail: 'https://via.placeholder.com/150x200/E50914/FFFFFF?text=Midnight+Club',
                description: 'At a hospice for terminally ill young adults, eight patients come together every night to tell each other stories.',
            }
        ]
    };

    for (const [listId, movies] of Object.entries(movieLists)) {
        const container = document.getElementById(listId);
        movies.forEach(movie => {
            const imgElement = document.createElement('img');
            imgElement.src = movie.thumbnail;
            imgElement.alt = movie.title;
            imgElement.addEventListener('click', () => showModal(movie));
            container.appendChild(imgElement);
        });
    }

    const modal = document.getElementById('movie-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close');

    function showModal(movie) {
        modalImage.src = movie.thumbnail;
        modalTitle.textContent = movie.title;
        modalDescription.textContent = movie.description;
        modal.style.display = 'flex';
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

