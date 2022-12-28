import { FlatList } from 'react-native';

import ItemComment from './ItemComment';

const ListComments = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => <ItemComment data={item} />}
      keyExtractor={(item, idx) => item.id.toString()}
    />
  );
};

export default ListComments;
