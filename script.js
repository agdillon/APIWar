document.addEventListener("DOMContentLoaded", function() {
  let myCardDiv = document.getElementById("mycard")
  let yourCardDiv = document.getElementById("yourcard")

  function drawCards(deckID) {
    function convertCardtoNum(card) {
      let faceCards = ["JACK", "QUEEN", "KING", "ACE"]
      if (faceCards.includes(card)) {
        card = faceCards.indexOf(card) + 11
      }
      else {
        card = parseInt(card)
      }
      return card
    }

    axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .then(function(response) {
        console.log(response.data)
        let cardImg = document.createElement("img")
        cardImg.setAttribute("src", response.data.cards[0].image)
        myCardDiv.appendChild(cardImg)
        let myCardValue = response.data.cards[0].value

        axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
          .then(function(response) {
            let cardImg = document.createElement("img")
            cardImg.setAttribute("src", response.data.cards[0].image)
            yourCardDiv.appendChild(cardImg)
            let yourCardValue = response.data.cards[0].value

            let legendh1 = document.getElementById("legend").children[0]
            let message = ""

            myCardValue = convertCardtoNum(myCardValue)
            yourCardValue = convertCardtoNum(yourCardValue)
            if (myCardValue === yourCardValue) {
              message = "Draw!"
            }
            else if (myCardValue > yourCardValue) {
              message = "I win!"
            }
            else {
              message = "You win!"
            }
            legendh1.textContent = `Winner: ${message}`
            if (response.data.remaining === 0) {
              legendh1.textContent += " Out of cards!"
            }
          })
      })
  }

  axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(function(response) {
      let deckID = response.data.deck_id

      let button = document.querySelector("button")
      button.addEventListener("click", function() {
        myCardDiv.removeChild(myCardDiv.children[1])
        yourCardDiv.removeChild(yourCardDiv.children[1])
        drawCards(deckID)
      })

      drawCards(deckID)
    })
})
