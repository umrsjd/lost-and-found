import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 2rem 2rem;
  background: #001F3F;
  color: #FFFFFF;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Content = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4ECDC4;
`;

const Mission = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: center;
  margin: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  h4 {
    font-size: 2.5rem;
    color: #FF6B6B;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: #FFFFFF;
  }
`;

function AboutUs() {
  return (
    <AboutContainer>
      <Section>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Reuniting Lost Treasures with Their Owners
        </Title>
        
        <Mission
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          At Lost & Found, we're more than just a platform – we're a community-driven initiative 
          dedicated to bringing lost items back to their rightful owners. Our AI-powered system 
          and passionate community work together to make the process of finding lost items 
          simpler, faster, and more efficient.
        </Mission>

        <Stats>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4>95%</h4>
            <p>Success Rate</p>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4>10K+</h4>
            <p>Items Returned</p>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h4>50K+</h4>
            <p>Happy Users</p>
          </StatItem>
        </Stats>

        <Content>
          <Card
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CardTitle>Our Vision</CardTitle>
            <p>
              We envision a world where losing an item doesn't mean losing hope. 
              Through innovative technology and community engagement, we're making 
              this vision a reality, one item at a time.
            </p>
          </Card>

          <Card
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <CardTitle>How We Help</CardTitle>
            <p>
              Our AI-powered platform matches lost items with found reports, while 
              our dedicated community helps spread the word. We've simplified the 
              process of reporting and claiming items, making reunions happen faster.
            </p>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <CardTitle>Community First</CardTitle>
            <p>
              We believe in the power of community. Our platform is built on trust, 
              transparency, and the collective desire to help others. Join us in 
              making a difference in people's lives.
            </p>
          </Card>
        </Content>
      </Section>
    </AboutContainer>
  );
}

export default AboutUs;