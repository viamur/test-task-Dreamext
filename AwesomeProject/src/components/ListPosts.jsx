import { FlatList } from 'react-native';

import ItemPost from './ItemPost';

const ListPosts = ({ posts, handleOpenComment }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <ItemPost data={item} openComment={handleOpenComment} id={item.id} />
      )}
      keyExtractor={(item, idx) => item.id.toString()}
    />
  );
};

export default ListPosts;
