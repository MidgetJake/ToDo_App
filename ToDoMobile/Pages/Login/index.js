import React from 'react';
import style from './styles';
import { View, Text, Card, TextField, Button } from 'react-native-ui-lib';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {changePage, loginUser} from "../../Modules/userActions";

const Login = props => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const loginState = useSelector(state => state.user.login, shallowEqual);
    const dispatch = useDispatch();

    const login = () => {
        dispatch(loginUser(username, password))
    }
    const goToRegister = () => {
        dispatch(changePage('Register'));
    }

    React.useEffect(() => {
        if(loginState.attempting) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [loginState])

    return (
        <View style={style.root}>
            <Text style={style.titleText}>Login</Text>
            <Card style={style.inputCard}>
                <Text style={style.errorText}>{loginState.code}</Text>
                <TextField disabled={loading} onChangeText={setUsername} underlineColor={loginState.error ? 'red' : 'black'} title={'Username'} placeholder={'Username'}/>
                <TextField disabled={loading} onChangeText={setPassword} underlineColor={loginState.error ? 'red' : 'black'}  secureTextEntry textContentType={'password'} title={'Password'} placeholder={'Password'}/>
                <Button disabled={loading} onPress={login} label={'Login'}/>
            </Card>
            <Button link onPress={goToRegister} label={'Create an account'}/>
        </View>
    );
};

export default Login;
