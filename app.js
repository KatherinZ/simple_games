document.addEventListener('DOMContentLoaded', () =>{

//card options
const cardArray = [
  {
    name: 'nthng',
    img: 'img/nthng.png'
  },
  {
    name: 'spine',
    img: 'img/spine.png'
  },
  {
    name: 'booty',
    img: 'img/booty.png'
  },
  {
    name: 'spine',
    img: 'img/spine.png'
  },
  {
    name: 'booty',
    img: 'img/booty.png'
  },
  {
    name: 'elbow',
    img: 'img/elbow.png'
  },
  {
    name: 'group',
    img: 'img/group.png'
  },
  {
    name: 'elbow',
    img: 'img/elbow.png'
  },
  {
    name: 'group',
    img: 'img/group.png'
  },
  {
    name: 'hide',
    img: 'img/hide.png'
  },
  {
    name: 'hide',
    img: 'img/hide.png'
  },
  {
    name: 'black',
    img: 'img/black.png'
  }
]
cardArray.sort(() => 0.5 - Math.random())

//create board
 const grid = document.querySelector('.grid')
 const resultDisplay = document.querySelector('#result')

 let cardsChosen = []
 let cardsChosenId = []
 let cardsWon = []


 function createBoard(){
   for (let i = 0; i < cardArray.length; i++){
     let card = document.createElement('img')
     card.setAttribute('src', 'img/nthng.png')
     card.setAttribute('data-id', i)
     card.addEventListener('click', flipCard)
     grid.appendChild(card)
   }
 }

 //check if matched
function checkForMatches(){
  let cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]

if (optionOneId == OptionTwoId){
 cards[optionOneId].setAttribute('src', 'img/nthng.png')
 cards[optionTwoId].setAttribute('src', 'img/nthng.png')
 alert('same image')
} else if (cardsChosen[0] === cardsChosen[1]){
    alert('match!')
    cards[optionOneId].setAttribute('src', 'img/black.png')
    cards[optionTwoId].setAttribute('src', 'img/black.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
  } else{
    cards[optionOneId].setAttribute('src', 'img/nthng.png')
    cards[optionTwoId].setAttribute('src', 'img/nthng.png')
    alert('try again')
  }
  cardsChosen = []
  cardsChosenId = []
  resultDisplay.textContent = cardsWon.length
  if (cardsWon.length === cardArray.length/2){
    resultDisplay.textContent = 'congrats!'
  }
}

 //card flip

 function flipCard(){
   let cardId = this.getAttribute('data-id')
   cardsChosen.push(cardArray[cardId].name)
   cardsChosenId.push(cardId)
   this.setAttribute('src', cardArray[cardId].img)
   if (cardsChosen.length === 2){
     setTimeout(checkForMatches, 500)
   }
 }

 createBoard()


})
