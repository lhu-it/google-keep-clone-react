import { useParams } from "react-router";

export default function Label() {
    let { labelSlug } = useParams();
    return <h3>Requested topic ID: {labelSlug}</h3>;
}