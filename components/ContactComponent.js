import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import {Card} from 'react-native-elements';
import * as Animatable from 'react-native-animatable'; 

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card title = "Contact Information">
                        <Text style={{margin: 10}}>121, Clear Water</Text>
                        <Text style={{margin: 10}}>Clear Water Bay</Text>
                        <Text style={{margin: 10}}>HONG KONG</Text>
                        <Text style={{margin: 10}}>Tel: +111 1111 111</Text>
                        <Text style={{margin: 10}}>Fax: +111 1111 111</Text>
                        <Text style={{margin: 10}}>Email: abc@gmail.com</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;