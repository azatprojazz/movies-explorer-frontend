import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <span className="filter-checkbox">
      <input
        id="filter-checkbox__input"
        className="filter-checkbox__input"
        type="checkbox"
        defaultChecked
      />
      <label
        htmlFor="filter-checkbox__input"
        className="filter-checkbox__descr filter-checkbox__descr_active"
      ></label>
      <label htmlFor="filter-checkbox__input" className="filter-checkbox__descr">
        Короткометражки
      </label>
    </span>
  );
}

export default FilterCheckbox;
