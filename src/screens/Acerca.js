import React from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { Avatar, Badge, Card, Image, Header, Input } from 'react-native-elements';

export default function Acerca(props) {
    const { navigation } = props;
    const { nombre, apellido_p, apellido_m } = item;

    return (

        <>
            <ScrollView >
                <Avatar
                    overlayContainerStyle={{ backgroundColor: 'orange' }}
                    rounded
                    size="large"
                    title="IQ" />
                <Text>Bienvenido {nombre + ' ' + apellido_p + ' ' + apellido_m}</Text>
                <Button
                    title="Vista2"
                    onPress={() => { navigation.navigate('Vista2', { item: item}) }} /*Navegar */
                ></Button>

                {
                    item_lista.map((u, i) => {
                        return (
                            <Card key={i}>
                                <Card.Title>{u.nombre}</Card.Title>
                                <Badge value={u.cantidad} status="error" />
                                <View style={styles.container} >
                                    <Avatar
                                        rounded
                                        size="large"
                                        // style={{ width: '100%', height: 500 }}
                                        source={{ uri: u.imagen }}
                                    />
                                    <Card.Divider />
                                    <Button
                                        title="Detalles"
                                        type="outline"
                                    />
                                    <Card.Divider />
                                    <Text>{u.descripcion}</Text>
                                </View>
                            </Card>
                        )
                    })
                }
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
