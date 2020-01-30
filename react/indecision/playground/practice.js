
class Action extends React.Component{
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
ReactDOM.render(<Action />, document.getElementById('app'))