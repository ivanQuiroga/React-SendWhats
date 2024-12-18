import React, { useRef, useState } from 'react';
import { StyleSheet, View, Button, Linking, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import PhoneInput from 'react-native-phone-number-input';

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
            <Text
                style={styles.txt}
                onPress={() => { navigation.navigate('Captura') }}
            >
                {"Capturar número telefónico"}
            </Text>
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
        color: '#00669a',
        fontWeight: "bold"  
    }, space: {
        width: 30,
        height: 30,
    },
});
