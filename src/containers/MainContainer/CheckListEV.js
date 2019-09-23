/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, Dimensions, Picker, CheckBox, ScrollView,TextInput} from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";

var {height, width} = Dimensions.get('window');

type Props = {};
export default class CheckListEV extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      Fiscal_Pátio:   "", txtA_empresa:   "", txt_observacao: "", Fiscal_Matricula: "",
      txt_A1_P1_EAD:  "", txt_A1_P2_UFE:  "",
      txt_A2_P1_DP:   "", txt_A2_P2_PQ:   "", txt_A2_P3_PA:   "", txt_A2_P4_VA:     "",
      txt_A3_P1_UEPC: "", txt_A3_P2_LC:   "", txt_A3_P3_GC:   "", txt_A3_P4_OD:     "", txt_A3_P5_FER: "",
      txt_A4_P1_MD:   "", txt_A4_P2_ID:   "", txt_A4_P3_FED:  "", txt_A4_P4_HD:     "",
      txt_A5_P1_UFC:  "", txt_A5_P2_SUEA: "", PickerValue:    '',
      userData: {      },
      Ac_EADCheck1:    false,   Ac_EADCheck2:    false,
      Ac_UFECheck1:    false,   Ac_UFECheck2:    false,      
      Aqsm_DPCheck1:   false,   Aqsm_DPCheck2:   false,
      Aqsm_PQCheck1:   false,   Aqsm_PQCheck2:   false,
      Aqsm_PACheck1:   false,   Aqsm_PACheck2:   false,
      Aqsm_VACheck1:   false,   Aqsm_VACheck2:   false,
      Agso_UEPCCheck1: false,   Agso_UEPCCheck2: false, 
      Agso_LCCheck1:   false,   Agso_LCCheck2:   false,
      Agso_GCCheck1:   false,   Agso_GCCheck2:   false,
      Agso_ODCheck1:   false,   Agso_ODCheck2:   false,
      Agso_FERCheck1:  false,   Agso_FERCheck2:  false,
      Am_MDCheck1:     false,   Am_MDCheck2:     false,
      Am_IDCheck1:     false,   Am_IDCheck2:     false,
      Am_FEDCheck1:    false,   Am_FEDCheck2:    false,
      Am_HDCheck1:     false,   Am_HDCheck2:     false,
      App_UFCCheck1:   false,   App_UFCCheck2:   false,
      App_SUEACheck1:  false,   App_SUEACheck2:  false,
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {        
        if (user){//Se é diferente de null, se é true, se é diferente de vazio, se é diferente de undefind
          this.setState({userUid: user.uid});
          firebase.database().ref("Users")
            .orderByChild("uid")
            .equalTo(user.uid)
            .once("value")
            .then((snapshot)=>{
              this.setState({userData: snapshot.val()[user.uid]})
            })
        }
    }.bind(this));
  }
  applyMask(value){
    this.maskTEL(value).then(masked => {
        let userData = this.state.userData;
        userData.telefone = masked;
        this.setState({
            userData: userData
        })
    })
  }

  render() {
    console.log("Dados do usuario", this.state.userData)
    return (
        <ScrollView>
          <View style={styles.container}>
              <TouchableOpacity onPress={()=> this.openDetalhes()} style={styles.backButton} >
                <Text style={styles.buttonText}>ᐸ Voltar</Text>
              </TouchableOpacity>

              <Text style={styles.titleText}> Veículos e Equipamentos</Text>

              <Card style={styles.containercard}>
                
                <Picker
                style = {{width:'100%'}}
                selectedValue={this.state.PickerValue}
                onValueChange={(itemValue, itemIndex) =>  this.setState({PickerValue:itemValue})}
                >
                  <Picker.Item label="Selecione Empresa" value=""/>
                  <Picker.Item label="Air France"        value="Air France"/>
                  <Picker.Item label="American Airlines" value="American Airlines"/>
                  <Picker.Item label="Avianca"           value="Avianca"/>
                  <Picker.Item label="Azul"              value="Azul"/>
                  <Picker.Item label="Copa Airlines"     value="Copa Airlines"/>
                  <Picker.Item label="Gol"               value="Gol"/>
                  <Picker.Item label="LATAM"             value="LATAM"/>
                  <Picker.Item label="Pantanal"          value="Pantanal"/>
                  <Picker.Item label="TAP Portugal"      value="TAP Portugal"/>
                  <Picker.Item label="TRIP"              value="TRIP"/>
                  <Picker.Item label="Webjet"            value="Webjet"/>               
                </Picker>

                <Text style={styles.estiloTexto}>Há Equipamentos fora da área delimitada?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Ac_EADCheck1} onChange={()=>this.Ac_EADCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Ac_EADCheck2} onChange={()=>this.Ac_EADCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não   </Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Está Utilizando espaço físico de outra empresa?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox value={this.state.Ac_UFECheck1} onChange={()=>this.Ac_UFECheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Ac_UFECheck2} onChange={()=>this.Ac_UFECheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Tem derramamento de produtos químicos, óleo e/ou combustíveis?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Aqsm_DPCheck1} onChange={()=>this.Aqsm_DPCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Aqsm_DPCheck2} onChange={()=>this.Aqsm_DPCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Tem produtos químicos mal acondicionados?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Aqsm_PQCheck1} onChange={()=>this.Aqsm_PQCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Aqsm_PQCheck2} onChange={()=>this.Aqsm_PQCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>                  
                </View>
                
                <Text style={styles.estiloTexto}>Encontrou presença de animais vivos ou mortos?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Aqsm_PACheck1} onChange={()=>this.Aqsm_PACheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Aqsm_PACheck2} onChange={()=>this.Aqsm_PACheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Encontrou vestigios de alimentos?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Aqsm_VACheck1} onChange={()=>this.Aqsm_VACheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Aqsm_VACheck2} onChange={()=>this.Aqsm_VACheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Utilização de equipamentos que produzem centelha?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Agso_UEPCCheck1} onChange={()=>this.Agso_UEPCCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Agso_UEPCCheck2} onChange={()=>this.Agso_UEPCCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Tem lixo no chão?</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Agso_LCCheck1} onChange={()=>this.Agso_LCCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Agso_LCCheck2} onChange={()=>this.Agso_LCCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>

                <Text style={styles.estiloTexto}>Encontrou guimbas de cigarro?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Agso_GCCheck1} onChange={()=>this.Agso_GCCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Agso_GCCheck2} onChange={()=>this.Agso_GCCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Econtrou alguma Obstrução na drenagem?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Agso_ODCheck1} onChange={()=>this.Agso_ODCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Agso_ODCheck2} onChange={()=>this.Agso_ODCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View> 

                <Text style={styles.estiloTexto}>Tem fiação exposta, gerando algum risco?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Agso_FERCheck1} onChange={()=>this.Agso_FERCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Agso_FERCheck2} onChange={()=>this.Agso_FERCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View> 

                <Text style={styles.estiloTexto}>Manutenção diversas(na infraestrutura)?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Am_MDCheck1} onChange={()=>this.Am_MDCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Am_MDCheck2} onChange={()=>this.Am_MDCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View> 

                <Text style={styles.estiloTexto}>Iluminação danificada(acima de 2 refletores danificados)?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Am_IDCheck1} onChange={()=>this.Am_IDCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Am_IDCheck2} onChange={()=>this.Am_IDCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>

                <Text style={styles.estiloTexto}>Fiação elétrica danificada?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Am_FEDCheck1} onChange={()=>this.Am_FEDCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Am_FEDCheck2} onChange={()=>this.Am_FEDCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>                
                
                <Text style={styles.estiloTexto}>hidráulica danificada?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.Am_HDCheck1} onChange={()=>this.Am_HDCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.Am_HDCheck2} onChange={()=>this.Am_HDCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>

                <Text style={styles.estiloTexto}>Uso/falta de colete?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.App_UFCCheck1} onChange={()=>this.App_UFCCheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.App_UFCCheck2} onChange={()=>this.App_UFCCheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Sem uso do EPI apropriado?</Text>
                <View style= {{flex: 1, flexDirection: 'row'}}>
                  <CheckBox value={this.state.App_SUEACheck1} onChange={()=>this.App_SUEACheck1()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Sim</Text>
                  </View>
                  <CheckBox value={this.state.App_SUEACheck2} onChange={()=>this.App_SUEACheck2()}/>
                  <View style={{ justifyContent: 'center'}}>
                    <Text style={styles.estiloTexto}>Não</Text>
                  </View>
                </View>
                
                <Text style={styles.estiloTexto}>Outros: Relatar</Text>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(text1) => this.setState({txt_observacao: text1})}
                  placeholder="Observação"
                  value={this.state.txt_observacao}
                />
              </Card>
              <TouchableOpacity onPress={()=> this.askRegister()} style={styles.registerButton} >
                <Text style={styles.buttonText}>Enviar CheckList</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
    );
  }

  askRegister(){

    var data = this.state.PickerValue;
    if(data == ""){
      Alert.alert(
        'ERRO', 'Selecione a empresa!!!'
      )
    }else{

      Alert.alert(
        'Registrar',
        'Confirma o registro com os seguintes dados?\nEmpresa: ' + this.state.PickerValue + "\n",
        [
          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => 
            //this.confirmRegister()
            this.confirmRegister(this.state.userData.nome,
                                this.state.userData.matricula,
                                this.state.PickerValue,
                                this.state.txt_A1_P1_EAD,
                                this.state.txt_A1_P2_UFE,
                                this.state.txt_A2_P1_DP,
                                this.state.txt_A2_P2_PQ,
                                this.state.txt_A2_P3_PA,
                                this.state.txt_A2_P4_VA,
                                this.state.txt_A3_P1_UEPC,
                                this.state.txt_A3_P2_LC,
                                this.state.txt_A3_P3_GC,
                                this.state.txt_A3_P4_OD,
                                this.state.txt_A3_P5_FER,
                                this.state.txt_A4_P1_MD,
                                this.state.txt_A4_P2_ID,
                                this.state.txt_A4_P3_FED,
                                this.state.txt_A4_P4_HD,
                                this.state.txt_A5_P1_UFC,
                                this.state.txt_A5_P2_SUEA,
                                this.state.txt_observacao,)
          },
        ],
        { cancelable: false }
      )
    }  
  }
  confirmRegister () {
    const userData = {
      Fiscal_Pátio:   this.state.userData.nome,
      Fiscal_Matricula: this.state.userData.matricula,
      txtA_empresa:   this.state.PickerValue,
      txt_A1_P1_EAD:  this.state.txt_A1_P1_EAD,
      txt_A1_P2_UFE:  this.state.txt_A1_P2_UFE,
      txt_A2_P1_DP:   this.state.txt_A2_P1_DP,
      txt_A2_P2_PQ:   this.state.txt_A2_P2_PQ,
      txt_A2_P3_PA:   this.state.txt_A2_P3_PA,
      txt_A2_P4_VA:   this.state.txt_A2_P4_VA,
      txt_A3_P1_UEPC: this.state.txt_A3_P1_UEPC,
      txt_A3_P2_LC:   this.state.txt_A3_P2_LC,
      txt_A3_P3_GC:   this.state.txt_A3_P3_GC,
      txt_A3_P4_OD:   this.state.txt_A3_P4_OD,
      txt_A3_P5_FER:  this.state.txt_A3_P5_FER,
      txt_A4_P1_MD:   this.state.txt_A4_P1_MD,
      txt_A4_P2_ID:   this.state.txt_A4_P2_ID,
      txt_A4_P3_FED:  this.state.txt_A4_P3_FED,
      txt_A4_P4_HD:   this.state.txt_A4_P4_HD,
      txt_A5_P1_UFC:  this.state.txt_A5_P1_UFC,
      txt_A5_P2_SUEA: this.state.txt_A5_P2_SUEA,
      txt_observacao: this.state.txt_observacao
    }
      firebase.database().ref("CheckListVeiculosEquipamentos/").push(userData)
      .then((snapshot) => {
        Alert.alert("Sucesso!", "Check List Enviado");
        Actions.checklist();
      })
      .catch((error) =>{
        console.log("Error: ", error);
        Alert.alert("Errou na persistência!", error.code)
      })      
  }

  Ac_EADCheck1(){
    this.setState({
      Ac_EADCheck1:!this.state.Ac_EADCheck1,
      Ac_EADCheck2: false,
      txt_A1_P1_EAD: "Sim" 
    })
  };
  Ac_EADCheck2(){
    this.setState({
      Ac_EADCheck2:!this.state.Ac_EADCheck2,
      Ac_EADCheck1: false,
      txt_A1_P1_EAD: "Não"
    })
  };
  Ac_UFECheck1(){
    this.setState({
    Ac_UFECheck1:!this.state.Ac_UFECheck1,
    Ac_UFECheck2: false,
    txt_A1_P2_UFE: "Sim" 
    })
  };
  Ac_UFECheck2(){
    this.setState({
    Ac_UFECheck2:!this.state.Ac_UFECheck2,
    Ac_UFECheck1: false,
    txt_A1_P2_UFE: "Não"
    })
  };

  Aqsm_DPCheck1(){
    this.setState({
        Aqsm_DPCheck1:!this.state.Aqsm_DPCheck1,
        Aqsm_DPCheck2: false,
        txt_A2_P1_DP: "Sim"
    })
  };
  Aqsm_DPCheck2(){
    this.setState({
        Aqsm_DPCheck2:!this.state.Aqsm_DPCheck2,
        Aqsm_DPCheck1: false,
        txt_A2_P1_DP: "Não"
    })    
  };
  Aqsm_PQCheck1(){
    this.setState({
      Aqsm_PQCheck1:!this.state.Aqsm_PQCheck1,
      Aqsm_PQCheck2: false,
      txt_A2_P2_PQ: "Sim"
    })
  };
  Aqsm_PQCheck2(){
    this.setState({
      Aqsm_PQCheck2:!this.state.Aqsm_PQCheck2,
      Aqsm_PQCheck1: false,
      txt_A2_P2_PQ: "Não"
    })
  };
  Aqsm_PACheck1(){
    this.setState({
      Aqsm_PACheck1:!this.state.Aqsm_PACheck1,
      Aqsm_PACheck2: false,
      txt_A2_P3_PA: "Sim"
    })    
  };
  Aqsm_PACheck2(){
    this.setState({
      Aqsm_PACheck2:!this.state.Aqsm_PACheck2,
      Aqsm_PACheck1: false,
      txt_A2_P3_PA: "Não"
    })
  };
  Aqsm_VACheck1(){
    this.setState({
      Aqsm_VACheck1:!this.state.Aqsm_VACheck1,
      Aqsm_VACheck2: false,
      txt_A2_P4_VA: "Sim"
    })
  };
  Aqsm_VACheck2(){
    this.setState({
        Aqsm_VACheck2:!this.state.Aqsm_VACheck2,
        Aqsm_VACheck1: false,
        txt_A2_P4_VA: "Não"
    })
  };

  Agso_UEPCCheck1(){
    this.setState({
      Agso_UEPCCheck1:!this.state.Agso_UEPCCheck1,
      Agso_UEPCCheck2: false,
      txt_A3_P1_UEPC: "Sim"
    })
  };
  Agso_UEPCCheck2(){
    this.setState({
      Agso_UEPCCheck2:!this.state.Agso_UEPCCheck2,
      Agso_UEPCCheck1: false,
      txt_A3_P1_UEPC: "Não"
    })
  };
  Agso_LCCheck1(){
    this.setState({
      Agso_LCCheck1:!this.state.Agso_LCCheck1,
      Agso_LCCheck2: false,
      txt_A3_P2_LC: "Sim"
    })    
  };
  Agso_LCCheck2(){
    this.setState({
      Agso_LCCheck2:!this.state.Agso_LCCheck2,
      Agso_LCCheck1: false,
      txt_A3_P2_LC: "Não"
    })
  };
  Agso_GCCheck1(){
    this.setState({
      Agso_GCCheck1:!this.state.Agso_GCCheck1,
      Agso_GCCheck2: false,
      txt_A3_P3_GC: "Sim"
    })
  };
  Agso_GCCheck2(){
    this.setState({
      Agso_GCCheck2:!this.state.Agso_GCCheck2,
      Agso_GCCheck1: false,
      txt_A3_P3_GC: "Não"
    })
  };
  Agso_ODCheck1(){
    this.setState({
      Agso_ODCheck1:!this.state.Agso_ODCheck1,
      Agso_ODCheck2: false,
      txt_A3_P4_OD: "Sim"
    })
  };
  Agso_ODCheck2(){
    this.setState({
      Agso_ODCheck2:!this.state.Agso_ODCheck2,
      Agso_ODCheck1: false,
      txt_A3_P4_OD: "Não"
    })
  };
  Agso_FERCheck1(){
    this.setState({
      Agso_FERCheck1:!this.state.Agso_FERCheck1,
      Agso_FERCheck2: false,
      txt_A3_P5_FER: "Sim"
    })
  };
  Agso_FERCheck2(){
    this.setState({
      Agso_FERCheck2:!this.state.Agso_FERCheck2,
      Agso_FERCheck1: false,
      txt_A3_P5_FER: "Não"
    })
  };
  Am_MDCheck1(){
    this.setState({
      Am_MDCheck1:!this.state.Am_MDCheck1,
      Am_MDCheck2: false,
      txt_A4_P1_MD: "Sim"
    })
  };
  Am_MDCheck2(){
    this.setState({
      Am_MDCheck2:!this.state.Am_MDCheck2,
      Am_MDCheck1: false,
      txt_A4_P1_MD: "Não"
    })
  };
  Am_IDCheck1(){
    this.setState({
      Am_IDCheck1:!this.state.Am_IDCheck1,
      Am_IDCheck2: false,
      txt_A4_P2_ID: "Sim"
    })
  };
  Am_IDCheck2(){
    this.setState({
      Am_IDCheck2:!this.state.Am_IDCheck2,
      Am_IDCheck1: false,
      txt_A4_P2_ID: "Não"
    })
  };
  Am_FEDCheck1(){
    this.setState({
      Am_FEDCheck1:!this.state.Am_FEDCheck1,
      Am_FEDCheck2: false,
      txt_A4_P3_FED: "Sim"
    })
  };
  Am_FEDCheck2(){
    this.setState({
      Am_FEDCheck2:!this.state.Am_FEDCheck2,
      Am_FEDCheck1: false,
      txt_A4_P3_FED: "Não"
    })
  };
  Am_HDCheck1(){
    this.setState({
      Am_HDCheck1:!this.state.Am_HDCheck1,
      Am_HDCheck2: false,
      txt_A4_P4_HD: "Sim"
    })
  };
  Am_HDCheck2(){
    this.setState({
      Am_HDCheck2:!this.state.Am_HDCheck2,
      Am_HDCheck1: false,
      txt_A4_P4_HD: "Não"
    })
  };
  App_UFCCheck1(){
    this.setState({
      App_UFCCheck1:!this.state.App_UFCCheck1,
      App_UFCCheck2: false,
      txt_A5_P1_UFC: "Sim"
    })
  };
  App_UFCCheck2(){
    this.setState({
      App_UFCCheck2:!this.state.App_UFCCheck2,
      App_UFCCheck1: false,
      txt_A5_P1_UFC: "Não"
    })
  };
  App_SUEACheck1(){
    this.setState({
      App_SUEACheck1:!this.state.App_SUEACheck1,
      App_SUEACheck2: false,
      txt_A5_P2_SUEA: "Sim"
    })
  };
  App_SUEACheck2(){
    this.setState({
      App_SUEACheck2:!this.state.App_SUEACheck2,
      App_SUEACheck1: false,
      txt_A5_P2_SUEA: "Não"
    })
  };
  openDetalhes(){
    Actions.dashboard();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    backgroundColor: '#012060'
  },
  containercard:{
    flex: 1,
    width:'100%'
  },
  inputStyle:{
    height: height * 0.06, 
    width: width * 0.80, 
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    margin: width * 0.04
  },
  buttonText:{
    color: "white"
  },
  estiloTexto:{
    color: 'black',
    alignItems: 'flex-start'
  },
  backButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignSelf: "flex-start"
  },
  registerButton: {
    backgroundColor: "#E6214E",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.9,
    alignItems: 'center'
  },
  titleText:{
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
    color: "white"
  },
});