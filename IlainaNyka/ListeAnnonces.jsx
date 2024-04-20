import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/styleAndrea.css';


function ListeAnnonces() {
  const [voitureAnnonces, setVoitureAnnonces] = useState([]);

  useEffect(() => {
    const fetchVoitureAnnonces = async () => {
      try {
        const response = await axios.get('https://voiture-production-247e.up.railway.app/api/annonce_details/valide');
        setVoitureAnnonces(response.data);
      } catch (error) {
        console.error('Error fetching voiture annonces:', error);
      }
    };

    fetchVoitureAnnonces();
  }, []);
  return (
    <div className='listeAnnonces'>
      <Header />
      <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">

        <div class="section-overlay"></div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#3D405B" fill-opacity="1"
            d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z">
          </path>
        </svg>

        <div class="container">
          <div class="row">

            <div class="col-lg-6 col-12 mb-5 mb-lg-0">
              <h2 class="text-white">Fivarotana fiara</h2>

              <h1 class="cd-headline rotate-1 text-white mb-4 pb-2">
                <span>Occasion is </span>
                <span class="cd-words-wrapper">
                  <b class="is-visible">Bae</b>
                </span>
              </h1>
            </div>

            <div class="col-lg-6 col-12">

            </div>

          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fill-opacity="1"
            d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
          </path>
        </svg>
      </section>

      <section class="events-section section-bg section-padding" id="section_4">
        <div class="container">
          <div class="row">

            <div class="col-lg-12 col-12">
              <h2 class="mb-lg-3">Liste des annonces</h2>
            </div>

            <div>
              {voitureAnnonces.map((voitureAnnonce) => (
                <div key={voitureAnnonce.id_annonce} className="row custom-block custom-block-bg">
                  <div className="col-lg-2 col-md-4 col-12 order-2 order-md-0 order-lg-0">
                    <div className="custom-block-date-wrap d-flex d-lg-block d-md-block align-items-center mt-3 mt-lg-0 mt-md-0">
                      <h6 className="custom-block-date mb-lg-1 mb-0 me-3 me-lg-0 me-md-0">24</h6>
                      <strong className="text-white">Feb 2048</strong>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-8 col-12 order-1 order-lg-0">
                    <div className="custom-block-image-wrap">
                      <Link to="/">
                        <img src={voitureAnnonce.photo} className="custom-block-image img-fluid" alt="" />
                        <i className="custom-block-icon bi-link"></i>
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-6 col-12 order-3 order-lg-0">
                    <div className="custom-block-info mt-2 mt-lg-0">
                      <div className="d-flex flex-wrap align-items-center mb-1">
                        <span className="custom-block-span">Annee:</span>
                        <p className="mb-0">{voitureAnnonce.annee}</p>
                      </div>

                      <div className="d-flex flex-wrap align-items-center mb-1">
                        <span className="custom-block-span">Marque:</span>
                        <p className="mb-0">{voitureAnnonce.marque}</p>
                      </div>

                      <div className="d-flex flex-wrap align-items-center mb-1">
                        <span className="custom-block-span">Model:</span>
                        <p className="mb-0">{voitureAnnonce.model}</p>
                      </div>

                      <div className="d-flex flex-wrap align-items-center mb-1">
                        <span className="custom-block-span">Categorie:</span>
                        <p className="mb-0">{voitureAnnonce.categorie}</p>
                      </div>

                      <div className="d-flex flex-wrap border-top mt-4 pt-3">
                        <div className="mb-4 mb-lg-0">
                          <div className="d-flex flex-wrap align-items-center">
                            <span className="custom-block-span">Prix:</span>
                            <p className="mb-0">{voitureAnnonce.prix}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center ms-lg-auto">
                          <Link to={"/detailAnnonceLogin/"+voitureAnnonce.id_voiture} className="btn custom-btn">Voir les détails</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ListeAnnonces;
