import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { searchCatalog, setTextFormCatalog } from "../../redux/stateCatalog";

const FormCatalog = () => {
	const textState = useSelector((state) => state.state.textSearch);
	const [text, setText] = useState('')
	const dispatch = useDispatch();

	function handlerChange(event) {
		const target = event.target;
		setText(target.value);
	}

	function handlerSubmit (event) {
		event.preventDefault();
	}

	useEffect(() => {
		setText(textState);
	},[]);

	useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
			dispatch(searchCatalog(text)),
			dispatch(setTextFormCatalog(text))
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
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