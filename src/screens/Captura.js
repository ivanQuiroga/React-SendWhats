import React, { useRef, useState } from 'react';
import { StyleSheet, View, Button, Linking, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Captura(props) {
    const { navigation } = props;

    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const phoneInput = useRef(null);
    const url = 'https://api.whatsapp.com/send?phone=';
    const alertError = (openUrl) => {
        Alert.alert(
            "Número incorrecto",
            "¿Desea continuar de todos modos?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Continuar",
                    onPress: () => openUrl()
                }
            ]
        );
    };

    const errorDesconocido = () => {
        Alert.alert(
            "Error",
            "Error desconocido",
            [
                {
                    text: "Ok",
                    style: "cancel"
                }
            ]
        );
    }
    const numeroValido = (number) => {
        try {
            if (number == undefined || number.lenght < 1) {
                return false;
            }
            console.log("Numero recibido: " + number);
            if (number.indexOf("+") == 0) {
                number = number.substring(1, number.lenght);
                console.log("Numero convertido: " + number);
            }
            return !isNaN(new Number(number));
        } catch (e) {
            console.log(e);
            return false;
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                ref={phoneInput}
                defaultValue={value}
                onChangeText={(text) => {
                    text = text.replace(" ", "");
                    setValue(text);
                }}
                placeholder="Escribir número"
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
                    const link = url + value;
                    const openUrl = () => {
                        Linking.canOpenURL(link).then(supported => {
                            if (supported) {
                                Linking.openURL(link);
                            } else {
                                errorDesconocido();
                            }
                        });
                    }

                    if (valid) {
                        console.log("Es valido, abriendo liga");
                        openUrl();
                    } else {
                        console.log("Es error, abriendo alerta");
                        alertError(openUrl);
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
    }, txt: {
        margin: 1,
        backgroundColor: '#fff',
    }, space: {
        width: 30,
        height: 30,
    }, input: {
        width: 250,
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
});
