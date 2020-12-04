import React, { useRef, useState } from 'react';
import { StyleSheet, View, Button, Linking } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';


const parametros = {
    nombre: 'Iván',
    apellido_p: 'Quiroga',
    apellido_m: 'Luna'
}

export default function Home(props) {

    const { navigation } = props;

    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const phoneInput = useRef(null);
    const url = 'https://api.whatsapp.com/send?phone=';

    const numeroValido = (number) => {
        try {
            if (number == undefined || number.lenght < 1) {
                return false;
            }
            number = number.substring(1, number.lenght);
            console.log("Numero convertido: " + number);
            return !isNaN(new Number(number));
        } catch (e) {
            console.log(e);
            return false;
        }
    };


    return (
        <View style={styles.container}>
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="MX"
                onChangeFormattedText={(text) => {
                    text = text.replace(" ", "");
                    setValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
            />
            <View style={styles.space} />
            <Button
                title="Enviar Mensaje"
                style={styles.btn}
                onPress={() => {
                    setValid(numeroValido(value));

                    if (value) {
                        const link = url + value;
                        Linking.canOpenURL(link).then(supported => {
                            if (supported) {
                                Linking.openURL(link);
                            } else {
                                console.log("No se pudo abrir la liga");
                            }
                        });
                    }
                }}
            >

            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,

    }, btn: {
        margin: 10,
        backgroundColor: '#34B7F1'
    }, space: {
        width: 30,
        height: 30,
    },
});
