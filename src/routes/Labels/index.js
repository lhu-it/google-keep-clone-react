import { NavLink } from "react-router-dom"

export default function Labels({ listLabels }) {
    return (
        <>
            {
                listLabels.map((labelTitle, idx) => (
                    <li key={idx}>
                        <NavLink to={`/label/${labelTitle.slug}`}>{labelTitle.title}</NavLink>
                    </li>
                ))
            }
        </>
    )
}