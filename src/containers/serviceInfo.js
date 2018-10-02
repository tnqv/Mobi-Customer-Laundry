import React, { Component } from 'react';
import {View,Text, Image, FlatList,SectionList} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import { Container, Header, Left, Body, Right, Thumbnail, Card, CardItem, Title,Content, List, ListItem } from 'native-base';


class ServiceInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [
            {
              "name": "Combo Giặt + Sấy + Xả Quần áo",
              "description": "Combo Giặt + Sấy + Xả Quần áo",
              "services": [
                  {
                      "name": "Từ 1kg - 3kg/Máy/Lượt",
                      "price": 60000,
                      "description": "Giặt ủi theo kg chất lượng cao nè mấy ông"
                  },
                  {
                      "name": "Từ 3kg - 5kg/Máy/Lượt",
                      "price": 35000,
                      "description": "Giặt ủi theo kg chất lượng cao nè mấy ông"
                  },
                  {
                      "name": "Từ 5kg - 7kg/Máy/Lượt",
                      "price": 12000,
                      "description": "Giặt ủi theo kg chất lượng cao nè mấy ông"
                  }
              ]
          },
          {
              "name": "Combo Chăn Màn",
              "description": "Combo Chăn Màn",
              "services": [
                  {
                      "name": "Trọn bộ",
                      "price": 0,
                      "description": ""
                  },
                  {
                      "name": "2 Chăn Bông",
                      "price": 0,
                      "description": ""
                  }
              ]
          },
          {
              "name": "Combo Thú bông",
              "description": "Combo Thú bông",
              "services": []
          },
          {
              "name": "Dịch vụ giặt hấp (không bao gồm ủi)",
              "description": "Dịch vụ giặt hấp (không bao gồm ủi)",
              "services": []
          },
          {
              "name": "Combo Rèm Cửa",
              "description": "Combo Rèm Cửa",
              "services": []
          }
      ],
      listData: {}
    }
  }

  componentWillMount(){
      this.state.listData = this.state.data.map(object =>{
          return Object.assign(
            {},
            {
              name: object.name,
              description: object.description,
              data: object.services
            }
          )
      });
  }

  render() {
    // const { state, actions } = this.props;
    return (
      <Container>
        {
          //Header
        }
         <Header style={{backgroundColor: colors.colorLogo}}>
          <Left style={{flex: 1}}></Left>

          <Body style={{flex:1,alignItems:'center'}}>
            <Title>Dịch vụ</Title>
          </Body>

          <Right style={{flex: 1}}>

            <Thumbnail source={require('../assets/l60Hf.png')} style={{height: 34, width:34}} />
          </Right>
        </Header>
        {
          //Body
        }
        <Content>
            <SectionList
              keyExtractor={(item,index) => item + index}
              sections= {this.state.listData}
              renderItem= {
                  ({item,index,section}) => (
                        <Card style={{ marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20 }} bordered>
                                  <CardItem>
                                       <Image
                                        source={require('../assets/wash-fold-stack.png')}
                                        style={{height: 80, width: 80,marginRight: 25}}
                                        borderRadius={5}
                                        borderColor={colors.black}
                                        borderWidth={1}
                                        />


                                      <Body>
                                        <Text  style={{fontWeight: 'bold',color: colors.black,fontSize: 18}}>{item.name}</Text>

                                        <Text style={{fontSize: 12,marginTop:20}}>{item.description}</Text>

                                      </Body>
                                  </CardItem>

                                  <CardItem style={{flex:1,height:35,backgroundColor:colors.lightgray}}>
                                      <Right style={{marginRight :0}} >
                                      <Text style={{fontWeight: 'bold',color: colors.colorLogo}}>
                                         Giá : {item.price} đ
                                      </Text>
                                      </Right>

                                  </CardItem>
                          </Card>
                  )
              }
              renderSectionHeader={
                ({section})=>(
                <ListItem style={{ marginLeft: 0 }}>
                    <Body>
                      <Text style={{fontWeight: 'bold'}}>{section.name}</Text>
                    </Body>
                </ListItem>
              )}
              />
        </Content>
      </Container>

    );
  }
}


function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceInfo);
