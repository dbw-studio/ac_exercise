// 設定遊戲狀態
const GAME_STATE = {
  FirstCardAwaits: 'FirstCardAwaits',
  SecondCardAwaits: 'SecondCardAwaits',
  CardsMatchFailed: 'CardsMatchFailed',
  CardMatched: 'CardMatched',
  GameFinished: 'GameFinished'
}


const Symbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg', // 黑桃
  'https://image.flaticon.com/icons/svg/105/105220.svg', // 愛心
  'https://image.flaticon.com/icons/svg/105/105212.svg', // 方塊
  'https://image.flaticon.com/icons/svg/105/105219.svg' // 梅花
]


// 把與畫面顯示相關的函式，放到view物件中

const view = {

  /* 省略屬性名稱：當物件的屬性與函式/變數名稱相同時，可以省略不寫：
  原本的寫法
  const view = {
    displayCards: function displayCards() { ...  }
  }
  省略後的寫法
  displayCards(){ ...  } */

  /* 再進一步拆解函式：
  displayCards - 負責選出 #cards 並抽換內容
  getCardElement - 負責生成卡片內容，包括花色和數字 */

  getCardElement(index) {
    return `<div data-index="${index}" class="card back"> </div>`
  },

  getCardContent(index) {
    const number = this.transformNumber((index % 13) +1)
    const symbol = Symbols[Math.floor( index / 13)]  
    return `
      <p>${number}</p>
      <img src="${symbol}">
      <p>${number}</p>
    `
  },
  

  transformNumber(number) {
    switch(number) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return number
    }
  },

  displayCards(indexes){
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = indexes.map(index =>this.getCardElement(index)).join('')
    /*
    用 map 迭代陣列，並依序將數字丟進 view.getCardElement()，會變成有 52 張卡片的陣列；
    接著要用 join("") 把陣列合併成一個大字串，才能當成 HTML template 來使用；
    把組合好的 template 用 innerHTML 放進 #cards 元素裡。 */
    
  },

  flipCards(...cards) {
    cards.map(card => {
    if (card.classList.contains('back')) {
      //回傳正面
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.index))
      return
    }

    //回傳背面
    card.classList.add('back')
    card.innerHTML = null
    })
  },

  pairCards(...cards) {
    cards.map(card => {
      card.classList.add('paired')
    })
  },

  renderScore(score){
    document.querySelector('.score').innerHTML = `Score:${score}`
  },

  renderTriedTimes(times){
    document.querySelector('.tried').innerHTML = `You've tried: ${times} times`
  },

  appendWrongAnimation(...cards){
    cards.map(card => {
      card.classList.add('wrong')
      card.addEventListener('animationed', event => event.target.classList.remove('wrong'), {once: true})
    })
  },

  showGameFinished(){
    const div = document.createElement('div')
    div.classList.add('completed')
    div.innerHTML = `
      <p>Complete!</p>
      <p>Score: ${model.score}</p>
      <p>You've tried: ${model.triedTimes} times</p>
    `
    const header = document.querySelector('#header')
    header.before(div)
  }
}



// 集中管理資料
const model = {
  //被翻開的卡片
  revealedCards: [],

  //檢查配對
  isRevealedCardsMatched() {
    return this.revealedCards[0].dataset.index % 13 === this.revealedCards[1].dataset.index % 13
  },

  //新增分數和次數的資料管理
  score: 0,
  triedTimes: 0

}


// 依照遊戲狀態分配動作
// 不要讓 controller 以外的內部函式暴露在 global 的區域
const controller = {

  //設置初始狀態 (還沒翻牌)
  currentState: GAME_STATE.FirstCardAwaits,
  
  // 由 controller 來呼叫 utility.getRandomNumberArray，避免 view 和 utility 產生接觸

  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52))
  },

  dispatchCardAction(card) {
    if (!card.classList.contains('back')) {
      return
    }
    switch (this.currentState) {
      case GAME_STATE.FirstCardAwaits:
        view.flipCards(card)
        model.revealedCards.push(card)
        this.currentState = GAME_STATE.SecondCardAwaits
        break
      case GAME_STATE.SecondCardAwaits:
        view.renderTriedTimes(++model.triedTimes)
        view.flipCards(card)
        model.revealedCards.push(card)
        // 判斷配對是否成功
        if (model.isRevealedCardsMatched()){
          //配對成功
          view.renderScore(model.score += 10)
          this.currentState = GAME_STATE.CardMatched
          view.pairCards(...model.revealedCards)
          model.revealedCards = []
          if (model.score === 260){
            console.log('showGameFinished')
            this.currentState = GAME_STATE.GameFinished
            view.showGameFinished()
            return
          }
          this.currentState = GAME_STATE.FirstCardAwaits
        } else {
          //配對失敗
          this.currentState = GAME_STATE.CardsMatchFailed
          view.appendWrongAnimation(...model.revealedCards)
          setTimeout(this.resetCards, 1000)  
          //1000Timeout代表延遲1秒，這裡呼叫resetCards函式部加()，因為只要呼叫函式，沒有要回傳值
        }
        break
    }
    // console.log('this.currentState===', this.currentState)
    // console.log('revealedCards', model.revealedCards.map(card => card.dataset.index))

  },

  resetCards(){
    view.flipCards(...model.revealedCards)
    model.revealedCards = []
    controller.currentState = GAME_STATE.FirstCardAwaits
  }

}



// 把外掛小工具放一個物件
const utility = {
  // 經典的洗牌演算法：Fisher-Yates Shuffle
  getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1))
      ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  }
}


controller.generateCards()

//Node List (array-like)
document.querySelectorAll('.card').forEach(card => {
   card.addEventListener('click', event => {
     controller.dispatchCardAction(card)
   })
})


