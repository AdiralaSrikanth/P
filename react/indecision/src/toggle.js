let visibility = false; 

const showDetails = () => {
    visibility = !visibility
    render()
}
const render = () => {
    var templateTwo = (
        <div>
<h1>Toggle Bar</h1>
            <button onClick={showDetails}>
            { visibility ? 'Hide details' : 'Show details'}
            </button>
            <p>{visibility && 'Education, Profile and native place'}</p>
        </div>
    )
    ReactDOM.render(templateTwo, appRoot)
}

var appRoot = document.getElementById('app')
render()