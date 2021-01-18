import logo from './images/logo.png'
import angledoubleleft from './images/angle-double-left.svg'
import hamburgMenu from './images/menu.svg'
import loader from './images/loader.svg'
import back from './images/back.svg'
import close from './images/close.svg'
import inviteTeamMember from './images/icons/invite-teammembers-icon.png'
import avatar1 from './images/avatars/avatar-01.png'
import avatar2 from './images/avatars/avatar-02.png'
import avatar3 from './images/avatars/avatar-03.png'
import avatar4 from './images/avatars/avatar-04.png'
import avatar5 from './images/avatars/avatar-05.png'
import avatar6 from './images/avatars/avatar-06.png'
import avatar7 from './images/avatars/avatar-07.png'
import avatar8 from './images/avatars/avatar-08.png'
import avatar9 from './images/avatars/avatar-09.png'
import avatar10 from './images/avatars/avatar-10.png'
import avatar11 from './images/avatars/avatar-11.png'
import avatar12 from './images/avatars/avatar-12.png'
import slide00 from './images/swiper/slide-00.png'
import slide01 from './images/swiper/slide-01.png'
import slide02 from './images/swiper/slide-02.png'
import slide03 from './images/swiper/slide-03.png'
import slide04 from './images/swiper/slide-04.png'

// import planningPokerIcon from './images/cards/planningPoker.png'
// import delegationPokerSet from './images/cards/otherIcons/delegation-poker-set-icon.png'
import planningPokerBavarianCard from './images/cards/cover_portrait/bavarian.png'
import delegation1 from './images/cards/delegation/1.png'
import fibonacciPokerBavarianCardH from './images/cards/cover_landscape/bavarian.png'
const images = {
  logo,
  angledoubleleft,
  hamburgMenu,
  loader,
  back,
  close,
  inviteTeamMember,
  avatars: [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
  ],
  swiper: [slide00, slide01, slide02, slide03, slide04],
}
export const cards = {
  ulassaCard: {
    // planningPoker: { icon: planningPokerIcon },
  },
  cardset: {
    // delegationPokerSet,
    //   fibonacciPokerSet: require('./images/cards/otherIcons/planning-poker-set-icon.png'),
    //   happinessIndexSet: require('./images/cards/otherIcons/happiness-index-set-icon.png'),
    // planningPokerSet: require('./images/cards/otherIcons/planning-poker-set-icon.png'),
    //   tshirtSizeSet: require('./images/cards/otherIcons/tshirt-size-set-icon.png'),
    //   delegationPokerCard: require('./images/cards/cover_portrait/delegation.png'),
    //   fibonacciPokerBavarianCard: require('./images/cards/cover_portrait/bavarian-fibonacci.png'),
    //   fibonacciPokerPlanetCard: require('./images/cards/cover_portrait/planet.png'),
    //   planningPokerCard: require('./images/cards/cover_portrait/planning.png'),
    planningPokerBavarianCard,
    //   planningPokerIdeCard: require('./images/cards/cover_portrait/ide.png'),
    //   planningPokerPlanetCard: require('./images/cards/cover_portrait/planet.png'),
    //   happinessIndexCard: require('./images/cards/cover_portrait/happiness.png'),
    //   tshirtSizeCard: require('./images/cards/cover_portrait/tshirt.png'),
    //   delegationPokerCardH: require('./images/cards/cover_landscape/delegation.jpg'),
    //   happinessIndexCardH: require('./images/cards/cover_landscape/happiness.jpg'),
    fibonacciPokerBavarianCardH,
    //   fibonacciPokerPlanetCardH: require('./images/cards/cover_landscape/planet.png'),
    //   planningPokerCardH: require('./images/cards/cover_landscape/planning.jpg'),
    //   planningPokerBavarianCardH: require('./images/cards/cover_landscape/bavarian.png'),
    //   planningPokerIdeCardH: require('./images/cards/cover_landscape/ide.jpg'),
    //   planningPokerPlanetCardH: require('./images/cards/cover_landscape/planet.png'),
    //   tshirtSizeCardH: require('./images/cards/cover_landscape/tshirt.jpg'),
    // },
    // cardsetLayout: {
    //   planningPockerLayout0: require('./images/cards/otherIcons/planning-poker-layout-0-icon.jpg'),
    //   happinessIndexLayout0: require('./images/cards/otherIcons/happiness-index-layout-0-icon.jpg'),
    //   deletegationPockerLayout0: require('./images/cards/otherIcons/delegation-poker-layout-0-icon.jpg'),
    //   tshirtSizeLayout0: require('./images/cards/otherIcons/tshirt-size-layout-0-icon.jpg'),
    //   planningPokerIde: require('./images/cards/otherIcons/planning-poker-ide-icon.jpg'),
    //   planningPokerPlanet: require('./images/cards/otherIcons/planning-poker-planet-icon.jpg'),
    //   planningPokerBavarian: require('./images/cards/bavarian/cover_portrait.png'),
    // },
    // // planning poker default
    // PLANNING_POKER_DEFAULT: {
    //   card0middle: require('./images/cards/planning/0.png'),
    //   card1middle: require('./images/cards/planning/1.png'),
    //   card2middle: require('./images/cards/planning/2.png'),
    //   card3middle: require('./images/cards/planning/3.png'),
    //   card5middle: require('./images/cards/planning/5.png'),
    //   card8middle: require('./images/cards/planning/8.png'),
    //   card13middle: require('./images/cards/planning/13.png'),
    //   card20middle: require('./images/cards/planning/20.png'),
    //   card40middle: require('./images/cards/planning/40.png'),
    //   card100middle: require('./images/cards/planning/100.png'),
    //   cardInfimiddle: require('./images/cards/planning/infinity.png'),
    //   cardQuemiddle: require('./images/cards/planning/question.png'),
    //   cardCoffemiddle: require('./images/cards/planning/break.png'),
    // },
    // // happiness index default
    // HAPPINESS_INDEX_DEFAULT: {
    //   card1middle: require('./images/cards/happiness/1.png'),
    //   card2middle: require('./images/cards/happiness/2.png'),
    //   card3middle: require('./images/cards/happiness/3.png'),
    //   card4middle: require('./images/cards/happiness/4.png'),
    //   card5middle: require('./images/cards/happiness/5.png'),
    //   card6middle: require('./images/cards/happiness/6.png'),
    //   card7middle: require('./images/cards/happiness/7.png'),
    //   card8middle: require('./images/cards/happiness/8.png'),
    //   card9middle: require('./images/cards/happiness/9.png'),
    //   card10middle: require('./images/cards/happiness/10.png'),
    // },
    // // delegation poker default
    DELEGATION_POKER_DEFAULT: {
      card1middle: delegation1,
      //   card2middle: require('./images/cards/delegation/2.png'),
      //   card3middle: require('./images/cards/delegation/3.png'),
      //   card4middle: require('./images/cards/delegation/4.png'),
      //   card5middle: require('./images/cards/delegation/5.png'),
      //   card6middle: require('./images/cards/delegation/6.png'),
      //   card7middle: require('./images/cards/delegation/7.png'),
    },
    // // delegation poker default
    // TSHIRT_SIZE_DEFAULT: {
    //   cardLmiddle: require('./images/cards/tshirt/L.png'),
    //   cardMmiddle: require('./images/cards/tshirt/M.png'),
    //   cardSmiddle: require('./images/cards/tshirt/S.png'),
    //   cardXLmiddle: require('./images/cards/tshirt/XL.png'),
    //   cardXSmiddle: require('./images/cards/tshirt/XS.png'),
    // },
    // // planning poker ide
    // PLANNING_POKER_IDE: {
    //   card0bottom: require('./images/cards/ide/0.png'),
    //   card1bottom: require('./images/cards/ide/1.png'),
    //   card2bottom: require('./images/cards/ide/2.png'),
    //   card3bottom: require('./images/cards/ide/3.png'),
    //   card5bottom: require('./images/cards/ide/5.png'),
    //   card8bottom: require('./images/cards/ide/8.png'),
    //   card13bottom: require('./images/cards/ide/13.png'),
    //   card20bottom: require('./images/cards/ide/20.png'),
    //   card40bottom: require('./images/cards/ide/40.png'),
    //   card100bottom: require('./images/cards/ide/100.png'),
    //   cardInfibottom: require('./images/cards/ide/infinity.png'),
    //   cardQuebottom: require('./images/cards/ide/question.png'),
    //   cardCoffebottom: require('./images/cards/ide/break.png'),
    // },
    // // planning poker planet
    // PLANNING_POKER_PLANET: {
    //   card0middle: require('./images/cards/planet/0.png'),
    //   card1middle: require('./images/cards/planet/1.png'),
    //   card2middle: require('./images/cards/planet/2.png'),
    //   card3middle: require('./images/cards/planet/3.png'),
    //   card5middle: require('./images/cards/planet/5.png'),
    //   card8middle: require('./images/cards/planet/8.png'),
    //   card13middle: require('./images/cards/planet/13.png'),
    //   card20middle: require('./images/cards/planet/20.png'),
    //   card40middle: require('./images/cards/planet/40.png'),
    //   card100middle: require('./images/cards/planet/100.png'),
    //   cardInfimiddle: require('./images/cards/planet/infinity.png'),
    //   cardQuemiddle: require('./images/cards/planet/question.png'),
    //   cardCoffemiddle: require('./images/cards/planet/break.png'),
    // },
    // // planning poker bavarian
    // PLANNING_POKER_BAVARIAN: {
    //   card0middle: require('./images/cards/bavarian/0.png'),
    //   card1middle: require('./images/cards/bavarian/1.png'),
    //   card2middle: require('./images/cards/bavarian/2.png'),
    //   card3middle: require('./images/cards/bavarian/3.png'),
    //   card5middle: require('./images/cards/bavarian/5.png'),
    //   card8middle: require('./images/cards/bavarian/8.png'),
    //   card13middle: require('./images/cards/bavarian/13.png'),
    //   card20middle: require('./images/cards/bavarian/20.png'),
    //   card40middle: require('./images/cards/bavarian/40.png'),
    //   card100middle: require('./images/cards/bavarian/100.png'),
    //   cardInfimiddle: require('./images/cards/bavarian/infinity.png'),
    //   cardQuemiddle: require('./images/cards/bavarian/question.png'),
    //   cardCoffemiddle: require('./images/cards/bavarian/break.png'),
    // },
    // // fibonacci poker bavarian
    // FIBONACCI_BAVARIAN: {
    //   card0middle: require('./images/cards/bavarian/0.png'),
    //   card1middle: require('./images/cards/bavarian/1.png'),
    //   card2middle: require('./images/cards/bavarian/2.png'),
    //   card3middle: require('./images/cards/bavarian/3.png'),
    //   card5middle: require('./images/cards/bavarian/5.png'),
    //   card8middle: require('./images/cards/bavarian/8.png'),
    //   card13middle: require('./images/cards/bavarian/13.png'),
    //   card21middle: require('./images/cards/bavarian/20.png'),
    //   card34middle: require('./images/cards/bavarian/40.png'),
    //   card55middle: require('./images/cards/bavarian/100.png'),
    //   card89middle: require('./images/cards/bavarian/infinity.png'),
    // },
    // // fibonacci poker planet
    // FIBONACCI_PLANET: {
    //   card0middle: require('./images/cards/planet/0.png'),
    //   card1middle: require('./images/cards/planet/1.png'),
    //   card2middle: require('./images/cards/planet/2.png'),
    //   card3middle: require('./images/cards/planet/3.png'),
    //   card5middle: require('./images/cards/planet/5.png'),
    //   card8middle: require('./images/cards/planet/8.png'),
    //   card13middle: require('./images/cards/planet/13.png'),
    //   card21middle: require('./images/cards/planet/20.png'),
    //   card34middle: require('./images/cards/planet/40.png'),
    //   card55middle: require('./images/cards/planet/100.png'),
    //   card89middle: require('./images/cards/planet/infinity.png'),
  },
}
export default images
