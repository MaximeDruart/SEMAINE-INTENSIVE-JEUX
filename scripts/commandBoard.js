class CommandBoard {
  constructor() {
    this.blocks = []
    this.board = document.querySelector(".screen")
    this.inputFields = []
    this.userLose = false
    this.userWin = false
  }

  clear(){
    this.blocks.forEach(e => {
      this.board.removeChild(e)
    })
    this.blocks = []
    this.inputFields = []
  }

  clearFields(){
    this.inputFields.forEach(e => {
      e.value=""
    })
  }
  createFor(){
    let section = document.createElement("section")
    section.classList.add("boucleFor")
    let span10 = document.createElement("span")
    span10.innerHTML = "for "
    span10.classList.add("for")
    let span1 = document.createElement("span")
    span1.innerHTML = "(var i = "
    let input1 = document.createElement("input")
    input1.setAttribute("type", "number")
    let span2 = document.createElement("span")
    span2.innerHTML = " ; i < "
    let input2 = document.createElement("input")
    input2.setAttribute("type", "number")
    let span3 = document.createElement("span")
    span3.innerHTML = " ; i++) {"
    let divInstructions = document.createElement("div")
    let spanInstructions = document.createElement("span")
    spanInstructions.innerHTML = "ninja."
    spanInstructions.classList.add("ninja")
    let inputInstructions = document.createElement("input")
    inputInstructions.setAttribute("type", "text")
    inputInstructions.setAttribute("placeholder","Action")
    inputInstructions.classList.add("MIDDLE")
    let pInstructionClose = document.createElement("span")
    pInstructionClose.innerHTML = "()"
    let span4 = document.createElement("span")
    span4.innerHTML = "}"
    let bye = document.createElement("img")
    bye.classList.add("bye")
    bye.setAttribute("src","images/game/close.svg")
    section.appendChild(span10)
    section.appendChild(span1)
    section.appendChild(input1)
    section.appendChild(span2)
    section.appendChild(input2)
    section.appendChild(span3)
    divInstructions.appendChild(spanInstructions)
    divInstructions.appendChild(inputInstructions)
    divInstructions.appendChild(pInstructionClose)
    section.appendChild(divInstructions)
    section.appendChild(span4)
    section.appendChild(bye)
    this.board.appendChild(section)
    this.blocks.push(section)
    this.inputFields.push(input1, input2, inputInstructions)

    bye.addEventListener('click', (event) => {
      this.board.removeChild(bye.parentElement)

    })
  }

  createAction(){
    let section = document.createElement("section")
    section.classList.add("action")
    let divInstructions = document.createElement("div")
    let spanInstructions = document.createElement("span")
    spanInstructions.innerHTML = "ninja."
    spanInstructions.classList.add("ninja")
    let inputInstructions = document.createElement("input")
    inputInstructions.setAttribute("type", "text")
    inputInstructions.setAttribute("placeholder","Action")
    inputInstructions.classList.add("UP")
    let pInstructionClose = document.createElement("span")
    pInstructionClose.innerHTML = "()"
    let bye = document.createElement("img")
    bye.classList.add("bye")
    bye.setAttribute("src","images/game/close.svg")
    divInstructions.appendChild(spanInstructions)
    divInstructions.appendChild(inputInstructions)
    divInstructions.appendChild(pInstructionClose)
    section.appendChild(divInstructions)
    section.appendChild(bye)
    this.board.appendChild(section)
    this.blocks.push(section)
    this.inputFields.push(inputInstructions)


    bye.addEventListener('click', (event) => {
      this.board.removeChild(bye.parentElement)

    })
  }
  // createIf(){
  //   let section = document.createElement("section")
  //   section.classList.add("if")
  //   let span10 = document.createElement("span")
  //   span10.innerHTML = "if "
  //   span10.classList.add("ifText")
  //   let span1 = document.createElement("span")
  //   span1.innerHTML = "( "
  //   let input1 = document.createElement("input")
  //   input1.setAttribute("type", "text")
  //   input1.classList.add("UP")
  //   let span3 = document.createElement("span")
  //   span3.innerHTML = " ) {"
  //   let divInstructions = document.createElement("div")
  //   let spanInstructions = document.createElement("span")
  //   spanInstructions.innerHTML = "ninja."
  //   let inputInstructions = document.createElement("input")
  //   inputInstructions.setAttribute("type", "text")
  //   inputInstructions.classList.add("UP")
  //   let pInstructionClose = document.createElement("span")
  //   pInstructionClose.innerHTML = "()"
  //   let span4 = document.createElement("span")
  //   span4.innerHTML = "}"
  //   section.appendChild(span10)
  //   section.appendChild(span1)
  //   section.appendChild(input1)
  //   section.appendChild(span3)
  //   divInstructions.appendChild(spanInstructions)
  //   divInstructions.appendChild(inputInstructions)
  //   divInstructions.appendChild(pInstructionClose)
  //   section.appendChild(divInstructions)
  //   section.appendChild(span4)
  //   this.board.appendChild(section)
  //   this.blocks.push(section)
  //   this.inputFields.push(input1, inputInstructions)
  // }



  read(){
    this.blocks = []
    for (var i = 0; i < this.board.children.length; i++) {
      if (this.board.children[i].classList.contains("boucleFor") || this.board.children[i].classList.contains("action")) {
        this.blocks.push(this.board.children[i])
      }
    }
    this.blocks.forEach(bloc => {
      if (bloc.classList.contains("boucleFor")) {
        this.readFor(bloc)
      } else if (bloc.classList.contains("action")) {
        this.readAction(bloc)
      }
    })
    levels[activeMap].mapReset()
    levels[activeMap].drawMap(levels[activeMap].map, true)
  }

  readFor(bloc){
    let inputs = []
    let blocChilds = bloc.children
    for (var i = 0; i < blocChilds.length; i++) {
      if (bloc.children[i].nodeName == "INPUT") {
        inputs.push(bloc.children[i])
      } else if (bloc.children[i].childElementCount > 2) {
          inputs.push(bloc.children[i].children[1])
        }
    }
    let forStart = parseInt(inputs[0].value)
    let forEnd = parseInt(inputs[1].value)
    let iterations = forEnd - forStart
    let instruction = inputs[2].value
    for (var i = 0; i < iterations; i++) {
      setTimeout(e =>{
        if (instruction == "gauche" || instruction == "droite" || instruction == "haut" || instruction == "bas") {
          if (ninja.moveAlgo(instruction) == true) {
            // ninja.moveAlgo(instruction)
          } else {
            this.userLose = true
          }
        } else if (instruction == "couper" || instruction == "tirer") {
          instruction == "attaquer"
          ninja.action(ninja.x, ninja.y, instruction)
        } else {
          console.log("wrong instruction")
          this.userLose = true
        }
      }, 500*i)
    }
    if (this.userLose = true) {
      console.log("lose")
      // cBoard.clearFields()
    levels[activeMap].drawMap(levels[activeMap].map, true)
    }
  }

  readAction(bloc){
    let input
    let blocChilds = bloc.children
    for (var i = 0; i < blocChilds.length; i++) {
      if (bloc.children[i].nodeName == "INPUT") {
        input = bloc.children[i]
      } else if (bloc.children[i].childElementCount > 2) {
          input = bloc.children[i].children[1]
        }
    }
    let instruction = input.value
    if (instruction == "gauche" || instruction == "droite" || instruction == "haut" || instruction == "bas") {
      if (ninja.moveAlgo(instruction) == true) {
      } else {
        this.userLose = true
      }
    } else if (instruction == "couper" || instruction == "tirer") {
      instruction = "attaquer"
      ninja.action(ninja.x, ninja.y, instruction)
    } else if (instruction == "sauter") {
      ninja.action(ninja.x, ninja.y, instruction)
    } else {
      console.log("wrong instruction")
    }
  }
}

let cBoard = new CommandBoard()
