const setItemOnLocalStorage = (key, value) => {
  if (key && value) localStorage.setItem(key, value);
};

const getItemOfLocalStorage = (key) => {
  if (key) return localStorage.getItem(key);
};

const copyrightYear = document.querySelector('[data-js="copyright-year"]');

const updateCurrentYear = () => {
  const currentYear = new Date().getFullYear();
	const yearLocalStorage = getItemOfLocalStorage('year');

	if(yearLocalStorage && yearLocalStorage === currentYear) {
		return yearLocalStorage;
	} else {
		setItemOnLocalStorage('year', currentYear);
		return getItemOfLocalStorage('year');
	}
};

copyrightYear.textContent = updateCurrentYear();


