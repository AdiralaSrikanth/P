class IndecisionApp extends React.Component {
    render() {
        const title = 'Indecision'
        const subTitle = 'Put your life in the hands of a computer'
        const options = ['Thing one','Thing two','Thing three',' Thing four']
        return (
            <div>
                <Header title={title} subTitle={subTitle} />
                <Action />
                <Options options={options}/>
                <Addoptions />
            </div>
        )
    }
}
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subTitle}</h2>
            </div>
        )
    }
}
class Action extends React.Component {
    handlePick(){
        alert('handle pick')
    }
    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        )
    }
}
class Options extends React.Component {
    constructor (props) {
        super(props)
        this.handleRemoveAll = this.handleRemoveAll.bind(this)
    }
    handleRemoveAll() {
        console.log(this.props.options)
        console.log('check where is this keyword pointing to')
        // alert('handle remove all')
    }
    render() {
        return (
            <div>
                <button onClick={this.handleRemoveAll}>RemoveALL</button>
               
                {this.props.options.map((option)=>{
                    return <Option key={option} optionText={option}/>
                })}        
            </div>
        )
    }
}
class Option extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
            </div>
        )
    }
}
class Addoptions extends React.Component {
    handleFormSubmit(e){
        e.preventDefault()
        const option = (e.target.elements.addoption.value.trim())
        if(option) {
            alert(option)
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                <input type="text" name="addoption"/>
                <button>Submit</button>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))