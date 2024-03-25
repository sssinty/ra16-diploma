import {useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchCatalog, setTextFormCatalog } from "../../redux/stateCatalog";
import { useState } from "react";

const FromHeader = () => {
	const dispatch  = useDispatch();
	const navigation = useNavigate();
	const [text, setText] = useState('');
	const [visible, setVisible] = useState('invisible');


	function handlerChange(event) {
		const target = event.target;
		setText(target.value);
	}

	function handlerSubmit (event) {
		event.preventDefault();
	}

	function handlerClick() {
		if (visible === 'invisible') {
			setVisible('visible');
		} else if (text === '') {
			setVisible('invisible');
		} else {
			dispatch(searchCatalog(text))
			dispatch(setTextFormCatalog(text));
			navigation('/catalog');
		}
	}

	return (
		<>
			<div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handlerClick}></div>
			<form data-id="search-form" className={`header-controls-search-form form-inline ${visible}`} onSubmit={handlerSubmit}>
				<input className="form-control" placeholder="Поиск" onChange={handlerChange}></input>
			</form>
		</>
	)
}

export default FromHeader;