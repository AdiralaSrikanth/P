var app = {
    title: 'Indecision App',
    subTitle: 'Put your life in the hands of a computer',
    options: []
}
const onFormSubmit = (e) => {
    e.preventDefault()
    const option = e.target.elements.inputform.value
    if(option) {
        app.options.push(option)
        e.target.elements.inputform.value = '' 
        render()
    }
}
const removeAll = () => {
    app.options = []
    render()
}

const selectOption = () => {
    const randomNum = Math.floor(Math.random() * app.options.length)
    alert(app.options[randomNum])
    render()
}

const render = () => {
    var templateTwo = (
        <div>
            <h1>{app.title}</h1>
            {app.subTitle && <p>{app.subTitle}</p>}
            
            <p>{(app.options.length >0) ? 'Here are your options' : 'No options' }</p>
           <p> {app.options.length}</p>
           <button disabled={app.options.length === 0} onClick={selectOption}>what should I select?</button>
           <button onClick={removeAll}>Remove All</button>
            <ol>
                {
                app.options.map((option)=>{
                return <li key={option}>{option}</li>
                })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="inputform"/>
                <button> Add option</button>
            </form>
        </div>
    )
    ReactDOM.render(templateTwo, appRoot)
}

var appRoot = document.getElementById('app')
render()