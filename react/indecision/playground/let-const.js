const multiplication = {
    numbers: [2,4,6,8],
    multiplyBY: 2,
    multiply(){
        console.log('Input numbers '+this.numbers)
        return this.numbers.map((number)=>{
                return number * this.multiplyBY
        })
    }
}
console.log('Result ' + multiplication.multiply())