import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCatalog, getCategoriesID, searchCatalog, setTextFormCatalog } from "../../redux/stateCatalog";

const FormCatalog = () => {
	const { textState, categoriesID} = useSelector((state) => state.state);
	const [text, setText] = useState('');
	const [sendStatus, setSendStatus] = useState(false)
	const dispatch = useDispatch();

	function handlerChange(event) {
		const target = event.target;
		setText(target.value);
		setSendStatus(true)
	}

	function handlerSubmit (event) {
		event.preventDefault();
	}

	useEffect(() => {
		setText(textState);
	},[]);

	useEffect(() => {
		if(sendStatus) {
			const delayDebounceFn = setTimeout(() => {
				if(categoriesID && text == "") {
					categoriesID !== 0 ?	dispatch(getCategoriesID(categoriesID))  : dispatch(getCatalog());
					dispatch(setTextFormCatalog(text));
					setSendStatus(false);
				} else {
					dispatch(searchCatalog(text));
					dispatch(setTextFormCatalog(text));
					setSendStatus(false);
				}
			}, 3000);
			return () => clearTimeout(delayDebounceFn);
		}
  }, [text]);

	return (
		<>
			<form className="catalog-search-form form-inline" onSubmit={handlerSubmit}>
        <input className="form-control" placeholder="Поиск" aria-autocomplete="list" value={text} onChange={handlerChange}></input>
      </form>
		</>
	)
}

export default FormCatalog; 