import { useRef, useState } from "react"
import { postsData } from "../data/mockData";
import { SubPostCard } from "../sub_components/sub_post_cards";
import StyleUtilities from "../styles/style_utility";

interface Post {
    id: number;
    username: string;
    category: string;
    img: string;
    description: string;
    ratings: number; // Added optional rating
}

export default function Search() {

    const [recentSearch, setRecentSearch] = useState<Post[]>([]);
    const searchInput = useRef<HTMLInputElement>(null);
    const { subPostCards } = StyleUtilities();

    const handleFilter = () => {
        const query = searchInput.current?.value.toLowerCase();
        if (!query) {
            setRecentSearch([]);
            return;
        }

        const results = postsData.filter(post =>
            post.category.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.username.toLowerCase().includes(query)
        );
        setRecentSearch(results);
    }


    return (
        <div style={subPostCards.container}>
            <div style={subPostCards.header}>
                <h1>Search</h1>
                <div style={subPostCards.searchBar}>
                    <img src="https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=7a7a7a" width="24px" height="24px" alt="search" />
                    <input
                        ref={searchInput}
                        placeholder="CSS flexbox"
                        onChange={handleFilter}
                        style={subPostCards.input}
                    />
                </div>
            </div>

            <div style={subPostCards.resultsHeader}>
                {recentSearch.length > 0 ? "Results" : "Recent Searches"}
            </div>

            <SubPostCard styles={subPostCards} list={recentSearch} />
        </div>
    )
}
