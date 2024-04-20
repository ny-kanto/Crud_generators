import React from 'react';
import { IonApp, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonFooter, 
  IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonPage ,
  IonButtons,
  IonButton,
  IonItem,
  IonRouterLink } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

const Sidebar: React.FC = () => (
  <>
    <IonMenu content-id="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>[projectNameMaj]</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonListHeader>
            Navigate
          </IonListHeader>
          <IonMenuToggle auto-hide="false">
            <IonRouterLink href="/Users" routerDirection="none"><IonItem button><IonIcon slot="start" name=' users'></IonIcon><IonLabel> users</IonLabel></IonItem></IonRouterLink> 
<IonRouterLink href="/Animal" routerDirection="none"><IonItem button><IonIcon slot="start" name=' animal'></IonIcon><IonLabel> animal</IonLabel></IonItem></IonRouterLink> 

          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  </>
);

export default Sidebar;
