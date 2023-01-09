class Game{
    constructor(){
        this.points=0
        this.userSequence=[]
        this.computerSequence=[]
        this.sequenceLength=4
    }
    createSequence(){
        this.computerSequence=[]
        for(let i=0 ; i<this.sequenceLength ; i++){
            const randomValue = Math.floor(Math.random()*4)
            this.computerSequence.push(randomValue)
        }
        console.log(this.computerSequence)
    }
    addNewElementToUserSequence(el){
        if(this.userSequence.length < this.computerSequence.length){
            if(el == this.computerSequence[this.userSequence.length]){
                this.userSequence.push(el)
                return true
            }
            else{
                return false
            }
        }
    }
    isUserSequenceFull(){
        return this.userSequence.length===this.computerSequence.length
    }
    score(){
        this.points +=1
        console.log("tu as gagne ")
        
    }
}

class Display{
    constructor(){
        this.game = new Game()
        this.playButton=document.getElementById("play_btn")
        this.score = document.querySelector(".score")
        this.colorButtons = document.querySelectorAll(".panel")
        this.isUserTurn = false
        this.colorOn=[
            "rgba(255, 255, 0, 0.5)",
            "rgba(0, 128, 0, 0.5)",
            "rgba(0, 0, 255, 0.5)",
            "rgba(255, 0, 0, 0.5)"
        ]
        this.colorOff=[
            "rgba(255, 255, 0, 1)",
            "rgba(0, 128, 0, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(255, 0, 0, 1)"
        ]
        this.attachEvents()
    }
    attachEvents(){
        this.playButton.addEventListener("click",()=>{
            if(!this.isUserTurn){
                console.log("play")
                this.game.createSequence()
                this.readComputerSequence()
                console.log("=>",this.game.computerSequence)
                
            }
        })
        this.colorButtons.forEach((colorButton,buttonIndex)=>{
            colorButton.addEventListener('click', () => {
                if(this.isUserTurn){
                    console.log(buttonIndex)
                    console.log(getComputedStyle(colorButton).backgroundColor)
                    if(!this.game.addNewElementToUserSequence(buttonIndex) ||this.game.isUserSequenceFull()){
                        this.isUserTurn =false
                        
                        this.game.score()
                        this.game.userSequence = []
                        this.updateDisplay()
                    }
                    console.log("userSequence : ", this.game.userSequence)
                }
            })
        })}

    readComputerSequence(){
        let index=0
        const id = setInterval(()=>{
            console.log(this.game.computerSequence[index])
            this.turnColorOn(this.game.computerSequence[index])
            index++
            if(index>=4){
                clearInterval(id)
                this.isUserTurn = true
                
            }
        },1000)
    }
    turnColorOn(index){
        this.colorButtons[index].style.backgroundColor=this.colorOn[index]
        setTimeout(()=>{
            this.colorButtons[index].style.backgroundColor=this.colorOff[index]
        },300)


    }
    updateDisplay(){
        
        this.score.innerText= `Score : ${this.game.points}`
    }

}
// function clearColor() {
//     topLeft.style.backgroundColor = "jaune";
//     topRight.style.backgroundColor = "bleu";
//     bottomLeft.style.backgroundColor = "vert";
//     bottomRight.style.backgroundColor = "rouge";
//   }

const display= new Display()
