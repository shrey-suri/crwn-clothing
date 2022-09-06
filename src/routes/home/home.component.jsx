import Directory from "../../components/directory/directory.component";
import DataSource from "../../sourceData/data.source";

function Home() {
  const categories = DataSource();
  return (
    <Directory categories={categories} />
  );
}

export default Home;
