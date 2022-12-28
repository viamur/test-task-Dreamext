import Snackbar from "react-native-snackbar";

const snacbarShow = ({ cb }) => {
    Snackbar.show({
        text: 'Сталась помилка',
        duration: 5000,
        action: {
            text: 'Повторити запит',
            textColor: 'green',
            onPress: () => {
                console.log('Snackbar')
                cb();
            },
        },
    });
};

export default snacbarShow;