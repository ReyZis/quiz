// setting the variables
let IQscore = 115;
let numberOfLevel = 0;
let ProgBarValue = 0;
var GC = document.querySelector('#game_container #quizzes_container');

// this function convert the user from the starting page (div) to the quiz page (div)
function changeToTwo() {
    let one = document.querySelector('#one');
    one.setAttribute('hidden', '');
    let two = document.querySelector('#two');
    two.removeAttribute('hidden')
}

// this function convert the user from the quiz page (div) to the result page (div)
function changeToThree() {
    let one = document.querySelector('#two');
    one.setAttribute('hidden', '');
    let two = document.querySelector('#three');
    two.removeAttribute('hidden')
}

// this function make the progress bar which is the same as bootstrap progress bar
function addProgressBar() {
    let ProgRow = makeDiv("progress my-5");
    let ProgBarRow = makeDiv('progress-bar');

    ProgBarRow.setAttribute('role', 'progressbar');
    ProgBarRow.setAttribute('style', `width: ${ProgBarValue}%;`);
    ProgBarRow.setAttribute('aria-valuenow', `${ProgBarValue}`);
    ProgBarRow.setAttribute('aria-valuemin', '0');
    ProgBarRow.setAttribute('aria-valuemax', '100');

    ProgRow.appendChild(ProgBarRow);

    return ProgRow;
}


// the function is assign to every button in the quiz and do all the work from changing tha layout to the next question to updating the Iq score of the player.
// the btn parameter get the button that have been clicked which have the the value that detemine if the answer is true or wrong.
function nextQuestion(btn) {
    // updating the IQscore.
    switch (btn.value) {
        case "1":
            IQscore += 85 / levels.length;
            break;
        default:
            break;
    }


    // this if statement determine whether the function should display the next question or the result page by cheking the if this question is the last in the quiz list.
    if (numberOfLevel < levels.length) {
        // clear the MainDiv.
        GC.innerHTML = "";

        // addin the progress bar.
        let progress = addProgressBar();
        GC.appendChild(progress);

        // make the question row.
        let QSrow = makeDiv("row justify-content-center mb-5");

        // making the quetion header and appending it to the QSrow.
        let h1 = makeHeader(levels[numberOfLevel]['question'], 'center');
        QSrow.appendChild(h1);

        // make the buttons row.
        let BTrow = makeDiv('row justify-content-center flex-row-reverse mb-4')

        // making the answers buttons and appending it to the BTrow.
        let buttons = levels[numberOfLevel]['options'];
        for (let i = 0; i < buttons.length; i++) {
            let BTcol = makeDiv('col-md');
            let button = makeBtn(buttons[i]['content'], buttons[i]['value']);
            BTcol.appendChild(button)
            BTrow.appendChild(BTcol);
        }

        // append the QSrow and BTrow to the MainDiv.
        GC.appendChild(QSrow);
        GC.appendChild(BTrow);

        // updating the numberOfLevel and ProgBarValue.
        numberOfLevel += 1;
        ProgBarValue += 100 / levels.length;

    }
    // if the question is the last in the quiz list, then it should display the result page
    else {
        // tranfering the player from the last question to the result page.
        changeToThree();

        // updating the score paragraph to the player's IQscore.
        let score = document.querySelector('#score');
        score.innerText = Math.round(IQscore);

        // changing the height of the brain percntage from 0% to 100%.
        let percentage = document.querySelector('.percentage-container');
        setTimeout(function() { percentage.style.height = '100%'; }, 300)

        // updating the final message that will appear to the palyer.
        let congWord = document.querySelector('#congratulation_word');
        let congSentence = document.querySelector('#congratulation_sentence');

        setCongrats(congWord, congSentence);
    }
}


// this function make a div and.
// the classes parameter determine the class the should be asssigned to it.
function makeDiv(classes) {
    let div = document.createElement('div');
    div.className = `${classes}`;
    return div
}

// this function make a h1 element.
// the text parameter determine the quetion that will appear.
// while the alignment is just addtional parameter for the developer to set the alignment of the text easly later.
function makeHeader(text, Alignment) {
    let h1 = document.createElement('h1');
    h1.innerText = text;
    h1.style.textAlign = Alignment;
    h1.style.fontWeight = "600";
    return h1;
}

// this function make a button element.
// the text parameter determine the the possible answer the sould be displayed.
// the truthiness parameter determine the value that should be assigned to the button either 0 or 1.
function makeBtn(content, truthiness) {
    let button = document.createElement('button');
    setContent(button, content);
    button.setAttribute('class', 'mx-2 my-2 px-auto py-3 w-100');
    button.setAttribute('onclick', 'nextQuestion(this)');
    button.setAttribute('value', truthiness);
    return button;
}

// this function determine whether the button contain a text or an image.
// the btn parameter is the button that should contain the content.
// the content parameter is the content that will be contained in the button.
function setContent(btn, content) {
    let type = levels[numberOfLevel]['typeOfContent']
    if (type === "text") {
        btn.innerText = content
    } else {
        btn.innerHTML = `
        <img src='${content}' alt='option'>
        `
    }
}


// this function determine what text should appear in the result page.
// the header parameter is the header that should contain the congratulation heading.
// the sentence parameter is the paragraph that should describe the the level of you IQ.
function setCongrats(header, sentence) {
    if (IQscore <= 135) {
        header.innerText = results[0].header
        sentence.innerText = results[0].sentence
    } else if (IQscore <= 165) {
        header.innerText = results[1].header
        sentence.innerText = results[1].sentence
    } else if (IQscore <= 185) {
        header.innerText = results[2].header
        sentence.innerText = results[2].sentence
    } else {
        header.innerText = results[3].header
        sentence.innerText = results[3].sentence
    }
}