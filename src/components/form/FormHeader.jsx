import {useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTextFormCatalog } from "../../redux/stateCatalog";
import { useState } from "react";

const FromHeader = () => {
	const dispatch  = useDispatch();
	const navigation = useNavigate();
	const [text, setText] = useState('');
	const [visible, setVisible] = useState('invisible');


	function hendlerChange(event) {
		const target = event.target;
		setText(target.value);
	}

	function hendlerClick() {
		if (visible === 'invisible') {
			setVisible('visible')
		} else if (text === '') {
			setVisible('invisible');
		} else {
			dispatch(setTextFormCatalog(text));
			navigation('/catalog.html');
		}
	}

	return (
		<>
			<div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={hendlerClick}></div>
			<form data-id="search-form" className={`header-controls-search-form form-inline ${visible}`}>
				<input className="form-control" placeholder="Поиск" onChange={hendlerChange}></input>
			</form>
		</>
	)
}

export default FromHeader;