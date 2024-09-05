
// function makeColor(r,g,b){
//     const color = {};
//     color.r = r;
//     color.g = g;
//     color.b = b;
//     color.rgb = function(){
//         const {r,g,b} = this
//         return `rgb(${r},${g},${b})`;
//     }
//     color.hex = function(){
//         const {r,g,b} = this
//         return '#'+ ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
//     }
//     return color
// }

// const firstColor = makeColor(150,75,90)



// ////// new keyword

// function Color(r,g,b){
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }

// Color.prototype.rgb = function(){
//     const {r,g,b} = this
//     return `rgb(${r},${g},${b})`;
// }

// Color.prototype.hex = function(){
//     const {r,g,b} = this
//     return '#'+ ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
// }

// Color.prototype.rgba = function(a=1){
//     const {r,g,b} = this
//     return `rgba(${r},${g},${b},${a})`
// }


// const newColor = new Color(40,50,60)
// const newColor1 = new Color(40,40,40)




/// Classes

class Color{
    constructor(r,g,b,name){
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name
    }
    greet(){
        return `Hello From ${this.name}`
    }
    rgbInner(){
        const {r,g,b} = this
    return `${r},${g},${b}`;
    }
    rgb(){
    return `rgb(${this.rgbInner()})`;
    }
    rgba(a=1){
        const {r,g,b} = this
    return `rgb(${this.rgbInner()},${a})`;
    }
    hex(){
        const {r,g,b} = this
        return '#'+ ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
    }
}
const cherry = new Color(215,150,50,'cherry')
const White = new Color(75,150,50,'white')
