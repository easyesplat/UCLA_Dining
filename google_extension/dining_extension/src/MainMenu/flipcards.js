import React from 'react';
import '../css/flipcards.css';

// Styles
const bodyStyles = {
  background: "#CFEAF9",
  width: "100%",
  height: "350px",
  overflowX: "hidden"
}

/* Change box sizes */
const cardContainerStyles = {
  width: "180px",
  height: "60px",
  background: "#fff",
  borderRadius: 10
};
const imgStyles = {
  width: 80,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10
}
const imgContainerStyles = {
  height: "35%",
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  backgroundSize: "cover"
}
const avatarContainerStyles = {
  width: "40px",
  height: "40px",
  zIndex: "9",
  position: "relative",
  top: "-15px",
  left: "25px",
  right: "0",
  border: "5px solid #fff",
  backgroundSize: "cover",
  textAlign: "center",
  borderRadius: "50%"
};
const titleStyles = {
  color: "#000000",
  fontFamily: "SF Pro",
  fontWeight: "590",
  outline: "none",
  margin: "0px",
  /* display: "inline-block", */
  width: "76px",
  height: "17px",
  left: "90px",
  top: "-60px",
  textAlign: "center",
  position: "relative"
};
const subTitleStyles = {
  color: "#000000",
  position: "relative",
  top: "-75px",
  left: "95px",
  textAlign: "center",
  fontWeight: "100"
};
const bioContainerStyles = {
  position: "relative",
  top: "-95px"
};
const bioStyles = {
  color: "#444",
  padding: "0 30px",
  textAlign: "center"
};
const iconsContainerStyles = {
  position: "relative",
  top: "-85px",
  textAlign: "center"
}
const iconStyles = {
  margin: "0 10px",
  color: "#5C6BC0",
  fontSize: "24px"
}
const cardBackStyles = {
  height: 60,
  width: 180,
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  borderRadius: "10px",
  background: "#FFF",
  backgroundSize: "cover",
  backgroundPosition: "right"
}

const avatarImgStyles = {
  width: "100%",
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  borderRadius: "50%"
}
const cardBackImgStyles = {
  height: "0%",
  width: "0%",
  borderRadius: 10,
  position: "absolute"
}

// Components
class CardImg extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
       <div style={imgContainerStyles} className="imgContainer">
            <img src={this.props.imgSrc} className="img" style={imgStyles} />
       </div>
    )
  }
}
class CardAvatar extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style={avatarContainerStyles} className="infoContainer">
        <img src={this.props.avatarSrc} style={avatarImgStyles} />
      </div>
    )
  }
}
class CardTitle extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="titleDiv">
        <h1 id={this.props.targetId} style={titleStyles} className="epicuria">{this.props.title}</h1>
        <h4 style={subTitleStyles} className="epicuria">{this.props.subTitle}</h4>
      </div>
    )
  }
}
class CardBio extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style={bioContainerStyles} className="bioContainer">
        <p style={bioStyles} className="bio">{this.props.bio}</p>
      </div>
    )
  }
}
class CardSocialIcons extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style={iconsContainerStyles} className="iconContainer">
        <span style={iconStyles} className="icons"><i class="fab fa-facebook-square"></i></span>
        <span style={iconStyles} className="icons"><i class="fab fa-youtube-square"></i></span>
        <span style={iconStyles} className="icons"><i class="fab fa-twitter-square"></i></span>
      </div>
    )
  }
}
class CardBack extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div>
      <div style={cardBackStyles}>
        <p> <br></br></p>
        <p> Current wait time: </p>
      </div> 
    </div>
    )
  }
}

class Card extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       title : "Bruin Café",
       subTitle: "@Casual",
       bio: "",
       direction: "forwards"
     }
   }
   componentWillMount(){
     if (this.props.type == "bp"){
     this.setState({
       title: "Bruin Plate",
       subTitle: "@Healthy",
       bio: ""
     });
     } else if (this.props.type == "dn"){
       this.setState({
         title: "De Neve",
         subTitle: "@American",
         bio: ""
       })
     } else if (this.props.type == "ep"){
       this.setState({
         title: "Epicuria",
         subTitle: "@Medit.",
         bio: ""
       })
     }
   }
   render(){
     
     return (
         <div className="flipperContainer">
           <div className="flipper">
              <div style={cardContainerStyles} className="cardFront cardContainer">
                  <CardImg imgSrc={this.props.imgSrc} />
                  <CardAvatar avatarSrc={this.props.avatarSrc} />
                  <CardTitle targetId={this.props.targetId} title={this.state.title} subTitle={this.state.subTitle} />
                  <CardBio bio={this.state.bio} />
                  <CardSocialIcons />
              </div>
             <div style={cardBackStyles} className="cardBack">
                <CardBack /> 
             </div>
            </div>
       </div>
     )
   }
 }

 // Main rendering function for boxes
 class CardContainer extends React.Component {
   constructor(props){
     super(props);
   }
   render(){
     return (
      <div style={bodyStyles} className="body">
        <div className="flex">
           
          <Card imgSrc= {require("../assets/diningHallImages/bcafe.jpg")} avatarSrc="https://menu.dining.ucla.edu/Content/Images/Menus/BruinCafe/bruincafe-logo.png" cardBackImgSrc={require("../assets/diningHallImages/bruincafe-logo.png")} targetId="navi" />
           
          <Card type="bp" imgSrc={require("../assets/diningHallImages/bplateimage.jpg")} avatarSrc="https://tse1.mm.bing.net/th?id=OIP.AAMn3VdyUcUhKq89mvUaKAHaFK&pid=Api&P=0&w=246&h=172" cardBackImgSrc="https://i.pinimg.com/736x/b1/2d/9f/b12d9f259a178fc9dc7bfb6447be7a1c.jpg"/>
                     
        </div>
        <div className="flex">

         <Card type="dn" imgSrc={require("../assets/diningHallImages/deneve.jpg")} avatarSrc="https://tse4.mm.bing.net/th?id=OIP.JzKeok1YeHygJY39vwYoEQHaBy&pid=Api&P=0&w=588&h=142" cardBackImgSrc="https://pre00.deviantart.net/0274/th/pre/i/2014/357/0/d/guardians_of_the_galaxy___groot_poster__acrylic__by_cybergal2013-d8aydlf.jpg"/>
           
         <Card type="ep" imgSrc={require("../assets/diningHallImages/epicimage.jpeg")} avatarSrc="https://portal.housing.ucla.edu/sites/default/files/media/images/Logo_Epicuria%20at%20Covel_300x300.png" cardBackImgSrc="https://i.pinimg.com/564x/22/f1/3e/22f13ea035bc11beeeb1349550fb3170.jpg"/>
         
        </div>
        <div className="flex">

         <Card type="dn" imgSrc={require("../assets/diningHallImages/deneve.jpg")} avatarSrc="https://tse4.mm.bing.net/th?id=OIP.JzKeok1YeHygJY39vwYoEQHaBy&pid=Api&P=0&w=588&h=142" cardBackImgSrc="https://pre00.deviantart.net/0274/th/pre/i/2014/357/0/d/guardians_of_the_galaxy___groot_poster__acrylic__by_cybergal2013-d8aydlf.jpg"/>
           
         <Card type="ep" imgSrc={require("../assets/diningHallImages/epicimage.jpeg")} avatarSrc="https://portal.housing.ucla.edu/sites/default/files/media/images/Logo_Epicuria%20at%20Covel_300x300.png" cardBackImgSrc="https://i.pinimg.com/564x/22/f1/3e/22f13ea035bc11beeeb1349550fb3170.jpg"/>
         
        </div>
      </div>
     )
   }
 }


 class App2 extends React.Component {
   constructor(props){
     super(props);
   }
   render(){
     return (
       <div>
          <CardContainer />
       </div>
     )
   }
}

//ReactDOM.render(<App2 />, root);
export default App2;  // unused
export {CardContainer};
