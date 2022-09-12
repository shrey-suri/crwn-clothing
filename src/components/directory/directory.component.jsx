import DirectoryItem from '../directory-item/directory-item.component';
import CATERORY_DATA from "../../sourceData/shop-categories.data.json";

import './directory.styles.scss'
const Directory = () => {
    const categories = CATERORY_DATA;
    return (
        <div className="directory-container">
            {
                categories.map((category) => (
                    <DirectoryItem key={category.id} category={category} />
                ))
            }
        </div>
    );
}

export default Directory;