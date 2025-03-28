import React, { useContext, useState } from "react";

import { Card, Map, Modal } from "../../shared/components/UIElements";
import { Button } from "../../shared/components/FormElements";
import "./PlaceItem.css";
import { AuthenticationContext } from "../../shared/context/authContext";

function PlaceItem(props) {
  const authenticationContext = useContext(AuthenticationContext);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const deletePlace = () => {
    closeDeleteModal();
    console.log("DELETING...");
  };

  return (
    <React.Fragment>
      <Modal
        show={isMapModalOpen}
        onCancel={closeMapModal}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapModal}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteModal}>
              CANCEL
            </Button>
            <Button danger onClick={deletePlace}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delete this place? This action cannot be
          undone.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapModal}>
              VIEW ON MAP
            </Button>
            {authenticationContext.isLoggedIn && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={openDeleteModal}>
                  DELETE
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
