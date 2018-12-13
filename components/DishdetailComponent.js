import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable'; 

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Animatable.View>
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image}}>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={styles.cardRow}>
                            <Icon
                                raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                                />
                            <Icon raised reverse name={'pencil'} type='font-awesome' color='#512DA8' style={styles.cardItem} onPress={() => props.onShowModal()} />
                        </View>
                    </Animatable.View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            author: '',
            comment: '',
            rating: 0,
            showModal: false
        }
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId){
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 0,
            showModal: false
        });
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render(){
        const dishId = this.props.navigation.getParam('dishId', '');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el === dishId)} 
                   favorite={this.props.favorites.some(el => el === dishId)} onPress={() => this.markFavorite(dishId)} onShowModal={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal visible={this.state.showModal} onDismiss={() => this.toggleModal()} onRequestClose={() => this.toggleModal()} >
                    <View style={styles.modal}>
                        <Rating showRating type="star" fractions={0} startingValue={this.state.rating} imageSize={40} 
                            onFinishRating={(rating) =>this.setState({rating})} style={{paddingVertical: 10}}/>
                        <Input placeholder="Author" leftIcon={{type: 'font-awesome', name: 'user-o'}} onChangeText={(author) => this.setState({author})}
                            value={this.state.author}/>
                        <Input placeholder="Comment" leftIcon={{type: 'font-awesome', name: 'comment-o'}} onChangeText={(comment) => this.setState({comment})}
                            value={this.state.comment}/>
                        <View style={{margin: 20, height: 100}}>
                            <Button onPress={() => {this.handleComment(dishId); this.resetForm();}} color="#512DA8" title="Submit" /> 
                        
                            <Button onPress={() => {this.toggleModal(); this.resetForm();}} color="grey" title="Cancel" />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);