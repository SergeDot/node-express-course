const inititalCardsArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const jqk = ['J', 'Q', 'K'];
const houseWinner = `<h1>The House wins.</h1><h1>The House always wins, baby</h1>`;
const playerWinner = `
  <h1>Winner-winner - chicken dinner!</h1>
  <h1>You won! Well done, buddy!</h1>
  <h1>Care to double the bets?</h1>
  `;
const tie = `<h1>It's a tie! One more try!</h1>`;

let playerHand = [];
let houseHand = [];
let houseDeck = [...inititalCardsArray];
let playerDeck = [...inititalCardsArray];
let playerTotal;
let isIntroduced;
const introductionRequest = `
  <h1>Hello stranger!</h1>
  <div>Want to <a href="/home">let me know your name</a>, or prefer to stay mysteriously anonymous?</div>
  `;

const checkIfMoreThanThree = (hand) => hand.filter((el, _, arr) => arr.filter((ele) => el === ele).length > 3).filter((el, i, arr) => arr.indexOf(el) === i);
const clearMoreThanThree = (cardDeck, moreThanThree) => cardDeck.length > 3 ? cardDeck.filter(el => !moreThanThree.includes(el)) : cardDeck;
const twoRandomElements = (cardsArray) => [cardsArray[Math.floor(Math.random() * cardsArray.length)], cardsArray[Math.floor(Math.random() * cardsArray.length)]];
const oneRandomElement = (cardsArray) => cardsArray[Math.floor(Math.random() * cardsArray.length)];
const greeting = (playerName) => `<h1>Hello to you, ${playerName}</h1>`;

const getTotal = (hand) => {
  let total = hand.reduce((acc, el) => el == parseInt(el) ? acc + parseInt(el) : jqk.includes(el) ? acc + 10 : acc, 0);
  if (hand.includes('A')) {
    let aceCount = hand.filter(el => el === 'A').length;
    if (total + 10 + aceCount > 21) {
      total += aceCount;
    } else {
      total += 10 + aceCount;
    };
  };
  return total;
};

const houseAlwaysWins = (hand, houseDeck) => { // or at least has better chances. Always
  let total = getTotal(hand);
  let houseWinsDeck = []
  if (total < 20) {
    for (let card of houseDeck) {
      if (card == parseInt(card) && parseInt(card) == 21 - total) {
        for (let i = 0; i < 3; i++) {
          houseWinsDeck.push(card);
        };
        if (!houseWinsDeck.length) break;
      };
    };
    if (!houseWinsDeck.length) {
      for (let card of houseDeck) {
        if (jqk.includes(card) && total === 11) {
          for (let i = 0; i < 3; i++) {
            houseWinsDeck.push(card);
          };
          if (!houseWinsDeck.length) break;
        } else {
          for (let i = 0; i < 3; i++) {
            houseWinsDeck.push('Q');
          };
          break;
        };
      };
    };
    houseDeck.push(...houseWinsDeck);
  };
};

const app = require("./stuffThatYouCanIgnore"); // take my word for it :)

app.get('/', (_, res) => {
  playerHand = [];
  res.status(200).send(
    `
    <head><link href="/static/index.css" rel="stylesheet" /></head>
    <body><main>
      <h1>Cards Frenzy</h1>
      <h2>Welcome to our little company today!</h2>
      <h2>Want to try your luck?</h2>
      <h2><a href="/home">Come on in then!</a></h2>
    </main></body>
`
  );
});

app.get('/home', (_, res) => {
  playerHand = [];
  res.status(200).send(
    `
    <head><link href="/static/index.css" rel="stylesheet" /></head>
    <body>
      <main>
        <h1>Cards Frenzy</h1>
        <h2>What is your name, champ?</h2>
        <input><button type="submit">Introduce me</button>
      </main>
      <script>
        const input = document.querySelector('input');
        const nameDiv = document.querySelector('div#name');
        const submitButton = document.querySelector('button');
        submitButton.addEventListener('click', event => {
        const playerName = input.value;
        document.location.href = '/cards?player_name=' + playerName;
        });
      </script>
    </body>
`
  );
});

app.get('/cards', (req, res) => {
  playerHand = twoRandomElements(inititalCardsArray);
  playerTotal = getTotal(playerHand);
  isIntroduced = Object.keys(req.query).length;

  if (playerTotal === 21) {
    return res.status(200).send(
      `
      <head><link href="/static/index.css" rel="stylesheet" /></head>
      <body><main>
        <h1>Cards Frenzy</h1>
        <h2>Your cards</h2>
        <div id="hand" style="width:${playerHand.length * 80}">${playerHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h1>Winner-winner - chicken dinner!</h1><h2>You are a natural!</h2><h2>Your total is ${playerTotal}</h2>
        <h2>You almost there but still need to see how the house plays!</h2>
        <div id="controls">
          <a href="/cards/house${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Now house plays</a>
          <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
        </div>
      </main></body>
        `
    );
  };

  res.status(200).send(
    `
    <head><link href="/static/index.css" rel="stylesheet" /></head>
    <body><main>
      <h1>Cards Frenzy</h1>
      ${isIntroduced ? greeting(req.query.player_name) : introductionRequest}
      <h2>Your cards</h2>
      <div id="hand" style="width:${playerHand.length * 80}px">${playerHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
      <h2>Your total is ${playerTotal}</h2>
      <div id="controls">
        <a href="/cards/deal${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">One more card</a>
        <a href="/cards/house${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Now house plays</a>
        <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
      </div>
    </main></body>
    `
  );
});


app.get('/cards/deal', (req, res) => {
  let cardsM3 = checkIfMoreThanThree(playerHand);
  playerDeck = clearMoreThanThree(playerDeck, cardsM3);

  playerHand.push(oneRandomElement(playerDeck));
  playerTotal = getTotal(playerHand);
  if (playerTotal > 21) {
    return res.status(200).send(
      `
      <head><link href="/static/index.css" rel="stylesheet" /></head>
      <body><main>
        <h1>Cards Frenzy</h1>
        <h2>Your cards</h2>
        <div id="hand" style="width:${playerHand.length * 80}px">${playerHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h2>${playerTotal > 21 ? 'Not this time, champ, you are over. Your total is ' + playerTotal : 'Your total is ' + playerTotal}</h2>
        <div id="controls">
          <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
          <a href="/home" class="control_item">Go home sobbing</a>
        </div>
      </main></body>
        `
    );
  };

  res.send(
    `
    <head><link href="/static/index.css" rel="stylesheet" /></head>
    <body><main>
      <h1>Cards Frenzy</h1>
      <h2>Your cards</h2>
      <div id="hand" style="width:${playerHand.length * 80}">${playerHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
      <h2>Your total is ${playerTotal}</h2>
      <div id="controls">
        <a href="/cards/deal${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">One more card</a>
        <a href="/cards/house${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Now house plays</a>
        <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
      </div>
    </main></body>
    `
  );
});

app.get('/cards/house', (req, res) => {
  if (!playerTotal) {
    return res.status(200).send(
      `
      <head><link href="/static/index.css" rel="stylesheet" /></head>
      <body><main>
        <h1>Cards Frenzy</h1>
        <h2>Your cards</h2>
        <h2>You do not seem to have any cards. Want to get some?</h2>
        <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
      </main></body>
`
    )
  };
  houseHand = twoRandomElements(inititalCardsArray);
  let houseTotal = getTotal(houseHand);
  while (houseTotal < 17 && houseTotal < playerTotal) {
    houseDeck = [...inititalCardsArray];
    houseAlwaysWins(houseHand, houseDeck);
    let cardsM3 = checkIfMoreThanThree(playerHand);
    houseDeck = clearMoreThanThree(houseDeck, cardsM3);

    houseHand.push(oneRandomElement(houseDeck));
    houseTotal = getTotal(houseHand);
  };
  let winner = playerTotal > houseTotal ? playerWinner : playerTotal < houseTotal ? houseWinner : tie;
  if (houseHand.length == 2 && houseTotal == 21 && playerHand.length > 2) {
    winner = houseWinner;
  };

  if (playerHand.length == 2 && houseTotal == 21 && houseHand.length > 2) {
    winner = playerWinner;
  };

  if (houseTotal === playerTotal && playerTotal < 21) {

    return res.status(200).send(
      `
      <head><link href="/static/index.css" rel="stylesheet" /></head>
      <body><main>
        <h1>Cards Frenzy</h1>
        <h2>Your cards</h2>
        <div id="hand" style="width:${playerHand.length * 80}">${playerHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h2>Your total is ${playerTotal}</h2>
        <h2>The House cards</h2>
        <div id="hand" style="width:${playerHand.length * 80}">${houseHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h2>The House total is ${houseTotal}</h2>
        ${tie}
        <div id="controls">
          <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
          <a href="/cheat" class="control_item">What do you mean I am cheating???</a>
        </div>
      </main></body>
        `
    );
  };
  if (houseTotal > 21) {
    return res.status(200).send(
      `
      <head><link href="/static/index.css" rel="stylesheet" /></head>
      <body><main>
        <h1>Cards Frenzy</h1>
        <h2>Your cards</h2>
        <div id="hand">${playerHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h2>Your total is ${playerTotal}</h2>
        <h2>The House cards</h2>
        <div id="hand">${houseHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h2>The House is over. The total is ${houseTotal}</h2>
        ${playerWinner}
        <div id="controls">
          <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
          <a href="/cheat" class="control_item">What do you mean I am cheating???</a>
        </div>
      </main></body>
        `
    );
  };
  res.status(200).send(
    `
      <head><link href="/static/index.css" rel="stylesheet" /></head>
      <body><main>
        <h1>Cards Frenzy</h1>
        <h2>Your cards</h2>
        <div id="hand">${playerHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h2>Your total is ${playerTotal}</h2>
        <h2>The House cards</h2>
        <div id="hand">${houseHand.map(el => '<div class="card"><span>' + el + '</span></div>').join(' ')}</div>
        <h2>The House total is ${houseTotal}</h2>
        ${winner}
        <div id="controls">
          <a href="/cards${isIntroduced ? '?player_name=' + req.query.player_name : ''}" class="control_item">Redeal</a>
          ${playerTotal < houseTotal ? '<a href="/home" class="control_item">Go home sobbing</a>' : ''}
          <a href="/cheat" class="control_item">What do you mean I am cheating???</a>
        </div>
      </main></body>
      `
  );
});

app.get('/cheat', (_, res) => {
  res.status(200).contentType("application/json").send(
    {
      playersDeck: Object.assign({}, playerDeck),
      houseDeck: Object.assign({}, houseDeck)
    }
  );
});

app.listen(3000);
