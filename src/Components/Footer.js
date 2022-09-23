import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';


class Footer extends React.Component {
  render() {
    return (
      <Container fluid className="footer-container pb-0 gap">
        <Row className="gap-2">
          <Col sm={12} md={2}>
            <div className="footer-logo d-flex justify-content-center">AIMDb</div>
            <div className='font-white'>Argo-X Interns Movie Database</div>
          </Col>
          <Col sm={12} md={2} >
            <div className="footer-title justify-content-center justify-content-md-start">Get started</div>
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <Link className="link footer" to='/'>Home</Link>
              <Link className="link footer" to='/signup'>Sign up</Link>
              <Link className="link footer" to='login'>Log in</Link>
            </div>
          </Col>
          <Col sm={12} md={2}>
            <div className="footer-title justify-content-center justify-content-md-start">Contact information</div>
            <div className="d-flex gap justify-content-center justify-content-md-start">
              <FontAwesomeIcon icon={faFacebook} className='icon footer' onClick={() => window.open('https://www.facebook.com/NemetschekBulgaria/')} />
              <FontAwesomeIcon icon={faYoutube} className='icon footer' onClick={() => window.open('https://www.youtube.com/channel/UCCNfWsxRokIE-61B8hbBPWg')} />
              <FontAwesomeIcon icon={faLinkedin} className='icon footer' onClick={() => window.open('https://www.linkedin.com/company/nemetschek-bulgaria/mycompany/')} />
            </div>
          </Col>
        </Row>
        <Row className="copy-right-container">
          <div className="font-white">Copyright</div>
          <FontAwesomeIcon icon={faCopyright} className='font-white' />
          <div className="font-white">2022 Nemetschek Bulgaria</div>
        </Row>
      </Container>
    );
  }
}

export default Footer;