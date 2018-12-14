import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import {Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable'; 
import { MailComposer } from 'expo';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    sendMail(){
        MailComposer.composeAsync({
            recipients: ['abc@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        })
    }

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
                        <Button title="Send email" buttonStyle={{backgroundColor: "#512DA8"}} icon={<Icon name="envelope-o" type="font-awesome" 
                            color="white"/>} onPress={this.sendMail} />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;