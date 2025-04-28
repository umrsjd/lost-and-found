import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import Background3D from './components/Background3D';
import PostItemForm from './PostItemForm';
import FindItem from './FindItem';
import AuthModal from './components/AuthModal';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutUs from './components/AboutUs';


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #001F3F;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 10;
  background: rgba(0, 31, 63, 0.2);
  backdrop-filter: blur(8px);
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion(Link))`
  color: #FFFFFF;
  text-decoration: none;
  font-size: 1.1rem;
  cursor: pointer;
  
  &:hover {
    color: #E6E6E6;
  }
`;

const HeroSection = styled(motion.div)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  position: relative;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const FindButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: #FFFFFF;
  color: #001F3F;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: #E6E6E6;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 31, 63, 0.95);
  padding: 5rem 2rem;
  z-index: 90;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const LostAndFoundSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  background-color: #001F3F;
`;

const ItemCard = styled.div`
  width: 250px;
  height: 350px;
  margin: 1rem;
  background-color: #001F3F;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ItemCaption = styled.div`
  padding: 1rem;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

function LostAndFoundItems() {
  const items = [
    

    { image: 'https://images.unsplash.com/photo-1643804926339-e94f0a655185?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg', caption: 'Found few keys near chowringee bridge beside bazaar Kolkata on 3/3/25' },
    { image: 'https://www.animalsaroundtheglobe.com/wp-content/uploads/2024/09/mama-cat-and-kittens-abandoned-in-bag-960x540.png', caption: 'Found a black bag near Park Street on 24/04/25. For more information contact on 91456XXXXX' },
    { image: 'https://cdn.thewirecutter.com/wp-content/media/2023/04/slimwallet-2048px-1193.jpg?auto=webp&quality=75&width=980&dpr=2.jpg', caption: 'Found wallet in City Center Mall on first floor on 23/04/25' },

    { image: 'https://cdn.mos.cms.futurecdn.net/w3np7tcBRKgzS4SpQnKzh9-970-80.jpg.webp', caption: 'Found a smart watch at Esplanade metro near gate number 5 on 25/3/25' },
    { image: 'https://www.brisbane.qld.gov.au/content/dam/brisbanecitycouncil/corpwebsite/animals-and-pets/images/personalised_dog_registration_tags_40.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg', caption: 'Found a pet dog wearing a red dog collar near Kalighat on 17/2/25' },
    { image: 'https://p.vitalmtb.com/photos/stories/2017/05/16/full_zfaulkner_2017_Port_Angeles_Day_4_1125_152549.jpg?1494972214', caption: 'Found a bicycle at Lake Town Park on 23/5/24' },
    { image: 'https://i.ebayimg.com/images/g/JugAAOSwCGFh4IW~/s-l1600.webp', caption: 'Found earbuds lying on the road at Kasba Bus stand on 4/4/25' },
    { image: 'https://thumbs.dreamstime.com/z/lost-forgotten-black-jacket-green-grass-red-poppy-flower-gray-asphalt-abandoned-thrown-away-droped-symbol-abandonment-jeans-250554187.jpg?ct=jpeg', caption: 'Found black colour jacket at Garia metro station on 21/5/24' }
  ];

  return (
    <LostAndFoundSection>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <ItemImage src={item.image} alt={item.caption} />
          <ItemCaption>{item.caption}</ItemCaption> {/* Ensure only one tag is used to display the caption */}
        </ItemCard>
      ))}
    </LostAndFoundSection>
  );
}

const PageTransition = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const LogoutPopup = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #001F3F;
  z-index: 1000;
  min-width: 300px;
`;

const LogoutMessage = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #001F3F;
`;

const LoadingDots = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;

  span {
    width: 8px;
    height: 8px;
    background: #001F3F;
    border-radius: 50%;
  }
`;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [showFindItem, setShowFindItem] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutPopup(true);
    setTimeout(() => {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setShowLogoutPopup(false);
    }, 2000);
  };

  return (
    <Router>
      <Container>
        <Background3D />
        <Header>
          <Logo
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            as={Link}
            to="/"
          >
            Lost & Found
          </Logo>
          <Nav>
            <NavLink 
              whileHover={{ scale: 1.1 }}
              to="/"
            >
              Home
            </NavLink>
            <NavLink 
              whileHover={{ scale: 1.1 }}
              to="/find-item"
            >
              Find Item
            </NavLink>
            <NavLink 
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsPostFormOpen(true)}
            >
              Post Item
            </NavLink>
            <NavLink 
              whileHover={{ scale: 1.1 }}
              to="/about"
            >
              About Us
            </NavLink>
            {!isAuthenticated ? (
              <NavLink 
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsAuthModalOpen(true)}
              >
                Login
              </NavLink>
            ) : (
              <NavLink 
                whileHover={{ scale: 1.1 }}
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            )}
          </Nav>

          <MobileMenuButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </Header>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/find-item" onClick={() => setIsMenuOpen(false)}>Find Item</NavLink>
              <NavLink onClick={() => {
                setIsPostFormOpen(true);
                setIsMenuOpen(false);
              }}>Post Item</NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
              <NavLink href="/login">Login</NavLink>
            </MobileMenu>
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection>
                <ContentWrapper
                  style={{ y: 0 }}
                  animate={{
                    y: [-20, 20],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                >
                  <Title>Lost and Found</Title>
                  <FindButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFindItem(true)}
                  >
                    Kolkata
                  </FindButton>
                </ContentWrapper>
              </HeroSection>
              <LostAndFoundItems />
            </motion.div>
          } />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/find-item" element={<FindItem />} />
        </Routes>

        <PostItemForm isOpen={isPostFormOpen} onClose={() => setIsPostFormOpen(false)} />
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={() => {
            setIsAuthenticated(true);
            setIsAuthModalOpen(false);
          }}
        />

        <AnimatePresence>
          {showLogoutPopup && (
            <LogoutPopup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LogoutMessage>Logging out...</LogoutMessage>
              <LoadingDots>
                <motion.span
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.span
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                />
                <motion.span
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                />
              </LoadingDots>
            </LogoutPopup>
          )}
        </AnimatePresence>
      </Container>
    </Router>
  );
}

export default App;


