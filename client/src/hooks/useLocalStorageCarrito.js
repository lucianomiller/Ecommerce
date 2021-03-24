import useLocalStorage from "react-use-localstorage";

function useLocalStorageCarrito(onChange) {
  const [localStorageCarrito, setLocalStorageCarrito] = useLocalStorage(
    "carrito",
    "[]"
  );

  function setLocalCarrito(val) {
    setLocalStorageCarrito(JSON.stringify(val));
    typeof onChange === "function" && onChange(val);
  }

  return [JSON.parse(localStorageCarrito), setLocalCarrito];
}

export default useLocalStorageCarrito;
