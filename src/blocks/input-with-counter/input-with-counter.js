import textfieldForDropping from "../textfield-for-dropping/textfield-for-dropping.js";

function inputWithCounter(){
    textfieldForDropping()

    let counters = []

    document.querySelectorAll(".js-input-with-counter").forEach((element, index)=>{
        let newCounter = new InputWithCounter(element)
        newCounter.init()
        counters.push(newCounter)
    })
    if(counters.length === 1) return counters[0]
    else return counters
}

class InputWithCounter{
    constructor(root){
        this.root = root 
        this.items = new Array()
    }
    
    init(){
        let elements = this.root.querySelectorAll('.js-input-with-counter__element')
        elements.forEach((item, index, array)=>{
            let newItem = new CounterItem(item)
            newItem.init()

            let handlerPlusClick = (e)=> {
                if(e.type == 'keydown' && e.code !== "Enter") return
                this.confirm()
            }

            let handlerMinusClick = (e) => {
                if(e.type == 'keydown' && e.code !== "Enter") return
                this.confirm()
            }

            newItem.plus.addEventListener("click", handlerPlusClick)
            newItem.plus.addEventListener("keydown", handlerPlusClick)

            newItem.minus.addEventListener("click", handlerMinusClick)
            newItem.minus.addEventListener("keydown", handlerMinusClick)

            this.items.push(newItem);
        })

        this.input = this.root.querySelector(".js-textfield-for-dropping__value")
        this.arrow = this.root.querySelector(".js-textfield-for-dropping__arrow")
        this.menu = this.root.querySelector(".js-input-with-counter__menu")
        this.clearingButton = this.root.querySelector('.js-input-with-counter__button_delete')
        this.confirmingButton = this.root.querySelector('.js-input-with-counter__button_confirm')

        this.input.addEventListener('focus', this.handlerInputFocus)
        this.arrow.addEventListener("click", this.handlerArrowClick)
        this.confirmingButton.addEventListener("click", this.handlerConfirmButtonClick)
        this.clearingButton.addEventListener("click", this.handlerClearButton)
        this.confirm()
    }

    menuRollDown(){
        document.addEventListener("click", this.handlerDocClick)
        document.addEventListener("focusin", this.handlerDocFocus)
        this.arrow.addEventListener("click", this.handlerArrowClick2)
        this.arrow.removeEventListener("click", this.handlerArrowClick)
        
        this.input.classList.add("textfield-for-dropping__value_active")
        this.menu.classList.remove("input-with-counter__menu_hidden")
        this.arrow.querySelector(".arrow-down").textContent = 'expand_less'
    }

    menuRollUp(){
        this.confirm();

        document.removeEventListener("click", this.handlerDocClick)
        document.removeEventListener("focusin", this.handlerDocFocus)
        this.arrow.addEventListener("click", this.handlerArrowClick)
        this.arrow.removeEventListener("click", this.handlerArrowClick2)

        this.input.classList.remove("textfield-for-dropping__value_active")
        this.menu.classList.add("input-with-counter__menu_hidden")
        this.arrow.querySelector(".arrow-down").textContent = 'expand_more'
        
    }

    confirm(){
        let stringForValue = ''
        let amountOfWord = 0
        let prevNumber

        if(this.root.classList.contains("input-with-counter_simple")){
            this.items.forEach( (it,i) =>{concatForSimplified(it,i)})
        }
        else{
            this.items.forEach( (it,i) =>{concatForStandart(it,i)})
        }
    
        this.input.value = stringForValue || this.input.getAttribute("placeholder")

        if(stringForValue) this.clearingButton.classList.add("input-with-counter__button_visible-delete")
        else this.clearingButton.classList.remove("input-with-counter__button_visible-delete")
        ///
        function concatForSimplified(element, index){
            let number = element.value
            

            if(amountOfWord<2){    
                if(prevNumber) number += prevNumber

                if(!element.concat){
                    if(number==0) return
                    if(stringForValue) stringForValue+= ", "

                    stringForValue  += number;

                    if(number == 1 || number%10 == 1) stringForValue += (" " + element.nameForms[0]);
                    else if(5>number || 5>(number%10)) stringForValue +=(" " + element.nameForms[1]);
                    else stringForValue += (" " + element.nameForms[2]);
                    
                    amountOfWord += 1
                    prevNumber = null
                }

                else prevNumber = number
            }

            else if(amountOfWord==2){
                number == 0 ?
                    stringForValue += ''
                    :
                    stringForValue += '...'

                amountOfWord += 1
            }
            else return
        };

        function concatForStandart(element, index){
            let number = element.value
            
            if(amountOfWord<2){
                if(prevNumber) number += prevNumber
                if(!element.concat){
                    if(number==0) return
                    if(stringForValue) stringForValue+= ", "
                    stringForValue += number;
                    if(number == 1 || number%10 == 1) stringForValue += (" " + element.nameForms[0]);
                    else if(5>number || 5>(number%10)) stringForValue +=(" " + element.nameForms[1]);
                    else stringForValue += (" " + element.nameForms[2]);
                
                    amountOfWord += 1
                    prevNumber = null
                }
                else prevNumber = number
            }
            else if(amountOfWord==2){
                number == 0 ?
                    stringForValue += ''
                    :
                    stringForValue += '...'

                amountOfWord += 1
                
            }
            else return
        }
    }
    clear(){ 
        this.clearingButton.classList.remove("input-with-counter__button_visible-delete")
        this.input.value = ''
        this.items.forEach(item=>{
            item.value = item.min;
            item.minus.classList.add("input-with-counter__tumbler_depricated")
            if(item.min !== item.max){
                item.plus.classList.remove("input-with-counter__tumbler_depricated")
            }
        })
    };
    
    handlerArrowClick=(e)=>{
        this.menuRollDown()
    }
    
    handlerArrowClick2=(e)=>{
        this.menuRollUp()
    }

    handlerDocClick=(e)=>{
        if(!this.root.contains(e.target) ){
            this.menuRollUp()
        }
    }

    handlerDocFocus=(e)=>{
        if(!this.root.contains(e.target) ){
            this.menuRollUp()
        }
    }
    
    handlerInputFocus=(e)=>{
        this.menuRollDown()
    }

    handlerConfirmButtonClick = (e)=>{
        if(e.type == 'keydown' && e.code !== "Enter") return
        this.menuRollUp()
    }

    handlerClearButton = (e) => {
        if(e.type == 'keydown' && e.code !== "Enter") return
        this.clear()
    }
}

class CounterItem{
    constructor(item){
        this.root = item 
    }
    init(){
        this.name = this.root.querySelector(".js-input-with-counter__item-name")
        this.minus = this.root.querySelector(".js-input-with-counter__tumbler:first-child")
        this.plus = this.root.querySelector(".js-input-with-counter__tumbler:last-child")
        this.number = this.root.querySelector(".js-input-with-counter__number")

        this.name.dataset.concat ? 
            this.concat = true 
            : 
            this.nameForms = [
                this.name.dataset.form1,
                this.name.dataset.form2,
                this.name.dataset.form3
            ]

        this.min = +this.minus.dataset.min
        this.max = +this.plus.dataset.max

        this.value = +this.number.dataset.init || this.min

        if (this.value == this.min){
            this.minus.classList.add("input-with-counter__tumbler_depricated")
        };

        if (this.value == this.max){
            this.plus.classList.add("input-with-counter__tumbler_depricated")
        }
        
        this.minus.addEventListener('click', this.handlerMinusClick)
        this.minus.addEventListener('keydown', this.handlerMinusClick)
        this.plus.addEventListener('click', this.handlerPlusClick)
        this.plus.addEventListener('keydown', this.handlerPlusClick)
    }

    get value(){
        return this._value
    }
    set value(number){
        this.number.textContent = number 
        this._value = number
    }

    handlerPlusClick=(e)=>{
        if(e.type == 'keydown' && e.code !== "Enter") return
        //Не знаю, не возбраняется ли, что я функцию с таким названием и на обработку для нажатия клавиши впихнул
        //показалось удобным, ведь обработки абсолютно идентичны
        let newValue = this.value+1
        if(newValue<=this.max){
            this.value = newValue

            if(newValue==this.max){
                this.plus.classList.add("input-with-counter__tumbler_depricated");
            }
            if(newValue!==this.min){
                this.minus.classList.remove("input-with-counter__tumbler_depricated");
            }
        };
    }

    handlerMinusClick=(e)=>{
        if(e.type == 'keydown' && e.code !== "Enter") return
        let newValue = this.value-1
        if(newValue>=this.min){
            this.value = newValue

            if(newValue==this.min){
                this.minus.classList.add("input-with-counter__tumbler_depricated");
            }
            if(newValue!==this.max){
                this.plus.classList.remove("input-with-counter__tumbler_depricated");
            }
        };
    }
}

export default inputWithCounter