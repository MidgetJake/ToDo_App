import { StyleSheet, Dimensions } from 'react-native';
const deviceSize = Dimensions.get("window");

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: '100%',
    },
    inputCard: {
        margin: 32,
        padding: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 4,
        textAlign: 'center'
    },
    titleText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
    }
});

export default styles;
