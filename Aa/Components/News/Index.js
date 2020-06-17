import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {get_news} from '../../store/actions/News_action'

 
 class NewsComponent extends Component {
  
renderArticle =(news)=>{
  if(news.articles ) {
    
   const rat =[];
   for(let key in news.articles.data){
    rat.push({
        ...news.articles.data[key],
        id:key
    })
  }
  return (rat.map((item,i)=>(
    <TouchableOpacity key={i} onPress={()=>{this.props.navigation.navigate('Article',{...item})}}>
    <View style={styles.cardContainer}>
      <View>
        <Image style={{height:150,justifyContent:'space-around'}}
        source={{uri:`${item.image}`}}
        resizeMode='cover'
        />
        </View>
        <View style={styles.contentCard}>
          <Text style={styles.titleCard}>{item.title} </Text>
          <View style={styles.bottomCard}>
           <Text style={styles.bottomCardTeam}>{item.team}</Text>
           <Text style={styles.bottomCardDate}>Posted at:  {item.date}</Text>
          </View>
          </View>

    </View>
      </TouchableOpacity>
  )))
}
else{
return(  null)

}
     
      

  
 }

componentWillReceiveProps(nextProps){
  this.renderArticle(nextProps)

}

componentDidMount(){
this.props.dispatch(get_news())
}

   render(){
    
     return(
       <ScrollView style={{backgroundColor:"#F0F0F0"}}>
      {this.renderArticle(this.props.News)}
       </ScrollView>
     )
   }
 }
 const styles=StyleSheet.create({
   cardContainer:{
     backgroundColor:'#fff',
     margin:10,
     shadowColor:'#dddddd',
     shadowOffset:{height:2,width:0},
     shadowOpacity:0.8,
     shadowRadius:2,
     elevation:1,
     borderRadius:2
   },
   contentCard:{
     borderWidth:1,
     borderColor:"#dddddd"
   },
   titleCard:{
     padding:10,
     color:"#232323",
     fontSize:16,
     fontFamily:"Feather",
     fontWeight:'bold'
   },
   bottomCard:{
     borderTopWidth:1,
     borderTopColor:"#e6e6e6",
    padding:10
   },
   bottomCardTeam:{
  color:"#828282",
  fontSize:12,
  fontFamily:"Feather",
     fontWeight:'bold'
   },
   bottomCardDate:{
    color:"#828282",
    fontSize:12,
    fontFamily:"Feather",
     fontWeight:'normal'
   }
 })


 function mapStateToProps (state){
  
   return{
     News: state.News
   }
 }



 export default connect(mapStateToProps)(NewsComponent)