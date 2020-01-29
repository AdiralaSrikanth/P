class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.handleRemoveAll = this.handleRemoveAll.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            options : []
        }
    }
    handleRemoveAll(){
        this.setState(()=>{
            return {
                options: []
            }
        })
    }
    handlePick() {
        const randomNum = Math.floor((Math.random() * this.state.options.length))
        const option = this.state.options[randomNum]
        alert(option)
    }
    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add' 
        } else if (this.state.options.indexOf(option) > -1 ) {
            return 'This option already exists'
        } 
        this.setState((prevState)=>{
            return{
                options: prevState.options.concat(option)
            }
        })
    }
    render() {
        const title = 'Indecision'
        const subTitle = 'Put your life in the hands of a computer'
        return (
            <div>
                <Header title={title} subTitle={subTitle} />
                <Action 
                    handlePick = {this.handlePick}
                    visibility={this.state.options.length}
                />
                <Options 
                    handleRemoveAll = {this.handleRemoveAll}
                    options={this.state.options}
                />
                <Addoptions 
                    handleAddOption = {this.handleAddOption}
                />
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
    render() {
        return (
            <div>
                <button disabled={this.props.visibility <= 0} 
                onClick={this.props.handlePick}
                >
                What should I do?</button>
            </div>
        )
    }
}
class Options extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleRemoveAll}>RemoveALL</button>
               
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
    constructor(props){
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleFormSubmit(e){
        e.preventDefault()
        const option = (e.target.elements.addoption.value.trim())
        const error = this.props.handleAddOption(option) 
        this.setState(()=>{
            return {
                error
            }
        })   
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                
                <form onSubmit={this.handleFormSubmit}>
                <input type="text" name="addoption"/>
                <button>Submit</button>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))