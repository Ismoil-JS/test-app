import React, { useState, useEffect } from 'react'
import c from './Elements.module.scss'
import axios from 'axios'

const Navbar = () => {
    const [sortValue, setSortValue] = useState('none');
    const [filterValue, setFilterValue] = useState('none');
    const [data, setData] = useState([])


    // Fetching data from API using fetch. I know both methods but I used axios for this project

    // useEffect(() => {
    //     fetch('https://restcountries.com/v2/all?fields=name,region,area')
    //         .then(res => res.json())
    //         .then(data => { setData(data) })
    // }, [])
    // This is for fetching data using axios

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name,region,area')
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // This is for pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;

    // Sorting and Filtering Logic
    let filteredData = data;



    if (filterValue === 'smallerThan') {
        const lithuaniaArea = data.find(item => item.name === 'Lithuania').area;
        filteredData = data.filter(item => item.area < lithuaniaArea);
        if (sortValue === 'aToZ') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'zToA') {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }
    } else if (filterValue === 'oceania') {
        filteredData = data.filter(item => item.region === 'Oceania');
        if (sortValue === 'aToZ') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'zToA') {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }
    } else if (filterValue === 'none') {
        filteredData = data;
        if (sortValue === 'aToZ') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'zToA') {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }
    }

    const slicedData = filteredData.slice(startIndex, endIndex);

    // Event handlers for select elements
    const handleSortChange = ({ target: { value } }) => {
        setSortValue(value);
    };

    const handleFilterChange = ({ target: { value } }) => {
        setFilterValue(value);
        setCurrentPage(1);
    };

    return (
        <>
            <div className={c.container}>
                <div className={c.header}>
                    <h2>Testing</h2>

                    <h2 className={c.country}>Countries</h2>
                </div>
                <div className={c.navbar}>
                    <form className={c.navbar__sort}>
                        <select value={sortValue} onChange={handleSortChange}>
                            <option value="aToZ">A-Z</option>
                            <option value="zToA">Z-A</option>
                        </select>
                    </form>
                    <form className={c.navbar__filter}>
                        <select value={filterValue} onChange={handleFilterChange}>
                            <option value="none">Area</option>
                            <option value="smallerThan">Smaller than Lithuania</option>
                            <option value="oceania">Oceania</option>
                        </select>
                    </form>
                </div>
            </div>
            <div className={c.components__container}>
                <div className={c.main__components}>
                    {slicedData.map((item, index) => {
                        return (
                            <div key={index} className={c.country__container}>
                                <h2><span>Country:</span> {item.name}</h2>
                                <p><span> Region:</span> {item.region}</p>
                                <p> <span>Size:</span> {item.area} km<sup>2</sup></p>
                                <hr style={{ background: "black", height: "3px", width: "100%" }} />
                            </div>
                        );
                    })}
                </div>
                <div className={c.pagination}>
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
                    <h2>Page No{currentPage}</h2>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= Math.ceil(filteredData.length / 10)}>Next</button>
                </div>
            </div>
        </>
    );
}

export default Navbar