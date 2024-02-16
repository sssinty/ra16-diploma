import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { searchCatalog, setTextFormCatalog } from "../../redux/stateCatalog";

const FormCatalog = () => {
	const textState = useSelector((state) => state.state.hitsCatalog)
	const [text, setText] = useState('')
	const dispatch = useDispatch();

	function hendlerChange(event) {
		const target = event.target
		setText(target.value)
	}

	function hendlerSubmit (event) {
		event.preventDefault()
	}

	useEffect(() => {
		setText(textState)
	},[])

	useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
			dispatch(searchCatalog(text)),
			dispatch(setTextFormCatalog(text))
    }, 3000)
    return () => clearTimeout(delayDebounceFn)
  }, [text])

	return (
		<>
			<form className="catalog-search-form form-inline" onSubmit={hendlerSubmit}>
        <input className="form-control" placeholder="Поиск" aria-autocomplete="list" value={text} onChange={hendlerChange}></input>
      </form>
		</>
	)
}

export default FormCatalog; 