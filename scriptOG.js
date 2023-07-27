const words = "In the northeastern corner of Australia where the top end meets the sea lurks a relic from the days of the dinosaurs The saltwater crocodile one of the most fearsome predators on the face of the earth But even salties have their sweeter side Like most wild animals they just want to be left alone to feed breed and rear their youngCrocs are complex creatures finely tuned to their surroundings Since this grows into this it's easy to see why their reputation goes before them This is an Australian saltwater crocodile and you've got to be really careful when you're dealing around these huge predators They've got volatile speed and very very powerful I'm Steve Irwin and I've been around big saltwater crocodiles all of my life Crocs and people normally give each other a wide berth but most of the crocs here at my park in Queensland had to be removed from the wild because they crossed the line and became a threat to humans If we'd left them where they were they'd have probably ended up being shot and you can't lock them all up I'm hoping to come up with a better solution We call this desperado aggro he's the wildest croc we've got in the park and right now he's hungry I want to give my crocs as natural life as possible which means there's wild pig on the menu and I'm using myself as live bait Watch aggro slip into an ambush position Right now I've got no idea of knowing where he'll strike from he's made himself completely invisible Well aggro by name and by nature he's a real hungry animal Feral pig best food source but he's very territorial You've got to be really careful when you enter into his territory Gotta play by his rules Here in Australia they call me the crocodile man When a croc like aggro starts playing up I'm often the first one to hear about it I've just had a call about another problem croc but this time I won't be bringing him back to the park I want to try a new idea Crocs like aggro can live for a hundred years and they have long memories I want to see if we can teach them to mend their ways give them a lesson they'll never forget If it works we can leave them where they belong in the wild An operation like this takes teamwork that's where my wife Terry comes in and where's my right-hand man It's a bit like tying down the Queen Mary What are you doing At least it won't fall off mate and I wouldn't go anywhere without Duggar We've got a long journey ahead of us to catch up with the latest troublemaker From our starting point near Brisbane it's a three-day drive north into croc country Saltwater crocs are found right across the top end of Australia Until they were protected in the 70s they were heavily hunted for their valuable skins Now populations are recovering but more and more people are entering crocodile territory even in the most remote areas and that means trouble We're headed for Lakefield National Park a key area for crocodile conservation It's November the end of the dry season and the coastal wetlands are parched Even the rivers eventually dry up and any water that's left becomes very precious With temperatures over 100 degrees the best thing to do is while away the day in a shady wallow Keeping cool is a top priority like all reptiles a croc's body temperature is governed by its surroundings This one looks like a big old male older crocs are usually darker in color This lighter specimen is a much younger croc In croc society there's only room for one king of the pond the biggest strongest male will drive any rivals out of his domain He's usually the one hassling humans too but if you take him away you disrupt the hierarchy of the croc community weaker males will fight for his crown and mate with the females passing on weaker genes Despite their name salties aren't confined to tidal regions they also inhabit freshwater lagoons There they rub shoulders with Australia's other croc the smaller freshwater variety far less aggressive than its much larger relative Freshies are too small to do you or me any real damage but this little bird is pushing its luck You can tell a freshie from a salty by its long narrow snout well worth knowing when you're out in the bush While freshies eat small prey like crayfish or even insects a salty might fancy a piece of you During the dry water acts like a magnet for all kinds of wildlife a mobile menu for the crocs".split(' ');
const wordsCount = words.length;
const gameTime = 30 * 1000;
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;

function addClass(el, name) {
    el.className += ' ' + name;
}
function removeClass(el, name) {
    el.className = el.className.replace(name, '');
}

function randomWord() {
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1];
}

function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame() {
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 200; i++) {
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    document.getElementById('info').innerHTML = (gameTime / 1000) + '';
    window.timer = null;
}

function getWpm() {
    const words = [...document.querySelectorAll('.word')];
    const lastTypedWord = document.querySelector('.word.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
    const typedWords = words.slice(0, lastTypedWordIndex);
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctLetters = letters.filter(letter => letter.className.includes('correct'));
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    });
    return correctWords.length / gameTime * 60000;
}

function gameOver() {
    clearInterval(window.timer);
    addClass(document.getElementById('game'), 'over');
    const result = getWpm();
    document.getElementById('info').innerHTML = `WPM: ${result}`;
}

document.getElementById('game').addEventListener('keydown', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;

    // CHATGPT CODE!!!!!
    const isExtra = document.querySelector(".letter.incorrect.extra");
    if (isBackspace && isExtra) {
        currentWord.removeChild(isExtra);
    }

    // CHATGPT CODE END!!!!!



    if (document.querySelector('#game.over')) {
        return;
    }

    console.log({ key, expected });

    if (!window.timer && isLetter) {
        window.timer = setInterval(() => {
            if (!window.gameStart) {
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed / 1000);
            const sLeft = Math.round((gameTime / 1000) - sPassed);
            if (sLeft <= 0) {
                gameOver();
                return;
            }
            document.getElementById('info').innerHTML = sLeft + '';
        }, 1000);
    }

    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            if (currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling, 'current');
            }
        } else {
            const incorrectLetters = document.querySelectorAll('.letter.incorrect.extra');
            if (incorrectLetters.length === 0) {
                const incorrectLetter = document.createElement('span');
                incorrectLetter.innerHTML = key;
                incorrectLetter.className = 'letter incorrect extra';
                currentWord.appendChild(incorrectLetter);
            }
        }
    }

    if (isSpace) {
        if (expected !== ' ') {
            const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect');
            });
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if (currentLetter) {
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current');
    }

    if (isBackspace) {
        if (currentLetter && isFirstLetter) {
            // make prev word current, last letter current
            removeClass(currentWord, 'current');
            addClass(currentWord.previousSibling, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentWord.previousSibling.lastChild, 'current');
            removeClass(currentWord.previousSibling.lastChild, 'incorrect');
            removeClass(currentWord.previousSibling.lastChild, 'correct');
        }
        if (currentLetter && !isFirstLetter) {
            // move back one letter, invalidate letter
            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, 'current');
            removeClass(currentLetter.previousSibling, 'incorrect');
            removeClass(currentLetter.previousSibling, 'correct');
        }
        if (!currentLetter) {
            addClass(currentWord.lastChild, 'current');
            removeClass(currentWord.lastChild, 'incorrect');
            removeClass(currentWord.lastChild, 'correct');
        }
    }


    // move lines / words
    if (currentWord.getBoundingClientRect().top > 250) {
        const words = document.getElementById('words');
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin - 35) + 'px';
    }

    // move cursor
    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.word.current');
    const cursor = document.getElementById('cursor');
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
});

document.getElementById('newGameBtn').addEventListener('click', () => {
    gameOver();
    newGame();
});

newGame()