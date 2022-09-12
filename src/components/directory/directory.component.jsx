import DirectoryItem from '../directory-item/directory-item.component';
import CATERORY_DATA from "../../sourceData/shop-categories.data.json";
import { DirectoryContainer } from './directory.styles';
const Directory = () => {
    const categories = CATERORY_DATA;
    return (
        <DirectoryContainer>
            {
                categories.map((category) => (
                    <DirectoryItem key={category.id} category={category} />
                ))
            }
        </DirectoryContainer>
    );
}

export default Directory;