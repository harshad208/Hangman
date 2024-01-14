const words = ['hangman', 'javascript', 'developer', 'programming', 'web', 'html', 'css', 'code'];
let chosenWord = '';
let guessedWord = [];
let incorrectGuesses = [];
let hangmanStep = 0;

function chooseWord() {
    const filteredWords = words.filter(word => word.length >= 2 && word.length <= 3);
    chosenWord = filteredWords[Math.floor(Math.random() * filteredWords.length)].toUpperCase();
    guessedWord = Array(chosenWord.length).fill('_');
    incorrectGuesses = [];
    hangmanStep = 0;

    // Display one or two characters initially
    for (let i = 0; i < Math.min(chosenWord.length, 2); i++) {
        guessedWord[i] = chosenWord[i];
    }
}

function displayWord() {
    document.getElementById('word-container').innerText = guessedWord.join(' ');
}

function displayIncorrectGuesses() {
    document.getElementById('incorrect-guesses').innerText = incorrectGuesses.join(', ');
}

function displayHangman() {
    document.getElementById('hangman-drawing').style.backgroundImage = `url('hangman${hangmanStep}.png')`;
}

function checkGuess(letter) {
    if (chosenWord.includes(letter)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        incorrectGuesses.push(letter);
        hangmanStep++;
    }

    displayWord();
    displayIncorrectGuesses();
    displayHangman();

    if (guessedWord.join('') === chosenWord) {
        document.getElementById('result').innerText = 'You win! 🎉';
    } else if (hangmanStep === 6) {
        document.getElementById('result').innerText = `You lost! The word was ${chosenWord}. 😢`;
    }
}



function resetGame() {
    chooseWord();
    displayWord();
    displayIncorrectGuesses();
    displayHangman();
    document.getElementById('result').innerText = '';
}

document.addEventListener('DOMContentLoaded', () => {
    // displaySuggestions();
    chooseWord();
    displayWord();
    displayHangman();

    document.addEventListener('keydown', (event) => {
        const letter = event.key.toUpperCase();
        if (/^[A-Z]$/.test(letter)) {
            checkGuess(letter);
        }
    });
    
});

function displaySuggestions() {
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let letter of alphabet) {
        const suggestion = document.createElement('div');
        suggestion.classList.add('suggestion');
        suggestion.innerText = letter;
        suggestion.addEventListener('click', () => checkGuess(letter));
        suggestionsContainer.appendChild(suggestion);
    }
}

