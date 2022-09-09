import Directory from "../../components/directory/directory.component";
import CATERORY_DATA from "../../sourceData/shop-categories.data.json";

function Home() {
  return (
    <Directory categories={CATERORY_DATA} />
  );
}

export default Home;
