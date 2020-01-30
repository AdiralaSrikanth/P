class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleRemoveAll = this.handleRemoveAll.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: []
        }
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (e) {
            //do nothing
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }
    componentWillUnmount() {
        console.log('component will Unmount')
    }

    handleRemoveAll() {
        this.setState(() => ({ options: [] }))
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option
            )
        }))
    }
    handlePick() {
        const randomNum = Math.floor((Math.random() * this.state.options.length))
        const option = this.state.options[randomNum]
        alert(option)
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => (
            { options: prevState.options.concat(option) }))
    }
    render() {
        const subTitle = 'Put your life in the hands of a computer'
        return (
            <div>
                <Header subTitle={subTitle} />
                <Action
                    handlePick={this.handlePick}
                    visibility={this.state.options.length}
                />
                <Options
                    handleRemoveAll={this.handleRemoveAll}
                    handleDeleteOption={this.handleDeleteOption}
                    options={this.state.options}
                />
                <Addoptions
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    )
}

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button disabled={props.visibility <= 0}
                onClick={props.handlePick}
            >
                What should I do?</button>
        </div>
    )
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleRemoveAll}>RemoveALL</button>
            {props.options.length === 0 && <p>Please enter some option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option} optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />)
                )}
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }}

            >remove</button>
        </div>
    )
}

class Addoptions extends React.Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleFormSubmit(e) {
        e.preventDefault()
        const option = (e.target.elements.addoption.value.trim())
        const error = this.props.handleAddOption(option)
        if(!error) {
            e.target.elements.addoption.value = ''
        }
        this.setState(() => ({ error }))
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}

                <form onSubmit={this.handleFormSubmit}>
                    <input type="text" name="addoption" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))