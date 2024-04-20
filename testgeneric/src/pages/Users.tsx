import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, IonItemSliding, IonFab, IonFabButton, IonIcon, IonButton, IonInput, IonModal, IonItem, IonMenuButton, IonLabel, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import { add, create, trash } from 'ionicons/icons';
import Sidebar from './Sidebar';

const Users: React.FC = () => {
    const [usersList, setUsersList] = useState<any[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedUsers, setEditedUsers] = useState({ idUsers: 0, label: '', prenom: '' });
    const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await axios.get('http://localhost:5189/api/Users');
        setUsersList(response.data as any[]);
        console.log(response.data[0]);
      } catch (error) {
        console.error('Error fetching Users list:', error);
      }
    };

    fetchUsersList();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete users ${id}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5189/api/Users/${id}`);
        setUsersList(usersList.filter((users: any) => users.idUsers !== id));
      } catch (error) {
        console.error('Error deleting users:', error);
      }
    }
  };

  const openEditModal = (users: any) => {
    setEditedUsers(users);
    setShowEditModal(true);
  }

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const url = 'http://localhost:5189/api/Users';
    try {
      const response = await axios.post(url, editedUsers);
      setUsersList([...usersList, response.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding users:', error);
    }
  };

  const handleEditFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:5189/api/Users/${editedUsers.idUsers}`, editedUsers);
      console.log('Users data updated successfully');
    } catch (error) {
      console.error('Error updating users:', error);
    }
  }

  return (
    <>

    <Sidebar/>

    <IonPage className="ion-page" id="main-content">
      <IonHeader>
          <IonToolbar>
            <IonButton slot="start">
              <IonMenuButton />
            </IonButton>
            <IonTitle size="large">Liste des userss</IonTitle>
          </IonToolbar>
        </IonHeader>

      <IonContent fullscreen>
          <IonRefresher slot="fixed">
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          {/* Bouton d'action Ajouter */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleAdd}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>


        {/* Affichage du formulaire dans un IonModal */}
          <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
            <IonContent>
              <IonTitle>Ajouter un users</IonTitle>
              <form onSubmit={handleFormSubmit}>
                <IonItem>
    <IonLabel>Label</IonLabel>
    <IonInput name="label" type="text" value={editedUsers.label} onIonChange={(e) => setEditedUsers({ ...editedUsers, label: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Prenom</IonLabel>
    <IonInput name="prenom" type="text" value={editedUsers.prenom} onIonChange={(e) => setEditedUsers({ ...editedUsers, prenom: e.detail.value! })}></IonInput>
</IonItem>

            <IonButton type="submit">Ajouter</IonButton>
            <IonButton onClick={() => setShowAddModal(false)}>Annuler</IonButton>
            </form>
          </IonContent>
        </IonModal>

        {/* Modification du formulaire dans un IonModal */}
          <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
            <IonContent>
              <IonTitle>Modifier l'users</IonTitle>
              <IonItem>
    <IonLabel>Label</IonLabel>
    <IonInput name="label" type="text" value={editedUsers.label} onIonChange={(e) => setEditedUsers({ ...editedUsers, label: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Prenom</IonLabel>
    <IonInput name="prenom" type="text" value={editedUsers.prenom} onIonChange={(e) => setEditedUsers({ ...editedUsers, prenom: e.detail.value! })}></IonInput>
</IonItem>

              <IonButton onClick={handleEditFormSubmit}>Enregistrer</IonButton>
              <IonButton onClick={() => setShowEditModal(false)}>Annuler</IonButton>
            </IonContent>
          </IonModal>

        {/* Listes des objets */}
        {usersList.map((users: any) => (
        <IonItemSliding key={users.idUsers}>
            <IonItem>
              <IonLabel>{users.label}</IonLabel>
              <IonButton color="secondary" onClick={() => openEditModal(users)}>
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
              <IonButton color="danger" onClick={() => handleDelete(users.idUsers)}>
                <IonIcon slot="icon-only" icon={trash} />
              </IonButton>
            </IonItem>
          </IonItemSliding>
        ))}
      </IonContent>

    </IonPage>
    </>
  );
};


export default Users;
