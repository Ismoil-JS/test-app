import React from 'react'
import c from './Navbar.module.scss'

const Navbar = () => {
    return (
        <div className={c.container}>
            <div className={c.header}>
                <h2>Testing</h2>
                <div className={c.header__search}>
                    <input type="text" />
                    <button>Search</button>
                </div>

                <h2>Countries</h2>
            </div>
            <div className={c.navbar}>
                <form className={c.navbar__sort}>
                    <select >
                        <option value="none">Name</option>
                        <option value="name">A-Z</option>
                        <option value="area">Z-A</option>
                    </select>
                </form>
                <form className={c.navbar__filter}>
                    <select >
                        <option value="none">Area</option>
                        <option value="name">Smaller than Lithuania</option>
                        <option value="area">“Oceania”</option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default Navbar