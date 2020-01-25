const addOne = () => {
    count++
    rerenderApp()
}
const minusOne = () => {
    count--
    rerenderApp()

}
const reset = () => {
    count = 0
    rerenderApp()
}

let count = 0


const rerenderApp = () => {

    const templateTwo = (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={addOne}>+1</button>
        <button onClick={minusOne}>-1</button>
        <button onClick= {reset}>Reset</button>
        </div>)

    ReactDOM.render(templateTwo, appRoot)
}