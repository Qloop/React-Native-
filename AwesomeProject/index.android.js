/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    ScrollView,
    ListView,
    Navigator,
} from 'react-native';

import Myscene from './js/component/MyScene'

/**
 * HelloWorld
 */
class HelloWorld extends Component {
    render() {
        return (
            <Text>HelloWorld!</Text>
        )
    }
}

/**
 * props
 */
class Greeting extends Component {
    render() {
        return (
            <Text>Hello {this.props.name}</Text>
        );
    }
}

class LotsOfGreetings extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Greeting name='Qloop'/>
                <Greeting name='admin'/>
                <Greeting name='boris'/>
            </View>
        );
    }
}

/**
 * state
 */
class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: true};

        setInterval(() => {
            this.setState({showText: !this.state.showText});
        }, 1000);
    }

    render() {
        let display = this.state.showText ? this.props.content : ' ';
        return (
            <Text>{display}</Text>
        );
    }
}

class BlinkApp extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Blink content='I love to blink'/>
                <Blink content='I love to smile'/>
                <Blink content='I love to eat'/>
                <Blink content='I love '/>
            </View>
        )
    }
}

/**
 * Image
 */
class ShowPic extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <Image source={pic} style={{ width: 193, height: 110 }}/>
        )
    }
}

/**
 * style
 */
class LotsOfStyles extends Component {
    render() {
        return (
            <View>
                <Text style={styles.bigbule}>big blue</Text>
                <Text style={styles.red}>big blue</Text>
                <Text style={[styles.bigbule, styles.red]}>big blue</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    bigbule: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30
    },
    red: {
        color: 'red'
    }
});

/**
 * FlexBox [flex, flexDirection, justifyContent, alignItems]
 */
class FlexDimensionsBasics extends Component {
    render() {
        return (
            <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
                <View style={{ width: 50, backgroundColor: 'powderblue' }}/>
                <View style={{ width: 50, backgroundColor: 'skyblue' }}/>
                <View style={{ width: 50, backgroundColor: 'steelblue' }}/>
            </View>
        )
    }
}

/**
 * TextInput
 */
class PizzaTranslator extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View
                style={{
          flexDirection: 'column',
          backgroundColor: 'powderblue',
          borderWidth: 1
        }}>
                <TextInput
                    style={{ padding: 5, borderColor: 'red' }}
                    placeholder='披萨翻译官'
                    autoCapitalize='words'   //在Android6.0测试不起作用, 官方issues未解决
                    onChangeText={(text) => this.setState({ text })}
                />
                <Text style={{ padding: 10, fontSize: 42 }}>
                    {this.state.text.split(' ').map((value) => value && '🍕').join(' ')}
                </Text>
            </View>
        );
    }
}

/**
 * ScrollView 测试 样式需要在contentContainerStyle中设置  写一个
 * const styles =  StyleSheet.create({...})
 */
class ScrollViewDemo extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center' }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                <Text style={{ fontSize: 16, padding: 10 }}>this is super man</Text>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Text style={{ fontSize: 16 }}>this is super man</Text>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
                <Image source={require('./img/html.png')}/>
            </ScrollView>
        )
    }
}

/**
 * ListView 测试 有很多原生没有的效果，比如粘性头 可以很方便的实现
 */
class ListViewDemo extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dateSource: ds.cloneWithRows([
                'Qloop', 'Admin', 'Join', 'Boris', 'Richie', "Peter", "A", "B", "V", "D", "pro", "Android", "React", "you"
            ])
        }
    };

    render() {
        return (
            <ListView
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dateSource}
                renderRow={(data) => <Text style={{ fontSize: 40 }}>{data}</Text>}/>
        )
    }
}

class SimpleNavigatorApp extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{title: 'My Initial Scene', index: 0}}
                renderScene={(route,navigator) =>
                    <Myscene
                        title={route.title}
                        onForward={() => {
                            const nextIndex = route.index + 1;
                            navigator.push({
                                title: 'Scene' + nextIndex,
                                index: nextIndex,
                            });
                        }}
                        onBack={() => {
                            if(route.index > 0){
                                navigator.pop();
                            }
                        }}
                    />
                }
            />
        )
    }
}
AppRegistry.registerComponent('AwesomeProject', () => SimpleNavigatorApp);
