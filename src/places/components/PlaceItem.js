import React, { useContext, useState } from "react";

import {
  Card,
  ErrorModal,
  LoadingSpinner,
  Map,
  Modal,
} from "../../shared/components/UIElements";
import { Button } from "../../shared/components/FormElements";
import { AuthenticationContext } from "../../shared/context/authContext";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { V1_PLACES_ENDPOINT } from "../../shared/utils/constants";
import "./PlaceItem.css";

function PlaceItem(props) {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const authenticationContext = useContext(AuthenticationContext);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const deletePlace = () => {
    closeDeleteModal();
    try {
      sendRequest(`${V1_PLACES_ENDPOINT}/${props.id}`, "DELETE", null, {
        Authorization: "Bearer " + authenticationContext.token,
      });

      props.onDelete(props.id);
    } catch (err) {
      console.error("DELETE PLACE ERROR: ", err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
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
          {isLoading && <LoadingSpinner asOverlay />}
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
            {authenticationContext.userId === props.creatorId && (
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
