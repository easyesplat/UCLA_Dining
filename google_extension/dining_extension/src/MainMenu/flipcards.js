import React from 'react';
import '../css/flipcards.css';

// Styles
const bodyStyles = {
  background: "-webkit-gradient(linear, left top, right top, color-stop(0%, transparent), color-stop(50%,red), color-stop(100%,transparent))",
  background: "-webkit-linear-gradient(left, transparent 0%,red 50%,transparent 100%)", /* Chrome10+, Safari5.1+ */
  background: "-moz-linear-gradient(left, transparent 0%,red 50%,transparent 100%)",    /* FF3.6+ */
  background: "linear-gradient(to bottom right,#ff5555 40%,#5555ff 100%)",
  width: "100%",
  height: "120vh",
  overflowX: "hidden"
}
const headerStyles = {
  textAlign: "center",
  color:"#fff",
}
const cardContainerStyles = {
  width: "300px",
  height: "500px",
  background: "#fff",
  borderRadius: 35,
  boxShadow: "1px 1px 35px #444"
};
const imgContainerStyles = {
  backgroundColor:"#fff",
  height: "35%",
  margin: 0,
  borderTopRightRadius: 35,
  borderTopLeftRadius: 35,
  background: "#444",
  backgroundSize: "cover"
}
const avatarContainerStyles = {
  width: "150px",
  height: "150px",
  zIndex: "9",
  position: "relative",
  top: "-85px",
  left: "65px",
  right: "0",
  margin: "0 auto",
  border: "10px solid #fff",
  /* background: "#000", */
  backgroundSize: "cover",
  display: "inline-block",
  textAlign: "center",
  borderRadius: "50%"
};
const titleStyles = {
  color:"#555",
  fontWeight: "100",
  outline: "none",
  margin: "0px",
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  position: "relative",
  top: "-75px"
};
const subTitleStyles = {
  position: "relative",
  top: "-95px",
  textAlign: "center",
  fontWeight: "100",
  color: "#888"
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
  height: 500,
  width: 300,
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  borderRadius: "35px",
  boxShadow: "1px 1px 35px #444",
  background: "')",
  backgroundSize: "cover",
  backgroundPosition: "right"
}
const madeByStyles = {
  color: "#fff",
  opacity: ".5",
  textAlign: "center",
  padding: "0px"
}

const imgStyles = {
  width: 300,
  borderTopRightRadius: 35,
  borderTopLeftRadius: 35
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
  height: "100%",
  width: "100%",
  borderRadius: 35,
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
        <h1 id={this.props.targetId} style={titleStyles} className="title">{this.props.title}</h1>
        <h4 style={subTitleStyles} className="subTitle">{this.props.subTitle}</h4>
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

  // <img className="cardBackImg" style={cardBackImgStyles} src={this.props.cardBackImgSrc}/>
  render(){
    return (
    <div>
      <img className="cardBackImg" style={cardBackImgStyles} src={this.props.cardBackImgSrc}/>
      <div style={cardBackStyles}>
        <p> <br></br> <br></br> </p>
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
       bio: "Offers a versatile menu of fresh, quick, and convenient food and beverage options.",
       direction: "forwards"
     }
   }
   componentWillMount(){
     if (this.props.type == "bp"){
     this.setState({
       title: "Bruin Plate",
       subTitle: "@Healthy Food",
       bio: "A creative, honest and responsible eatery that provides seasonal, innovative and sustainable cuisine with mouth-watering results."
     });
     } else if (this.props.type == "dn"){
       this.setState({
         title: "De Neve",
         subTitle: "@American",
         bio: "Celebrates the amazing diversity of foods inspired by North, Central, and South America."
       })
     } else if (this.props.type == "ep"){
       this.setState({
         title: "Epicuria",
         subTitle: "@Mediterranean",
         bio: "Fresh California products inspired by the cuisines of Cyprus, France, Greece, Israel, Italy, Lebanon, Spain, Turkey."
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

 class CardContainer extends React.Component {
   constructor(props){
     super(props);
   }
   render(){
     return (
      <div style={bodyStyles} className="body">
         <h1 style={headerStyles} className="header">Hover to flip</h1>
         <div className="flex">
           
          <Card imgSrc= {require("../assets/diningHallImages/bcafe.jpg")} avatarSrc="https://menu.dining.ucla.edu/Content/Images/Menus/BruinCafe/bruincafe-logo.png" cardBackImgSrc={require("../assets/diningHallImages/bruincafe-logo.png")} targetId="navi" />
           
          <Card type="bp" imgSrc={require("../assets/diningHallImages/bplateimage.jpg")} avatarSrc="https://tse1.mm.bing.net/th?id=OIP.AAMn3VdyUcUhKq89mvUaKAHaFK&pid=Api&P=0&w=246&h=172" cardBackImgSrc="https://i.pinimg.com/736x/b1/2d/9f/b12d9f259a178fc9dc7bfb6447be7a1c.jpg"/>
           
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
