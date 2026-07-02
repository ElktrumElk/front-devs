import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { searchPosts, type Post } from "../api/posts";
import { SubPostCard } from "../sub_components/sub_post_cards";
import StyleUtilities from "../styles/style_utility";

interface SearchProps {
    setIsViewCard: Dispatch<SetStateAction<boolean>>;
    setViewCardId: Dispatch<SetStateAction<string>>;
}

export default function Search({ setIsViewCard, setViewCardId }: SearchProps) {

    const [recentSearch, setRecentSearch] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const searchInput = useRef<HTMLInputElement>(null);
    const { subPostCards } = StyleUtilities();
    
    const handleFilter = async () => {
        const query = searchInput.current?.value?.toLowerCase();
        if (!query) {
            setRecentSearch([]);
            return;
        }

        setLoading(true);
        try {
            const { data } = await searchPosts({ q: query });
            setRecentSearch(data.posts);
        } catch {
            setRecentSearch([]);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div style={subPostCards.container}>
            <div style={subPostCards.header}>
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
                {loading ? "Searching..." : recentSearch.length > 0 ? "Results" : "Recent Searches"}
            </div>

            <SubPostCard styles={subPostCards} list={recentSearch} expand={setIsViewCard} cardId={setViewCardId} />
        </div>
    )
}
