import React from 'react';
import style from './styles';
import { View, Text, Card, TextField, Button } from 'react-native-ui-lib';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {changePage, registerUser} from "../../Modules/userActions";

const Login = props => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const registerState = useSelector(state => state.user.register, shallowEqual);
    const dispatch = useDispatch();

    const register = () => {
        dispatch(registerUser(username, password))
    }

    const goToLogin = () => {
        dispatch(changePage('Login'));
    }

    React.useEffect(() => {
        if(registerState.attempting) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [registerState])

    return (
        <View style={style.root}>
            <Text style={style.titleText}>Register</Text>
            <Card style={style.inputCard}>
                <Text style={style.errorText}>{registerState.code}</Text>
                <TextField disabled={loading} onChangeText={setUsername} underlineColor={registerState.error ? 'red' : 'black'} title={'Username'} placeholder={'Username'}/>
                <TextField disabled={loading} onChangeText={setPassword} underlineColor={registerState.error ? 'red' : 'black'}  secureTextEntry textContentType={'password'} title={'Password'} placeholder={'Password'}/>
                <Button disabled={loading} onPress={register} label={'Sign up'}/>
            </Card>
            <Button link onPress={goToLogin} label={'Already have an account? Login'}/>
        </View>
    );
};

export default Login;
