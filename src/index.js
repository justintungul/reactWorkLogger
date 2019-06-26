import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php
function toHoursMins(mins) {
    let num = mins;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
}

class Item extends React.Component {
    render() {
        const item = this.props.item;
        return (
            <div>
                <h5>
                    <span className="mr-3">{toHoursMins(item.time)}</span>
                    <span>{item.description}</span>
                </h5>
            </div>
        )
    }
}

class List extends React.Component {
    render() {
        const items = this.props.items.map((item, idx) => {
            return <Item key={idx} item={item} />
        })
        const total = this.props.items.reduce((a,b) => {
            return {time: parseInt(a.time) + parseInt(b.time)}
        })
        return (
            <div>
                <h3>Work<span className="float-right">{toHoursMins(total.time)}</span></h3>
                {items}
            </div>
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            description: '',
            time: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleTime = this.handleTime.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.project.length > 0 && this.state.description.length > 0 && this.state.time > 0) {
            this.props.newItem(this.state);
        }
    }

    handleProject = (e) => {
        this.setState({project: e.target.value})
    }

    handleDescription = (e) => {
        this.setState({description: e.target.value});
    }
    
    handleTime = (e) => {
        this.setState({time: e.target.value});
    }

    render() {
        return (
            <form className="col-6 offset-3 mt-5" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Project</label>
                    <div className="col-sm-10">
                        <select className="form-control" onChange={this.handleProject}>
                            <option defaultValue>Select Project</option>
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter a description"
                            onChange={this.handleDescription}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Minutes</label>
                    <div className="col-sm-10">
                        <input 
                            type="number" 
                            className="form-control" 
                            min="0" max="240" 
                            placeholder="0"
                            onChange={this.handleTime}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Add</button>
            </form>
        )
    }    
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            work: [{
                description: 'Item number 1',
                time: 10
            }],
            personal: [{
                description: 'Item number 2',
                time: 20
            }]
        }
        this.handleNewItem = this.handleNewItem.bind(this);
    }

    handleNewItem = (item) => {
        console.log('line 125', item);
        let newItem = {
            description: item.description,
            time: item.time
        }
        this.setState(state => {
            return state[item.project] = [...state[item.project], newItem].sort(this.compare);
        });
    }
    
    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    compare = (a,b) => {
        const keyA = a.time;
        const keyB = b.time;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    }

    render() {
        return (
            <div className="container mt-4">
                <h1 className="text-center">Work Logger</h1>
                <Form newItem={this.handleNewItem} />
                <hr className="my-5" />
                <div className="row">
                    <div className="col-4 offset-1">
                        <List items={this.state.work} />
                    </div>
                    <div className="col-4 offset-1">
                        <List items={this.state.personal} />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));