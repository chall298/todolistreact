import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

import { ItemList } from "./itemList";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
			unicorn: ""
		};
	}

	deleteElement = index => {
		let tempState = this.state;
		tempState.list.splice(index, 1);
		this.setState(tempState);
	};
	moveElement = index => {
		let tempState = this.state;
		let aux = tempState.list.splice(index, 1);
		tempState.list.splice(index - 1, 0, aux[0]);
		this.setState(tempState);
	};
	componentDidMount = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/chris")
			.then(response => {
				return response.json();
			})
			.then(myJson => {
				this.setState({ list: myJson });
			});
	};
	render() {
		return (
			<div className="text-center mt-5">
				<h1>TO DO LIST</h1>

				<li className="list-group-item">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span
								className="input-group-text"
								id="inputGroup-sizing-default"
							/>
						</div>
						<form
							onSubmit={event => {
								event.preventDefault();
								let temp = this.state;
								temp.list.push({
									label: this.state.unicorn,
									done: false
								});
								temp.unicorn = "";
								this.setState(temp);
								var url =
									"https://assets.breatheco.de/apis/fake/todos/user/chris";

								fetch(url, {
									method: "PUT",
									body: JSON.stringify(temp.list), // data can be `string` or {object}!
									headers: {
										"Content-Type": "application/json"
									}
								})
									.then(res => res.json())
									.then(response =>
										console.log(
											"Success:",
											JSON.stringify(response)
										)
									)
									.catch(error =>
										console.error("Error:", error)
									);
							}}>
							<input
								autoFocus={true}
								type="text"
								className="form-control"
								aria-label="Default"
								aria-describedby="inputGroup-sizing-default"
								placeholder="What needs to be done?"
								value={this.state.unicorn}
								onChange={event => {
									this.setState({
										unicorn: event.target.value
									});
								}}
							/>
						</form>
					</div>
				</li>
				<ul className="todo-list">
					{this.state.list.map((coyote, i) => {
						return (
							<ItemList
								key={i}
								cat={coyote.label}
								flying={() => this.deleteElement(i)}
								lifting={() => this.moveElement(i)}
								position={i}
							/>
						);
					})}
				</ul>
				<div>{"list items: " + this.state.list.length}</div>
				<div>
					<button
						onClick={event => {
							this.setState({
								list: []
							});
						}}>
						{" "}
						Clear
					</button>
				</div>
			</div>
		);
	}
}
