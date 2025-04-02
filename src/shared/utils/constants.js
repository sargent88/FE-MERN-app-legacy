const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const VALIDATOR_TYPE_EMAIL = "EMAIL";
export const VALIDATOR_TYPE_FILE = "FILE";
export const VALIDATOR_TYPE_MAX = "MAX";
export const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
export const VALIDATOR_TYPE_MIN = "MIN";
export const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
export const VALIDATOR_TYPE_REQUIRE = "REQUIRE";

export const FORM_INPUT_CHANGE = "INPUT_CHANGE";
export const FORM_SET_DATA = "SET_DATA";

export const V1_USERS_ENDPOINT = `${backendUrl}/api/v1/users`;
export const V1_PLACES_ENDPOINT = `${backendUrl}/api/v1/places`;

export const USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    places: 3,
  },
];

export const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    address: "20 W 34th St, New York, NY 10118, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    address: "20 W 34th St, New York, NY 10118, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u2",
  },
];
