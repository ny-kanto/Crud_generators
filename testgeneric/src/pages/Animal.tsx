import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, IonItemSliding, IonFab, IonFabButton, IonIcon, IonButton, IonInput, IonModal, IonItem, IonMenuButton, IonLabel, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import { add, create, trash } from 'ionicons/icons';
import Sidebar from './Sidebar';

const Animal: React.FC = () => {
    const [animalList, setAnimalList] = useState<any[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedAnimal, setEditedAnimal] = useState({ idUsers: 0, label: '', prenom: '' });
    const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnimalList = async () => {
      try {
        const response = await axios.get('http://localhost:5189/api/Animal');
        setAnimalList(response.data as any[]);
        console.log(response.data[0]);
      } catch (error) {
        console.error('Error fetching Animal list:', error);
      }
    };

    fetchAnimalList();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete animal ${id}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5189/api/Animal/${id}`);
        setAnimalList(animalList.filter((animal: any) => animal.idAnimal !== id));
      } catch (error) {
        console.error('Error deleting animal:', error);
      }
    }
  };

  const openEditModal = (animal: any) => {
    setEditedAnimal(animal);
    setShowEditModal(true);
  }

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const url = 'http://localhost:5189/api/Animal';
    try {
      const response = await axios.post(url, editedAnimal);
      setAnimalList([...animalList, response.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  const handleEditFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:5189/api/Animal/${editedAnimal.idAnimal}`, editedAnimal);
      console.log('Animal data updated successfully');
    } catch (error) {
      console.error('Error updating animal:', error);
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
            <IonTitle size="large">Liste des animals</IonTitle>
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
              <IonTitle>Ajouter un animal</IonTitle>
              <form onSubmit={handleFormSubmit}>
                <IonItem>
    <IonLabel>Label</IonLabel>
    <IonInput name="label" type="text" value={editedAnimal.label} onIonChange={(e) => setEditedAnimal({ ...editedAnimal, label: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Race</IonLabel>
    <IonInput name="race" type="text" value={editedAnimal.race} onIonChange={(e) => setEditedAnimal({ ...editedAnimal, race: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Type</IonLabel>
    <IonInput name="type" type="text" value={editedAnimal.type} onIonChange={(e) => setEditedAnimal({ ...editedAnimal, type: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Users</IonLabel>
    <IonSelect name="users">
    {users.map(f => (
        <IonSelectOption value={f.IdUsers}>{f.label}</IonSelectOption>
    ))}
    </IonSelect>
</IonItem>

            <IonButton type="submit">Ajouter</IonButton>
            <IonButton onClick={() => setShowAddModal(false)}>Annuler</IonButton>
            </form>
          </IonContent>
        </IonModal>

        {/* Modification du formulaire dans un IonModal */}
          <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
            <IonContent>
              <IonTitle>Modifier l'animal</IonTitle>
              <IonItem>
    <IonLabel>Label</IonLabel>
    <IonInput name="label" type="text" value={editedAnimal.label} onIonChange={(e) => setEditedAnimal({ ...editedAnimal, label: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Race</IonLabel>
    <IonInput name="race" type="text" value={editedAnimal.race} onIonChange={(e) => setEditedAnimal({ ...editedAnimal, race: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Type</IonLabel>
    <IonInput name="type" type="text" value={editedAnimal.type} onIonChange={(e) => setEditedAnimal({ ...editedAnimal, type: e.detail.value! })}></IonInput>
</IonItem>
<IonItem>
    <IonLabel>Users</IonLabel>
    <IonSelect value={selectedOption}>
    {users.map(f => (
        <IonSelectOption key={f.value} value={f.value} selected={f.IdUsers == selectedValue}>
        {f.label}
        </IonSelectOption>
    ))}
    </IonSelect>
</IonItem>

              <IonButton onClick={handleEditFormSubmit}>Enregistrer</IonButton>
              <IonButton onClick={() => setShowEditModal(false)}>Annuler</IonButton>
            </IonContent>
          </IonModal>

        {/* Listes des objets */}
        {animalList.map((animal: any) => (
        <IonItemSliding key={animal.idAnimal}>
            <IonItem>
              <IonLabel>{animal.label}</IonLabel>
              <IonButton color="secondary" onClick={() => openEditModal(animal)}>
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
              <IonButton color="danger" onClick={() => handleDelete(animal.idAnimal)}>
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


export default Animal;
