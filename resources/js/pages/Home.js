import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = (() => {
    const [sections, setSections] = useState([]);
    const baseRoute = '/sections';

    useEffect(() => {
        axios
        .get('/sections')
        .then(response => {
            response.data.sort((a, b) => parseInt(a.order) - parseInt(b.order));
            setSections(response.data);
        })
        .catch((error) => console.error(error));
    }, []);

    return (
        <ul>
            {sections.map(section => (
                <li key={section.id}>
                    <Link to={`${baseRoute}/${section.slug}`}>{section.title}</Link>
                    {section.children !== null ?
                        <ul>
                            {section.children.map(subsection => (
                                <li key={subsection.id}>
                                    <Link to={`${baseRoute}/${subsection.slug}`}>{subsection.title}</Link>
                                </li>
                            ))}
                        </ul>
                    : null}
                </li>
            ))}
        </ul>
    )
});

export default Home;
