import 'jquery'
import "../../plugins/jquery.maskinput.min.js"

function initMaskDMY(){
    let obj = document.querySelector('.js-date-mask input')
    $('.js-date-mask input').mask('99.99.9999') 
}
export default initMaskDMY
