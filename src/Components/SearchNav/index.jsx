import React from "react";
import styles from "./SearchNav.module.scss";

function SearchNav({ searchValue, setSearchValue }) {
  return (
    <>
      <nav className={styles.nav_content}>
        <input
          type="text"
          placeholder="search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </nav>
    </>
  );
}

export default SearchNav;
