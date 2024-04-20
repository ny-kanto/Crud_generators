import React, { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, IonItemSliding, IonFab, IonFabButton, IonIcon, IonButton, IonInput, IonModal, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';

const Users: React.FC = () => {
    const [usersList, setusersList] = useState([]);

  useEffect(() => {
    const fetchusersList = async () => {
      try {
        const response = await axios.get('http://localhost:5189/api/Users');
        setusersList(response.data);
      }
    };

    fetchusersList();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const url = 'http://localhost:5189/api/Users';
    try {
      const data = new FormData();
      data.append('nom', formData.nom);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data
      }
      const response = await axios.request(config);

      if (response.data.error) {
        // Check if there's an error in the response
        console.error('Erreur lors de la requête:', response.data.error);
        setError(response.data.error);
        setLoading(false);
      } else {
        console.log('Insert successful:', response.data);
        navigate("/Home")
        setFormData({
          nom: '',
        });
      }
    }
  };


  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des userss</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Liste des userss
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        
        {/* Bouton d'action Ajouter */}
        <IonFab vertical="top" horizontal="start" slot="fixed">
          <IonFabButton onClick={handleAdd}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Affichage du formulaire dans un IonModal */}
            <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
            <IonContent>
                <IonTitle>Ajouter une users</IonTitle>
                <IonItem>
    <IonLabel>Label</IonLabel>
    <IonInput name="label" type="text"></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Prenom</IonLabel>
    <IonInput name="prenom" type="text"></IonInput>
</IonItem>

            <IonButton onClick={handleFormSubmit}>Ajouter</IonButton>
            <IonButton onClick={() => setShowAddModal(false)}>Annuler</IonButton>
          </IonContent>
        </IonModal>


        <IonItemSliding>
          {usersList.map(userss => (
            <div>
              <IonItem>
              <IonLabel>{userss.nom}</IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="secondary">
                <IonIcon slot="icon-only" icon={create}/>
              </IonItemOption>
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}/>
              </IonItemOption>
            </IonItemOptions>

            <IonAlert
              isOpen={showDeleteAlert}
              onDidDismiss={() => setShowDeleteAlert(false)}
              header={'Confirmation de suppression'}
              message={`Êtes-vous sûr de vouloir supprimer ${userss.nom} ?`}
              buttons={[
                {
                  text: 'Annuler',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    setShowDeleteAlert(false);
                  }
                },
                {
                  text: 'Supprimer',
                  handler: handleConfirmDelete
                }
              ]}
            />
            </div>
          ))}
        </IonItemSliding>
      </IonContent>
    </IonPage>
  );
};


export default Users;
